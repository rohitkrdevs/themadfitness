/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SERVICES } from '../data';
import { Dumbbell, Flame, Users, Apple, Activity, Sparkles, ChevronRight, Calculator } from 'lucide-react';
import { motion } from 'motion/react';

export default function Services() {
  
  // Dynamic icon map returning Lucide components
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Dumbbell":
        return <Dumbbell className="w-10 h-10 text-primary" />;
      case "Flame":
        return <Flame className="w-10 h-10 text-primary" />;
      case "Users":
        return <Users className="w-10 h-10 text-primary" />;
      case "Apple":
        return <Apple className="w-10 h-10 text-primary" />;
      case "Activity":
        return <Activity className="w-10 h-10 text-primary" />;
      default:
        return <Sparkles className="w-10 h-10 text-primary" />;
    }
  };

  const handleAssessmentScroll = () => {
    document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-background border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title Section */}
        <div className="mb-16 md:flex md:justify-between md:items-end">
          <div>
            <span className="font-mono text-xs text-primary mb-2 block uppercase tracking-widest">
              01 // DISCIPLINE
            </span>
            <h2 className="font-anton text-4xl md:text-5xl uppercase text-on-surface">
              Featured Services
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-on-surface/70 md:max-w-md mt-4 md:mt-0 leading-relaxed font-medium">
            Meticulously engineered personal coaching modules tailored for athletes, body recomposition seekers, and elite high performers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="services-bento-grid">
          
          {SERVICES.map((service, idx) => {
            // Service 1 gets big col-span span 8, remainder get span 4
            const isFirst = idx === 0;
            const gridClass = isFirst 
              ? "md:col-span-8 p-8 md:p-10 bg-surface-container-lowest border border-outline/30 hover:border-primary transition-all duration-300 relative overflow-hidden flex flex-col justify-between group shadow-lg min-h-[280px]"
              : "md:col-span-4 p-8 bg-surface-container-lowest border border-outline/30 hover:border-primary transition-all duration-300 relative overflow-hidden flex flex-col justify-between group shadow-sm min-h-[280px]";

            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={gridClass}
              >
                {/* Background lighting effect */}
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                {/* Floating graphic overlay for the larger card */}
                {isFirst && (
                  <div className="absolute right-[-20px] bottom-[-20px] opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                    <Dumbbell className="w-56 h-56 text-primary" />
                  </div>
                )}

                <div>
                  <div className="mb-6 p-3 bg-surface-container/50 border border-outline/10 w-fit group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 transform group-hover:scale-110">
                    {getServiceIcon(service.iconName)}
                  </div>
                  
                  <h3 className="font-anton text-2xl md:text-3xl uppercase mb-3 text-on-surface tracking-tight group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className={`text-xs md:text-sm text-on-surface/70 leading-relaxed font-sans ${isFirst ? 'max-w-xl' : ''}`}>
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-outline/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-primary group-hover:text-on-surface font-bold uppercase tracking-wider transition-colors">
                    0{idx + 1} • DETAILED SPECIFICATION
                  </span>
                  
                  {service.id === "s5" ? (
                    <button 
                      onClick={handleAssessmentScroll}
                      className="text-xs font-mono font-bold uppercase tracking-widest text-primary flex items-center gap-1 hover:text-on-surface transition-colors cursor-pointer"
                    >
                      RUN CALC <Calculator className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-mono font-bold uppercase tracking-widest text-primary flex items-center gap-1 hover:text-on-surface transition-colors"
                    >
                      BOOK <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
