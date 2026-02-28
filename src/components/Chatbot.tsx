"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import config from "../../clinic-config.json";

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [input, setInput] = useState("");

    const { messages, sendMessage, status, setMessages } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat',
        }),
    });

    useEffect(() => {
        setMessages([
            {
                id: 'init-1',
                role: 'assistant',
                parts: [{ type: 'text', text: config.chatbot.greeting }]
            }
        ]);
    }, [setMessages]);

    const isThinking = status === 'streaming' || status === 'submitted';
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowNotification(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen, isThinking]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isThinking) return;
        sendMessage({ text: input });
        setInput("");
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans">
            {/* Thought Cloud Notification */}
            {!isOpen && showNotification && (
                <div
                    className="mb-4 mr-2 bg-white text-gray-800 p-4 rounded-2xl shadow-xl border border-blue-50 max-w-[200px] relative animate-in zoom-in-50 slide-in-from-bottom-5 duration-500 cursor-pointer group"
                    onClick={() => { setIsOpen(true); setShowNotification(false); }}
                >
                    <button onClick={(e) => { e.stopPropagation(); setShowNotification(false); }} className="absolute -top-2 -right-2 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={10} />
                    </button>
                    <p className="text-xs font-semibold leading-relaxed">
                        Hey there! 👋 Have any questions for our dental experts?
                    </p>
                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-blue-50 rotate-45 rounded-sm"></div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => { setIsOpen(!isOpen); setShowNotification(false); }}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform active:scale-95 ${isOpen ? 'bg-destructive text-destructive-foreground rotate-90' : 'bg-blue-600 text-white hover:scale-110 shadow-blue-500/40 hover:shadow-blue-500/60'}`}
            >
                {isOpen ? <X size={26} strokeWidth={2.5} /> : <Bot size={28} />}
            </button>

            {/* Chat Frame */}
            <div
                className={`absolute bottom-20 right-0 w-[calc(100vw-3rem)] sm:w-[500px] h-[650px] max-h-[calc(100vh-10rem)] bg-white border border-gray-100 rounded-3xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.3)] flex flex-col transition-all duration-500 origin-bottom-right ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 pointer-events-none scale-90'}`}
            >
                {/* Header */}
                <div className="p-5 border-b bg-gradient-to-br from-blue-50/50 to-transparent rounded-t-3xl flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                        <Sparkles size={22} fill="white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-gray-900 tracking-tight">RR Dental Concierge</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Specialist Online</span>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-blue-50/5">
                    {messages.map((m) => {
                        if (m.role === 'system') return null;

                        const textPart = m.parts.find(p => p.type === 'text');
                        const messageText = textPart?.type === 'text' ? textPart.text : '';
                        if (!messageText && m.role !== 'user') return null;

                        return (
                            <div key={m.id} className={`flex gap-3.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {m.role !== 'user' && (
                                    <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200/50 mt-1 shadow-sm">
                                        <Bot size={15} className="text-blue-600" />
                                    </div>
                                )}
                                <div className={`max-w-[85%] px-4.5 py-3.5 rounded-2xl text-[14px] leading-relaxed shadow-sm transition-all ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-100 rounded-bl-none text-gray-800'}`}>
                                    {messageText}
                                </div>
                            </div>
                        );
                    })}

                    {isThinking && messages[messages.length - 1]?.role !== 'assistant' && (
                        <div className="flex gap-3.5 animate-in fade-in duration-300">
                            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200/50 animate-pulse">
                                <Bot size={15} className="text-blue-600" />
                            </div>
                            <div className="px-5 py-4 rounded-2xl bg-white border border-gray-100 rounded-bl-none flex gap-1.5 items-center shadow-sm">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0s]"></div>
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    )}

                    {statusMessage && (
                        <div className="flex justify-center py-4 animate-in slide-in-from-bottom-4 fade-in duration-700">
                            <div className="bg-emerald-50 text-emerald-700 px-6 py-4 rounded-2xl border border-emerald-200/50 text-xs font-bold flex items-center gap-3 shadow-xl ring-2 ring-emerald-500/10">
                                <CheckCircle2 size={18} className="text-emerald-600" />
                                {statusMessage}
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <div className="p-5 bg-white border-t rounded-b-3xl">
                    <form onSubmit={handleFormSubmit} className="relative flex items-center gap-2.5">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your question here..."
                            disabled={isThinking}
                            className="flex-1 px-5 py-4 bg-gray-100 border-none rounded-2xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all pr-12 text-gray-900 shadow-inner placeholder:text-gray-400"
                        />
                        <button
                            type="submit"
                            disabled={isThinking || !input.trim()}
                            className="absolute right-2.5 w-10.5 h-10.5 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-30"
                        >
                            {isThinking ? <Loader2 size={18} className="animate-spin text-white/80" /> : <Send size={20} className="translate-x-[1px]" />}
                        </button>
                    </form>
                    <p className="text-[10px] text-center mt-3 text-gray-400 uppercase font-black tracking-widest opacity-40">
                        Secure AI Healthcare Assistant
                    </p>
                </div>
            </div>
        </div>
    );
}
