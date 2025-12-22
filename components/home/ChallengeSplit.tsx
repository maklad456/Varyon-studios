import { challengeLeft, challengeRight } from "@/data/varyonContent";

export function ChallengeSplit() {
  return (
    <section id="challenges" className="bg-vs-bgLight py-12">
      <div className="site-container grid gap-8 md:grid-cols-2 md:items-start">
        <div className="flex flex-col py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">
            Why traditional shoots are a nightmare
          </p>
          <ul className="mt-8 flex-1 space-y-4 text-base leading-relaxed text-vs-text-body">
            {challengeLeft.map((item) => (
              <li key={item} className="flex gap-4">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-vs-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col rounded-3xl border border-black/5 bg-neutral-light p-8 shadow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">How Varyon Studios works instead</p>
          <ul className="mt-8 flex-1 space-y-4 text-base leading-relaxed text-vs-text-body">
            {challengeRight.map((item) => (
              <li key={item} className="flex gap-4">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-vs-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-vs-text-body">
            Don&apos;t love your free sample? You simply don&apos;t have to continue. 😉
          </p>
        </div>
      </div>
    </section>
  );
}
