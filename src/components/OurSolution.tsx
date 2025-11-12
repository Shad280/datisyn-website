"use client";
import { motion } from "framer-motion";
import { TrendingUp, Brain, Eye } from "lucide-react";

const features = [
  { icon: TrendingUp, title: "Insight", desc: "Generate insights across all of your data sources." },
  { icon: Brain, title: "Predict", desc: "Inject predictive capabilities into your operations." },
  { icon: Eye, title: "Clarify", desc: "Surface clear, actionable information." },
];

export default function OurSolution() {
  return (
    <section id="solution" className="py-20 text-center bg-[color-mix(in_oklab,transparent,oklch(20%_0.06_260/1)_100%)]">
      <h2 className="text-3xl font-semibold mb-4">Platform Capabilities</h2>
      <p className="text-zinc-400 mb-12 px-6">Enterprise-grade software designed for modern data infrastructure</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.15 }}
            className="bg-[#11182D]/80 border border-white/5 p-8 rounded-2xl shadow-md hover:shadow-lg/60 hover:-translate-y-1 transition-all duration-300"
          >
            <Icon className="w-10 h-10 text-[var(--primary)] mb-4 mx-auto" />
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-zinc-400">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
