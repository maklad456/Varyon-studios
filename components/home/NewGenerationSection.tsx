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
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft">
          New generation
        </p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-[40px]">The new generation of content production.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm text-vs-text-on-dark">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
