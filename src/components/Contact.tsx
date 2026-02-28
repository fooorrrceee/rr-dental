"use client";

import React, { useState } from "react";
import config from "../../clinic-config.json";
import { Copy, MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export function Contact() {
    const { business, form } = config;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [copiedPhone, setCopiedPhone] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network request for Formspree endpoint
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const copyPhone = () => {
        navigator.clipboard.writeText(business.contact.phone);
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
    };

    return (
        <section id="contact" className="container mx-auto px-4 py-20 relative">
            <div className="text-center mb-16 animate-fade-up">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 uppercase tracking-wider">
                    Get in Touch
                </span>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground text-balance">
                    We're Here to Help
                </h2>
                <p className="mt-6 text-xl text-muted-foreground mx-auto max-w-2xl text-balance">
                    Whether you have a dental emergency, need to book a routine check-up, or have questions about our treatments.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
                {/* Contact Information & Map */}
                <div className="space-y-8 animate-fade-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                <Phone size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Call Us</h3>
                            <button
                                onClick={copyPhone}
                                className="text-2xl font-semibold hover:text-primary transition-colors flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                                aria-label={`Copy phone number ${business.contact.phone}`}
                            >
                                {business.contact.phone}
                                {copiedPhone ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />}
                            </button>
                            <p className="text-muted-foreground text-sm mt-2">Available for same-day emergencies.</p>
                        </div>

                        <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                <Clock size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Opening Hours</h3>
                            <div className="space-y-1 text-muted-foreground">
                                <p>10:00 AM - 1:00 PM</p>
                                <p>4:30 PM - 9:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Visit Our Clinic</h3>
                                <p className="text-muted-foreground">Kathir Avenue, 562, Lokmanya Street (West), {business.location.area}, {business.location.city}, {business.location.country}</p>
                            </div>
                        </div>
                        {/* Static Map Placeholder instead of iframe for performance/simplicity in this demo */}
                        <div className="w-full h-64 bg-accent/30 rounded-xl overflow-hidden relative group">
                            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10 transition-opacity duration-300">
                                <a
                                    href={business.location.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:scale-105 transition-transform shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex items-center gap-2"
                                >
                                    Open in Google Maps <ArrowRight size={18} />
                                </a>
                            </div>
                            {/* Faux map background */}
                            <div className="w-full h-full bg-[url('https://maps.gstatic.com/mapfiles/maps_lite/pwa/v1/app_icon.png')] bg-cover bg-center opacity-10"></div>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <div
                    className="p-8 md:p-10 rounded-3xl border bg-card shadow-xl relative overflow-hidden"
                    style={{ animation: 'fade-up 600ms ease-out 200ms both' }}
                >
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] animate-fade-in">
                            <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-foreground">See you soon!</h3>
                            <p className="text-lg text-muted-foreground mb-8 text-balance">
                                {form.successMessage}
                            </p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-full hover:bg-secondary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                Book another appointment
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col h-full justify-between" aria-label="Book an Appointment Form">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Request an Appointment</h3>
                                <p className="text-muted-foreground mb-8">Fill out the form below and we will contact you to confirm a time.</p>

                                {/* Adhering to anti-pattern rules: Labels outside inputs */}
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name <span className="text-destructive">*</span></label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number <span className="text-destructive">*</span></label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                                placeholder="Your phone"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                                placeholder="Your email (optional)"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="reason" className="text-sm font-medium text-foreground">Reason for Visit</label>
                                        <select
                                            id="reason"
                                            name="reason"
                                            className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="">Select a reason...</option>
                                            <option value="checkup">General Check-up & Cleaning</option>
                                            <option value="pain">Tooth Pain / Emergency</option>
                                            <option value="braces">Orthodontics (Braces/Aligners)</option>
                                            <option value="kids">Child Dentistry</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                aria-live="polite"
                                className={`w-full py-4 mt-8 rounded-xl font-bold text-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isSubmitting
                                        ? 'bg-primary/70 text-primary-foreground cursor-wait'
                                        : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-1 shadow-md hover:shadow-lg'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Sending Request...
                                    </>
                                ) : (
                                    'Book Appointment'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
