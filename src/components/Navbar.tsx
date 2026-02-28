import React from "react";
import config from "../../clinic-config.json";
import { PhoneCall, Mail, MapPin } from "lucide-react";

export function Navbar() {
  const { business } = config;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-tight text-primary">
            {business.name}
          </span>
          <span className="text-xs text-muted-foreground hidden sm:inline-block">
            {business.tagline}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</a>
          <a href="#team" className="text-sm font-medium hover:text-primary transition-colors">Team</a>
          <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${business.contact.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            <PhoneCall className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline-block">Book Now</span>
          </a>
        </div>
      </div>
    </header>
  );
}
