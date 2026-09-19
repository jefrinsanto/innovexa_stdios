import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

// In dev this hits the backend directly. Override with VITE_API_URL in frontend/.env
// when deploying (see frontend/.env.example) — no code changes needed between environments.
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://innovexa-api.onrender.com/api/contact";
const initialForm = { name: "", email: "", phone: "", message: "" };

export default function Connect() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const isSubmitting = status === "loading";

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      await axios.post(API_URL, form);
      setStatus("success");
      setForm(initialForm);
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      if (err?.response) {
        // Server responded, but with an error status (validation, rate limit, 500, etc.)
        setErrorMsg(err.response.data?.message || err.response.data?.error || "Something went wrong. Please try again.");
      } else if (err?.request) {
        // Request was sent but no response came back — server down / wrong URL / CORS block
        setErrorMsg("Unable to reach the server. Please check your connection and try again.");
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="connect" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* Left: intro + contact details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <p className="section-eyebrow">Get in touch</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Let's Connect
            </h2>
            <p className="mt-4 max-w-md text-white/55">
              Tell us about your project and we'll get back to you within one
              business day.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient-soft border border-white/10">
                  <Mail className="h-4.5 w-4.5 text-electric" />
                </span>
                <span className="text-sm text-white/70">
                  jefrinabcde@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient-soft border border-white/10">
                  <Phone className="h-4.5 w-4.5 text-electric" />
                </span>
                <span className="text-sm text-white/70">+91 94872 80258</span>
              </div>
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient-soft border border-white/10">
                  <MapPin className="h-4.5 w-4.5 text-electric" />
                </span>
                <span className="text-sm text-white/70">
                  Nagercoil, Kanyakumari, Tamil Nadu, India
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet/20 blur-[90px]"
            />

            <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-white/60">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-electric/60"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/60">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Id"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-electric/60"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-white/60">
                  Contact Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter Your Contact No"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-electric/60"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-white/60">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write Your Message Here"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-electric/60"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary relative mt-7 w-full !py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Submit
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Feedback alert */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
