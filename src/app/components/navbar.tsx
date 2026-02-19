import { useState, useEffect, useRef } from "react";

interface NavbarProps {
  onAdminTrigger?: () => void;
}

export function Navbar({ onAdminTrigger }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const clickTimestamps = useRef<number[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    const now = Date.now();
    clickTimestamps.current = clickTimestamps.current.filter(
      (t) => now - t < 800
    );
    clickTimestamps.current.push(now);

    if (clickTimestamps.current.length >= 3) {
      clickTimestamps.current = [];
      onAdminTrigger?.();
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-renaissance-ivory/90 backdrop-blur-md shadow-[0_1px_0_rgba(201,168,76,0.2)]"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLogoClick}
            className="w-8 h-8 rounded-full border border-renaissance-gold/50 flex items-center justify-center bg-renaissance-burgundy cursor-default"
            aria-label="NailArt"
          >
            <span
              className="text-renaissance-gold tracking-wider select-none"
              style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 600 }}
            >
              N
            </span>
          </button>
          <span
            className="tracking-[0.2em] text-renaissance-burgundy uppercase"
            style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 500 }}
          >
            NailArt
          </span>
        </div>

        {/* CTA */}
        <a
          href="#waitlist"
          className="px-5 py-2 border border-renaissance-gold/40 text-renaissance-burgundy hover:bg-renaissance-gold hover:text-renaissance-ivory transition-all duration-300 tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--font-accent)", fontSize: "13px", fontWeight: 500 }}
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}
