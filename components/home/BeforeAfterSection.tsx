import Image from "next/image";
import { beforeAfterItems } from "@/data/varyonContent";

export function BeforeAfterSection() {
  return (
    <section className="site-section bg-white">
      <div className="site-container">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">Proof</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-vs-text-strong sm:text-4xl sm:leading-tight">Before / after snapshots.</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {beforeAfterItems.map((item) => (
            <article key={item.label} className="rounded-3xl bg-vs-bgLight p-6 shadow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <div className="space-y-2 text-sm">
                <p className="font-semibold leading-relaxed text-vs-text-body">{item.label}</p>
                <p className="leading-relaxed text-vs-text-body/70">{item.format}</p>
              </div>
              <div className="mt-6 space-y-4">
                <figure className="rounded-2xl border border-dashed border-black/10 bg-white p-4">
                  <figcaption className="text-xs uppercase tracking-[0.3em] text-vs-text-body/70">Before</figcaption>
                  <div className="relative mt-4 h-40 w-full overflow-hidden rounded-xl">
                    <Image src={item.beforeSrc} alt={`${item.label} before`} fill className="object-cover" sizes="(max-width:768px) 100vw, 300px" />
                  </div>
                </figure>
                <figure className="rounded-2xl border border-black/5 bg-white p-4">
                  <figcaption className="text-xs uppercase tracking-[0.3em] text-vs-accent">After</figcaption>
                  <div className="relative mt-4 h-40 w-full overflow-hidden rounded-xl">
                    <Image src={item.afterSrc} alt={`${item.label} after`} fill className="object-cover" sizes="(max-width:768px) 100vw, 300px" />
                  </div>
                </figure>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm leading-relaxed text-vs-text-body">
          All &ldquo;after&rdquo; images are AI-generated and tailored to the brand&apos;s audience, not generic stock.
        </p>
      </div>
    </section>
  );
}
