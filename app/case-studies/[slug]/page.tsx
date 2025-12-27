import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/varyonContent";
import { caseStudyDetails } from "@/data/caseStudyDetails";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = caseStudies.find((item) => item.slug === params.slug);
  if (!study) {
    return {};
  }
  return {
    title: `${study.name} Case Study | Varyon Studios`,
    description: study.summary || `${study.problem} — ${study.approach}`,
  };
}

// Unsplash placeholder images
const unsplashImages = [
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1560448075-cbc16bb4af33?auto=format&fit=crop&w=1600&q=80",
];

function getImageForIndex(index: number) {
  return unsplashImages[index % unsplashImages.length];
}

// System A - Alternating split blocks + image mosaic (used for all case studies)
function LayoutSystemA({ study, detail }: { study: typeof caseStudies[0]; detail: any }) {
  return (
    <main className="min-h-screen bg-vs-bgLight pt-28">
      {/* Header */}
      <section className="site-container mb-16">
        <div className="text-center relative">
          <Link
            href="/case-studies"
            className="hidden md:flex absolute left-0 items-center justify-center w-10 h-10 rounded-full bg-black text-white hover:bg-black/80 transition-colors"
            aria-label="Back to all case studies"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">Client story</p>
          <h1 className="mt-4 text-3xl font-semibold text-vs-text-strong sm:text-4xl lg:text-5xl">{study.name}</h1>
          <p className="mt-2 text-lg text-vs-text-body/60">{study.tag}</p>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-vs-text-body">{detail.summary}</p>
        </div>
      </section>

      {/* Alternating Blocks */}
      <section className="site-container mb-16">
        {/* Block 1: Problem - text left, mosaic right */}
        <div className="mb-16 grid gap-8 rounded-3xl border border-black/5 bg-white p-8 md:grid-cols-2 lg:p-12">
          <div>
            <h2 className="text-2xl font-semibold text-vs-text-strong mb-4">Problem</h2>
            <div className="text-base leading-relaxed text-vs-text-body whitespace-pre-line">{detail.problem}</div>
          </div>
          {study.slug === "woodworkers" ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image 
                    src="/case-studies/woodworkers/wood-before.webp" 
                    alt="Before" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 50vw, 25vw" 
                  />
                </div>
                <p className="mt-2 text-center text-sm font-semibold text-vs-text-body/70">Before</p>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image 
                    src="/case-studies/woodworkers/wood-after.webp" 
                    alt="After" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 50vw, 25vw" 
                  />
                </div>
                <p className="mt-2 text-center text-sm font-semibold text-vs-text-body/70">After</p>
              </div>
            </div>
          ) : study.slug === "zee-plexiglass-designs" ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image 
                    src="/case-studies/zee-plexiglass-designs/plexi1-before.webp" 
                    alt="Before" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 50vw, 25vw" 
                  />
                </div>
                <p className="mt-2 text-center text-sm font-semibold text-vs-text-body/70">Before</p>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image 
                    src="/case-studies/zee-plexiglass-designs/plexi1-after.webp" 
                    alt="After" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 50vw, 25vw" 
                  />
                </div>
                <p className="mt-2 text-center text-sm font-semibold text-vs-text-body/70">After</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image 
                  src={
                    study.slug === "discovery-homes" 
                      ? "/case-studies/discovery-homes/2a6610ef-0196-4b2e-b4cb-cd0d08ce79a6.webp" 
                      : study.slug === "mehos"
                      ? "/case-studies/mehos/mehos1.webp"
                      : getImageForIndex(0)
                  } 
                  alt="" 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 50vw, 25vw" 
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image 
                  src={
                    study.slug === "discovery-homes" 
                      ? "/case-studies/discovery-homes/9482e3de-50b7-4264-bf7b-33031d65f182.webp" 
                      : study.slug === "mehos"
                      ? "/case-studies/mehos/mehos2.webp"
                      : getImageForIndex(1)
                  } 
                  alt="" 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 50vw, 25vw" 
                />
              </div>
            </div>
          )}
        </div>

        {/* Block 2: What we did - conditional layout based on case study */}
        {study.slug === "discovery-homes" ? (
          <div className="mb-16 rounded-3xl border border-black/5 bg-white p-8 lg:p-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-8">
              <Image src="/case-studies/discovery-homes/combine 16-9.webp" alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 100%" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-vs-text-strong mb-4">What we did</h2>
              <div className="text-base leading-relaxed text-vs-text-body whitespace-pre-line">{detail.whatWeDid}</div>
            </div>
          </div>
        ) : study.slug === "woodworkers" ? (
          <div className="mb-16 grid gap-8 rounded-3xl border border-black/5 bg-white p-8 md:grid-cols-2 lg:p-12">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image 
                    src="/case-studies/woodworkers/wood2-before.webp" 
                    alt="Before" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 50vw, 25vw" 
                  />
                </div>
                <p className="mt-2 text-center text-sm font-semibold text-vs-text-body/70">Before</p>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image 
                    src="/case-studies/woodworkers/wood2-after.webp" 
                    alt="After" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 50vw, 25vw" 
                  />
                </div>
                <p className="mt-2 text-center text-sm font-semibold text-vs-text-body/70">After</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-vs-text-strong mb-4">What we did</h2>
              <div className="text-base leading-relaxed text-vs-text-body whitespace-pre-line">{detail.whatWeDid}</div>
            </div>
          </div>
        ) : study.slug === "zee-plexiglass-designs" ? (
          <div className="mb-16 grid gap-8 rounded-3xl border border-black/5 bg-white p-8 md:grid-cols-2 lg:p-12">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image 
                    src="/case-studies/zee-plexiglass-designs/plex2-before.webp" 
                    alt="Before" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 50vw, 25vw" 
                  />
                </div>
                <p className="mt-2 text-center text-sm font-semibold text-vs-text-body/70">Before</p>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image 
                    src="/case-studies/zee-plexiglass-designs/plexi2-after.webp" 
                    alt="After" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 50vw, 25vw" 
                  />
                </div>
                <p className="mt-2 text-center text-sm font-semibold text-vs-text-body/70">After</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-vs-text-strong mb-4">What we did</h2>
              <div className="text-base leading-relaxed text-vs-text-body whitespace-pre-line">{detail.whatWeDid}</div>
            </div>
          </div>
        ) : (
          <div className="mb-16 grid gap-8 rounded-3xl border border-black/5 bg-white p-8 md:grid-cols-2 lg:p-12">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image 
                  src={study.slug === "mehos" ? "/case-studies/mehos/mehos3.webp" : getImageForIndex(2)} 
                  alt="" 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 50vw, 25vw" 
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image 
                  src={study.slug === "mehos" ? "/case-studies/mehos/mehos4.webp" : getImageForIndex(3)} 
                  alt="" 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 50vw, 25vw" 
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-vs-text-strong mb-4">What we did</h2>
              <div className="text-base leading-relaxed text-vs-text-body whitespace-pre-line">{detail.whatWeDid}</div>
            </div>
          </div>
        )}

        {/* Block 3: Deliverables - text left, mosaic right */}
        <div className="mb-16 grid gap-8 rounded-3xl border border-black/5 bg-white p-8 md:grid-cols-2 lg:p-12">
          <div>
            <h2 className="text-2xl font-semibold text-vs-text-strong mb-4">Deliverables</h2>
            <div className="text-base leading-relaxed text-vs-text-body whitespace-pre-line mb-6">
              {detail.deliverables}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image 
                src={
                  study.slug === "discovery-homes" 
                    ? "/case-studies/discovery-homes/a659f55d-1a77-4fa4-b7d7-fd9c482b77c3.webp" 
                    : study.slug === "mehos"
                    ? "/case-studies/mehos/mehos5.webp"
                    : study.slug === "woodworkers"
                    ? "/case-studies/woodworkers/wood5.webp"
                    : study.slug === "zee-plexiglass-designs"
                    ? "/case-studies/zee-plexiglass-designs/plexi5.webp"
                    : getImageForIndex(4)
                } 
                alt="" 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 50vw, 25vw" 
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image 
                src={
                  study.slug === "discovery-homes" 
                    ? "/case-studies/discovery-homes/hero-image.webp" 
                    : study.slug === "mehos"
                    ? "/case-studies/mehos/mehos6.webp"
                    : study.slug === "woodworkers"
                    ? "/case-studies/woodworkers/wood6.webp"
                    : study.slug === "zee-plexiglass-designs"
                    ? "/case-studies/zee-plexiglass-designs/plexi6.webp"
                    : getImageForIndex(5)
                } 
                alt="" 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 50vw, 25vw" 
              />
            </div>
          </div>
        </div>

        {/* Block 4: Outcome - mosaic left, text right */}
        <div className="grid gap-8 rounded-3xl border border-black/5 bg-white p-8 md:grid-cols-2 lg:p-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image 
                src={
                  study.slug === "discovery-homes" 
                    ? "/case-studies/discovery-homes/abfcdb81-f30f-49f2-affb-70aa04d031fe.webp" 
                    : study.slug === "mehos"
                    ? "/case-studies/mehos/mehos7.webp"
                    : study.slug === "woodworkers"
                    ? "/case-studies/woodworkers/wood7.webp"
                    : study.slug === "zee-plexiglass-designs"
                    ? "/case-studies/zee-plexiglass-designs/plexi7.webp"
                    : getImageForIndex(6)
                } 
                alt="" 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 50vw, 25vw" 
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image 
                src={
                  study.slug === "discovery-homes" 
                    ? "/case-studies/discovery-homes/f0d67266-0b07-45c2-aba8-d568bf14e0a8.webp" 
                    : study.slug === "mehos"
                    ? "/case-studies/mehos/mehos8.webp"
                    : study.slug === "woodworkers"
                    ? "/case-studies/woodworkers/wood8.webp"
                    : study.slug === "zee-plexiglass-designs"
                    ? "/case-studies/zee-plexiglass-designs/plexi8.webp"
                    : getImageForIndex(7)
                } 
                alt="" 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 50vw, 25vw" 
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-vs-text-strong mb-4">Outcome</h2>
            <div className="text-base leading-relaxed text-vs-text-body whitespace-pre-line">{detail.outcome}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function CaseStudyDetail({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((item) => item.slug === params.slug);
  if (!study) {
    notFound();
  }

  const detail = caseStudyDetails[params.slug];
  if (!detail) {
    notFound();
  }

  // All case studies use System A layout
  return <LayoutSystemA study={study} detail={detail} />;
}
