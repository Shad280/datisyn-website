"use client";
import { motion } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ThreeEye from "./ThreeEye";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-2"
      >
        <span className="px-4 py-2 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/30 text-[#00AEEF] text-sm font-semibold">
          Trusted by 500+ Enterprises
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold mb-4 px-6"
      >
        Transform Your Data Into Actionable Intelligence
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-lg text-zinc-400 mb-2 px-6"
      >
        The enterprise data orchestration platform that turns complex data challenges into competitive advantages.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-sm text-zinc-500 mb-8 px-6 max-w-2xl"
      >
        Connect disparate systems, normalize data flows, and orchestrate insights across your entire infrastructure with AI-powered automation.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 mb-12 px-6"
      >
        <button className="px-8 py-4 rounded-xl font-semibold text-white bg-[var(--primary)] hover:bg-[var(--accent)] transition-all duration-300 shadow-lg hover:shadow-xl">
          Start Your 60-Day Pilot
        </button>
        <button className="px-8 py-4 rounded-xl font-semibold text-[var(--primary)] border-2 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300">
          See How Datisyn Works
        </button>
      </motion.div>
      <div className="w-full max-w-7xl mx-auto h-[450px] md:h-[500px] px-4">
        <ThreeEye />
      </div>
    </section>
  );
}
