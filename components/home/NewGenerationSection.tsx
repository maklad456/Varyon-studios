export function NewGenerationSection() {
  const pillars = [
    {
      title: "No logistics",
      body: "No studios, no vans, no 3am call sheets. Just your products and a clear brief.",
    },
    {
      title: "No creative ceiling",
      body: "Shots from drones, mountains, Paris rooftops — without leaving your warehouse.",
    },
    {
      title: "No disconnect",
      body: "Everything is designed around your target buyer and where they’ll see the content.",
    },
  ];

  return (
    <section className="site-section relative bg-black text-white">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <img 
            src="/media/backgrounds/capabilities-bg-3.png" 
            alt="" 
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="site-container relative z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft">
          New generation
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight">The new generation of content production.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <h3 className="text-xl font-semibold leading-tight text-white">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-vs-text-on-dark">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
