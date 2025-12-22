import { capabilities } from "@/data/varyonContent";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="site-section bg-black text-white">
      <div className="site-container">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft">What we can produce</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl sm:leading-tight">
          Every format you need to sell — from a single product to 1,000+ SKUs.
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft">Format</p>
              <h3 className="mt-4 text-xl font-semibold leading-tight text-white">{capability.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-vs-text-on-dark">{capability.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm leading-relaxed text-vs-text-on-dark">
          Pricing depends on volume, formats and complexity — we&apos;ll scope it with you on WhatsApp or a quick call.
        </p>
      </div>
    </section>
  );
}
