import { GoldLine } from "./ornament";

const exploreLinks = [
  { label: "The Vision", href: "#hero" },
  { label: "Collections", href: "#showcase" },
  { label: "Our Philosophy", href: "#philosophy" },
  { label: "Join Waitlist", href: "#waitlist" },
];

const connectLinks = [
  { label: "Instagram", handle: "@nailart.studio", href: "https://instagram.com" },
  { label: "Pinterest", handle: "@nailart", href: "https://pinterest.com" },
  { label: "Email", handle: "hello@maitrico.com", href: "mailto:hello@maitrico.com" },
];

export function Footer() {
  return (
    <footer className="relative bg-renaissance-burgundy py-16 overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-renaissance-gold/30 to-transparent" />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C9A84C 0.5px, transparent 0.5px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Upper footer */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full border border-renaissance-gold/50 flex items-center justify-center">
                <span
                  className="text-renaissance-gold tracking-wider"
                  style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 600 }}
                >
                  N
                </span>
              </div>
              <span
                className="tracking-[0.2em] text-renaissance-ivory uppercase"
                style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 500 }}
              >
                NailArt
              </span>
            </div>
            <p
              className="text-renaissance-champagne/40 max-w-xs"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
              }}
            >
              Reimagining nail artistry through the timeless principles of the
              Renaissance — where every hand becomes a masterpiece.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-1">
            <h4
              className="text-renaissance-gold tracking-[0.3em] uppercase mb-5"
              style={{ fontFamily: "var(--font-accent)", fontSize: "11px", fontWeight: 500 }}
            >
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-renaissance-champagne/50 hover:text-renaissance-gold transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-accent)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h4
              className="text-renaissance-gold tracking-[0.3em] uppercase mb-5"
              style={{ fontFamily: "var(--font-accent)", fontSize: "11px", fontWeight: 500 }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="text-renaissance-champagne/50 hover:text-renaissance-gold transition-colors duration-300 flex items-center gap-2"
                    style={{
                      fontFamily: "var(--font-accent)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span className="text-renaissance-gold/40" style={{ fontSize: "0.75rem" }}>
                      {item.label}
                    </span>
                    <span>{item.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <GoldLine className="opacity-30 mb-8" />

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-renaissance-champagne/30"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
            }}
          >
            &copy; 2026 maitrico. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span
              className="text-renaissance-champagne/20"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "0.75rem",
                fontStyle: "italic",
              }}
            >
              Crafted with devotion by
            </span>
            <span
              className="text-renaissance-gold/50 tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.7rem",
                fontWeight: 600,
              }}
            >
              maitrico
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
