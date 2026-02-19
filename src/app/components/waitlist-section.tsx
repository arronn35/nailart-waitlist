import { useState } from "react";
import { motion } from "motion/react";
import { OrnamentalDivider, GoldLine } from "./ornament";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Check, ArrowRight } from "lucide-react";

const sideImage =
  "https://images.unsplash.com/photo-1762548470420-49f55dee86df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcm5hdGUlMjBnb2xkJTIwYmFyb3F1ZSUyMHRleHR1cmUlMjBkYXJrfGVufDF8fHx8MTc3MTQ1NDc3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          // Already registered — treat as success
          setSubmitted(true);
        } else {
          setError(data.error || "Something went wrong. Please try again.");
        }
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-renaissance-ivory via-renaissance-parchment/20 to-renaissance-ivory pointer-events-none" />

      {/* Renaissance pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--renaissance-burgundy) 0.5px, transparent 0.5px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left — Image (2 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 border border-renaissance-gold/15" />
              <div className="overflow-hidden aspect-[3/4]">
                <ImageWithFallback
                  src={sideImage}
                  alt="Ornate gold texture"
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.8) contrast(1.05)" }}
                />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-renaissance-gold/50" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-renaissance-gold/50" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-renaissance-gold/50" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-renaissance-gold/50" />
            </div>
          </motion.div>

          {/* Right — Form (3 cols) */}
          <div className="lg:col-span-3">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-renaissance-gold tracking-[0.4em] uppercase mb-4"
              style={{ fontFamily: "var(--font-accent)", fontSize: "12px", fontWeight: 500 }}
            >
              Join the Atelier
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-renaissance-burgundy mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Be Among the{" "}
              <span className="italic text-renaissance-crimson">First</span>
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
              className="text-renaissance-umber/60 max-w-lg mb-10"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
              }}
            >
              We are curating an exclusive circle of early patrons — those who
              appreciate that true beauty requires both patience and vision.
              Enter your email to secure your place.
            </motion.p>

            {/* Form */}
            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="max-w-lg"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                    <input
                      id="waitlist-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      aria-label="Email address for waitlist"
                      className="w-full px-5 py-4 bg-white/80 border border-renaissance-gold/25 text-renaissance-umber placeholder:text-renaissance-mauve/50 focus:outline-none focus:border-renaissance-gold/60 focus:ring-1 focus:ring-renaissance-gold/30 transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-accent)",
                        fontSize: "0.95rem",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center gap-2 px-7 py-4 bg-renaissance-burgundy text-renaissance-ivory hover:bg-renaissance-crimson transition-all duration-300 disabled:opacity-70 flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-accent)",
                      fontSize: "14px",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                    }}
                  >
                    <span className="uppercase">
                      {isSubmitting ? "Reserving..." : "Join"}
                    </span>
                    {!isSubmitting && (
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </button>
                </div>

                {error && (
                  <p
                    className="mt-3 text-red-600/80"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {error}
                  </p>
                )}

                <p
                  className="mt-4 text-renaissance-umber/40"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    lineHeight: 1.5,
                  }}
                >
                  By joining, you agree to be notified when NailArt launches.
                  No spam — only art.
                </p>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-lg"
                role="status"
                aria-live="polite"
              >
                <div className="border border-renaissance-gold/30 bg-renaissance-gold/5 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-renaissance-burgundy flex items-center justify-center">
                      <Check size={18} className="text-renaissance-gold" />
                    </div>
                    <div>
                      <h3
                        className="text-renaissance-burgundy"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.15rem",
                          fontWeight: 600,
                        }}
                      >
                        You're on the List
                      </h3>
                    </div>
                  </div>
                  <GoldLine className="my-4" />
                  <p
                    className="text-renaissance-umber/60"
                    style={{
                      fontFamily: "var(--font-accent)",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Welcome to the atelier, patron. You'll be among the first to
                    experience NailArt when we unveil our creation. Watch your
                    inbox for a gilded invitation.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-12 flex items-center gap-6"
            >
              <div className="flex -space-x-2">
                {[
                  "bg-renaissance-burgundy",
                  "bg-renaissance-crimson",
                  "bg-renaissance-gold",
                  "bg-renaissance-plum",
                  "bg-renaissance-rose",
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${bg} border-2 border-renaissance-ivory flex items-center justify-center`}
                  >
                    <span
                      className="text-white/70"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "10px",
                        fontWeight: 600,
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p
                  className="text-renaissance-umber/70"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    lineHeight: 1.4,
                  }}
                >
                  <span className="text-renaissance-burgundy" style={{ fontWeight: 600 }}>
                    2,847 patrons
                  </span>{" "}
                  have already joined
                </p>
                <p
                  className="text-renaissance-umber/40"
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                  }}
                >
                  Limited to 5,000 founding members
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
