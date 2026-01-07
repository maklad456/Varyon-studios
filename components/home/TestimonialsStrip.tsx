"use client";

const testimonials = [
  {
    quote: "We replaced a full shoot week with a WhatsApp brief — and the assets looked like a global campaign.",
  },
  {
    quote: "The scenes actually matched our buyers. It didn't feel like generic AI — it felt like us.",
  },
  {
    quote: "Fast, consistent, and scalable. We finally have a library we can build on, not random one-offs.",
  },
  {
    quote: "They nailed realism and materials. The results look expensive, but the process was simple.",
  },
];

export function TestimonialsStrip() {
  return (
    <section className="site-section bg-white">
      <div className="site-container">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70 text-center">
          Client feedback
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-soft"
            >
              <p className="text-base leading-relaxed text-vs-text-body">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
