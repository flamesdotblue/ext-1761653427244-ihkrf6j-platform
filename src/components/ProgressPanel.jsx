import { Activity, Apple, Dumbbell, Scale } from 'lucide-react';

function Stat({ icon: Icon, label, value, sub }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-sm text-neutral-400">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
        {sub ? <p className="text-xs text-neutral-400">{sub}</p> : null}
      </div>
    </div>
  );
}

function ProgressBar({ value = 0, max = 100, color = 'from-sky-500 to-cyan-400' }) {
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100));
  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm p-4 md:p-5 shadow-xl shadow-black/20">
      {children}
    </div>
  );
}

function ProgressPanel({ goals, currentWeight, totals }) {
  const calorieGoal = goals.dailyCalories || 1;
  const proteinGoal = goals.dailyProtein || 1;
  const exerciseGoal = goals.dailyExerciseMinutes || 1;

  const remainingCalories = Math.max(0, calorieGoal - totals.caloriesFromFood);
  const remainingProtein = Math.max(0, proteinGoal - totals.proteinFromFood);
  const remainingExercise = Math.max(0, exerciseGoal - totals.exerciseMinutes);

  const weightDelta = (currentWeight - goals.targetWeight).toFixed(1);

  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-lg font-semibold mb-3">Today's Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-neutral-300"><Apple className="h-4 w-4 text-emerald-400" /> Calories</div>
              <div className="text-sm text-neutral-300">{totals.caloriesFromFood} / {calorieGoal} kcal</div>
            </div>
            <ProgressBar value={totals.caloriesFromFood} max={calorieGoal} color="from-emerald-500 to-lime-400" />
            <p className="mt-1 text-xs text-neutral-400">{remainingCalories} kcal remaining</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-neutral-300"><Activity className="h-4 w-4 text-sky-400" /> Protein</div>
              <div className="text-sm text-neutral-300">{totals.proteinFromFood} / {proteinGoal} g</div>
            </div>
            <ProgressBar value={totals.proteinFromFood} max={proteinGoal} color="from-sky-500 to-cyan-400" />
            <p className="mt-1 text-xs text-neutral-400">{remainingProtein} g remaining</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-neutral-300"><Dumbbell className="h-4 w-4 text-violet-400" /> Exercise</div>
              <div className="text-sm text-neutral-300">{totals.exerciseMinutes} / {exerciseGoal} min</div>
            </div>
            <ProgressBar value={totals.exerciseMinutes} max={exerciseGoal} color="from-violet-500 to-fuchsia-400" />
            <p className="mt-1 text-xs text-neutral-400">{remainingExercise} min remaining</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <Scale className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-neutral-400">Weight</p>
            <p className="text-lg font-semibold">{currentWeight} kg</p>
            <p className="text-xs text-neutral-400">{weightDelta} kg to target</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProgressPanel;
