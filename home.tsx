import { LoadingScreen } from "@/components/loading-screen";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { AchievementsSection } from "@/components/sections/achievements";
import { CoverageMapSection } from "@/components/sections/coverage-map";
import { TrackingSection } from "@/components/sections/tracking";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export default function Home() {
  return (
    <div className="min-h-screen scroll-smooth">
      <LoadingScreen />
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <AchievementsSection />
        <CoverageMapSection />
        <TrackingSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
