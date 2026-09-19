import { motion } from "framer-motion";
import { Shirt, Headphones, ShoppingBag, Star } from "lucide-react";

const PROJECTS = [
  {
    number: "01",
    title: "Business Intelligence Platform",
    description:
      "A modern analytics platform designed to turn operational data into clear business decisions.",
    visual: "dashboard",
  },
  {
    number: "02",
    title: "Commerce Platform",
    description:
      "A conversion-focused commerce experience designed around discovery, trust and seamless checkout.",
    visual: "commerce",
  },
  {
    number: "03",
    title: "Automation Platform",
    description:
      "A workflow platform connecting business processes, AI and automation into one operating system.",
    visual: "automation",
  },
];

function DashboardVisual() {
  return (
    <div className="grid h-full grid-cols-3 gap-3 p-6">
      <div className="col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <p className="text-[11px] text-white/40">Quarterly performance</p>
        <svg viewBox="0 0 300 110" className="mt-3 h-28 w-full">
          <defs>
            <linearGradient id="dashArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,80 L40,65 L80,72 L120,45 L160,55 L200,25 L240,35 L300,15 L300,110 L0,110 Z" fill="url(#dashArea)" />
          <path d="M0,80 L40,65 L80,72 L120,45 L160,55 L200,25 L240,35 L300,15" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-[10px] text-white/40">Conversion</p>
          <p className="mt-1 font-display text-xl font-bold text-white">38.2%</p>
        </div>
        <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="flex h-10 items-end gap-1">
            {[30, 55, 40, 70, 90].map((h, i) => (
              <div key={i} className="w-full rounded-sm bg-brand-gradient" style={{ height: `${h}%`, opacity: 0.85 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommerceVisual() {
  const products = [
    { icon: Shirt, name: "Merino Jacket", price: "$128", badge: "Bestseller" },
    { icon: Headphones, name: "Studio Headset", price: "$249", badge: null },
    { icon: ShoppingBag, name: "Canvas Tote", price: "$64", badge: null },
  ];
  return (
    <div className="grid h-full grid-cols-3 gap-3 p-6">
      {products.map(({ icon: Icon, name, price, badge }) => (
        <div
          key={name}
          className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-300 hover:border-white/15"
        >
          <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-brand-gradient-soft">
            {badge && (
              <span className="absolute left-2 top-2 rounded-full bg-brand-gradient px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-white">
                {badge}
              </span>
            )}
            <span className="absolute right-2 top-2 flex items-center gap-0.5 rounded-full bg-black/30 px-1.5 py-0.5 text-[9px] text-white/70">
              <Star className="h-2.5 w-2.5 fill-current text-yellow-400" /> 4.9
            </span>
            {/* soft radial spotlight behind the icon */}
            <span
              aria-hidden
              className="absolute h-16 w-16 rounded-full bg-white/10 blur-xl transition-transform duration-300 group-hover:scale-110"
            />
            <Icon className="relative h-9 w-9 text-electric drop-shadow-[0_2px_6px_rgba(59,130,246,0.5)] transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            {/* floor shadow to ground the icon like a product shot */}
            <span
              aria-hidden
              className="absolute bottom-3 h-1.5 w-10 rounded-full bg-black/30 blur-[3px]"
            />
          </div>
          <div className="flex items-center justify-between p-3">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium text-white/80">{name}</p>
              <p className="text-[11px] text-electric">{price}</p>
            </div>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[11px] leading-none text-white/60 transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white">
              +
            </span>
          </div>
        </div>
      ))}
      <div className="col-span-3 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
        <span className="text-[11px] text-white/50">3 items · Subtotal $441</span>
        <div className="h-7 w-24 rounded-full bg-brand-gradient" />
      </div>
    </div>
  );
}

function AutomationVisual() {
  const nodes = ["Trigger", "Enrich", "Route", "Notify"];
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-8">
      <div className="flex items-center justify-between">
        {nodes.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col items-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient-soft border border-white/10 text-xs font-semibold text-electric">
              {i + 1}
            </span>
            <span className="mt-2 text-[10px] text-white/45">{label}</span>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 400 4" className="w-full">
        <line x1="30" y1="2" x2="370" y2="2" stroke="url(#autoLine)" strokeWidth="1.5" strokeDasharray="4 4" />
        <defs>
          <linearGradient id="autoLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="h-2 w-2/3 rounded-full bg-white/15" />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" />
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="h-2 w-2/3 rounded-full bg-white/15" />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

const VISUALS = {
  dashboard: DashboardVisual,
  commerce: CommerceVisual,
  automation: AutomationVisual,
};

export default function FeaturedWork() {
  return (
    <section id="work" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="section-eyebrow">Concept work</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Selected Work
            </h2>
          </div>
        </div>

        <div className="space-y-8">
          {PROJECTS.map((project, i) => {
            const Visual = VISUALS[project.visual];
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={project.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                whileHover={{ scale: 1.012 }}
                className={`group glass relative grid grid-cols-1 items-center gap-0 overflow-hidden rounded-2xl transition-shadow duration-500 hover:shadow-glow lg:grid-cols-2 ${
                  reverse ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    padding: 1,
                    background: "linear-gradient(135deg, #3B82F6, #A855F7)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <div className={`h-[280px] bg-white/[0.015] sm:h-[340px] ${reverse ? "lg:[direction:ltr]" : ""}`}>
                  <Visual />
                </div>
                <div className={`px-8 py-10 sm:px-12 ${reverse ? "lg:[direction:ltr]" : ""}`}>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
                      Concept Project
                    </span>
                  </div>
                  <p className="font-mono text-xs text-white/30">{project.number}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
