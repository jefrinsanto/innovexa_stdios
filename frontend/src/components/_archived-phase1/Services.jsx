import { motion } from "framer-motion";
import {
  Code2,
  Cloud,
  Network,
  ShieldCheck,
  Palette,
  Puzzle,
} from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    title: "Software Development",
    description:
      "Custom web, mobile & enterprise applications built on modern, maintainable architectures.",
  },
  {
    icon: Cloud,
    title: "Hosting & Cloud Solutions",
    description:
      "AWS infrastructure, DevOps automation, server setup, and CI/CD pipelines that scale with you.",
  },
  {
    icon: Network,
    title: "System Design & Architecture",
    description:
      "Scalable microservices and database design engineered for performance under real-world load.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance & Testing",
    description:
      "Automated and manual testing covering security, performance, and functional reliability.",
  },
  {
    icon: Palette,
    title: "Graphic Design & Branding",
    description:
      "UI/UX design, logos, visual identities, and digital assets that make your product memorable.",
  },
  {
    icon: Puzzle,
    title: "Custom Solutions",
    description:
      "API integrations and legacy system migrations tailored to your existing tech stack.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">What we do</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Services built for the way modern software gets shipped
          </h2>
          <p className="mt-4 text-white/55">
            From first line of code to production infrastructure, our teams
            cover the full lifecycle of your product.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group glass relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div
                  aria-hidden
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient-soft border border-white/10">
                  <Icon className="h-6 w-6 text-electric" strokeWidth={1.75} />
                </div>
                <h3 className="relative mt-5 font-display text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-white/55">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
