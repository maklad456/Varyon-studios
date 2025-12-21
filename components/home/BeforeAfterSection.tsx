import Image from "next/image";
import { beforeAfterItems } from "@/data/varyonContent";

export function BeforeAfterSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">Proof</p>
        <h2 className="mt-4 text-3xl font-semibold text-vs-text-strong sm:text-[40px]">Before / after snapshots.</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {beforeAfterItems.map((item) => (
            <article key={item.label} className="rounded-3xl bg-vs-bgLight p-5 shadow-soft">
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-vs-text-body">{item.label}</p>
                <p className="text-vs-text-body/70">{item.format}</p>
              </div>
              <div className="mt-4 space-y-3">
                <figure className="rounded-2xl border border-dashed border-black/10 bg-white p-2">
                  <figcaption className="text-xs uppercase tracking-[0.3em] text-vs-text-body/70">Before</figcaption>
                  <div className="relative mt-2 h-40 w-full overflow-hidden rounded-xl">
                    <Image src={item.beforeSrc} alt={`${item.label} before`} fill className="object-cover" sizes="(max-width:768px) 100vw, 300px" />
                  </div>
                </figure>
                <figure className="rounded-2xl border border-black/5 bg-white p-2">
                  <figcaption className="text-xs uppercase tracking-[0.3em] text-vs-accent">After</figcaption>
                  <div className="relative mt-2 h-40 w-full overflow-hidden rounded-xl">
                    <Image src={item.afterSrc} alt={`${item.label} after`} fill className="object-cover" sizes="(max-width:768px) 100vw, 300px" />
                  </div>
                </figure>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-vs-text-body">
          All “after” images are AI-generated and tailored to the brand’s audience, not generic stock.
        </p>
      </div>
    </section>
  );
}
