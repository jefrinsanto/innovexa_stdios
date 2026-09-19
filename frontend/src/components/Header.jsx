import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B0D17]/75 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            <img
              src="/logo-icon.png"
              alt="INNOVEXA STUDIOS"
              className="h-8 w-8 object-contain"
            />
            <span className="font-display text-[15px] font-semibold tracking-wide text-white">
              INNOVEXA <span className="text-white/50 font-normal">STUDIOS</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[13.5px] font-medium text-white/60 transition-colors duration-200 hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-white/70 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#connect"
            className="hidden items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-[#0B0D17] md:inline-flex"
          >
            Let's Talk
          </a>

          {/* Mobile toggle */}
          <button
            className="relative z-[70] text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <Menu className={`h-6 w-6 transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
            <X className={`absolute inset-0 h-6 w-6 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            {/* Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[65] flex w-[78%] max-w-xs flex-col bg-[#0B0D17] border-l border-white/[0.08] px-7 pb-8 pt-28 md:hidden"
            >
              <div className="flex flex-1 flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 + i * 0.05 }}
                    className="rounded-lg px-3 py-3.5 text-base font-medium text-white/80 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <motion.a
                href="#connect"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="btn-primary w-full justify-center !py-3.5"
              >
                Let's Talk
              </motion.a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
