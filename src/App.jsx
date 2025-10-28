import { useEffect, useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import GoalDashboard from './components/GoalDashboard';
import TrackerForms from './components/TrackerForms';
import ProgressPanel from './components/ProgressPanel';

function App() {
  const [goals, setGoals] = useState({
    targetWeight: 70,
    dailyCalories: 2200,
    dailyProtein: 140,
    dailyExerciseMinutes: 45,
  });
  const [currentWeight, setCurrentWeight] = useState(80);
  const [foodEntries, setFoodEntries] = useState([]);
  const [workoutEntries, setWorkoutEntries] = useState([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('fitness-tracker-v1'));
      if (data) {
        if (data.goals) setGoals(data.goals);
        if (typeof data.currentWeight === 'number') setCurrentWeight(data.currentWeight);
        if (Array.isArray(data.foodEntries)) setFoodEntries(data.foodEntries);
        if (Array.isArray(data.workoutEntries)) setWorkoutEntries(data.workoutEntries);
      }
    } catch (_) {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    const payload = { goals, currentWeight, foodEntries, workoutEntries };
    localStorage.setItem('fitness-tracker-v1', JSON.stringify(payload));
  }, [goals, currentWeight, foodEntries, workoutEntries]);

  const totals = useMemo(() => {
    const caloriesFromFood = foodEntries.reduce((sum, f) => sum + (Number(f.calories) || 0), 0);
    const proteinFromFood = foodEntries.reduce((sum, f) => sum + (Number(f.protein) || 0), 0);
    const exerciseMinutes = workoutEntries.reduce((sum, w) => sum + (Number(w.minutes) || 0), 0);
    const caloriesBurned = workoutEntries.reduce((sum, w) => sum + (Number(w.calories) || 0), 0);
    return { caloriesFromFood, proteinFromFood, exerciseMinutes, caloriesBurned };
  }, [foodEntries, workoutEntries]);

  const addFood = (entry) => {
    setFoodEntries((prev) => [
      { id: crypto.randomUUID(), name: entry.name, calories: Number(entry.calories) || 0, protein: Number(entry.protein) || 0 },
      ...prev,
    ]);
  };

  const removeFood = (id) => setFoodEntries((prev) => prev.filter((f) => f.id !== id));

  const addWorkout = (entry) => {
    setWorkoutEntries((prev) => [
      { id: crypto.randomUUID(), name: entry.name, minutes: Number(entry.minutes) || 0, calories: Number(entry.calories) || 0 },
      ...prev,
    ]);
  };

  const removeWorkout = (id) => setWorkoutEntries((prev) => prev.filter((w) => w.id !== id));

  const updateGoals = (nextGoals) => setGoals(nextGoals);
  const updateWeight = (w) => setCurrentWeight(w);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <HeroCover />

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 -mt-24 pb-24">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <GoalDashboard
              goals={goals}
              currentWeight={currentWeight}
              onUpdateGoals={updateGoals}
              onUpdateWeight={updateWeight}
            />
          </section>

          <section className="lg:col-span-5 order-first lg:order-none">
            <ProgressPanel
              goals={goals}
              currentWeight={currentWeight}
              totals={totals}
            />
          </section>
        </div>

        <section className="mt-8">
          <TrackerForms
            foodEntries={foodEntries}
            workoutEntries={workoutEntries}
            onAddFood={addFood}
            onRemoveFood={removeFood}
            onAddWorkout={addWorkout}
            onRemoveWorkout={removeWorkout}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
