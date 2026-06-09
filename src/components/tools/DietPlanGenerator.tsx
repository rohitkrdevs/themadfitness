import { useState, useEffect } from 'react';
import { AssessmentOutput } from '../../types';
import { Utensils, Info, CheckCircle, RefreshCw, Leaf, Apple, Coffee } from 'lucide-react';

interface DietPlanGeneratorProps {
  blueprint: AssessmentOutput | null;
}

export default function DietPlanGenerator({ blueprint }: DietPlanGeneratorProps) {
  const [inputs, setInputs] = useState({
    goal: 'fat-loss',
    dietType: 'veg',
    mealsPerDay: '4',
    budget: 'standard',
    allergies: [] as string[]
  });

  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // If blueprint exists, sync the goal
  useEffect(() => {
    if (blueprint) {
      // Trying to infer goal based on calories or just standard
      // In a real app we'd pass the inputs too, but let's default to a safe value
    }
  }, [blueprint]);

  const toggleAllergy = (allergy: string) => {
    setInputs(prev => {
      const exists = prev.allergies.includes(allergy);
      if (exists) {
        return { ...prev, allergies: prev.allergies.filter(a => a !== allergy) };
      } else {
        return { ...prev, allergies: [...prev.allergies, allergy] };
      }
    });
  };

  const generatePlan = () => {
    setIsGenerating(true);
    
    // Simulate API or complex generation delay
    setTimeout(() => {
      const cals = blueprint?.dailyCalories || 1800;
      const targetProtein = blueprint?.proteinG || 120;
      
      let meals = [];
      
      // Simple mock database of Indian meals based on dietType
      if (inputs.dietType === 'veg') {
        meals = [
          { name: "Breakfast", items: ["Paneer Bhurji (150g) with 2 Multigrain Roti", "Black Coffee / Green Tea"], cals: 450, p: 25 },
          { name: "Lunch", items: ["Dal Tadka (1 katori)", "Soya Chunks Curry (50g)", "1 Roti", "Cucumber Salad"], cals: 500, p: 35 },
          { name: "Snack", items: ["Roasted Makhana (30g)", "Whey Protein Shake (1 scoop)"], cals: 250, p: 25 },
          { name: "Dinner", items: ["Mixed Veg Sabzi", "Tofu/Paneer Tikka (100g)", "Small portion Brown Rice"], cals: 400, p: 20 },
        ];
      } else if (inputs.dietType === 'non-veg') {
        meals = [
          { name: "Breakfast", items: ["4 Egg Whites, 2 Whole Eggs Omelette", "1 Slice Whole Wheat Toast", "Black Coffee"], cals: 400, p: 30 },
          { name: "Lunch", items: ["Chicken Breast Curry (150g)", "1 Roti", "Mixed Green Salad"], cals: 550, p: 45 },
          { name: "Snack", items: ["Boiled Chana Chaat", "Whey Protein (1 scoop)"], cals: 300, p: 30 },
          { name: "Dinner", items: ["Grilled Fish / Chicken Tikka (150g)", "Sauteed Broccoli & Beans"], cals: 450, p: 40 },
        ];
      } else {
        meals = [
          { name: "Breakfast", items: ["Moong Dal Chilla (2 pcs) with Mint Chutney", "Black Coffee"], cals: 350, p: 15 },
          { name: "Lunch", items: ["Rajma Masala (1.5 katori)", "Brown Rice (small portion)", "Cucumber Salad"], cals: 500, p: 20 },
          { name: "Snack", items: ["Roasted Chana (50g)", "Vegan Plant Protein Shake"], cals: 300, p: 30 },
          { name: "Dinner", items: ["Tofu Stir Fry (150g) with Bell Peppers", "Quinoa (small portion)"], cals: 450, p: 25 },
        ];
      }

      setGeneratedPlan({
        totalCalories: cals,
        targetProtein,
        meals,
        disclaimer: "Hydrate with at least 4 liters of water. Adjust portion sizes visually to hit your exact macro targets."
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
              <Utensils className="w-3.5 h-3.5" /> DIET PARAMETERS
            </span>
            <button 
              onClick={() => setGeneratedPlan(null)}
              className="font-mono text-[10px] text-on-surface/50 hover:text-primary uppercase flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> RESET
            </button>
          </div>

          {!blueprint && (
            <div className="bg-primary/10 border border-primary/20 p-3 flex gap-2">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-[10px] font-mono text-primary leading-relaxed">
                You haven't compiled a baseline assessment yet. Using generalized 1800 kcal baseline. Run Diagnostics first for extreme accuracy.
              </p>
            </div>
          )}

          {/* Goal */}
          <div>
            <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60 block mb-2">DIET OBJECTIVE</label>
            <select 
              value={inputs.goal}
              onChange={(e) => setInputs(prev => ({ ...prev, goal: e.target.value }))}
              className="w-full bg-surface-container border border-outline/20 p-3 text-xs text-on-surface focus:outline-none focus:border-primary font-sans"
            >
              <option value="fat-loss">Aggressive Fat Loss</option>
              <option value="muscle-gain">Lean Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* Diet Type */}
          <div>
            <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60 block mb-2">DIETARY PREFERENCE</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'veg', label: 'VEG' },
                { id: 'non-veg', label: 'NON-VEG' },
                { id: 'vegan', label: 'VEGAN' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setInputs(prev => ({ ...prev, dietType: g.id }))}
                  className={`py-2.5 font-mono text-[10px] border tracking-wider uppercase transition-all ${
                    inputs.dietType === g.id 
                      ? 'border-primary bg-primary/10 text-primary font-bold' 
                      : 'border-outline/10 hover:border-primary/40 text-on-surface'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div>
            <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60 block mb-2">EXCLUSIONS / ALLERGIES</label>
            <div className="flex flex-wrap gap-2">
              {['Dairy', 'Gluten', 'Nuts', 'Soy'].map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => toggleAllergy(allergy)}
                  className={`px-3 py-1.5 font-mono text-[9px] border uppercase transition-all ${
                    inputs.allergies.includes(allergy)
                      ? 'border-red-500 bg-red-500/10 text-red-500'
                      : 'border-outline/20 text-on-surface/60 hover:border-outline/50'
                  }`}
                >
                  {inputs.allergies.includes(allergy) ? '✕ ' : '+ '}{allergy}
                </button>
              ))}
            </div>
          </div>

        </div>

        <button 
          onClick={generatePlan}
          className="mt-8 w-full bg-on-surface text-surface hover:bg-on-surface/90 font-anton text-xs py-3.5 flex items-center justify-center gap-2 transition-transform active:scale-95 uppercase tracking-widest"
        >
          {isGenerating ? 'Compiling Protocol...' : 'GENERATE MEAL PLAN'}
        </button>
      </div>

      {/* Output Panel */}
      <div className="lg:col-span-8 bg-surface-container-high border border-outline/30 p-6 text-on-surface relative overflow-hidden flex flex-col">
        {generatedPlan ? (
          <div className="space-y-6 h-full flex flex-col">
            <div className="flex justify-between items-end border-b border-outline/20 pb-4">
              <div>
                <h3 className="font-anton text-3xl uppercase text-primary">NUTRITION PROTOCOL</h3>
                <p className="font-mono text-[10px] text-on-surface/50 uppercase tracking-widest mt-1">
                  {inputs.goal.replace('-', ' ')} // {inputs.dietType} // {inputs.allergies.join(', ') || 'No Exclusions'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-anton text-2xl text-on-surface leading-none">{generatedPlan.totalCalories} <span className="text-sm text-primary">KCAL</span></p>
                <p className="font-mono text-[10px] text-on-surface/50 uppercase tracking-widest mt-1">{generatedPlan.targetProtein}G PROTEIN TARGET</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
              {generatedPlan.meals.map((meal: any, idx: number) => (
                <div key={idx} className="bg-surface-container-low border border-outline/10 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-1.5">
                      {idx === 0 && <Coffee className="w-3.5 h-3.5" />}
                      {idx === 1 && <Utensils className="w-3.5 h-3.5" />}
                      {idx === 2 && <Apple className="w-3.5 h-3.5" />}
                      {idx === 3 && <Leaf className="w-3.5 h-3.5" />}
                      {meal.name}
                    </span>
                    <span className="font-mono text-[9px] bg-background px-2 py-0.5 border border-outline/10 text-on-surface/60">
                      {meal.cals} CAL | {meal.p}G P
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {meal.items.map((item: string, i: number) => (
                      <li key={i} className="font-sans text-xs text-on-surface/80 flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 border-l-2 border-primary p-3 mt-4">
              <p className="font-mono text-[10px] text-on-surface/70 leading-relaxed uppercase">
                <span className="text-primary font-bold">COACH NOTE:</span> {generatedPlan.disclaimer}
              </p>
            </div>
            
            <button className="self-end mt-4 text-[10px] font-mono border border-outline/20 px-4 py-2 hover:bg-on-surface hover:text-surface transition-colors uppercase font-bold flex items-center gap-2">
               Download Protocol (PDF)
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <Utensils className="w-12 h-12 mb-4" />
            <p className="font-mono text-xs uppercase tracking-widest text-center">Awaiting dietary parameters<br/>to compile nutrition engine.</p>
          </div>
        )}
      </div>
    </div>
  );
}
