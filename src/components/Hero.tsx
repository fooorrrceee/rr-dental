import React from "react";
import config from "../../clinic-config.json";

export function Hero() {
    const { hero } = config;

    return (
        <section className="relative overflow-hidden bg-background pt-16 md:pt-24 lg:pt-32 pb-16">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 space-y-8 text-center lg:text-left">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                        {hero.eyebrow}
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                        {hero.title}
                    </h1>

                    <p className="max-w-[42rem] mx-auto lg:mx-0 leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        {hero.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <a
                            href="#contact"
                            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            {hero.ctaLabel}
                        </a>
                        <a
                            href="#services"
                            className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            View Services
                        </a>
                    </div>
                </div>

                <div className="flex-1 w-full relative">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted relative">
                        {/* Minimalistic placeholder or use external image if provided in future */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-multiply" />
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            [Hero Image Placeholder for {config.business.name}]
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
