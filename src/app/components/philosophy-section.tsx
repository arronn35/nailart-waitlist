import { motion } from "motion/react";
import { OrnamentalDivider } from "./ornament";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Palette, Sparkles, Crown, Eye } from "lucide-react";

const philosophyImage =
  "https://images.unsplash.com/photo-1717066777721-f150e83d6c51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5haXNzYW5jZSUyMHBhaW50aW5nJTIwaGFuZCUyMGRldGFpbCUyMGNsYXNzaWNhbHxlbnwxfHx8fDE3NzE0NTQ3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const tenets = [
  {
    icon: Palette,
    title: "Classical Palette",
    description:
      "Every design draws from the rich, earthy pigments of Renaissance masters — umber, sienna, vermillion, and gold.",
  },
  {
    icon: Eye,
    title: "Divine Proportion",
    description:
      "Our AI understands the golden ratio, applying mathematical beauty to every curve and line.",
  },
  {
    icon: Crown,
    title: "Regal Craft",
    description:
      "Each nail becomes a canvas worthy of the Medici court — ornate, deliberate, and unforgettable.",
  },
  {
    icon: Sparkles,
    title: "Future Alchemy",
    description:
      "Blending AR visualization with centuries-old technique, transforming the way you discover your next design.",
  },
];

export function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-24 md:py-32 bg-renaissance-burgundy overflow-hidden">
      {/* Ornamental background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C9A84C 0.5px, transparent 0.5px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Gold edge accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-renaissance-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-renaissance-gold/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute -inset-4 border border-renaissance-gold/15" />
              <div className="overflow-hidden aspect-[4/5]">
                <ImageWithFallback
                  src={philosophyImage}
                  alt="Classical hand detail"
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.7) contrast(1.1) brightness(0.95)" }}
                />
              </div>
              {/* Overlay text */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-renaissance-burgundy/80 backdrop-blur-sm border border-renaissance-gold/20 p-5">
                  <p
                    className="text-renaissance-champagne/80 italic"
                    style={{
                      fontFamily: "var(--font-accent)",
                      fontSize: "1rem",
                      lineHeight: 1.7,
                    }}
                  >
                    "The noblest pleasure is the joy of understanding."
                  </p>
                  <span
                    className="text-renaissance-gold/60 mt-2 block tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-accent)", fontSize: "11px" }}
                  >
                    — LEONARDO DA VINCI
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Philosophy */}
          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-renaissance-gold tracking-[0.4em] uppercase mb-4"
              style={{ fontFamily: "var(--font-accent)", fontSize: "12px", fontWeight: 500 }}
            >
              Our Philosophy
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-renaissance-ivory mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Beauty Through the Ages,{" "}
              <span className="italic text-renaissance-gold">Redefined</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="my-6"
            >
              <OrnamentalDivider />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-renaissance-champagne/60 mb-10"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
              }}
            >
              NailArt is not merely an application — it is a manifesto. We believe
              every hand tells a story, and every nail is a canvas awaiting its
              masterpiece.
            </motion.p>

            {/* Tenets */}
            <div className="grid sm:grid-cols-2 gap-6">
              {tenets.map((tenet, index) => (
                <motion.div
                  key={tenet.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.35 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex items-center justify-center border border-renaissance-gold/30 flex-shrink-0 mt-0.5 group-hover:bg-renaissance-gold/10 transition-colors duration-300">
                      <tenet.icon
                        size={16}
                        className="text-renaissance-gold"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h4
                        className="text-renaissance-ivory mb-1"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "0.95rem",
                          fontWeight: 600,
                        }}
                      >
                        {tenet.title}
                      </h4>
                      <p
                        className="text-renaissance-champagne/50"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.82rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {tenet.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
