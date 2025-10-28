import Spline from '@splinetool/react-spline';

function HeroCover() {
  return (
    <header className="relative w-full h-[68vh] min-h-[420px] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/40 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full flex items-end">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full pb-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Your personal fitness, nutrition, and weight companion</h1>
            <p className="mt-3 text-neutral-300">Track meals, log workouts, and stay on target with clear daily goals and real-time progress.</p>
            <div className="mt-6 flex gap-3">
              <a href="#track" className="inline-flex items-center rounded-md bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 text-sm font-medium transition-colors">Start Tracking</a>
              <a href="#goals" className="inline-flex items-center rounded-md border border-white/15 hover:border-white/25 text-white px-4 py-2 text-sm font-medium transition-colors">Set Goals</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroCover;
