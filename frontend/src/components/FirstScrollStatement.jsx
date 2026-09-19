import { motion } from "framer-motion";
import { Code2, Layers, Workflow } from "lucide-react";

const CAPABILITIES = [
  {
    icon: Code2,
    label: "BUILD",
    description: "Websites and web applications.",
  },
  {
    icon: Layers,
    label: "SCALE",
    description: "Backend systems, APIs and cloud infrastructure.",
  },
  {
    icon: Workflow,
    label: "AUTOMATE",
    description: "AI, workflows and business automation.",
  },
];

export default function FirstScrollStatement() {
  return (
    <section id="solutions" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
        >
          From first idea to production-ready software.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/55"
        >
          We combine product thinking, engineering and design to turn complex
          ideas into software people can actually use.
        </motion.p>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] sm:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative bg-white/[0.02] px-8 py-12 transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <Icon className="h-7 w-7 text-electric" strokeWidth={1.5} />
                <h3 className="mt-8 font-display text-2xl font-bold tracking-wide text-white">
                  {cap.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {cap.description}
                </p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-gradient transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
