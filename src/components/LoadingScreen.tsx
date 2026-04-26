/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Palette, Type, Shield } from 'lucide-react';

const LOADING_STEPS = [
  { icon: Sparkles, text: "Analyzing mission core values...", color: "text-amber-400" },
  { icon: Palette, text: "Curating a balanced color palette...", color: "text-rose-400" },
  { icon: Type, text: "Selecting architectural font pairings...", color: "text-blue-400" },
  { icon: Shield, text: "Synthesizing primary mark concepts...", color: "text-emerald-400" },
  { icon: Sparkles, text: "Finalizing your Branding identity...", color: "text-purple-400" }
];

export default function LoadingScreen() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-12">
        <div className="relative flex justify-center items-center">
          <div className="w-32 h-32 border border-slate-200 flex items-center justify-center relative">
             <div className="absolute top-0 left-0 technical-label opacity-20 p-1">01</div>
             <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="w-16 h-16 border-2 border-slate-900/5 border-t-slate-900"
             />
          </div>
          <div className="absolute w-48 h-48 border border-slate-100 -z-10" />
        </div>

        <div className="space-y-6 text-center">
          <h2 className="technical-label tracking-[0.2em]">Branding Synthesis // Active</h2>
          <div className="h-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.6 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-[10px] font-bold uppercase tracking-widest text-slate-900"
              >
                {LOADING_STEPS[stepIndex].text}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="w-full bg-slate-200 h-px">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 15, ease: "linear" }}
              className="bg-slate-900 h-full"
            />
          </div>
          
          <p className="technical-label opacity-30 px-12 leading-relaxed">
            Generating coherent visual logic based on mission parameters.
          </p>
        </div>
      </div>
    </div>
  );
}
