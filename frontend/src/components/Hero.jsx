import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2, TrendingUp } from "lucide-react";

const float = (reduced, delay = 0, distance = 10, duration = 6) =>
  reduced
    ? {}
    : {
        animate: { y: [0, -distance, 0] },
        transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
      };

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-16 sm:pt-40"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-[-15%] h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-electric/[0.14] blur-[150px]"
          animate={
            reduced
              ? {}
              : { x: [0, 40, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.08, 0.97, 1] }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-10%] top-[15%] h-[400px] w-[400px] rounded-full bg-violet/[0.14] blur-[130px]"
          animate={
            reduced
              ? {}
              : { x: [0, -30, 20, 0], y: [0, 25, -15, 0], scale: [1, 0.94, 1.06, 1] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute left-[8%] bottom-[-10%] h-[260px] w-[260px] rounded-full bg-electric/[0.10] blur-[100px]"
          animate={
            reduced
              ? {}
              : { x: [0, 25, -10, 0], y: [0, -15, 10, 0] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 55% 55% at 50% 20%, black, transparent)",
          }}
          animate={reduced ? { opacity: 0.12 } : { opacity: [0.09, 0.15, 0.09] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Copy */}
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-glow" />
          <span className="text-xs font-medium text-white/60">
            Founder-led software studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.08 }}
          className="font-display text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-[3.75rem]"
        >
          We build software that <span className="gradient-text">moves businesses</span> forward.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55"
        >
          INNOVEXA STUDIOS is a founder-led software studio building websites,
          applications, automation systems and digital products for ambitious
          businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.28 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#connect" className="btn-primary">
            Start a Project
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#work" className="btn-secondary">
            Explore Our Work
          </a>
        </motion.div>
      </div>

      {/* Hero visual composition */}
      <div className="relative mx-auto mt-20 hidden max-w-6xl px-6 lg:block lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
          className="relative h-[520px]"
        >
          {/* Main dashboard panel */}
          <motion.div
            {...float(reduced, 0, 8, 7)}
            className="glass absolute left-1/2 top-0 w-[640px] -translate-x-1/2 overflow-hidden rounded-2xl shadow-glow"
          >
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
              <img src="/logo-icon.png" alt="" className="ml-3 h-3.5 w-3.5 object-contain opacity-80" />
              <span className="text-xs text-white/40">Innovexa Analytics</span>
            </div>
            <div className="grid grid-cols-3 gap-4 p-5">
              <div className="col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-[11px] text-white/40">Revenue overview</p>
                <svg viewBox="0 0 280 100" className="mt-2 h-24 w-full">
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,70 L35,60 L70,66 L105,40 L140,48 L175,22 L210,30 L245,12 L280,18 L280,100 L0,100 Z"
                    fill="url(#areaFill)"
                  />
                  <path
                    d="M0,70 L35,60 L70,66 L105,40 L140,48 L175,22 L210,30 L245,12 L280,18"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-3">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <p className="text-[10px] text-white/40">Active users</p>
                  <p className="font-display text-lg font-semibold text-white">2,481</p>
                </div>
                <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <p className="mb-2 text-[10px] text-white/40">Throughput</p>
                  <div className="flex h-12 items-end gap-1.5">
                    {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
                      <div
                        key={i}
                        className="w-full rounded-sm bg-brand-gradient"
                        style={{ height: `${h}%`, opacity: 0.85 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Code editor panel */}
          <motion.div
            {...float(reduced, 1.2, 10, 8)}
            className="glass absolute bottom-2 left-0 w-[290px] overflow-hidden rounded-xl shadow-glow-violet"
          >
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3.5 py-2.5">
              <span className="h-2 w-2 rounded-full bg-red-400/60" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
              <span className="h-2 w-2 rounded-full bg-green-400/60" />
              <span className="ml-2 text-[10px] text-white/40">api/orders.ts</span>
            </div>
            <div className="space-y-1.5 px-4 py-4 font-mono text-[11px] leading-relaxed">
              <p><span className="text-violet">async function</span> <span className="text-electric">syncOrders</span>() {"{"}</p>
              <p className="pl-3 text-white/50">const data = <span className="text-violet">await</span> fetch(api);</p>
              <p className="pl-3 text-white/50">return normalize(data);</p>
              <p className="text-white/70">{"}"}</p>
            </div>
          </motion.div>

          {/* Mobile app panel */}
          <motion.div
            {...float(reduced, 0.6, 9, 6.5)}
            className="glass absolute right-0 top-6 w-[168px] overflow-hidden rounded-[1.4rem] shadow-glow"
          >
            <div className="px-3.5 pb-4 pt-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-[9px] font-bold text-white">
                    AM
                  </span>
                  <div>
                    <p className="text-[8px] leading-tight text-white/40">Good morning</p>
                    <p className="text-[9.5px] font-semibold leading-tight text-white">Alex Morgan</p>
                  </div>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-electric" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
                  <p className="text-[7.5px] text-white/40">Revenue</p>
                  <p className="mt-0.5 font-display text-[13px] font-bold text-white">$12.4k</p>
                  <p className="mt-0.5 text-[7.5px] font-medium text-emerald-400">↑ 18%</p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
                  <p className="text-[7.5px] text-white/40">Orders</p>
                  <p className="mt-0.5 font-display text-[13px] font-bold text-white">248</p>
                  <p className="mt-0.5 text-[7.5px] font-medium text-electric">↑ 6.2%</p>
                </div>
              </div>

              <div className="mt-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
                <svg viewBox="0 0 140 34" className="h-8 w-full">
                  <path
                    d="M0,26 L20,22 L40,24 L60,14 L80,17 L100,7 L120,10 L140,4"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="mt-3 h-8 flex items-center justify-center rounded-full bg-brand-gradient">
                <span className="text-[10px] font-semibold text-white">View Report</span>
              </div>
            </div>
          </motion.div>

          {/* Workflow / automation panel */}
          <motion.div
            {...float(reduced, 1.8, 8, 7.5)}
            className="glass absolute bottom-8 right-4 w-[200px] rounded-xl p-4 shadow-glow-violet"
          >
            <p className="mb-3 text-[10px] text-white/40">Automation flow</p>
            <div className="flex items-center justify-between">
              {["Trigger", "Process", "Notify"].map((label, i) => (
                <div key={label} className="flex flex-1 flex-col items-center">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient-soft border border-white/10 text-[9px] text-electric">
                    {i + 1}
                  </span>
                  <span className="mt-1.5 text-[8.5px] text-white/40">{label}</span>
                </div>
              ))}
            </div>
            <svg viewBox="0 0 180 4" className="mt-[-30px] w-full">
              <line x1="20" y1="2" x2="160" y2="2" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Floating status pills */}
          <motion.div
            {...float(reduced, 0.3, 7, 5.5)}
            className="glass absolute left-8 top-16 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] text-white/80"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            Deploy successful
          </motion.div>

          <motion.div
            {...float(reduced, 1.5, 9, 6)}
            className="glass absolute right-16 bottom-[-4px] flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] text-white/80"
          >
            <TrendingUp className="h-3.5 w-3.5 text-electric" />
            +24% this month
          </motion.div>
        </motion.div>
      </div>

      {/* Simplified mobile-only visual */}
      <div className="mx-auto mt-14 block max-w-md px-6 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass overflow-hidden rounded-2xl shadow-glow"
        >
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
            <img src="/logo-icon.png" alt="" className="ml-3 h-3.5 w-3.5 object-contain opacity-80" />
            <span className="text-xs text-white/40">Innovexa Analytics</span>
          </div>
          <div className="p-5">
            <p className="text-[11px] text-white/40">Revenue overview</p>
            <svg viewBox="0 0 280 100" className="mt-2 h-24 w-full">
              <path
                d="M0,70 L35,60 L70,66 L105,40 L140,48 L175,22 L210,30 L245,12 L280,18"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-3 flex h-10 items-end gap-1.5">
              {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
                <div key={i} className="w-full rounded-sm bg-brand-gradient" style={{ height: `${h}%`, opacity: 0.85 }} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
