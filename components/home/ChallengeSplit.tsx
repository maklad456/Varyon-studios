import { challengeLeft, challengeRight } from "@/data/varyonContent";

export function ChallengeSplit() {
  return (
    <section id="challenges" className="bg-vs-bgLight py-12">
      <div className="site-container">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft md:text-sm">
          WHY varyon
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-[1.05] text-black md:text-5xl">
          Campaign-ready visuals. Without shoot headache.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-vs-text-body sm:text-lg">
          Consistent quality, faster turnarounds, and lower cost. Engineered for performance.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
        <div className="flex flex-col rounded-3xl border border-black/5 bg-neutral-light pt-8 px-8 pb-8 shadow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
          <p className="text-lg font-bold leading-relaxed text-vs-text-body">
            Traditional shoots are a nightmare
          </p>
          <ul className="mt-8 flex-1 space-y-4 text-base leading-relaxed text-vs-text-body sm:text-lg">
            {challengeLeft.map((item) => (
              <li key={item} className="flex gap-4">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col rounded-3xl border border-black/5 bg-neutral-light pt-8 px-8 pb-8 shadow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
          <p className="text-lg font-bold leading-relaxed text-vs-accent">What we do instead</p>
          <ul className="mt-8 flex-1 space-y-4 text-base leading-relaxed text-vs-text-body sm:text-lg">
            {challengeRight.map((item) => (
              <li key={item} className="flex gap-4">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-vs-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </section>
  );
}
