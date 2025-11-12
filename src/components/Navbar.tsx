"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sections = ["features", "solution", "about", "contact"] as const;
type Section = typeof sections[number];

export default function Navbar() {
  const [active, setActive] = useState<Section | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.5, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const linkClass = (id: Section) =>
    `transition-colors ${active === id ? "text-white" : "text-gray-300 hover:text-white"}`;

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center px-6 md:px-10 py-4 bg-[color-mix(in_oklab,transparent,oklch(53%_0.13_260/1)_30%)] backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-white/5"
    >
      <h1 className="text-xl font-extrabold tracking-wide text-white">DATISYN</h1>
      <div className="hidden md:flex items-center gap-8 font-medium">
        <a href="#features" className={linkClass("features")}>Features</a>
        <a href="#solution" className={linkClass("solution")}>Solution</a>
        <a href="#about" className={linkClass("about")}>About</a>
        <a href="#contact" className={linkClass("contact")}>Contact</a>
        <a href="#contact" className="px-5 py-2 rounded-xl font-semibold text-white bg-[var(--primary)] hover:bg-[var(--accent)] transition-all duration-300">
          Get Demo
        </a>
      </div>
    </motion.nav>
  );
}