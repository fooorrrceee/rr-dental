"use client";

import React, { useState } from "react";
import config from "../../clinic-config.json";
import { ChevronDown } from "lucide-react";

export function FAQ() {
    const { faq } = config;
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="container mx-auto px-4 py-20 relative">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12 animate-fade-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 uppercase tracking-wider">
                        Common Questions
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground text-balance">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faq.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`border rounded-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'bg-primary/5 border-primary/30 shadow-sm' : 'bg-card hover:border-primary/50'}`}
                                style={{
                                    animation: `fade-up 600ms ease-out ${index * 100}ms both`
                                }}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:bg-primary/10 transition-colors group"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${index}`}
                                    id={`faq-question-${index}`}
                                >
                                    <span className="font-medium text-foreground text-lg pr-4">{item.question}</span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ease-out ${isOpen ? 'bg-primary text-primary-foreground rotate-180' : 'bg-primary/10 text-primary group-hover:bg-primary/20'}`}>
                                        <ChevronDown size={18} />
                                    </div>
                                </button>

                                <div
                                    id={`faq-answer-${index}`}
                                    role="region"
                                    aria-labelledby={`faq-question-${index}`}
                                    className={`grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                    <p className="text-muted-foreground">
                        Still have questions? <a href="#contact" className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-1">Reach out to us</a> directly.
                    </p>
                </div>
            </div>
        </section>
    );
}
