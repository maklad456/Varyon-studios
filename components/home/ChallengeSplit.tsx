import { challengeLeft, challengeRight } from "@/data/varyonContent";

export function ChallengeSplit() {
  return (
    <section id="challenges" className="bg-vs-bgLight py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">
            Why traditional shoots are a nightmare
          </p>
          <ul className="mt-6 space-y-4 text-base text-vs-text-body">
            {challengeLeft.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-vs-text-body/40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">How Varyon Studios works instead</p>
          <ul className="mt-6 space-y-4 text-base text-vs-text-body">
            {challengeRight.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-vs-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-vs-text-body">
            Don’t love your free sample? You simply don’t have to continue. 😉
          </p>
        </div>
      </div>
    </section>
  );
}
