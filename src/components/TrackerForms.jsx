import { useState } from 'react';
import { Apple, Dumbbell, Plus, Trash2 } from 'lucide-react';

function SectionCard({ children }) {
  return (
    <div id="track" className="rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm p-4 md:p-5 shadow-xl shadow-black/20">
      {children}
    </div>
  );
}

function Input({ type = 'text', placeholder, value, onChange, min, step }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={min}
      step={step}
      className="w-full rounded-md bg-neutral-950 border border-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
    />
  );
}

function TrackerForms({ foodEntries, workoutEntries, onAddFood, onRemoveFood, onAddWorkout, onRemoveWorkout }) {
  const [food, setFood] = useState({ name: '', calories: '', protein: '' });
  const [workout, setWorkout] = useState({ name: '', minutes: '', calories: '' });

  const addFood = (e) => {
    e.preventDefault();
    if (!food.name) return;
    onAddFood({ name: food.name, calories: Number(food.calories) || 0, protein: Number(food.protein) || 0 });
    setFood({ name: '', calories: '', protein: '' });
  };

  const addWorkout = (e) => {
    e.preventDefault();
    if (!workout.name) return;
    onAddWorkout({ name: workout.name, minutes: Number(workout.minutes) || 0, calories: Number(workout.calories) || 0 });
    setWorkout({ name: '', minutes: '', calories: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SectionCard>
        <div className="flex items-center gap-2 mb-3">
          <Apple className="h-5 w-5 text-emerald-400" />
          <h3 className="text-lg font-semibold">Food Log</h3>
        </div>
        <form onSubmit={addFood} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2"><Input placeholder="Food name" value={food.name} onChange={(v) => setFood((s) => ({ ...s, name: v }))} /></div>
          <Input type="number" placeholder="Calories" value={food.calories} onChange={(v) => setFood((s) => ({ ...s, calories: v }))} min={0} />
          <Input type="number" placeholder="Protein (g)" value={food.protein} onChange={(v) => setFood((s) => ({ ...s, protein: v }))} min={0} step={0.1} />
          <div className="sm:col-span-4">
            <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-2 text-sm font-medium transition-colors">
              <Plus className="h-4 w-4" /> Add Food
            </button>
          </div>
        </form>

        <ul className="mt-4 divide-y divide-white/5">
          {foodEntries.length === 0 && (
            <li className="text-sm text-neutral-400">No foods logged yet.</li>
          )}
          {foodEntries.map((f) => (
            <li key={f.id} className="py-2 flex items-center justify-between">
              <div>
                <p className="font-medium">{f.name}</p>
                <p className="text-xs text-neutral-400">{f.calories} kcal · {f.protein} g protein</p>
              </div>
              <button onClick={() => onRemoveFood(f.id)} className="p-1.5 rounded-md hover:bg-white/10 text-neutral-300" aria-label="Remove food">
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard>
        <div className="flex items-center gap-2 mb-3">
          <Dumbbell className="h-5 w-5 text-violet-400" />
          <h3 className="text-lg font-semibold">Exercise Log</h3>
        </div>
        <form onSubmit={addWorkout} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2"><Input placeholder="Workout name" value={workout.name} onChange={(v) => setWorkout((s) => ({ ...s, name: v }))} /></div>
          <Input type="number" placeholder="Minutes" value={workout.minutes} onChange={(v) => setWorkout((s) => ({ ...s, minutes: v }))} min={0} />
          <Input type="number" placeholder="Calories Burned" value={workout.calories} onChange={(v) => setWorkout((s) => ({ ...s, calories: v }))} min={0} />
          <div className="sm:col-span-4">
            <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-violet-500 hover:bg-violet-400 text-white px-3 py-2 text-sm font-medium transition-colors">
              <Plus className="h-4 w-4" /> Add Exercise
            </button>
          </div>
        </form>

        <ul className="mt-4 divide-y divide-white/5">
          {workoutEntries.length === 0 && (
            <li className="text-sm text-neutral-400">No workouts logged yet.</li>
          )}
          {workoutEntries.map((w) => (
            <li key={w.id} className="py-2 flex items-center justify-between">
              <div>
                <p className="font-medium">{w.name}</p>
                <p className="text-xs text-neutral-400">{w.minutes} min · {w.calories} kcal</p>
              </div>
              <button onClick={() => onRemoveWorkout(w.id)} className="p-1.5 rounded-md hover:bg-white/10 text-neutral-300" aria-label="Remove workout">
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}

export default TrackerForms;
