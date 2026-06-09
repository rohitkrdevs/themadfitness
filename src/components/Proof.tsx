/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ACTION_SHOTS } from '../data';
import { ActionShot } from '../types';
import { Eye, X, Activity, Dumbbell, ShieldCheck, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function Proof() {
  const [selectedWorkout, setSelectedWorkout] = useState<ActionShot | null>(null);

  // Hardcoded technical protocols for modal enhancement
  const testProtocols: Record<string, {
    muscles: string[];
    protocol: string;
    rest: string;
    level: string;
    steps: string[];
  }> = {
    as1: {
      muscles: ["Lower Back", "Gluteus Maximus", "Hamstrings", "Quadriceps", "Core stabilizers"],
      protocol: "5 sets x 3 reps @ 85-90% 1RM",
      rest: "180 - 240 Seconds between sets",
      level: "Elite / Advanced Biomechanical Load",
      steps: [
        "Initialize double-overhand grip or hook grip on Olympic bar.",
        "Secure hips low, shoulder blades retracted, and engage lats completely.",
        "Drive through the midfoot, prioritizing spinal posture, avoiding anterior pelvic tilt.",
        "Lock out forcefully using glutes at peak expansion point."
      ]
    },
    as2: {
      muscles: ["Latissimus Dorsi", "Rear Deltoids", "Brachialis", "Middle Trapezius"],
      protocol: "4 sets x 8-12 reps (controlled eccentric 3 seconds)",
      rest: "90 Seconds between sets",
      level: "Intermediate to High-Volume Hypertrophy",
      steps: [
        "Position grip slightly wider than shoulder shoulder blades length.",
        "Initiate pull by depressing the scapula before flexing elbows.",
        "Draw bar to upper-chest peak while maintaining brief isometric contraction.",
        "Release slowly over 3 seconds, keeping tension on muscle fibers."
      ]
    },
    as3: {
      muscles: ["Cardiovascular System", "Quads", "Core"],
      protocol: "AMRAP 15 Minutes",
      rest: "No Rest, Minimal transitions",
      level: "Intermediate/Advanced Metabolic",
      steps: [
        "Maintain maximum output throughout the entire duration.",
        "Focus on nasal breathing during lower intensity periods.",
        "Push to near-failure without compromising form.",
        "Cool down with structured steady-state."
      ]
    },
    as4: {
      muscles: ["Transverse Abdominis", "Obliques", "Rectus Abdominis"],
      protocol: "4 sets x 45 seconds holds",
      rest: "45 Seconds between sets",
      level: "All Levels Core Stabilization",
      steps: [
        "Brace core aggressively as if anticipating impact.",
        "Keep spine entirely neutral; avoid lumbar extension.",
        "Breathe through the diaphragm, maintaining isometric tension.",
        "Release tension slowly to reset."
      ]
    },
    as5: {
      muscles: ["Hips", "Shoulders", "Ankles", "Thoracic Spine"],
      protocol: "10-15 Minutes Pre-load",
      rest: "Continuous Flow",
      level: "Universal Joint Preparation",
      steps: [
        "Move through end-ranges without forcing painful tension.",
        "Focus on lubricating the hip capsule and thoracic mobility.",
        "Hold deep stretches for no longer than 3 seconds dynamically.",
        "Prepare the nervous system for loaded resistance."
      ]
    }
  };

  return (
    <section id="results" className="py-24 bg-[#121414] border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-primary mb-2 block uppercase tracking-widest">
            03 // PROOF OVERRIDES
          </span>
          <h2 className="font-anton text-4xl md:text-5xl uppercase text-white">
            The Work
          </h2>
          <p className="font-sans text-xs md:text-sm text-gray-400 mt-4 max-w-lg mx-auto leading-relaxed">
            Unfiltered diagnostic proof of execution. Click on any block to inspect targeted biomechanical splits and loaded protocols.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="proof-action-grid">
          {ACTION_SHOTS.map((shot, idx) => (
            <motion.div 
              key={shot.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative aspect-[4/5] group overflow-hidden border border-outline-variant/30 bg-surface-container cursor-pointer shadow-xl rounded-none"
              onClick={() => setSelectedWorkout(shot)}
            >
              {/* Grayscale on start, transforms on hover */}
              <img 
                src={shot.imageUrl} 
                alt={shot.title} 
                className="w-full h-full object-cover transition-all duration-700 ease-out grayscale group-hover:scale-105 group-hover:grayscale-0 filter"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay shadow mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
              
              {/* Interactive badge appearing on hover */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/90 backdrop-blur-sm text-white text-[10px] uppercase font-mono font-bold tracking-widest px-3 py-1.5 flex items-center gap-1.5 border border-primary/20">
                <Eye className="w-3.5 h-3.5" /> INSPECT TARGETS
              </div>

              {/* Text Block */}
              <div className="absolute bottom-10 left-10 right-10">
                <span className="font-mono text-[10px] text-primary bg-[#121414]/90 border border-outline/20 px-3 py-1 mb-3 inline-block uppercase font-bold tracking-widest shadow-md">
                  {shot.tag}
                </span>
                <h3 className="font-anton text-3xl md:text-4xl text-white uppercase tracking-tight leading-none group-hover:text-primary transition-colors">
                  {shot.title}
                </h3>
                <p className="font-sans text-xs text-gray-300 max-w-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Click to inspect the precise structural training program details.
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Inspection Modal */}
        {selectedWorkout && (() => {
          const details = testProtocols[selectedWorkout.id];
          return (
            <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in" id="workout-inspect-modal">
              <div className="bg-surface-container border border-outline/40 p-6 md:p-8 max-w-3xl w-full relative max-h-[90vh] overflow-y-auto rounded-none text-[#e2e2e2]">
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedWorkout(null)}
                  className="absolute top-4 right-4 text-on-surface hover:text-primary transition-colors cursor-pointer border border-outline/20 p-1 bg-surface-container-lowest"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-4">
                  {/* Aspect Shot Preview */}
                  <div className="md:col-span-5 aspect-[3/4] overflow-hidden border border-outline-variant/30 bg-surface-container-low">
                    <img 
                      src={selectedWorkout.imageUrl} 
                      alt={selectedWorkout.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Program Diagnostics */}
                  <div className="md:col-span-7 space-y-6">
                    <div>
                      <span className="font-mono text-[10px] text-primary uppercase tracking-widest block font-bold mb-1">
                        CLINICAL METHODOLOGY // {selectedWorkout.category}
                      </span>
                      <h3 className="font-anton text-3xl md:text-4xl text-on-surface uppercase tracking-tight">
                        {selectedWorkout.title}
                      </h3>
                      <p className="font-sans text-xs text-on-surface/80 mt-2 leading-relaxed">
                        {selectedWorkout.description}
                      </p>
                    </div>

                    <div className="border-t border-b border-outline-variant/30 py-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Dumbbell className="w-4 h-4 text-primary shrink-0" />
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-wider text-on-surface/50">VOLUME SCHEDULING</p>
                          <p className="font-mono text-xs font-semibold text-primary">{details?.protocol || "N/A"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-wider text-on-surface/50 font-medium">REST CADENCE</p>
                          <p className="font-mono text-xs font-semibold text-on-surface">{details?.rest || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-wider text-on-surface/50 font-medium font-bold">LOAD DESIGNATION</p>
                          <p className="font-mono text-xs font-semibold text-on-surface">{details?.level || "N/A"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Targeted Muscle Groups */}
                    <div>
                      <p className="font-mono text-[10px] text-on-surface/50 uppercase tracking-widest font-bold mb-2">TARGET MUSCLE GROUPS</p>
                      <div className="flex flex-wrap gap-2">
                        {details?.muscles.map((muscle, idx) => (
                          <span key={idx} className="font-mono text-[10px] uppercase font-medium bg-[#121414] border border-outline/20 px-2.5 py-1 text-on-surface/80 shadow-inner">
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Implementation Guides */}
                <div className="mt-8 pt-6 border-t border-outline-variant/30 bg-surface-container-lowest/50 p-5 border border-outline/10">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-wider font-bold block mb-3 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> BIOMECHANICAL STEPS FOR EXACT PERFORMANCE:
                  </span>
                  <ul className="space-y-2.5">
                    {details?.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-2 text-xs font-sans text-on-surface/90 pb-2 border-b border-outline/5 last:border-0">
                        <span className="font-mono text-primary font-bold shrink-0">0{idx + 1} //</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                <button 
                  onClick={() => {
                    setSelectedWorkout(null);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-6 w-full bg-primary hover:bg-[#ff3c0a] text-white font-anton text-xs py-3.5 uppercase tracking-widest border border-primary/20 cursor-pointer"
                >
                  START THIS PROTOCOL NOW
                </button>

              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
}
