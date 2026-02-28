import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { Gallery } from "@/components/Gallery";
import { VideoTour } from "@/components/VideoTour";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20 sm:pb-32">
      <Hero />
      <Services />
      <Gallery />
      <VideoTour />
      <Team />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
}
