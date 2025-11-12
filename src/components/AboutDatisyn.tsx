"use client";
import { motion } from "framer-motion";
import { Users, Target, Zap, Shield } from "lucide-react";

export default function AboutDatisyn() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Why We Built Datisyn</h2>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
          In a world drowning in data but starving for insights, we saw an opportunity to bridge the gap between complex data infrastructure and actionable business intelligence.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/30">
              <Users className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Data Complexity</h3>
              <p className="text-zinc-400">
                We witnessed firsthand how data teams spent 80% of their time on infrastructure and only 20% on actual insights.
                This inefficiency was costing companies millions in lost opportunities and delayed decisions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/30">
              <Target className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">The Orchestration Gap</h3>
              <p className="text-zinc-400">
                Traditional ETL tools were built for a different era. They couldn't handle the velocity, variety, and volume of modern data,
                leaving gaps in real-time processing and cross-system orchestration.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/30">
              <Zap className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Intelligence</h3>
              <p className="text-zinc-400">
                By combining advanced orchestration with machine learning, we created a platform that doesn't just move data—it understands it,
                predicts patterns, and surfaces insights that would otherwise remain hidden.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/30">
              <Shield className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Enterprise-Grade Security</h3>
              <p className="text-zinc-400">
                Built with compliance and security at its core, Datisyn ensures your data remains protected while enabling seamless
                collaboration across your entire organization.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-[#00AEEF]/5 to-[#39B3FF]/5 border border-[#00AEEF]/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6">The Result: Data-Driven Transformation</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
              <span className="text-zinc-300">80% reduction in data infrastructure overhead</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
              <span className="text-zinc-300">Real-time insights across all data sources</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
              <span className="text-zinc-300">AI-powered anomaly detection and prediction</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
              <span className="text-zinc-300">Seamless integration with existing systems</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
              <span className="text-zinc-300">Enterprise-grade security and compliance</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}