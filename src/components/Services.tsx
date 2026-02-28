"use client";

import React from "react";
import config from "../../clinic-config.json";
import { CheckCircle2 } from "lucide-react";

export function Services() {
    const { services } = config;

    const coreServices = services.filter((s) => s.isCore);
    const additionalServices = services.filter((s) => !s.isCore);

    return (
        <section id="services" className="container mx-auto px-4 py-20 relative overflow-hidden">
            <div className="text-center mb-16 animate-fade-up">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 uppercase tracking-wider">
                    Comprehensive Care
                </span>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground text-balance">
                    Our Key Services
                </h2>
                <p className="mt-6 text-xl text-muted-foreground mx-auto max-w-2xl text-balance">
                    State-of-the-art technology and patient-oriented treatments tailored to your exact needs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {coreServices.map((service, index) => (
                    <div
                        key={service.id}
                        className="group relative rounded-2xl border bg-card/50 backdrop-blur-md text-card-foreground p-8 flex flex-col gap-6 shadow-sm hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-primary/50 overflow-hidden"
                        style={{
                            animation: `fade-up 600ms ease-out ${index * 100}ms both`
                        }}
                    >
                        {/* Glow Effect Background on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative z-10 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle2 size={28} strokeWidth={2.5} />
                        </div>

                        <div className="relative z-10">
                            <h3 className="font-bold text-xl mb-3 text-foreground">{service.name}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>
                        </div>

                        {/* Animated Bottom Border Beam */}
                        <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out"></div>
                    </div>
                ))}
            </div>

            {additionalServices.length > 0 && (
                <div className="mt-24 max-w-5xl mx-auto animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-bold text-foreground">Specialised Treatments</h3>
                        <p className="text-muted-foreground mt-3">Advanced care for complex dental needs.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {additionalServices.map((service, index) => (
                            <div
                                key={service.id}
                                className="group p-5 rounded-xl border bg-accent/20 flex flex-col items-start gap-3 hover:bg-accent/40 transition-colors duration-200"
                            >
                                <div className="text-primary bg-background p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div className="mt-2">
                                    <h4 className="font-semibold text-foreground text-lg mb-1">{service.name}</h4>
                                    <p className="text-sm text-muted-foreground leading-snug">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Pricing / Insurance Table */}
            <div className="mt-24 max-w-4xl mx-auto rounded-3xl border bg-card text-card-foreground p-8 md:p-12 shadow-sm relative overflow-hidden group">
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-bold text-foreground">Transparent Care</h3>
                        <p className="text-muted-foreground mt-3 text-balance">We believe in clear communication about treatment options, timelines, and costs before any procedure begins.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Insurance Column */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-lg flex items-center gap-2 border-b pb-2">
                                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">1</span>
                                Insurance & Coverage
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                We help you understand your insurance benefits. While we may not be directly empaneled with all providers, our team will assist you with the necessary documentation to claim your reimbursements smoothly.
                            </p>
                            <ul className="text-sm space-y-2 mt-4">
                                <li className="flex items-center gap-2 text-foreground"><CheckCircle2 size={16} className="text-primary" /> Detailed out-of-pocket estimates</li>
                                <li className="flex items-center gap-2 text-foreground"><CheckCircle2 size={16} className="text-primary" /> Assistance with claim forms</li>
                                <li className="flex items-center gap-2 text-foreground"><CheckCircle2 size={16} className="text-primary" /> Itemised digital receipts provided</li>
                            </ul>
                        </div>

                        {/* Payment Column */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-lg flex items-center gap-2 border-b pb-2">
                                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">2</span>
                                Payment Options
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                We accept all major payment methods to make your visit as convenient as possible. Flexible EMI options may also be available for extensive treatments like implants and full-mouth rehabilitation.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <span className="px-3 py-1 bg-accent/50 rounded-full text-xs font-medium border">UPI & Wallets</span>
                                <span className="px-3 py-1 bg-accent/50 rounded-full text-xs font-medium border">Credit/Debit Cards</span>
                                <span className="px-3 py-1 bg-accent/50 rounded-full text-xs font-medium border">Cash</span>
                                <span className="px-3 py-1 bg-accent/50 rounded-full text-xs font-medium border">EMI Options</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
