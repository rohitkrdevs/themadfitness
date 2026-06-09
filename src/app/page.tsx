"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AssessmentInputs, AssessmentOutput } from '../types';
import Header from '../components/Header';
import Services from '../components/Services';
import About from '../components/About';
import Proof from '../components/Proof';
import TransformationHub from '../components/TransformationHub';
import Programs from '../components/Programs';
import LeadCapture from '../components/LeadCapture';
import WhatsAppWidget from '../components/WhatsAppWidget';
import { Dumbbell, Target, Users, Scale, ShieldCheck, Heart, ArrowDown, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';

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

      {/* Hero Block - Modern Split Layout */}
      <header id="home" className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-background dark:bg-[#050505]">
        
        {/* Abstract glowing background orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] opacity-60 mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#ff8c42]/10 blur-[100px] opacity-40 mix-blend-screen" />
        </div>

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Actions */}
          <div className="flex flex-col items-start text-left order-2 lg:order-1 pt-10 lg:pt-0">
            {/* Animated badge tag */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-3 bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 px-5 py-2.5 rounded-full text-black/90 dark:text-white/90 shadow-lg"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              SCIENTIFIC ATHLETIC COACHING
            </motion.div>

            {/* Master Slogan */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              className="font-anton text-6xl sm:text-7xl lg:text-[7.5rem] xl:text-[9rem] tracking-tight uppercase leading-[0.85] text-on-surface dark:text-white"
              id="hero-main-title"
            >
              KINETIC
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff8c42]">
                DISCIPLINE
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
              className="font-sans text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mt-8 leading-relaxed font-medium"
            >
              No shortcuts. No compromises. Pure biomechanics, target nutrition protocols, and radical metric tracking by Head Coach <span className="text-black dark:text-white">Madhukar Mishra</span>.
            </motion.p>

            {/* Calorie/BMI active status readout */}
            {savedBlueprint ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 bg-black/5 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-6 w-full rounded-3xl shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4 mb-4 font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                  <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> SYNCED DEVICE PROFILE</span>
                  <button 
                    onClick={handleClearBlueprint}
                    className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors cursor-pointer uppercase flex items-center gap-1"
                  >
                    DISCARD <span className="text-lg leading-none">&times;</span>
                  </button>
                </div>
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-on-surface dark:text-white font-mono text-xs">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-gray-500 text-[9px] uppercase tracking-widest">GENDER / AGE</span>
                    <span className="font-bold uppercase text-base">{savedBlueprint.inputs.gender} / {savedBlueprint.inputs.age} <span className="text-primary text-[10px]">YRS</span></span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-gray-500 text-[9px] uppercase tracking-widest">BMI METRICS</span>
                    <span className="font-bold text-base">{savedBlueprint.bmi} <span className="text-primary text-[10px] tracking-widest">({savedBlueprint.bmiCategory})</span></span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-gray-500 text-[9px] uppercase tracking-widest">DAILY INTAKE</span>
                    <span className="font-bold text-base">{savedBlueprint.dailyCalories} <span className="text-primary text-[10px] tracking-widest">KCAL</span></span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-gray-500 text-[9px] uppercase tracking-widest">MACROS STRATEGY</span>
                    <span className="font-bold text-sm tracking-wide mt-0.5"><span className="text-black dark:text-white">{savedBlueprint.proteinG}</span><span className="text-primary">P</span> <span className="text-black dark:text-white">{savedBlueprint.carbsG}</span><span className="text-primary">C</span> <span className="text-black dark:text-white">{savedBlueprint.fatsG}</span><span className="text-primary">F</span></span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 font-mono text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-3"
              >
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse delay-75" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse delay-150" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-300" />
                </div>
                <span>STATUS: Baseline unconfigured.</span>
              </motion.div>
            )}

            {/* Hero Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 mt-12 w-full sm:w-auto"
            >
              <a 
                href="#assessment"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative bg-black dark:bg-white text-white dark:text-black font-anton text-sm py-5 px-10 uppercase tracking-[0.15em] overflow-hidden rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center gap-3"
              >
                <span className="relative z-10">COMPILE BASELINE</span>
                <ChevronRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gray-800 dark:bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </a>
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-transparent border border-black/20 dark:border-white/20 text-on-surface dark:text-white hover:bg-black/5 dark:hover:bg-white/5 font-anton text-sm py-5 px-10 uppercase tracking-[0.15em] rounded-2xl transition-all duration-300 flex items-center justify-center"
              >
                CONSULTATION
              </a>
            </motion.div>
          </div>

          {/* Right Column: Modern Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[75vh] order-1 lg:order-2 rounded-[2.5rem] overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl group"
          >
            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 z-10 shadow-[inset_0_0_40px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none rounded-[2.5rem]" />
            
            <img 
              src="/images/hero.jpg" 
              alt="The Mad Fitness Training Arena" 
              className="w-full h-full object-cover grayscale transition-transform duration-[2s] group-hover:scale-105 group-hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            
            {/* Elegant gradient overlay specifically for the image card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-primary/10 mix-blend-multiply" />
            
            {/* Floating label on the image */}
            <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
              <div className="bg-white/60 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/50 dark:border-white/10">
                <p className="font-mono text-[10px] text-black/70 dark:text-white/70 uppercase tracking-widest">Location</p>
                <p className="font-sans font-bold text-black dark:text-white text-sm">NOIDA & RANCHI</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white">
                <Target className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

        </div>
      </header>

      {/* Main Blocks */}
      <main>
        {/* Services Bento Grid block */}
        <Services />

        {/* Coach Bio block */}
        <About />

        {/* Actions Proof Inspectable Modal block */}
        <Proof />

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
              Premium physical transformation, biomechanics design, and diagnostic nutrition protocols. Operated locally in Noida and Ranchi, India. Offering expert fitness coaching, custom diet plans, and badminton coaching.
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
