"use client";

import React, { useState } from "react";
import { MoveHorizontal } from "lucide-react";

export function Gallery() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;

        const container = event.currentTarget as HTMLDivElement;
        const rect = container.getBoundingClientRect();
        let clientX = 0;

        if ('touches' in event) {
            clientX = event.touches[0].clientX;
        } else {
            clientX = (event as React.MouseEvent).clientX;
        }

        const position = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        setSliderPosition(position);
    };

    return (
        <section id="gallery" className="container mx-auto px-4 py-20 relative">
            <div className="text-center mb-16 animate-fade-up">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 uppercase tracking-wider">
                    Transformations
                </span>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground text-balance">
                    Real Results
                </h2>
                <p className="mt-6 text-xl text-muted-foreground mx-auto max-w-2xl text-balance">
                    See the difference. Slide to compare before and after our specialised dental treatments.
                </p>
            </div>

            <div className="max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                <div
                    className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-3xl overflow-hidden cursor-ew-resize select-none touch-pan-y shadow-xl border bg-accent"
                    onMouseMove={handleMove}
                    onTouchMove={handleMove}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                >
                    {/* After Image Background (Full Width) */}
                    <div className="absolute inset-0 bg-secondary flex items-center justify-center">
                        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold text-foreground z-10 shadow-sm border border-border/50">
                            After
                        </div>
                        {/* Placeholder for After Image */}
                        <div className="w-full h-full bg-gradient-to-tr from-primary/20 to-secondary/20 flex flex-col items-center justify-center text-primary/40">
                            <span className="text-2xl font-bold uppercase tracking-widest opacity-50">Beautiful Smile</span>
                            <span className="text-sm mt-2 opacity-50">(WebP Image Placeholder)</span>
                        </div>
                    </div>

                    {/* Before Image Foreground (Clipped) */}
                    <div
                        className="absolute inset-0 bg-background flex items-center justify-center overflow-hidden border-r-2 border-primary shadow-[2px_0_10px_rgba(0,0,0,0.2)]"
                        style={{ width: `${sliderPosition}%` }}
                    >
                        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold text-foreground z-10 shadow-sm border border-border/50 whitespace-nowrap">
                            Before
                        </div>
                        {/* Placeholder for Before Image */}
                        <div className="absolute inset-0 w-[100vw] sm:w-[56rem] h-full flex flex-col items-center justify-center text-muted-foreground/40 bg-accent/50">
                            <span className="text-2xl font-bold uppercase tracking-widest opacity-50">Uneven Teeth</span>
                            <span className="text-sm mt-2 opacity-50">(WebP Image Placeholder)</span>
                        </div>
                    </div>

                    {/* Slider Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-transparent z-20"
                        style={{ left: `calc(${sliderPosition}% - 2px)` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg border-2 border-background cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                            <MoveHorizontal size={20} />
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Orthodontic correction and composite bonding. Case completed in 14 months.
                </p>
            </div>
        </section>
    );
}
