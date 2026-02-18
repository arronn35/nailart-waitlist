import { motion } from "motion/react";
import { OrnamentalDivider } from "./ornament";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const heroImage =
  "https://images.unsplash.com/photo-1672815554809-37e355eddd24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5pY3VyZSUyMG5haWxzJTIwYmVhdXR5JTIwY2xvc2V1cHxlbnwxfHx8fDE3NzE0NTQ3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const accentImage =
  "https://images.unsplash.com/photo-1770210257340-dc2b0f44642a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZ29sZCUyMG5haWwlMjBkZXNpZ24lMjBoYW5kfGVufDF8fHx8MTc3MTQ1NDc2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background pattern — subtle Renaissance grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--renaissance-gold) 0.5px, transparent 0.5px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gold gradient wash */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-renaissance-champagne/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-renaissance-ivory to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Typography */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span
                className="inline-block text-renaissance-gold tracking-[0.35em] uppercase mb-6"
                style={{ fontFamily: "var(--font-accent)", fontSize: "13px", fontWeight: 500 }}
              >
                A New Renaissance in Beauty
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-renaissance-burgundy mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Where{" "}
              <span className="italic text-renaissance-crimson">Artistry</span>
              <br />
              Meets the
              <br />
              <span
                className="relative inline-block"
              >
                Fingertip
                <svg
                  className="absolute -bottom-2 left-0 w-full text-renaissance-gold/50"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6C40 2 80 4 120 3C160 2 180 5 200 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="my-6"
            >
              <OrnamentalDivider />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-renaissance-umber/70 max-w-md mb-10"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "1.15rem",
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              NailArt reimagines nail design through the lens of the old masters —
              classical composition, divine proportion, and an unwavering
              commitment to beauty. Coming soon.
            </motion.p>

            <motion.a
              href="#waitlist"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-renaissance-burgundy text-renaissance-ivory hover:bg-renaissance-crimson transition-colors duration-300 overflow-hidden"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "15px",
                fontWeight: 500,
                letterSpacing: "0.15em",
              }}
            >
              <span className="relative z-10 uppercase">Reserve Your Place</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-renaissance-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </div>

          {/* Right — Image Composition */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              {/* Main image with Renaissance frame */}
              <div className="relative">
                <div className="absolute -inset-3 border border-renaissance-gold/20" />
                <div className="absolute -inset-6 border border-renaissance-gold/10" />
                <div className="w-72 md:w-80 lg:w-96 aspect-[3/4] overflow-hidden">
                  <ImageWithFallback
                    src={heroImage}
                    alt="Luxury nail art design"
                    className="w-full h-full object-cover"
                    style={{ filter: "saturate(0.85) contrast(1.05)" }}
                  />
                </div>
                {/* Gold corner accents */}
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-renaissance-gold/60" />
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-renaissance-gold/60" />
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-renaissance-gold/60" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-renaissance-gold/60" />
              </div>

              {/* Floating accent image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-8 left-0 md:-left-16 w-28 md:w-44 aspect-square overflow-hidden shadow-2xl border border-renaissance-gold/20"
              >
                <ImageWithFallback
                  src={accentImage}
                  alt="Elegant gold nail design"
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.8) contrast(1.1)" }}
                />
              </motion.div>

              {/* Floating label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute -top-4 -right-4 md:-right-8 bg-renaissance-ivory/95 backdrop-blur-sm border border-renaissance-gold/30 px-4 py-3 shadow-lg"
              >
                <span
                  className="text-renaissance-gold block tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-accent)", fontSize: "10px" }}
                >
                  Est. 2026
                </span>
                <span
                  className="text-renaissance-burgundy block"
                  style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 600 }}
                >
                  by maitrico
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
