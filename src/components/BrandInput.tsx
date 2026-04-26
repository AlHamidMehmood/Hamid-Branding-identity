/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { clsx } from 'clsx';

interface BrandInputProps {
  onSubmit: (mission: string) => void;
  isLoading: boolean;
}

export default function BrandInput({ onSubmit, isLoading }: BrandInputProps) {
  const [mission, setMission] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mission.trim().length > 10) {
      onSubmit(mission);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl w-full"
      >
        <div className="mb-12 border-b border-slate-200 pb-8 flex justify-between items-end">
          <div>
            <span className="technical-label mb-2 block">System // Initialization</span>
            <h1 className="text-4xl font-light tracking-tight text-slate-900">
              Hamid Branding <span className="text-slate-300">/ identity</span>
            </h1>
          </div>
          <p className="text-[10px] uppercase font-bold text-slate-400 max-w-[200px] text-right leading-tight">
            Architecting visual systems through narrative synthesis.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white border border-slate-200 p-8 relative">
            <span className="absolute top-3 left-4 technical-label opacity-40">01 // Mission Scope</span>
            <textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder="Describe the company's core mission and visual aspirations..."
              className="w-full h-48 bg-transparent pt-6 text-xl font-light placeholder-slate-200 outline-none resize-none leading-relaxed"
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-between items-center bg-white border border-slate-200 p-6">
            <div className="flex gap-8">
              {[
                { label: "Cohesive", val: "Logic" },
                { label: "Modern", val: "Forms" },
                { label: "Vivid", val: "Imagery" }
              ].map((item, idx) => (
                <div key={idx}>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">{item.label}</p>
                  <p className="text-xs font-medium">{item.val}</p>
                </div>
              ))}
            </div>
            
            <button
              type="submit"
              disabled={isLoading || mission.trim().length <= 10}
              className={clsx(
                "px-8 py-3 font-bold text-xs uppercase tracking-widest transition-all rounded",
                isLoading || mission.trim().length <= 10 
                  ? "bg-slate-100 text-slate-300 cursor-not-allowed" 
                  : "bg-slate-900 text-white hover:bg-black active:scale-95"
              )}
            >
              {isLoading ? "Generating..." : "Generate Identity System"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
