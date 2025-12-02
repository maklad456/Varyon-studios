import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Varyon Studios",
  description: "Legal terms covering Varyon Studios creative services and website use.",
};

export default function TermsPage() {
  return (
    <div className="bg-vs-bgLight py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-4xl font-semibold text-vs-text-strong">Terms & Conditions</h1>
        <p className="mt-4 text-sm text-vs-text-body">
          Last updated: {new Date().getFullYear()}
        </p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-vs-text-body">
          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">Services</h2>
            <p className="mt-2">
              Varyon Studios provides creative concepts, AI-generated imagery, video content and supporting strategy materials.
              All deliverables are supplied “as-is” for marketing use; you are responsible for ensuring compliance with any
              local regulations, platform policies or product claims.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">Intellectual property</h2>
            <p className="mt-2">
              Unless stated otherwise in your agreement, you receive a commercial license to use the final approved assets.
              We may showcase selected work in our portfolio unless you request a blackout in writing.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">Liability</h2>
            <p className="mt-2">
              We are not liable for indirect, incidental or consequential damages arising from the use of our assets. Your
              sole remedy is limited to rework or the fees you paid for the affected deliverables.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">Payments & offers</h2>
            <p className="mt-2">
              Discounts (10% welcome code, future 25% emails) apply to the first order only and may include value caps
              communicated in writing. Payment terms are defined in each scope of work.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">Governing law</h2>
            <p className="mt-2">These terms are governed by the laws of Egypt. Disputes will be handled in Cairo courts.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
