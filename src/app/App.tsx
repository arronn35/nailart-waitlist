import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/hero-section";
import { MarqueeBanner } from "./components/marquee-banner";
import { ShowcaseSection } from "./components/showcase-section";
import { PhilosophySection } from "./components/philosophy-section";
import { WaitlistSection } from "./components/waitlist-section";
import { Footer } from "./components/footer";
import { AdminDashboard } from "./components/admin";

function LandingPage() {
  return (
    <div className="min-h-screen bg-renaissance-ivory">
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <ShowcaseSection />
      <PhilosophySection />
      <WaitlistSection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}