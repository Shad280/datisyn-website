"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-24 border-t border-[#00AEEF]/20 bg-gradient-to-br from-[#071428] to-[#0A0F1E] py-12 px-6 md:px-10"
      id="footer"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold mb-2">DATISYN</h4>
            <p className="text-zinc-400">Data Orchestration Software</p>
            <p className="text-sm text-zinc-500 mt-2">Enterprise Platform for Intelligent Data Management</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <a
                href="https://github.com/datisyn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-xl bg-[#1a1f2e] hover:bg-[#00AEEF]/20 transition-all duration-300 hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com/datisyn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-3 rounded-xl bg-[#1a1f2e] hover:bg-[#00AEEF]/20 transition-all duration-300 hover:scale-110"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com/company/datisyn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-xl bg-[#1a1f2e] hover:bg-[#00AEEF]/20 transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:hello@datisyn.com"
                aria-label="Email"
                className="p-3 rounded-xl bg-[#1a1f2e] hover:bg-[#00AEEF]/20 transition-all duration-300 hover:scale-110"
              >
                <Mail size={20} />
              </a>
            </div>
            
            <div className="flex gap-6 text-sm text-zinc-400">
              <a href="#features" className="hover:text-[#00AEEF] transition-colors">
                Features
              </a>
              <a href="#solution" className="hover:text-[#00AEEF] transition-colors">
                Solution
              </a>
              <a href="#about" className="hover:text-[#00AEEF] transition-colors">
                About
              </a>
              <a href="#contact" className="hover:text-[#00AEEF] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#00AEEF]/10 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Datisyn. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
