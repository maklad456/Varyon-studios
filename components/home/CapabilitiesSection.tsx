import { capabilities } from "@/data/varyonContent";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="bg-black py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft">What we can produce</p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-[40px]">
          Every format you need to sell — from a single product to 1,000+ SKUs.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft">Format</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{capability.title}</h3>
              <p className="mt-2 text-sm text-vs-text-on-dark">{capability.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-vs-text-on-dark">
          Pricing depends on volume, formats and complexity — we’ll scope it with you on WhatsApp or a quick call.
        </p>
      </div>
    </section>
  );
}
