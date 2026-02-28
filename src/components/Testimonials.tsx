"use client";

import React, { useEffect, useRef } from "react";
import config from "../../clinic-config.json";
import { Star, ShieldCheck, HeartHandshake, Quote } from "lucide-react";

export function Testimonials() {
    const { testimonials } = config;
    const widgetsLoaded = useRef(false);

    const getIcon = (index: number) => {
        switch (index % 3) {
            case 0: return <Star size={32} aria-hidden="true" />;
            case 1: return <ShieldCheck size={32} aria-hidden="true" />;
            case 2: return <HeartHandshake size={32} aria-hidden="true" />;
            default: return <Star size={32} aria-hidden="true" />;
        }
    };

    useEffect(() => {
        if (widgetsLoaded.current) return;
        widgetsLoaded.current = true;

        const widgets = config.widgets;
        
        const loadWidget = (provider: string, elementId: string) => {
            const widgetId = (widgets as any)[provider];
            if (!widgetId || widgetId.startsWith('YOUR_')) return;

            const container = document.getElementById(elementId);
            if (!container) return;

            const script = document.createElement('script');
            script.src = 'https://static.elfsight.com/platform/platform.js';
            script.async = true;
            script.onload = () => {
                if ((window as any).Elfsight) {
                    (window as any).Elfsight.app.init({
                        el: container,
                        platformId: widgetId,
                    });
                }
            };
            document.body.appendChild(script);
        };

        loadWidget('googleReviews', 'google-reviews-widget');
        loadWidget('practo', 'practo-widget');
        loadWidget('lybrate', 'lybrate-widget');
    }, []);

    return (
        <section id="testimonials" className="container mx-auto px-4 py-20 relative">
            <div className="text-center mb-16 animate-fade-up">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 uppercase tracking-wider">
                    Social Proof
                </span>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground text-balance">
                    {testimonials.heading}
                </h2>
                <p className="mt-6 text-xl text-muted-foreground mx-auto max-w-2xl text-balance">
                    Don't just take our word for it. Here is why our community chooses us for their dental health.
                </p>
            </div>

            {/* Highlights Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-20">
                {testimonials.highlights.map((highlight, index) => (
                    <div
                        key={index}
                        className="group relative rounded-3xl border bg-card text-card-foreground p-8 shadow-sm hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:outline-none"
                        style={{
                            animation: `fade-up 600ms ease-out ${index * 100}ms both`
                        }}
                        tabIndex={0}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                            {getIcon(index)}
                        </div>
                        <h3 className="text-3xl font-bold text-foreground mb-3">{highlight.metric}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {highlight.description}
                        </p>

                        {/* Animated Border Reveal on Hover */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                ))}
            </div>

            {/* Review Widget Placeholders */}
            <div className="max-w-6xl mx-auto relative rounded-[3rem] bg-accent/20 border border-border/50 p-8 md:p-16 overflow-hidden animate-fade-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                <div className="absolute top-0 right-0 -m-8 text-primary/5">
                    <Quote size={200} aria-hidden="true" />
                </div>

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground">Real Patient Experiences</h3>
                        <p className="text-muted-foreground mt-3 text-balance">Live reviews imported directly from our trusted partners.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div id="google-reviews-widget" className="h-64 rounded-2xl border bg-background flex flex-col items-center justify-center p-6 text-center shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                            <Quote size={24} className="text-primary/40 mb-4" />
                            <p className="text-foreground font-semibold uppercase tracking-wider mb-2">Google Reviews</p>
                            <p className="text-muted-foreground text-sm font-medium widget-status">Loading...</p>
                        </div>
                        <div id="practo-widget" className="h-64 rounded-2xl border bg-background flex flex-col items-center justify-center p-6 text-center shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                            <Quote size={24} className="text-primary/40 mb-4" />
                            <p className="text-foreground font-semibold uppercase tracking-wider mb-2">Practo</p>
                            <p className="text-muted-foreground text-sm font-medium widget-status">Loading...</p>
                        </div>
                        <div id="lybrate-widget" className="h-64 rounded-2xl border bg-background flex flex-col items-center justify-center p-6 text-center shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                            <Quote size={24} className="text-primary/40 mb-4" />
                            <p className="text-foreground font-semibold uppercase tracking-wider mb-2">Lybrate</p>
                            <p className="text-muted-foreground text-sm font-medium widget-status">Loading...</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
