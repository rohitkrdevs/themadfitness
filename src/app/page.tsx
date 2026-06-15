"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AssessmentInputs, AssessmentOutput } from '../types';
import Header from '../components/Header';
import Services from '../components/Services';
import About, { CareerHistory } from '../components/About';
import Proof from '../components/Proof';
import Transformations from '../components/Transformations';
import TransformationHub from '../components/TransformationHub';
import Programs from '../components/Programs';
import LeadCapture from '../components/LeadCapture';
import WhatsAppWidget from '../components/WhatsAppWidget';
import { ShieldCheck, ChevronRight, CheckCircle2, MapPin } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('Fat Loss');
  const [savedBlueprint, setSavedBlueprint] = useState<(AssessmentOutput & { inputs: AssessmentInputs }) | null>(null);

  // Load theme and saved blueprint from LocalStorage on mount
  useEffect(() => {
    // Sync Theme
    const storedTheme = localStorage.getItem('mad_fitness_theme');
    if (storedTheme === 'dark') {
      setIsDark(true);
    } else {
      setIsDark(false);
    }

    // Sync Blueprint
    const storedBlueprint = localStorage.getItem('mad_fitness_blueprint');
    if (storedBlueprint) {
      try {
        setSavedBlueprint(JSON.parse(storedBlueprint));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Update theme classes on document changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mad_fitness_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mad_fitness_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleAssessmentSave = (metrics: AssessmentOutput & { inputs: AssessmentInputs }) => {
    setSavedBlueprint(metrics);
    localStorage.setItem('mad_fitness_blueprint', JSON.stringify(metrics));
  };

  const handleSelectProgramGoal = (goal: string) => {
    setSelectedGoal(goal);
  };

  const resetGoal = () => {
    setSelectedGoal('');
  };

  const handleClearBlueprint = () => {
    setSavedBlueprint(null);
    localStorage.removeItem('mad_fitness_blueprint');
  };

  return (
    <div className="bg-background text-on-surface min-h-screen transition-colors duration-300 font-sans selection:bg-primary selection:text-white">
      {/* Navbar header */}
      <Header isDark={isDark} onThemeToggle={toggleTheme} />

      {/* Coach-led hero */}
      <header id="home" className="relative min-h-[100svh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-background dark:bg-[#050505]">
        
        {/* Abstract glowing background orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] opacity-60 mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#ff8c42]/10 blur-[100px] opacity-40 mix-blend-screen" />
        </div>

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-14 items-center">
          
          <div className="flex flex-col items-start text-left order-1">
            <p className="font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase font-bold text-primary">
              Fitness Coach &amp; Consultant
            </p>

            <h1
              className="font-anton text-[3.8rem] sm:text-[6.4rem] lg:text-[7.4rem] xl:text-[8.5rem] tracking-tight uppercase leading-[0.82] text-on-surface dark:text-white mt-5"
              id="hero-main-title"
            >
              MADHUKAR
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff8c42]">
                MISHRA
              </span>
            </h1>

            <p className="font-sans text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mt-8 leading-relaxed font-medium">
              Results-driven personal coaching built around strength and conditioning, weight loss, safe technique, and workout plans tailored to the individual.
            </p>

            <div className="grid grid-cols-3 w-full max-w-2xl mt-9 border-y border-black/10 dark:border-white/10">
              {[
                { value: '7+', label: 'Years Experience' },
                { value: '300+', label: 'People Coached' },
                { value: 'Level 4', label: 'NSDC Certified' }
              ].map((stat) => (
                <div key={stat.label} className="py-5 pr-3 sm:px-5 first:pl-0 border-r border-black/10 dark:border-white/10 last:border-r-0">
                  <strong className="font-anton text-2xl sm:text-3xl text-on-surface dark:text-white uppercase tracking-wide block">{stat.value}</strong>
                  <span className="font-mono text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-wider mt-1 block">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-9 w-full sm:w-auto">
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative bg-black dark:bg-white text-white dark:text-black font-anton text-sm py-5 px-10 uppercase tracking-[0.15em] overflow-hidden rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center gap-3"
              >
                <span className="relative z-10">WORK WITH MADHUKAR</span>
                <ChevronRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gray-800 dark:bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </a>
              <a 
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-transparent border border-black/20 dark:border-white/20 text-on-surface dark:text-white hover:bg-black/5 dark:hover:bg-white/5 font-anton text-sm py-5 px-10 uppercase tracking-[0.15em] rounded-2xl transition-all duration-300 flex items-center justify-center"
              >
                VIEW EXPERIENCE
              </a>
            </div>

            {savedBlueprint ? (
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-wider text-gray-500">
                <a href="#assessment" className="flex items-center gap-2 text-primary hover:text-on-surface transition-colors">
                  <ShieldCheck className="w-4 h-4" /> Your saved fitness baseline is ready
                </a>
                <button onClick={handleClearBlueprint} className="hover:text-on-surface transition-colors cursor-pointer">Discard</button>
              </div>
            ) : null}
          </div>

          <div className="relative w-full max-w-[38rem] mx-auto lg:mr-0 aspect-[4/5] lg:aspect-auto lg:h-[76vh] lg:max-h-[780px] order-2 rounded-[2.5rem] overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl group bg-[#171513]">
            <div className="absolute inset-0 z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.28)] pointer-events-none rounded-[2.5rem]" />
            
            <img 
              src="/images/madhukar-mishra.jpg"
              alt="Madhukar Mishra, fitness coach and consultant"
              className="w-full h-full object-cover object-[center_36%] transition-transform duration-[2s] group-hover:scale-[1.03]"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
            
            <div className="absolute bottom-7 left-7 right-7 z-20 text-white">
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-widest text-white/75 mb-4">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> BWF Level 1 Coach</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> New Delhi</span>
              </div>
              <p className="font-anton text-3xl sm:text-4xl uppercase tracking-wide">Strength. Discipline. Results.</p>
            </div>
          </div>

        </div>
      </header>

      {/* Main Blocks */}
      <main>
        {/* Coach Bio block */}
        <About />

        {/* Career history, credentials, and education */}
        <CareerHistory />

        {/* Actions Proof Inspectable Modal block */}
        <Proof />

        {/* Client transformation gallery */}
        <Transformations />

        {/* Services Bento Grid block */}
        <Services />

        {/* Pricing tiers block */}
        <Programs onSelectProgramGoal={handleSelectProgramGoal} />

        {/* Fitness assessment mathematical module */}
        <TransformationHub onAssessmentSave={handleAssessmentSave} />

        {/* Consultation registry & local database logging logs */}
        <LeadCapture selectedInquiryGoal={selectedGoal} onResetGoal={resetGoal} />
      </main>

      {/* Footer copyright and safety warning sections */}
      <footer className="bg-surface-container-lowest dark:bg-[#0c0f0f] border-t border-outline/20 py-16 text-center text-on-surface dark:text-[#e2e2e2]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
          
          <div className="space-y-4">
            <h3 className="font-anton text-2xl tracking-wide text-primary uppercase">
              THE MAD FITNESS
            </h3>
            <p className="font-sans text-xs text-gray-400 max-w-md leading-relaxed">
              Results-driven personal training, strength and conditioning, fitness assessments, group fitness, and nutrition counselling by Madhukar Mishra in New Delhi.
            </p>
            <p className="font-mono text-[9px] text-gray-500 uppercase">
              ALL RIGHTS RESERVED © {new Date().getFullYear()} // KINETIC DISCIPLINE ARCHITECTURE
            </p>
          </div>

          <div className="space-y-4 md:text-right font-mono text-[10px] text-gray-500">
            <p className="font-semibold text-gray-700 dark:text-gray-300 uppercase">CLINICAL DIRECTIVE WARNING</p>
            <p className="max-w-sm md:ml-auto leading-relaxed">
              Exercise activities can be physically taxing. Consultation options do not constitute certified psychiatric recommendations. Form correction routines must be vetted by Head Coach Madhukar Mishra before compound lift loads.
            </p>
            <div className="flex gap-4 md:justify-end text-primary hover:text-black dark:hover:text-white transition-colors">
              <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:underline">SERVICES</a> • 
              <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:underline">COACH</a> • 
              <a href="#assessment" onClick={(e) => { e.preventDefault(); document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:underline">CALCULATOR</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Action Buttons */}
      <WhatsAppWidget />
    </div>
  );
}
