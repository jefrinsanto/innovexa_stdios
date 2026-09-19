import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Rocket, Headset, Users } from "lucide-react";

const STATS = [
  { icon: Activity, value: 99.9, suffix: "%", label: "Uptime Guaranteed" },
  { icon: Rocket, value: 50, suffix: "+", label: "Projects Delivered" },
  { icon: Headset, value: 24, suffix: "/7", label: "Dedicated Support" },
  { icon: Users, value: 30, suffix: "+", label: "Happy Clients" },
];

function Counter({ value, suffix, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Metrics() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="glass relative overflow-hidden rounded-3xl px-8 py-16 sm:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-brand-gradient opacity-10 blur-[100px]"
          />
          <div className="relative mx-auto mb-14 max-w-2xl text-center">
            <p className="section-eyebrow">Why choose us</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Reliability that shows up in the numbers
            </h2>
          </div>

          <div className="relative grid grid-cols-2 gap-10 sm:grid-cols-4">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col items-center text-center"
                >
                  <Icon className="mb-3 h-6 w-6 text-electric" strokeWidth={1.75} />
                  <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  </div>
                  <p className="mt-1.5 text-sm text-white/55">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
