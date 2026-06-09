import { useState } from 'react';
import { Dumbbell, Home, RefreshCw, Layers } from 'lucide-react';

export default function WorkoutPlanGenerator() {
  const [inputs, setInputs] = useState({
    goal: 'muscle-gain',
    experience: 'beginner',
    environment: 'gym',
    daysPerWeek: '4',
  });

  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePlan = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let title = "";
      let split = [];

      if (inputs.environment === 'home') {
        title = `${inputs.daysPerWeek}-Day Home Bodyweight & Bands Split`;
        split = [
          { day: "Day 1", name: "Upper Body Push & Core", focus: "Push-ups (4xFailure), Pike Push-ups (3x10), Plank (3x60s)" },
          { day: "Day 2", name: "Lower Body Explosive", focus: "Jump Squats (4x15), Bulgarian Split Squats (3x12/leg), Glute Bridges" },
          { day: "Day 3", name: "Active Recovery", focus: "30 Min Light Cardio / Yoga / Stretching" },
          { day: "Day 4", name: "Upper Body Pull (Bands) & Core", focus: "Band Rows (4x15), Band Pulldowns, Hollow Holds" },
          { day: "Day 5", name: "Full Body HIIT", focus: "Burpees, Mountain Climbers, Lunges (4 rounds, 45s on / 15s off)" },
        ];
      } else {
        if (inputs.daysPerWeek === '3') {
          title = "3-Day Full Body Compound Split";
          split = [
            { day: "Day 1", name: "Full Body A", focus: "Squats (3x5), Bench Press (3x5), Barbell Rows (3x8)" },
            { day: "Day 2", name: "Rest", focus: "Light walking" },
            { day: "Day 3", name: "Full Body B", focus: "Deadlifts (1x5), Overhead Press (3x5), Pull-ups (3xFailure)" },
            { day: "Day 4", name: "Rest", focus: "Light walking" },
            { day: "Day 5", name: "Full Body C", focus: "Front Squats (3x8), Incline DB Press (3x10), Seated Rows (3x10)" },
          ];
        } else if (inputs.daysPerWeek === '4') {
          title = "4-Day Upper/Lower Split";
          split = [
            { day: "Day 1", name: "Upper Power", focus: "Bench Press (4x5), Barbell Rows (4x5), OHP (3x8)" },
            { day: "Day 2", name: "Lower Power", focus: "Squats (4x5), Romanian Deadlifts (3x8), Calf Raises" },
            { day: "Day 3", name: "Rest", focus: "Active recovery" },
            { day: "Day 4", name: "Upper Hypertrophy", focus: "Incline DB (3x10), Lat Pulldown (3x10), Lateral Raises, Arms" },
            { day: "Day 5", name: "Lower Hypertrophy", focus: "Leg Press (3x12), Leg Curls (3x12), Lunges" },
          ];
        } else {
          title = "5-Day Push/Pull/Legs/Upper/Lower";
          split = [
            { day: "Day 1", name: "Push (Chest/Shoulders/Tris)", focus: "Bench Press, OHP, Dips, Tricep Extensions" },
            { day: "Day 2", name: "Pull (Back/Biceps)", focus: "Pull-ups, Barbell Rows, Face Pulls, Bicep Curls" },
            { day: "Day 3", name: "Legs (Quads/Hams/Calves)", focus: "Squats, Leg Press, RDLs, Calf Raises" },
            { day: "Day 4", name: "Upper Body", focus: "Incline Press, Seated Rows, Lateral Raises" },
            { day: "Day 5", name: "Lower Body", focus: "Deadlifts, Split Squats, Leg Extensions" },
          ];
        }
      }

      setGeneratedPlan({
        title,
        split: split.slice(0, parseInt(inputs.daysPerWeek) + (inputs.daysPerWeek === '3' ? 2 : 0)), // Adjust for rest days in visual
        disclaimer: "Start with 2 warm-up sets per compound movement. Progression: Add 2.5kg to compound lifts when you hit the top of the rep range."
      });
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Inputs Panel */}
      <div className="lg:col-span-4 bg-surface-container-lowest border border-outline/30 p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-outline/15 pb-4">
            <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest flex items-center gap-1">
              <Dumbbell className="w-3.5 h-3.5" /> WORKOUT PARAMETERS
            </span>
            <button 
              onClick={() => setGeneratedPlan(null)}
              className="font-mono text-[10px] text-on-surface/50 hover:text-primary uppercase flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> RESET
            </button>
          </div>

          {/* Goal */}
          <div>
            <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60 block mb-2">TRAINING GOAL</label>
            <select 
              value={inputs.goal}
              onChange={(e) => setInputs(prev => ({ ...prev, goal: e.target.value }))}
              className="w-full bg-surface-container border border-outline/20 p-3 text-xs text-on-surface focus:outline-none focus:border-primary font-sans"
            >
              <option value="fat-loss">Fat Loss & Conditioning</option>
              <option value="muscle-gain">Hypertrophy (Muscle Gain)</option>
              <option value="strength">Raw Strength</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60 block mb-2">EXPERIENCE LEVEL</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'beginner', label: 'BEGINNER' },
                { id: 'intermediate', label: 'INTERMEDIATE' },
                { id: 'advanced', label: 'ADVANCED' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setInputs(prev => ({ ...prev, experience: g.id }))}
                  className={`py-2.5 font-mono text-[9px] border tracking-wider uppercase transition-all ${
                    inputs.experience === g.id 
                      ? 'border-primary bg-primary/10 text-primary font-bold' 
                      : 'border-outline/10 hover:border-primary/40 text-on-surface'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Environment */}
          <div>
            <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60 block mb-2">ENVIRONMENT</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setInputs(prev => ({ ...prev, environment: 'gym' }))}
                className={`py-3 font-mono text-[10px] border tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                  inputs.environment === 'gym' 
                    ? 'border-primary bg-primary/10 text-primary font-bold' 
                    : 'border-outline/10 hover:border-primary/40 text-on-surface'
                }`}
              >
                <Dumbbell className="w-4 h-4" /> GYM ACCESS
              </button>
              <button
                onClick={() => setInputs(prev => ({ ...prev, environment: 'home' }))}
                className={`py-3 font-mono text-[10px] border tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                  inputs.environment === 'home' 
                    ? 'border-primary bg-primary/10 text-primary font-bold' 
                    : 'border-outline/10 hover:border-primary/40 text-on-surface'
                }`}
              >
                <Home className="w-4 h-4" /> HOME / NO EQUIP
              </button>
            </div>
          </div>

          {/* Days Per Week */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60">DAYS PER WEEK</label>
              <span className="font-mono text-xs text-primary font-bold">{inputs.daysPerWeek} DAYS</span>
            </div>
            <input 
              type="range" 
              min="3" 
              max="6" 
              value={inputs.daysPerWeek} 
              onChange={(e) => setInputs(prev => ({ ...prev, daysPerWeek: e.target.value }))}
              className="w-full accent-primary bg-surface-container cursor-pointer h-1.5"
            />
            <div className="flex justify-between text-[10px] font-mono text-on-surface/40 mt-1">
              <span>3</span><span>4</span><span>5</span><span>6</span>
            </div>
          </div>

        </div>

        <button 
          onClick={generatePlan}
          className="mt-8 w-full bg-on-surface text-surface hover:bg-on-surface/90 font-anton text-xs py-3.5 flex items-center justify-center gap-2 transition-transform active:scale-95 uppercase tracking-widest"
        >
          {isGenerating ? 'Compiling Split...' : 'GENERATE WORKOUT PLAN'}
        </button>
      </div>

      {/* Output Panel */}
      <div className="lg:col-span-8 bg-surface-container-high border border-outline/30 p-6 text-on-surface relative overflow-hidden flex flex-col">
        {generatedPlan ? (
          <div className="space-y-6 h-full flex flex-col">
            <div className="flex justify-between items-end border-b border-outline/20 pb-4">
              <div>
                <h3 className="font-anton text-3xl uppercase text-primary">TRAINING PROTOCOL</h3>
                <p className="font-mono text-[10px] text-on-surface/50 uppercase tracking-widest mt-1">
                  {inputs.goal.replace('-', ' ')} // {inputs.experience} // {inputs.environment}
                </p>
              </div>
              <div className="text-right bg-surface-container-low px-4 py-2 border border-outline/10">
                <p className="font-anton text-xl text-on-surface leading-none text-primary">{generatedPlan.title}</p>
              </div>
            </div>

            <div className="space-y-3 flex-grow overflow-y-auto pr-2">
              {generatedPlan.split.map((dayInfo: any, idx: number) => (
                <div key={idx} className={`p-4 border ${dayInfo.name.includes('Rest') ? 'bg-surface border-outline/10 opacity-70' : 'bg-surface-container-low border-outline/20'} flex flex-col md:flex-row md:items-center gap-4`}>
                  <div className="shrink-0 w-20">
                    <span className="font-anton text-xl text-on-surface/40">{dayInfo.day}</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-mono text-xs font-bold text-primary uppercase mb-1">{dayInfo.name}</h4>
                    <p className="font-sans text-sm text-on-surface/80">{dayInfo.focus}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 border-l-2 border-primary p-3 mt-4 shrink-0">
              <p className="font-mono text-[10px] text-on-surface/70 leading-relaxed uppercase">
                <span className="text-primary font-bold">PROGRESSION NOTE:</span> {generatedPlan.disclaimer}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <Layers className="w-12 h-12 mb-4" />
            <p className="font-mono text-xs uppercase tracking-widest text-center">Awaiting training parameters<br/>to compile split engine.</p>
          </div>
        )}
      </div>
    </div>
  );
}
