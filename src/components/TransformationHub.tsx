import { useState, useEffect } from 'react';
import { AssessmentInputs, AssessmentOutput } from '../types';
import BodyGoalCalculator from './tools/BodyGoalCalculator';
import DietPlanGenerator from './tools/DietPlanGenerator';
import WorkoutPlanGenerator from './tools/WorkoutPlanGenerator';
import ProgressTracker from './tools/ProgressTracker';
import { ShieldAlert, Activity, Utensils, Dumbbell, User } from 'lucide-react';
import { motion } from 'motion/react';

interface TransformationHubProps {
  onAssessmentSave: (metrics: AssessmentOutput & { inputs: AssessmentInputs }) => void;
}

export default function TransformationHub({ onAssessmentSave }: TransformationHubProps) {
  const [activeTab, setActiveTab] = useState('diagnostics');
  const [blueprint, setBlueprint] = useState<AssessmentOutput | null>(null);

  // Auto-sync blueprint from localstorage just in case we need it to prepopulate diet
  useEffect(() => {
    const storedBlueprint = localStorage.getItem('mad_fitness_blueprint');
    if (storedBlueprint) {
      try {
        setBlueprint(JSON.parse(storedBlueprint));
      } catch (e) {}
    }
  }, []);

  const handleAssessmentSave = (metrics: AssessmentOutput & { inputs: AssessmentInputs }) => {
    setBlueprint(metrics);
    onAssessmentSave(metrics);
  };

  const tabs = [
    { id: 'diagnostics', label: 'DIAGNOSTICS & BMI', icon: <User className="w-4 h-4" /> },
    { id: 'diet', label: 'NUTRITION PROTOCOL', icon: <Utensils className="w-4 h-4" /> },
    { id: 'workout', label: 'TRAINING ENGINE', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'tracker', label: 'PROGRESS LOGS', icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <section id="assessment" className="py-24 bg-background border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary font-bold mb-3">03 // BIOANALYTICS</p>
          <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wide text-on-surface">
            TRANSFORMATION <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff8c42]">HUB</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-gray-500 max-w-2xl mt-4 leading-relaxed">
            Generate your complete metabolic blueprint, tailored nutrition plans, and periodized training splits based on standard physiological formulas.
          </p>
        </motion.div>

        {/* Global Warning Notice */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8 bg-red-500/10 dark:bg-red-950/20 border-l-4 border-red-500 p-4 md:p-6 flex gap-4"
        >
          <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-1 text-on-surface">
            <h4 className="font-anton text-lg tracking-wider text-red-500 dark:text-red-400 uppercase">CLINICAL DIRECTIVE NOTICE</h4>
            <p className="font-sans text-xs md:text-sm text-on-surface/80 leading-relaxed font-medium">
              These generated templates are modeled on generalized physiological rates (e.g., Mifflin-St Jeor). 
              <span className="font-bold"> They may not be 100% accurate for every individual.</span> Please consult an expert or Head Coach Madhukar Mishra before executing aggressive diets or compound lift loads.
            </p>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-outline/20 mb-8 pb-[1px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors relative ${
                activeTab === tab.id 
                  ? 'text-primary' 
                  : 'text-on-surface/50 hover:text-on-surface'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Active Tool Renderer */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-[600px]"
        >
          {activeTab === 'diagnostics' && <BodyGoalCalculator onAssessmentSave={handleAssessmentSave} />}
          {activeTab === 'diet' && <DietPlanGenerator blueprint={blueprint} />}
          {activeTab === 'workout' && <WorkoutPlanGenerator />}
          {activeTab === 'tracker' && <ProgressTracker />}
        </motion.div>

      </div>
    </section>
  );
}
