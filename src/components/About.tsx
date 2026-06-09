/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COACH_INFO } from '../data';
import { BadgeCheck, TrendingUp, Flame, Award, ChevronRight, Focus } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case "Check":
        return <BadgeCheck className="w-5 h-5 text-primary" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-primary" />;
      case "Flame":
        return <Flame className="w-5 h-5 text-primary" />;
      default:
        return <Award className="w-5 h-5 text-primary" />;
    }
  };

  const quoteSteps = [
    { title: "01. UNCOMPROMISING BIOMECHANICS", desc: "No randomized routines. Every lift, stance, and tempo is calculated to isolate specific motor units, maximizing myofibrillar development." },
    { title: "02. RADICAL ACCOUNTABILITY", desc: "Your results are a direct outcome of your dedication. Daily status reviews ensure absolute adherence to nutritional and load protocols." },
    { title: "03. SUSTAINABLE RECOMPOSITION", desc: "We construct metabolic furnaces. Fat loss is engineered via optimized energy pathways, not baseline caloric starvation." }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-surface-container-low border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Trainer Visual Card */}
          <div className="lg:col-span-5 relative" id="coach-image-card">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[3/4] relative overflow-hidden text-[#e2e2e2] border border-outline/30 bg-surface-container shadow-2xl group"
            >
              {/* Photo component */}
              <img 
                src={COACH_INFO.profileImage} 
                alt={`${COACH_INFO.fullName} - Head Coach`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Trust Tag */}
              <div className="absolute bottom-0 left-0 bg-surface-container-lowest/90 backdrop-blur-sm p-4 border-t border-r border-outline-variant/40">
                <p className="font-mono text-[10px] tracking-widest text-primary uppercase font-bold flex items-center gap-1.5 animate-pulse">
                  <Focus className="w-3 h-3 text-primary" /> CERTIFIED EXPERT HEAD COACH
                </p>
              </div>
            </motion.div>
          </div>

          {/* Coach Bio Text */}
          <div className="lg:col-span-7" id="coach-bio-text">
            <span className="font-mono text-xs text-primary mb-2 block uppercase tracking-widest">
              02 // LEADERSHIP
            </span>
            <h2 className="font-anton text-4xl md:text-5xl uppercase mb-6 tracking-tight text-on-surface">
              Meet <span className="text-primary italic">{COACH_INFO.fullName}</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-on-surface mb-6 leading-relaxed font-sans font-medium italic border-l-4 border-primary pl-4 max-w-2xl">
              "{COACH_INFO.intro}"
            </p>
            
            <p className="text-sm md:text-base text-on-surface/80 mb-8 max-w-3xl leading-relaxed">
              {COACH_INFO.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 mb-10" id="coach-badges-list">
              {COACH_INFO.badges.map((badge, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2.5 border border-outline/30 px-5 py-3 bg-surface-container-lowest shadow-sm hover:border-primary transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {getBadgeIcon(badge.icon)}
                  <span className="font-mono text-[11px] tracking-wider uppercase text-on-surface font-semibold">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Inquire deep links */}
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-primary border-b border-primary pb-1 uppercase hover:text-on-surface hover:border-on-surface transition-colors duration-200"
            >
              BOOK DIRECT CONSULTATION <ChevronRight className="w-4.5 h-4.5" />
            </a>
          </div>

        </div>

        {/* Dynamic Philosophy Pillars */}
        <div className="mt-20 pt-16 border-t border-outline-variant/30 grid grid-cols-1 md:grid-cols-3 gap-8" id="philosophical-pillars">
          {quoteSteps.map((pillar, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              key={i} 
              className="p-6 bg-surface-container-lowest border-l-2 border-primary hover:border-l-4 transition-all duration-200"
            >
              <h4 className="font-anton text-lg tracking-wider text-on-surface uppercase mb-3 text-primary">
                {pillar.title}
              </h4>
              <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
