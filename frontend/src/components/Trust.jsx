import { motion } from "framer-motion";
import { Users, Target, Code2, TrendingUp } from "lucide-react";

const PRINCIPLES = [
  {
    icon: Users,
    title: "Direct collaboration",
    description: "Work directly with the people building the product.",
  },
  {
    icon: Target,
    title: "Built around your business",
    description: "Solutions are designed around the actual workflow and requirements.",
  },
  {
    icon: Code2,
    title: "Engineering first",
    description: "Clean architecture, maintainable code and scalable foundations.",
  },
  {
    icon: TrendingUp,
    title: "Designed for growth",
    description: "Build today without creating unnecessary limitations for tomorrow.",
  },
];

export default function Trust() {
  return (
    <section id="process" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="section-eyebrow">Why INNOVEXA STUDIOS</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            How we work with clients
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
                className="bg-white/[0.02] px-8 py-10 transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <Icon className="h-6 w-6 text-electric" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-lg font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-white/55">
                  {p.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
