import { motion } from "motion/react";
import { GoldLine, FrameCorners } from "./ornament";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const showcaseItems = [
  {
    image:
      "https://images.unsplash.com/photo-1727468939344-44929b044076?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMG5haWwlMjBwb2xpc2glMjBtYW5pY3VyZSUyMGRhcmt8ZW58MXx8fHwxNzcxNDU0NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Chiaroscuro",
    subtitle: "Light & Shadow Collection",
    description: "Inspired by Caravaggio's mastery of dramatic contrast",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMG1vZGVybiUyMG5haWwlMjBhcnQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzE0NTQ3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Sfumato",
    subtitle: "The Soft Edge Series",
    description: "Da Vinci's blending technique, reimagined for the modern hand",
  },
  {
    image:
      "https://images.unsplash.com/photo-1720086196723-a1e0656a90a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtb3JvdXMlMjBuYWlsJTIwc2Fsb24lMjBsdXh1cnklMjBtaW5pbWFsfGVufDF8fHx8MTc3MTQ1NDc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Doratura",
    subtitle: "The Gilded Touch",
    description: "Gold leaf artistry meets contemporary nail architecture",
  },
];

export function ShowcaseSection() {
  return (
    <section id="showcase" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-renaissance-ivory via-renaissance-parchment/30 to-renaissance-ivory pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-renaissance-gold tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-accent)", fontSize: "12px", fontWeight: 500 }}
          >
            The Collections
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-renaissance-burgundy mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Design Born of <span className="italic">Old Masters</span>
          </motion.h2>
          <GoldLine className="mt-6" />
        </div>

        {/* Showcase Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 * index }}
              className="group"
            >
              <FrameCorners className="mb-6">
                <div className="overflow-hidden aspect-[4/5]">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "saturate(0.85) contrast(1.05)" }}
                  />
                </div>
              </FrameCorners>

              <div className="px-1">
                <span
                  className="text-renaissance-gold tracking-[0.3em] uppercase block mb-1"
                  style={{ fontFamily: "var(--font-accent)", fontSize: "11px", fontWeight: 500 }}
                >
                  {item.subtitle}
                </span>
                <h3
                  className="text-renaissance-burgundy mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-renaissance-umber/60"
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
