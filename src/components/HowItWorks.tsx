"use client";
import { motion } from "framer-motion";
import { Database, Cpu, Layers, BarChart } from "lucide-react";

const steps = [
  { icon: Database, title: "Ingest" },
  { icon: Cpu, title: "Normalize" },
  { icon: Layers, title: "Orchestrate" },
  { icon: BarChart, title: "Insight" },
];

export default function HowItWorks() {
  return (
    <section id="features" className="py-20 text-center">
      <h2 className="text-3xl font-semibold mb-4">How The Software Works</h2>
      <p className="text-zinc-400 mb-12 px-6">Four powerful steps to transform your data infrastructure</p>
      <div className="flex flex-wrap justify-center gap-10">
        {steps.map(({ icon: Icon, title }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.15 }}
            className="flex flex-col items-center"
          >
            <Icon className="w-12 h-12 text-[var(--primary)] mb-4" />
            <p className="text-white/90">{title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
