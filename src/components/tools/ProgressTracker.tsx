import { useState, useEffect } from 'react';
import { LineChart, Activity, Trash2, Plus, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface LogEntry {
  id: string;
  date: string;
  weight: number;
  waist: number;
  workouts: number;
  consistency: number;
}

export default function ProgressTracker() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [inputs, setInputs] = useState({
    weight: '',
    waist: '',
    workouts: '4',
    consistency: '8'
  });

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mad_fitness_progress_logs');
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save to local storage whenever logs change
  useEffect(() => {
    localStorage.setItem('mad_fitness_progress_logs', JSON.stringify(logs));
  }, [logs]);

  const handleAddLog = () => {
    if (!inputs.weight || !inputs.waist) return;

    const newLog: LogEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      weight: parseFloat(inputs.weight),
      waist: parseFloat(inputs.waist),
      workouts: parseInt(inputs.workouts),
      consistency: parseInt(inputs.consistency)
    };

    setLogs(prev => [newLog, ...prev]);
    setInputs(prev => ({ ...prev, weight: '', waist: '' })); // reset numbers
  };

  const deleteLog = (id: string) => {
    setLogs(prev => prev.filter(log => log.id !== id));
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to delete all progress history?")) {
      setLogs([]);
    }
  };

  const getTrendIcon = (current: number, prev: number | undefined) => {
    if (prev === undefined) return <Minus className="w-3 h-3 text-gray-500" />;
    if (current < prev) return <ArrowDownRight className="w-3 h-3 text-green-500" />;
    if (current > prev) return <ArrowUpRight className="w-3 h-3 text-red-500" />;
    return <Minus className="w-3 h-3 text-gray-500" />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Inputs Panel */}
      <div className="lg:col-span-4 bg-surface-container-lowest border border-outline/30 p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-outline/15 pb-4">
            <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> WEEKLY LOG ENTRY
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Weight */}
            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60 block mb-2">WEIGHT (KG)</label>
              <input 
                type="number" 
                step="0.1"
                placeholder="e.g. 75.5"
                value={inputs.weight}
                onChange={(e) => setInputs(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full bg-surface-container border border-outline/20 p-3 text-xs text-on-surface focus:outline-none focus:border-primary font-mono placeholder:text-on-surface/20"
              />
            </div>

            {/* Waist */}
            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60 block mb-2">WAIST (INCHES)</label>
              <input 
                type="number" 
                step="0.5"
                placeholder="e.g. 32"
                value={inputs.waist}
                onChange={(e) => setInputs(prev => ({ ...prev, waist: e.target.value }))}
                className="w-full bg-surface-container border border-outline/20 p-3 text-xs text-on-surface focus:outline-none focus:border-primary font-mono placeholder:text-on-surface/20"
              />
            </div>
          </div>

          {/* Workouts Completed */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60">WORKOUTS LOGGED</label>
              <span className="font-mono text-xs text-primary font-bold">{inputs.workouts} / 7</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="7" 
              value={inputs.workouts} 
              onChange={(e) => setInputs(prev => ({ ...prev, workouts: e.target.value }))}
              className="w-full accent-primary bg-surface-container cursor-pointer h-1.5"
            />
          </div>

          {/* Consistency */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-mono text-[10px] uppercase font-bold text-on-surface/60">DIET CONSISTENCY SCORE</label>
              <span className="font-mono text-xs text-primary font-bold">{inputs.consistency} / 10</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={inputs.consistency} 
              onChange={(e) => setInputs(prev => ({ ...prev, consistency: e.target.value }))}
              className="w-full accent-primary bg-surface-container cursor-pointer h-1.5"
            />
            <div className="flex justify-between text-[10px] font-mono text-on-surface/40 mt-1">
              <span>POOR (1)</span><span>PERFECT (10)</span>
            </div>
          </div>

        </div>

        <button 
          onClick={handleAddLog}
          disabled={!inputs.weight || !inputs.waist}
          className="mt-8 w-full bg-primary text-white hover:bg-[#ff3c0a] disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-not-allowed font-anton text-xs py-3.5 flex items-center justify-center gap-2 transition-transform active:scale-95 uppercase tracking-widest"
        >
          <Plus className="w-4 h-4" /> COMMIT LOG ENTRY
        </button>
      </div>

      {/* Output Panel */}
      <div className="lg:col-span-8 bg-surface-container-high border border-outline/30 p-6 text-on-surface relative overflow-hidden flex flex-col">
        <div className="flex justify-between items-end border-b border-outline/20 pb-4 mb-6">
          <div>
            <h3 className="font-anton text-3xl uppercase text-primary">PROGRESS METRICS</h3>
            <p className="font-mono text-[10px] text-on-surface/50 uppercase tracking-widest mt-1">
              {logs.length} LOGS RECORDED IN LOCAL STORAGE
            </p>
          </div>
          {logs.length > 0 && (
            <button 
              onClick={clearAll}
              className="text-[10px] font-mono text-red-500 hover:text-red-600 uppercase flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> CLEAR ALL
            </button>
          )}
        </div>

        {logs.length > 0 ? (
          <div className="space-y-3 flex-grow overflow-y-auto pr-2">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-2 px-4 py-2 font-mono text-[9px] uppercase font-bold text-on-surface/50 tracking-widest border-b border-outline/10">
              <div>DATE</div>
              <div>WEIGHT</div>
              <div>WAIST</div>
              <div>TRAINING</div>
              <div className="text-right">DIET SCORE</div>
            </div>

            {/* Logs list */}
            {logs.map((log, i) => {
              const prevLog = logs[i + 1]; // next in array is chronologically previous
              return (
                <div key={log.id} className="grid grid-cols-5 gap-2 px-4 py-3 bg-surface-container-low border border-outline/10 items-center font-mono text-xs">
                  <div className="text-on-surface/70">{log.date}</div>
                  <div className="flex items-center gap-2 font-bold">
                    {log.weight}kg
                    {getTrendIcon(log.weight, prevLog?.weight)}
                  </div>
                  <div className="flex items-center gap-2 font-bold">
                    {log.waist}"
                    {getTrendIcon(log.waist, prevLog?.waist)}
                  </div>
                  <div className="text-primary">{log.workouts} / 7</div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded-sm ${log.consistency >= 8 ? 'bg-green-500/10 text-green-500' : log.consistency >= 5 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                      {log.consistency} / 10
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <LineChart className="w-12 h-12 mb-4" />
            <p className="font-mono text-xs uppercase tracking-widest text-center">No progress logs found.<br/>Commit your first entry to track metrics.</p>
          </div>
        )}
      </div>
    </div>
  );
}
