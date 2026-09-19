import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-gradient-soft px-8 py-20 text-center sm:px-16"
        >
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-brand-gradient opacity-20 blur-[110px]" />
          <h2 className="relative font-display text-3xl font-bold text-white sm:text-5xl">
            Have something worth building?
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/60">
            Tell us what you're working on. We'll help turn the idea into a
            clear path forward.
          </p>
          <a href="#connect" className="btn-primary relative mt-9 inline-flex">
            Let's Connect
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
