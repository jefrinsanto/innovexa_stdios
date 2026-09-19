import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Globe,
  Cpu,
  Smartphone,
  Bot,
  Cloud,
  ShieldCheck,
  Lock,
  Sparkles,
  Server,
} from "lucide-react";

const SERVICES = [
  { number: "01", title: "Web Development", icon: Globe, note: "Marketing sites, portals and storefronts built for speed.", visual: "web" },
  { number: "02", title: "Custom Software", icon: Cpu, note: "Internal tools and platforms shaped around your workflow.", visual: "software" },
  { number: "03", title: "Mobile Applications", icon: Smartphone, note: "Native-feeling apps for iOS and Android.", visual: "mobile" },
  { number: "04", title: "AI & Automation", icon: Bot, note: "Automating the repetitive parts of your business.", visual: "ai" },
  { number: "05", title: "Cloud & Backend", icon: Cloud, note: "APIs and infrastructure that scale with demand.", visual: "cloud" },
  { number: "06", title: "Cybersecurity", icon: ShieldCheck, note: "Hardened systems and secure-by-default architecture.", visual: "security" },
];

function WebMockup() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/60" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
        <span className="h-2 w-2 rounded-full bg-green-400/60" />
        <span className="ml-2 flex-1 rounded-full bg-white/[0.06] px-2 py-1 text-[8px] text-white/30">innovexa.studio</span>
      </div>
      <div className="space-y-2.5 p-4">
        <div className="h-2.5 w-2/3 rounded-full bg-white/20" />
        <div className="h-2 w-1/2 rounded-full bg-white/10" />
        <div className="mt-3 h-6 w-20 rounded-full bg-brand-gradient" />
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 rounded-md border border-white/[0.06] bg-white/[0.03]" />
          ))}
        </div>
      </div>
    </div>
  );
}

function SoftwareMockup() {
  return (
    <div className="flex w-full overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03]">
      <div className="w-10 space-y-2.5 border-r border-white/[0.06] p-2.5">
        {[Cpu, Server, Globe].map((I, i) => (
          <span key={i} className={`flex h-6 w-6 items-center justify-center rounded-md ${i === 0 ? "bg-brand-gradient-soft" : "bg-white/[0.04]"}`}>
            <I className="h-3 w-3 text-electric" strokeWidth={1.75} />
          </span>
        ))}
      </div>
      <div className="flex-1 p-3">
        <div className="mb-2.5 h-2 w-1/3 rounded-full bg-white/15" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-14 rounded-md border border-white/[0.06] bg-white/[0.03] p-2">
            <div className="h-1.5 w-2/3 rounded-full bg-white/15" />
            <div className="mt-2 h-4 w-1/2 rounded bg-electric/30" />
          </div>
          <div className="h-14 rounded-md border border-white/[0.06] bg-white/[0.03] p-2">
            <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
            <div className="mt-2 flex h-4 items-end gap-0.5">
              {[40, 70, 55, 90].map((h, i) => (
                <div key={i} className="w-full rounded-sm bg-brand-gradient" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="flex justify-center">
      <div className="w-[120px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="h-4 w-4 rounded-md bg-brand-gradient" />
          <span className="h-1 w-1 rounded-full bg-electric" />
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
        </div>
        <div className="mt-2.5 space-y-1.5">
          {[1, 2].map((i) => (
            <div key={i} className="h-6 rounded-md border border-white/[0.06] bg-white/[0.03]" />
          ))}
        </div>
        <div className="mt-2.5 h-5 rounded-full bg-brand-gradient" />
      </div>
    </div>
  );
}

function AIMockup() {
  return (
    <div className="w-full space-y-2 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3.5">
      <div className="flex items-center gap-2">
        <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient">
          <Sparkles className="h-3 w-3 text-white" />
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-gradient opacity-40" />
        </span>
        <div className="h-6 max-w-[70%] rounded-xl rounded-tl-sm bg-white/[0.06] px-2.5 py-1.5 text-[9px] leading-tight text-white/60">
          Automating your invoice workflow…
        </div>
      </div>
      <div className="flex justify-end">
        <div className="max-w-[55%] rounded-xl rounded-tr-sm bg-brand-gradient-soft border border-white/10 px-2.5 py-1.5 text-[9px] leading-tight text-white/80">
          3 tasks completed ✓
        </div>
      </div>
      <div className="flex items-center gap-1.5 pl-8">
        <span className="h-1 w-1 animate-bounce rounded-full bg-white/40 [animation-delay:-0.2s]" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-white/40" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-white/40 [animation-delay:0.2s]" />
      </div>
    </div>
  );
}

function CloudMockup() {
  return (
    <div className="relative w-full rounded-lg border border-white/[0.08] bg-white/[0.03] p-5">
      <div className="flex justify-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient-soft border border-white/10">
          <Cloud className="h-5 w-5 text-electric" strokeWidth={1.75} />
        </span>
      </div>
      <svg viewBox="0 0 220 40" className="mx-auto -mt-1 h-8 w-full max-w-[220px]">
        <path d="M110,0 L40,32" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        <path d="M110,0 L110,32" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        <path d="M110,0 L180,32" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
      </svg>
      <div className="flex justify-center gap-3">
        {[Server, Server, Server].map((I, i) => (
          <span key={i} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
            <I className="h-3.5 w-3.5 text-white/50" strokeWidth={1.75} />
          </span>
        ))}
      </div>
    </div>
  );
}

function SecurityMockup() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03] p-6">
      <span className="absolute right-3 top-3 rounded-full bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 text-[8px] font-medium text-emerald-300">
        Protected
      </span>
      <div className="relative">
        <ShieldCheck className="h-14 w-14 text-electric" strokeWidth={1.25} />
        <Lock className="absolute inset-0 m-auto h-5 w-5 text-white" strokeWidth={2} />
        <motion.span
          aria-hidden
          className="absolute inset-x-0 h-px bg-electric/70"
          initial={{ top: "10%" }}
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

const VISUALS = {
  web: WebMockup,
  software: SoftwareMockup,
  mobile: MobileMockup,
  ai: AIMockup,
  cloud: CloudMockup,
  security: SecurityMockup,
};

export default function ServicesPreview() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];
  const Icon = current.icon;
  const Visual = VISUALS[current.visual];

  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16">
          <p className="section-eyebrow">Capabilities</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            What we build
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* List */}
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {SERVICES.map((service, i) => (
              <motion.button
                key={service.number}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25 }}
                className={`group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-300 ${
                  active === i ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                <span className="flex items-center gap-5">
                  <span className={`font-mono text-xs transition-colors duration-300 ${active === i ? "text-electric" : "text-white/25 group-hover:text-electric/70"}`}>
                    {service.number}
                  </span>
                  <span className="font-display text-lg font-semibold sm:text-xl">
                    {service.title}
                  </span>
                </span>
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient transition-all duration-300 ${
                    active === i ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Visual */}
          <div className="glass relative h-[420px] overflow-hidden rounded-2xl transition-shadow duration-500 hover:shadow-glow">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-brand-gradient opacity-20 blur-[90px]"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="relative flex h-full flex-col p-7"
              >
                <div className="flex-1">
                  <Visual />
                </div>
                <div className="pt-5">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient-soft border border-white/10">
                    <Icon className="h-5 w-5 text-electric" strokeWidth={1.5} />
                  </span>
                  <p className="font-mono text-xs text-white/30">{current.number}</p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-white">
                    {current.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/55">
                    {current.note}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
