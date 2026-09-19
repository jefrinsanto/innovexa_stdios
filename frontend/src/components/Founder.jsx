import { motion } from "framer-motion";

export default function Founder() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass grid grid-cols-1 items-center gap-10 rounded-3xl p-10 sm:p-14 lg:grid-cols-[auto_1fr]"
        >
          {/* Placeholder avatar — no real founder photo supplied */}
          <div className="flex justify-center lg:justify-start">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-gradient font-display text-3xl font-bold text-white shadow-glow sm:h-32 sm:w-32">
              JS
            </div>
          </div>

          <div>
            <p className="section-eyebrow">About the founder</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Jefrin
            </h3>
            <p className="mt-1 text-sm font-medium text-white/45">
              Founder &amp; CEO
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
              Building INNOVEXA STUDIOS around thoughtful product design,
              practical engineering and long-term client relationships.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
