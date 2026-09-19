/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B0D17",
        surface: "#0F1420",
        surface2: "#141a2b",
        border: "rgba(255,255,255,0.08)",
        electric: "#3B82F6",
        violet: "#A855F7",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(168,85,247,0.15) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(59,130,246,0.35)",
        "glow-violet": "0 0 40px -10px rgba(168,85,247,0.35)",
      },
    },
  },
  plugins: [],
};
