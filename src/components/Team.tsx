"use client";

import React from "react";
import config from "../../clinic-config.json";
import { User, Award } from "lucide-react";

export function Team() {
    const { team } = config;

    return (
        <section id="team" className="container mx-auto px-4 py-20 relative">
            <div className="text-center mb-16 animate-fade-up">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 uppercase tracking-wider">
                    Meet Our Experts
                </span>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground text-balance">
                    Dedicated to Your Care
                </h2>
                <p className="mt-6 text-xl text-muted-foreground mx-auto max-w-2xl text-balance">
                    Our specialists bring decades of experience to provide you with the most advanced and comfortable treatment.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                {team.map((member, index) => (
                    <div
                        key={index}
                        className="group relative rounded-3xl border bg-card text-card-foreground p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 overflow-hidden flex flex-col items-center text-center md:items-start md:text-left gap-6 focus-within:ring-2 focus-within:ring-primary focus-within:outline-none"
                        style={{
                            animation: `fade-up 600ms ease-out ${index * 100}ms both`
                        }}
                        tabIndex={0}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10 w-full">
                            <div className="w-24 h-24 rounded-full bg-accent/50 flex items-center justify-center shrink-0 border-4 border-background shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                {/* Using Lucide User icon as placeholder until an image is provided. aria-hidden ensures it's ignored by screen readers */}
                                <User size={40} className="text-muted-foreground/50" aria-hidden="true" />
                            </div>

                            <div className="flex-1 space-y-3">
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                                    <p className="text-primary font-medium mt-1">{member.role}</p>
                                </div>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {member.bio}
                                </p>
                            </div>
                        </div>

                        <div className="relative z-10 w-full mt-4 pt-6 border-t border-border/50">
                            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center justify-center md:justify-start gap-2">
                                <Award size={16} className="text-primary" aria-hidden="true" />
                                Core Specialties
                            </h4>
                            <ul className="flex flex-wrap gap-2 justify-center md:justify-start" aria-label={`Specialties of ${member.name}`}>
                                {member.specialties.map((specialty, i) => (
                                    <li
                                        key={i}
                                        className="px-3 py-1.5 bg-background border rounded-full text-xs font-medium text-muted-foreground"
                                    >
                                        {specialty}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
