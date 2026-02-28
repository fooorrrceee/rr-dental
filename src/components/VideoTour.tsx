"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";

export function VideoTour() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section id="tour" className="container mx-auto px-4 py-20 relative">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12 animate-fade-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 uppercase tracking-wider">
                        Virtual Tour
                    </span>
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground text-balance">
                        Step Inside Our Clinic
                    </h2>
                    <p className="mt-6 text-xl text-muted-foreground mx-auto max-w-2xl text-balance">
                        Experience our state-of-the-art facilities and relaxing environment before your first visit.
                    </p>
                </div>

                <div
                    className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-card border group animate-fade-up"
                    style={{ animationDelay: '200ms', animationFillMode: 'both' }}
                >
                    {!isPlaying ? (
                        <>
                            {/* Thumbnail Overlay */}
                            <div className="absolute inset-0 bg-accent/40 flex items-center justify-center">
                                {/* Faux Image Background */}
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale-[20%] group-hover:scale-105 group-hover:opacity-50 transition-all duration-700"></div>

                                {/* Gradient dimming for contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>

                                {/* Play Button */}
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="relative z-10 w-24 h-24 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center backdrop-blur-md shadow-xl hover:scale-110 hover:bg-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 group/btn"
                                    aria-label="Play virtual tour video"
                                >
                                    <Play size={40} className="ml-2 group-hover/btn:drop-shadow-md" fill="currentColor" />

                                    {/* Sonar Ripple Effect */}
                                    <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20 [animation-duration:2s]"></span>
                                </button>

                                {/* Duration badge */}
                                <div className="absolute bottom-6 right-6 px-3 py-1.5 bg-background/80 backdrop-blur-md rounded-md text-sm font-medium shadow-sm z-10">
                                    02:45
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white/50 p-8 text-center animate-fade-in">
                            <Play size={48} className="mb-4 opacity-50" />
                            <p className="text-xl font-medium tracking-wider uppercase mb-2">Video Placeholder</p>
                            <p className="max-w-md">In production, this would be an embedded YouTube, Vimeo, or HTML5 video player configured via the clinic config.</p>
                            <button
                                onClick={() => setIsPlaying(false)}
                                className="mt-8 px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                            >
                                Close Video
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
