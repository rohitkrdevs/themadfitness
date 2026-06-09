/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AssessmentInputs, AssessmentOutput } from '../types';
import { Scale, Heart, Flame, Dumbbell, ShieldAlert, CheckCircle, Save, Info, Award, User, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface AssessmentCalculatorProps {
  onAssessmentSave: (metrics: AssessmentOutput & { inputs: AssessmentInputs }) => void;
}

export default function AssessmentCalculator({ onAssessmentSave }: AssessmentCalculatorProps) {
  // Input states with robust default values
  const [inputs, setInputs] = useState<AssessmentInputs>({
    gender: 'male',
    weightKg: 75,
    heightCm: 175,
    age: 26,
    activityLevel: 'moderate',
    goal: 'muscle-building'
  });

  const [output, setOutput] = useState<AssessmentOutput | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  // Auto-calculate outputs whenever inputs mutate
  useEffect(() => {
    calculateAssessment();
  }, [inputs]);

  const calculateAssessment = () => {
    const { gender, weightKg, heightCm, age, activityLevel, goal } = inputs;

    // 1. Calculate BMI
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    let bmiCategory = "Normal Weight";
    if (bmi < 18.5) bmiCategory = "Underweight";
    else if (bmi >= 25 && bmi < 29.9) bmiCategory = "Overweight";
    else if (bmi >= 30) bmiCategory = "Obese Priority";

    // 2. Base BMR via Mifflin-St Jeor
    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // 3. TDEE factors
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extremely: 1.9
    };
    const tdee = bmr * activityMultipliers[activityLevel];

    // 4. Daily targeted energy deficit / surplus based on goal
    let dailyCalories = tdee;
    if (goal === 'fat-loss') {
      dailyCalories = tdee - 500;
      // Safeguard limits
      const floorLimit = gender === 'male' ? 1400 : 1200;
      if (dailyCalories < floorLimit) dailyCalories = floorLimit;
    } else if (goal === 'muscle-building') {
      dailyCalories = tdee + 350;
    } else if (goal === 'strength') {
      dailyCalories = tdee + 200;
    }

    // 5. Macro Distribution (Protein standard: ~2.0g per kg, fats roughly 25% value)
    let proteinG = Math.round(weightKg * 2.1);
    if (goal === 'general') proteinG = Math.round(weightKg * 1.6);
    
    const fatCalories = dailyCalories * 0.25;
    const fatsG = Math.round(fatCalories / 9);
    
    const remainderCalories = dailyCalories - (proteinG * 4) - (fatsG * 9);
    const carbsG = Math.round(Math.max(remainderCalories / 4, 30));

    // 6. Dynamic workout suggestions
    let workoutSuggestion = "Full Body Resistance: 3 Days per week split focus.";
    if (goal === 'muscle-building') {
      workoutSuggestion = "Hypertrophy Push/Pull/Legs: 4-5 Days/week split targeting peak metabolic stress.";
    } else if (goal === 'strength') {
      workoutSuggestion = "Structural Power 5/3/1 Compound Split: 4 Days/week strength progression template.";
    } else if (goal === 'fat-loss') {
      workoutSuggestion = "High-Intensity Circuit Training & Steady-State Conditioning: 4 Days/week metabolic activation.";
    }

    setOutput({
      bmi: parseFloat(bmi.toFixed(1)),
      bmiCategory,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      dailyCalories: Math.round(dailyCalories),
      proteinG,
      carbsG,
      fatsG,
      workoutSuggestion
    });
  };

  const handleSave = () => {
    if (output) {
      onAssessmentSave({ ...output, inputs });
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    }
  };

  const resetInputs = () => {
    setInputs({
      gender: 'male',
      weightKg: 75,
      heightCm: 175,
      age: 26,
      activityLevel: 'moderate',
      goal: 'muscle-building'
    });
  };

  return (
    <section id="assessment" className="py-24 bg-background border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-primary mb-2 block uppercase tracking-widest">
            03 // BIOANALYTICS
          </span>
          <h2 className="font-anton text-4xl md:text-5xl uppercase text-on-surface">
            Fitness Assessment Engine
          </h2>
          <p className="font-sans text-xs md:text-sm text-on-surface/70 mt-3 max-w-xl mx-auto leading-relaxed">
            Stop estimating your fuel and volume boundaries. Use our clinical baseline compiler to structure your metabolic threshold on Noida standards.
          </p>
        </div>

        {/* Calculator Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="calculator-split-grid">
          
          {/* Inputs Section */}
          <div className="lg:col-span-5 bg-surface-container-lowest border border-outline/30 p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex justify-between items-center border-b border-outline/15 pb-4">
                <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> DIAGNOSTIC PARAMETERS
                </span>
                <button 
                  onClick={resetInputs}
                  className="font-mono text-[10px] text-on-surface/50 hover:text-primary uppercase flex items-center gap-1 uppercase transition-colors"
                >
                  <RefreshCw className="w-3 h-3" /> RESET
                </button>
              </div>

              {/* Gender */}
              <div>
                <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60 block mb-2">GENDER REFERENCE</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['male', 'female'] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setInputs(prev => ({ ...prev, gender: g }))}
                      className={`py-3 font-mono text-xs uppercase border tracking-widest transition-all cursor-pointer ${
                        inputs.gender === g 
                          ? 'border-primary bg-primary/10 text-primary font-bold' 
                          : 'border-outline/20 hover:border-primary/50 text-on-surface'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60">MASS / BODYWEIGHT</label>
                  <span className="font-mono text-xs text-primary font-bold">{inputs.weightKg} KG</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="150" 
                  value={inputs.weightKg} 
                  onChange={(e) => setInputs(prev => ({ ...prev, weightKg: parseInt(e.target.value) }))}
                  className="w-full accent-primary bg-surface-container cursor-pointer h-1.5"
                />
                <div className="flex justify-between text-[10px] font-mono text-on-surface/40 mt-1">
                  <span>40 KG</span>
                  <span>95 KG</span>
                  <span>150 KG</span>
                </div>
              </div>

              {/* Height */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60">HEIGHT BOUNDS</label>
                  <span className="font-mono text-xs text-primary font-bold">{inputs.heightCm} CM</span>
                </div>
                <input 
                  type="range" 
                  min="130" 
                  max="220" 
                  value={inputs.heightCm} 
                  onChange={(e) => setInputs(prev => ({ ...prev, heightCm: parseInt(e.target.value) }))}
                  className="w-full accent-primary bg-surface-container cursor-pointer h-1.5"
                />
                <div className="flex justify-between text-[10px] font-mono text-on-surface/40 mt-1">
                  <span>130 CM</span>
                  <span>175 CM</span>
                  <span>220 CM</span>
                </div>
              </div>

              {/* Age */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60">AGE (YEARS)</label>
                  <span className="font-mono text-xs text-primary font-bold">{inputs.age} YRS</span>
                </div>
                <input 
                  type="range" 
                  min="15" 
                  max="75" 
                  value={inputs.age} 
                  onChange={(e) => setInputs(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                  className="w-full accent-primary bg-surface-container cursor-pointer h-1.5"
                />
                <div className="flex justify-between text-[10px] font-mono text-on-surface/40 mt-1">
                  <span>15 YRS</span>
                  <span>45 YRS</span>
                  <span>75 YRS</span>
                </div>
              </div>

              {/* Activity Multiplier */}
              <div>
                <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60 block mb-2">WEEKLY ACTIVITY FREQUENCY</label>
                <select 
                  value={inputs.activityLevel}
                  onChange={(e) => setInputs(prev => ({ ...prev, activityLevel: e.target.value as any }))}
                  className="w-full bg-surface-container border border-outline/20 p-3.5 text-xs text-on-surface focus:outline-none focus:border-primary font-sans rounded-none"
                >
                  <option value="sedentary">Sedentary (No specific exercise)</option>
                  <option value="light">Light Activity (1-2 Days light training)</option>
                  <option value="moderate">Moderate Training (3-4 Days rigorous load)</option>
                  <option value="active">Active High Frequency (5-6 Days intense focus)</option>
                  <option value="extremely">Extremely loaded (Elite level / twice daily)</option>
                </select>
              </div>

              {/* Objective */}
              <div>
                <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60 block mb-2">PRIMARY TRANSFORMATION GOAL</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'fat-loss', label: 'FAT LOSS' },
                    { id: 'muscle-building', label: 'MUSCLE REBUILD' },
                    { id: 'strength', label: 'PURE STRENGTH' },
                    { id: 'general', label: 'GENERAL INTENSITY' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setInputs(prev => ({ ...prev, goal: g.id as any }))}
                      className={`p-3 font-mono text-[10px] border tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                        inputs.goal === g.id 
                          ? 'border-primary bg-primary/10 text-primary font-bold' 
                          : 'border-outline/10 hover:border-primary/40 text-on-surface'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="mt-8">
              <button 
                onClick={handleSave}
                className="w-full bg-primary hover:bg-[#ff3c0a] text-white font-anton text-xs py-3 rounded-none flex items-center justify-center gap-2 cursor-pointer border border-primary/20 shadow-md transform active:scale-95 transition-transform"
              >
                <Save className="w-4 h-4" /> LOCK & STORE MY BLUEPRINT
              </button>
              {successMsg && (
                <p className="text-[11px] font-mono text-primary text-center mt-2.5 flex items-center justify-center gap-1 leading-none uppercase font-bold">
                  <CheckCircle className="w-3.5 h-3.5" /> Diagnostic metrics stored. Check review console!
                </p>
              )}
            </div>

          </div>

          {/* Outputs Panel */}
          <div className="lg:col-span-7 bg-surface-container-high dark:bg-[#0c0f0f] border border-outline/30 p-6 md:p-8 text-on-surface dark:text-[#e2e2e2] flex flex-col justify-between">
            {output ? (
              <div className="space-y-8">
                
                {/* Metric overview headers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  
                  {/* Calorie recommendation */}
                  <div className="p-4 bg-surface-container-low border border-outline/10 text-center relative overflow-hidden flex flex-col justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant font-bold">TARGET ENERGY</span>
                    <p className="font-anton text-2xl md:text-3xl text-primary my-1 leading-none">{output.dailyCalories}</p>
                    <span className="font-mono text-[8px] text-on-surface/40 uppercase">KCAL / DAILY</span>
                  </div>

                  {/* BMR */}
                  <div className="p-4 bg-surface-container-low border border-outline/10 text-center flex flex-col justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface/50">BASE RATE (BMR)</span>
                    <p className="font-anton text-2xl text-on-surface my-1 leading-none">{output.bmr}</p>
                    <span className="font-mono text-[8px] text-on-surface/40 uppercase">KCAL RESTING</span>
                  </div>

                  {/* TDEE */}
                  <div className="p-4 bg-surface-container-low border border-outline/10 text-center flex flex-col justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface/50">TOTAL ACTIVE TDEE</span>
                    <p className="font-anton text-2xl text-on-surface my-1 leading-none">{output.tdee}</p>
                    <span className="font-mono text-[8px] text-on-surface/40 uppercase">KCAL LOGGED</span>
                  </div>

                  {/* BMI */}
                  <div className="p-4 bg-surface-container-low border border-outline/10 text-center relative flex flex-col justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface/50">BMI STANDARD</span>
                    <p className="font-anton text-2xl text-on-surface my-1 leading-none">{output.bmi}</p>
                    <span className={`font-mono text-[8px] uppercase font-bold p-0.5 rounded-sm ${
                      output.bmiCategory.includes("Normal") ? "text-green-400 bg-green-950/20" : "text-primary bg-primary/10"
                    }`}>{output.bmiCategory}</span>
                  </div>

                </div>

                {/* Macromorphing protocol charts */}
                <div className="border border-outline/25 p-5 bg-surface-container-low">
                  <span className="font-mono text-[10px] text-primary uppercase font-bold block mb-4 tracking-widest flex items-center gap-1.5 border-b border-outline/10 pb-2">
                    <Flame className="w-3.5 h-3.5" /> DAILY MACRONUTRIENT DISTRIBUTION BLUEPRINT:
                  </span>
                  
                  <div className="space-y-4">
                    
                    {/* Protein bar block */}
                    <div>
                      <div className="flex justify-between font-mono text-xs mb-1">
                        <span className="font-bold flex items-center gap-1 text-on-surface">PROTEIN (ANABOLIC FOCUS)</span>
                        <span className="text-primary font-bold">{output.proteinG} GRAMS <span className="text-on-surface/40 text-[9px]">({output.proteinG * 4} Cal)</span></span>
                      </div>
                      <div className="w-full bg-surface-container-lowest dark:bg-[#121414] h-2 border border-outline/10">
                        <div className="bg-primary h-full transition-all duration-300" style={{ width: `${Math.min((output.proteinG / 250) * 100, 100)}%` }} />
                      </div>
                    </div>

                    {/* Carbohydrate bar block */}
                    <div>
                      <div className="flex justify-between font-mono text-xs mb-1">
                        <span className="font-bold text-on-surface">CARBOHYDRATES (KINETIC GLYCOGEN)</span>
                        <span className="text-on-surface font-semibold">{output.carbsG} GRAMS <span className="text-on-surface/40 text-[9px]">({output.carbsG * 4} Cal)</span></span>
                      </div>
                      <div className="w-full bg-surface-container-lowest dark:bg-[#121414] h-2 border border-outline/10">
                        <div className="bg-on-surface h-full transition-all duration-300" style={{ width: `${Math.min((output.carbsG / 400) * 100, 100)}%` }} />
                      </div>
                    </div>

                    {/* Fat bar block */}
                    <div>
                      <div className="flex justify-between font-mono text-xs mb-1">
                        <span className="font-bold text-on-surface font-medium">LIPIDS / HEALTHY FATS</span>
                        <span className="text-on-surface font-semibold">{output.fatsG} GRAMS <span className="text-on-surface/40 text-[9px]">({output.fatsG * 9} Cal)</span></span>
                      </div>
                      <div className="w-full bg-surface-container-lowest dark:bg-[#121414] h-2 border border-outline/10">
                        <div className="bg-gray-500 h-full transition-all duration-300" style={{ width: `${Math.min((output.fatsG / 150) * 100, 100)}%` }} />
                      </div>
                    </div>

                  </div>

                </div>

                {/* Workout blueprints suggestions */}
                <div className="border border-outline/25 p-5 bg-surface-container-low border-l-4 border-l-primary">
                  <span className="font-mono text-[10px] text-primary uppercase font-bold block mb-2 tracking-widest flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5" /> RECOMENDED PERFORMANCE SPLIT:
                  </span>
                  <p className="font-anton text-lg text-on-surface uppercase mb-1 leading-normal">
                    {output.workoutSuggestion}
                  </p>
                  
                  {/* Splitting info list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-3 border-t border-outline/10 font-mono text-[11px] text-on-surface/70">
                    <div className="space-y-1.5">
                      <p>✓ Core Split: Compound Base Priority</p>
                      <p>✓ Weekly Load: Stepwise Progressive Overload</p>
                    </div>
                    <div className="space-y-1.5">
                      <p>✓ Hydration target: 4.5 Liters daily minimum</p>
                      <p>✓ Rest recovery index: 7.5 Hours sleep priority</p>
                    </div>
                  </div>
                </div>

                {/* Safety declaration warning */}
                <div className="text-[10px] font-sans text-on-surface/50 leading-relaxed flex items-start gap-2 max-w-2xl">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>The compiled diagnostic recommendation metrics listed constitute baseline calculations modeled on Mifflin-St Jeor parameters on standard physiological rates. Prior to loaded strength applications, consult Head Coach Madhukar Mishra for exact form corrections and scaling.</span>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="font-mono text-sm uppercase animate-pulse">Initializing baseline engine...</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
