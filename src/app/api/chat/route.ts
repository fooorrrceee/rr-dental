import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import config from '../../../../clinic-config.json';

// Gemini Flash is free and effective for this concierge role.
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const systemPrompt = `
You are the Virtual Assistant (Concierge) for ${config.business.name}.
Tone: ${config.chatbot.tone}.

CLINIC CONTEXT:
- Name: ${config.business.name}
- Tagline: ${config.business.tagline}
- Location: ${config.business.location.area}, ${config.business.location.city}
- Services offered: ${config.services.map(s => s.name).join(", ")}
- Expert Doctors: ${config.team.map(t => `${t.name} (${t.role})`).join(", ")}

YOUR CORE OBJECTIVES:
1. EMPATHY FIRST: Always acknowledge the visitor's concern or question with empathy. Make them feel heard and understood.
2. VALUE PROPOSITION: Explain that for dental concerns, a personalized clinical examination by our specialists (like ${config.team[0].name.split(' ')[1]}) is the most reliable way forward. Online advice is general, but their oral health deserves expert, hands-on attention.
3. PERSISTENT LEAD CAPTURE: Gently steer every conversation toward booking a consultation. 
   - You need to collect: Full Name, Phone Number, and the specific Reason for the visit (doubt/appointment query).
4. CONFIRMATION: Once you have the details, repeat them back to the visitor and ask for confirmation: "Just to be sure, I have your name as [Name], phone as [Phone], and you're interested in [Reason]. Is that correct?"
5. SUBMISSION: ONLY after the user confirms (e.g., "yes", "correct", "perfect"), call the 'submitEnquiry' tool.

STRICT RULES:
- ONLY discuss dental topics or the clinic. Decline other topics politely.
- If the visitor is hesitant, explain that leaving a phone number allows our clinic manager to provide a more accurate time slot and cost estimation than a chatbot can.
- Be professional, warm, and highly focused on conversion.
`;

    try {
        const result = streamText({
            model: google('gemini-1.5-flash'), // Using Flash as requested
            system: systemPrompt,
            messages,
            tools: {
                submitEnquiry: tool({
                    description: 'Submits the confirmed patient enquiry to the clinic for follow-up.',
                    inputSchema: z.object({
                        name: z.string().describe('Full name of the patient.'),
                        phone: z.string().describe('Contact phone number.'),
                        query: z.string().describe('The specific doubt or appointment query.'),
                    }),
                    execute: async ({ name, phone, query }) => {
                        console.log('--- SUBMITTING CONFIRMED ENQUIRY ---', { name, phone, query });
                        try {
                            const res = await fetch(config.form.submitEndpoint, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify({
                                    name,
                                    phone,
                                    message: query,
                                    source: "AI Chatbot Concierge"
                                })
                            });

                            if (res.ok) {
                                return { success: true, message: "Information submitted successfully." };
                            } else {
                                const errorData = await res.json();
                                return { success: false, error: errorData.error || "Submission failed" };
                            }
                        } catch (e) {
                            console.error('Submission error:', e);
                            return { success: false, error: "Network error during submission" };
                        }
                    },
                }),
            },
        });

        // toDataStreamResponse() is standard in modern AI SDK
        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error('Chatbot API Error:', error);
        return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
