"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      industry: fd.get("industry"),
      challenge: fd.get("challenge"),
      message: fd.get("message")
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Failed");
      setDone(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setDone(false), 5000);
    } catch (err: any) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Request Your Personalized Demo</h2>
          <p className="text-zinc-400">See how Datisyn transforms your data challenges into competitive advantages</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className="w-full p-4 rounded-xl bg-[#0f1724] border border-[#1a2332] focus:border-[#00AEEF] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@company.com"
                required
                className="w-full p-4 rounded-xl bg-[#0f1724] border border-[#1a2332] focus:border-[#00AEEF] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium mb-2">Industry</label>
              <select
                id="industry"
                name="industry"
                required
                className="w-full p-4 rounded-xl bg-[#0f1724] border border-[#1a2332] focus:border-[#00AEEF] focus:outline-none transition-colors"
              >
                <option value="">Select your industry</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance & Banking</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="technology">Technology</option>
                <option value="energy">Energy & Utilities</option>
                <option value="logistics">Logistics & Transportation</option>
                <option value="government">Government</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="challenge" className="block text-sm font-medium mb-2">Biggest Data Challenge</label>
              <select
                id="challenge"
                name="challenge"
                required
                className="w-full p-4 rounded-xl bg-[#0f1724] border border-[#1a2332] focus:border-[#00AEEF] focus:outline-none transition-colors"
              >
                <option value="">Select your biggest challenge</option>
                <option value="data-silos">Data silos and disconnected systems</option>
                <option value="real-time">Real-time data processing needs</option>
                <option value="scalability">Scaling data infrastructure</option>
                <option value="compliance">Data compliance and governance</option>
                <option value="insights">Turning data into actionable insights</option>
                <option value="integration">System integration complexity</option>
                <option value="performance">Data processing performance</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Tell us about your specific needs</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Describe your current data orchestration challenges and what you're hoping to achieve..."
              required
              className="w-full p-4 rounded-xl bg-[#0f1724] border border-[#1a2332] focus:border-[#00AEEF] focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex gap-4">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-4 rounded-xl font-semibold text-white bg-[var(--primary)] hover:bg-[var(--accent)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Request Demo
                </>
              )}
            </motion.button>
            <button
              type="reset"
              className="px-6 py-4 rounded-xl font-semibold bg-zinc-800 hover:bg-zinc-700 transition-all duration-300"
            >
              Reset
            </button>
          </div>

          {done && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 text-center p-4 bg-green-400/10 rounded-xl"
            >
              ✅ Thanks! We'll contact you within 24 hours to schedule your demo.
            </motion.p>
          )}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-center p-4 bg-red-400/10 rounded-xl"
            >
              ❌ Error: {error}
            </motion.p>
          )}
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-400 flex items-center justify-center gap-2">
            <Mail size={16} />
            Or email us directly at{" "}
            <a href="mailto:hello@datisyn.com" className="text-[var(--primary)] hover:text-[var(--accent)] underline">
              hello@datisyn.com
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
