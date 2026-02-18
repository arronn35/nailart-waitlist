import { useEffect, useRef } from "react";

const words = [
  "Chiaroscuro",
  "✦",
  "Sfumato",
  "✦",
  "Doratura",
  "✦",
  "Rilievo",
  "✦",
  "Cangiante",
  "✦",
  "Trompe-l'œil",
  "✦",
  "Grisaille",
  "✦",
  "Impasto",
  "✦",
];

function MarqueeTrack() {
  return (
    <div className="flex items-center gap-8 flex-shrink-0">
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`flex-shrink-0 ${
            word === "✦"
              ? "text-renaissance-gold/40"
              : "text-renaissance-burgundy/25"
          }`}
          style={{
            fontFamily: word === "✦" ? "inherit" : "var(--font-display)",
            fontSize: word === "✦" ? "0.7rem" : "1.4rem",
            fontWeight: word === "✦" ? 400 : 500,
            fontStyle: word === "✦" ? "normal" : "italic",
            letterSpacing: "0.05em",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export function MarqueeBanner() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure one set of words to get exact pixel width for seamless loop
    const firstChild = track.children[0] as HTMLElement;
    if (!firstChild) return;
    const gap = 32; // gap-8 = 2rem = 32px
    const singleWidth = firstChild.offsetWidth + gap;

    track.style.setProperty("--marquee-distance", `-${singleWidth}px`);
  }, []);

  return (
    <div className="relative py-6 bg-renaissance-parchment/60 border-y border-renaissance-gold/15 overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-center gap-8 whitespace-nowrap animate-marquee"
        style={{
          animation: "marquee-scroll 30s linear infinite",
        }}
      >
        {/* Duplicate the track for seamless looping */}
        <MarqueeTrack />
        <MarqueeTrack />
        <MarqueeTrack />
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(var(--marquee-distance, -50%)); }
        }
      `}</style>
    </div>
  );
}
