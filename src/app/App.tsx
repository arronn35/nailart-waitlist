import { useState } from "react";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/hero-section";
import { MarqueeBanner } from "./components/marquee-banner";
import { ShowcaseSection } from "./components/showcase-section";
import { PhilosophySection } from "./components/philosophy-section";
import { WaitlistSection } from "./components/waitlist-section";
import { Footer } from "./components/footer";
import { AdminModal } from "./components/admin";

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-renaissance-ivory">
      <Navbar onAdminTrigger={() => setAdminOpen(true)} />
      <HeroSection />
      <MarqueeBanner />
      <ShowcaseSection />
      <PhilosophySection />
      <WaitlistSection />
      <Footer />
      <AdminModal open={adminOpen} onOpenChange={setAdminOpen} />
    </div>
  );
}
