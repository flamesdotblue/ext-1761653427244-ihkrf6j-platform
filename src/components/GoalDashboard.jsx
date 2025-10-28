import { useState } from 'react';
import { Scale, Settings } from 'lucide-react';

function NumberInput({ label, value, onChange, suffix, min = 0, step = 1 }) {
  return (
    <label className="block">
      <span className="text-sm text-neutral-300">{label}</span>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="number"
          className="w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          step={step}
        />
        {suffix ? <span className="text-neutral-400 text-sm select-none">{suffix}</span> : null}
      </div>
    </label>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm p-4 md:p-5 shadow-xl shadow-black/20">
      {children}
    </div>
  );
}

function GoalDashboard({ goals, currentWeight, onUpdateGoals, onUpdateWeight }) {
  const [localGoals, setLocalGoals] = useState(goals);
  const [weight, setWeight] = useState(currentWeight);

  const save = () => {
    onUpdateGoals(localGoals);
    onUpdateWeight(weight);
  };

  return (
    <div id="goals" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Settings className="h-5 w-5 text-sky-400" /> Goals & Targets</h2>
        <button onClick={save} className="inline-flex items-center rounded-md bg-sky-500 hover:bg-sky-400 text-white px-3 py-1.5 text-sm font-medium transition-colors">Save</button>
      </div>

      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput
            label="Target Weight"
            value={localGoals.targetWeight}
            onChange={(v) => setLocalGoals((g) => ({ ...g, targetWeight: v }))}
            suffix="kg"
            step={0.1}
          />
          <NumberInput
            label="Current Weight"
            value={weight}
            onChange={setWeight}
            suffix="kg"
            step={0.1}
          />
          <NumberInput
            label="Daily Calories"
            value={localGoals.dailyCalories}
            onChange={(v) => setLocalGoals((g) => ({ ...g, dailyCalories: v }))}
            suffix="kcal"
          />
          <NumberInput
            label="Daily Protein"
            value={localGoals.dailyProtein}
            onChange={(v) => setLocalGoals((g) => ({ ...g, dailyProtein: v }))}
            suffix="g"
          />
          <NumberInput
            label="Daily Exercise"
            value={localGoals.dailyExerciseMinutes}
            onChange={(v) => setLocalGoals((g) => ({ ...g, dailyExerciseMinutes: v }))}
            suffix="min"
          />
        </div>
      </Card>

      <Card>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20">
              <Scale className="h-6 w-6 text-sky-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Weight delta</p>
              <p className="text-lg font-semibold">{(currentWeight - goals.targetWeight).toFixed(1)} kg to goal</p>
            </div>
          </div>
          <div className="text-sm text-neutral-400">Stay consistent. Small steps make big changes.</div>
        </div>
      </Card>
    </div>
  );
}

export default GoalDashboard;
