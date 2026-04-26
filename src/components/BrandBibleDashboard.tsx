/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Share2, Clipboard, Heart, Palette, Type as TypeIcon, Image as ImageIcon, BookOpen, Quote } from 'lucide-react';
import { BrandBible } from '../types';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';

interface BrandBibleDashboardProps {
  data: BrandBible;
  onReset: () => void;
  logoUrls: {
    primary?: string;
    secondary?: string;
    mark?: string;
  };
}

export default function BrandBibleDashboard({ data, onReset, logoUrls }: BrandBibleDashboardProps) {
  useEffect(() => {
    // Dynamically load Google Fonts if they aren't standard
    const fonts = [data.typography.header.fontFamily, data.typography.body.fontFamily];
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fonts.map(f => f.replace(/\s+/g, '+')).join('&family=')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8 border-b border-slate-200 pb-6">
          <div>
            <h1 className="technical-label mb-1">Hamid Branding identity // Dashboard</h1>
            <h2 className="text-3xl font-light tracking-tight">
              {data.companyName} <span className="text-slate-300">/ Identity System</span>
            </h2>
          </div>
          <div className="w-96 text-right">
            <p className="technical-label mb-1">Company Mission</p>
            <p className="text-sm leading-tight text-slate-600 font-medium italic">
              "{data.missionStatement}"
            </p>
          </div>
        </div>

        <div className="grid-system">
          {/* Primary Logo section */}
          <div className="col-span-12 lg:col-span-5 geometric-card h-[400px] flex flex-col justify-center items-center">
            <span className="absolute top-3 left-4 technical-label opacity-40">01 // PRIMARY LOGO</span>
            {logoUrls.primary ? (
              <img 
                src={logoUrls.primary} 
                alt="Primary Logo" 
                className="max-w-[70%] max-h-[70%] object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-slate-100 rounded-full" />
                <span className="technical-label">Synthesizing...</span>
              </div>
            )}
            <div className="absolute bottom-4 right-4 technical-label opacity-10">CORE_ASSET_PX_001</div>
          </div>

          {/* Palette info */}
          <div className="col-span-12 lg:col-span-7 geometric-card h-[400px]">
            <span className="absolute top-3 left-4 technical-label opacity-40">02 // COLOR PALETTE</span>
            <div className="flex h-full items-end gap-2 pt-6">
              {data.palette.map((color, idx) => (
                <div key={idx} className="flex-1 h-full group flex flex-col">
                  <div 
                    className="flex-1 rounded-sm mb-4 transition-transform group-hover:scale-[1.02]" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="text-[10px] font-bold font-mono">{color.hex}</p>
                  <p className="text-[9px] text-slate-400 uppercase truncate">{color.name}</p>
                  <p className="text-[8px] text-slate-300 uppercase mt-1 italic truncate">{color.usage}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary assets */}
          <div className="col-span-12 lg:col-span-5 geometric-card h-[350px]">
            <span className="absolute top-3 left-4 technical-label opacity-40">03 // SECONDARY MARKS</span>
            <div className="grid grid-cols-2 gap-8 h-full pt-8 items-center justify-items-center">
              <div className="flex flex-col items-center gap-4">
                {logoUrls.secondary ? (
                   <img src={logoUrls.secondary} className="w-24 h-24 object-contain" alt="Secondary" referrerPolicy="no-referrer" />
                ) : <div className="w-16 h-16 border-2 border-dashed border-slate-100" /> }
                <p className="technical-label opacity-30">Secondary</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                {logoUrls.mark ? (
                   <img src={logoUrls.mark} className="w-16 h-16 object-contain" alt="Mark" referrerPolicy="no-referrer" />
                ) : <div className="w-12 h-12 border-2 border-dashed border-slate-100 rounded-full" /> }
                 <p className="technical-label opacity-30">Icon Only</p>
              </div>
            </div>
          </div>

          {/* Typography section */}
          <div className="col-span-12 lg:col-span-7 geometric-card h-[350px]">
            <span className="absolute top-3 left-4 technical-label opacity-40">04 // TYPOGRAPHY PAIRING</span>
            <div className="flex flex-col h-full pt-4">
              <div className="mb-6 pb-6 border-b border-slate-50">
                <p className="technical-label mb-2">Header / {data.typography.header.fontFamily}</p>
                <h3 className="text-4xl leading-tight text-slate-800" style={{ fontFamily: data.typography.header.fontFamily }}>
                   {data.narrative.split('.')[0]}.
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="technical-label mb-2">Body / {data.typography.body.fontFamily}</p>
                  <p className="text-xs leading-relaxed text-slate-600" style={{ fontFamily: data.typography.body.fontFamily }}>
                    {data.typography.body.description} | {data.brandPersonality}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 border border-slate-100">
                   <p className="technical-label mb-2">Sample Application</p>
                   <p className="text-sm font-medium mb-1" style={{ fontFamily: data.typography.header.fontFamily }}>Brand Narrative</p>
                   <p className="text-[10px] text-slate-500 line-clamp-3">{data.narrative}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="flex gap-12">
            <div className="flex flex-col">
              <span className="technical-label">Brand Persona</span>
              <span className="text-xs font-medium uppercase">{data.brandPersonality}</span>
            </div>
            <div className="flex flex-col">
              <span className="technical-label">System Ref</span>
              <span className="text-xs font-medium">{data.companyName.substring(0,2).toUpperCase()}-{(Math.random() * 1000).toFixed(0)}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onReset}
              className="px-6 py-2 bg-slate-900 text-white text-[10px] font-bold tracking-widest uppercase rounded hover:bg-black transition-colors"
            >
              Regenerate
            </button>
            <button className="px-6 py-2 border border-slate-200 text-[10px] font-bold tracking-widest uppercase rounded hover:bg-slate-100 transition-colors">
              Export System
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
