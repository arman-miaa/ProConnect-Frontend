import { AboutHero } from "@/components/modules/about/AboutHero";
import { ContactSection } from "@/components/modules/about/ContactSection";
import { OurStory } from "@/components/modules/about/OurStory";
export const dynamic = "force-dynamic";
import { TeamSection } from "@/components/modules/about/TeamSection";
import { ValuesSection } from "@/components/modules/about/ValuesSection";


export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
     
      <AboutHero />
      <OurStory />
      <ValuesSection />
      <TeamSection />
    
      <ContactSection />
    
    </main>
  );
}
