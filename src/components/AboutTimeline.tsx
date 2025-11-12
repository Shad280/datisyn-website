"use client";
import { motion } from "framer-motion";
import { Rocket, Target, Sparkles, TrendingUp } from "lucide-react";

const milestones = [
  {
    year: "2024 Q3",
    title: "Prototype",
    desc: "Core ingestion, vectorization and demo pipeline.",
    icon: Rocket,
  },
  {
    year: "2024 Q4",
    title: "Pilot",
    desc: "Built admin UI + ontology merge workflow.",
    icon: Target,
  },
  {
    year: "2025 Q2",
    title: "AI Expansion",
    desc: "GNN learning & predictive simulation.",
    icon: Sparkles,
  },
  {
    year: "2025 Q4",
    title: "Scale",
    desc: "Multi-tenant & enterprise rollout.",
    icon: TrendingUp,
  },
];

export default function AboutTimeline() {
  return (
    <section id="about" className="py-20 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          From prototype to enterprise-ready platform, see how we're revolutionizing data orchestration
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#00AEEF] via-[#39B3FF] to-[#00AEEF] h-full opacity-30" />
        
        <div className="space-y-12">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            const isEven = i % 2 === 0;
            
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`flex items-center gap-6 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0, 174, 239, 0.3)" }}
                    className="bg-gradient-to-br from-[#0A0F1E] to-[#1a1f2e] p-6 rounded-2xl border border-[#00AEEF]/20 shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-2" style={{ justifyContent: isEven ? "flex-end" : "flex-start" }}>
                      <Icon size={20} className="text-[#00AEEF]" />
                      <div className="text-sm text-[#00AEEF] font-semibold">{m.year}</div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{m.title}</h3>
                    <p className="text-zinc-400">{m.desc}</p>
                  </motion.div>
                </div>
                
                {/* Center circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  className="relative z-10"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#00AEEF] to-[#39B3FF] text-[#0A0F1E] font-bold shadow-lg shadow-[#00AEEF]/50">
                    {i + 1}
                  </div>
                </motion.div>
                
                <div className="flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
