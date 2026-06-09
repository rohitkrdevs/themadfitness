/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PROGRAMS } from '../data';
import { Program } from '../types';
import { Users, User, Apple, Check, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgramsProps {
  onSelectProgramGoal: (goal: string) => void;
}

export default function Programs({ onSelectProgramGoal }: ProgramsProps) {
  
  const getProgramIcon = (iconName: string) => {
    switch (iconName) {
      case "Group":
        return <Users className="w-8 h-8 text-primary" />;
      case "Personal":
        return <Star className="w-8 h-8 text-primary animate-spin-slow" />;
      case "Nutrition":
        return <Apple className="w-8 h-8 text-primary" />;
      default:
        return <User className="w-8 h-8 text-primary" />;
    }
  };

  // Maps program index to a preset goal in the inquiry select form
  const handleSelect = (programTitle: string) => {
    let mapping = "General Fitness";
    if (programTitle.includes("Personal")) {
      mapping = "Muscle Building";
    } else if (programTitle.includes("Nutrition")) {
      mapping = "Fat Loss";
    } else if (programTitle.includes("Group")) {
      mapping = "Strength Training";
    }
    
    // Set form selected goal
    onSelectProgramGoal(mapping);
    
    // Scroll smoothly to contact
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="plans" className="py-24 md:py-32 bg-surface-container-low border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title Block */}
        <div className="mb-16 text-center">
          <span className="font-mono text-xs text-primary mb-2 block uppercase tracking-widest">
            04 // COMMITMENT
          </span>
          <h2 className="font-anton text-4xl md:text-5xl uppercase text-on-surface">
            Training Programs
          </h2>
          <p className="font-sans text-xs md:text-sm text-on-surface/70 mt-4 max-w-xl mx-auto leading-relaxed">
            High performance rates. Choose your entry paradigm, select from absolute accountability layers, and start your progression immediately.
          </p>
        </div>

        {/* Dynamic Card Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6" id="pricing-plans-grid">
          {PROGRAMS.map((program, idx) => {
            const isHighlighted = program.isRecommended;
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`flex flex-col h-full hover:border-primary transition-all duration-300 relative ${
                  isHighlighted 
                    ? 'bg-surface p-8 border-2 border-primary shadow-[0_4px_30px_rgba(255,86,43,0.15)] md:-translate-y-4' 
                    : 'bg-surface-container-lowest p-8 border border-outline/30 shadow-sm'
                }`}
              >
                {/* Floating highlight tag */}
                {isHighlighted && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-mono font-extrabold uppercase px-4 py-1.5 tracking-widest">
                    RECOMMENDED
                  </div>
                )}

                {/* Card Icon & Header */}
                <div className="mb-6">
                  <div className="mb-4 p-3 bg-surface-container/50 border border-outline/10 w-fit">
                    {getProgramIcon(program.iconName)}
                  </div>
                  <h3 className={`font-anton text-2xl uppercase ${isHighlighted ? 'text-primary' : 'text-on-surface'}`}>
                    {program.title}
                  </h3>
                  <p className="font-sans text-xs text-on-surface/70 mt-2 leading-relaxed h-[48px] overflow-hidden">
                    {program.tagline}
                  </p>
                </div>

                {/* Bullet parameters */}
                <div className="border-t border-outline/10 pt-6 flex-grow">
                  <span className="font-mono text-[9px] text-on-surface/40 uppercase tracking-widest block mb-4 font-bold">
                    INCLUSIVES & MILESTONES:
                  </span>
                  <ul className="space-y-4 mb-10">
                    {program.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <div className="shrink-0 p-0.5 border border-primary/20 bg-primary/10 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="font-sans text-xs text-on-surface leading-normal font-medium">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to action triggers */}
                <button 
                  onClick={() => handleSelect(program.title)}
                  className={`w-full font-anton text-xs py-3.5 uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    isHighlighted 
                      ? 'bg-primary hover:bg-[#ff3c0a] text-white' 
                      : 'border border-on-surface text-on-surface hover:bg-on-surface hover:text-surface'
                  }`}
                >
                  {program.actionText} <ArrowRight className="w-3 h-3 pt-0.5" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
