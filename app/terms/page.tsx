import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Varyon Studios",
  description: "Legal terms covering Varyon Studios creative services and website use.",
};

export default function TermsPage() {
  return (
    <div className="bg-vs-bgLight pt-32 pb-24 md:pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-4xl font-semibold text-vs-text-strong">Terms & Conditions</h1>
        <p className="mt-4 text-sm text-vs-text-body">
          Last updated: January 7, 2026
        </p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-vs-text-body">
          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">1. Introduction</h2>
            <p className="mt-2">
              Welcome to Varyon Studios ("Varyon Studios," "we," "our" or "us"). These Terms & Conditions ("Terms") govern your access to and use of our websites, products and services (collectively, the "Service"), including any AI‑generated images, videos or other creative content we produce for you. By accessing or using the Service, you acknowledge that you have read, understood and agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">2. Services provided</h2>
            <p className="mt-2">
              Varyon Studios specialises in creating AI‑generated images, videos and accompanying creative direction for marketing campaigns, product launches and digital platforms. Our services may include concept development, scene design, generative AI, human finishing (clean‑up, retouching, lighting and colour correction), video editing and delivery optimisation. All engagements, deliverables and consultations are subject to these Terms and any specific agreement we sign with you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">3. Client responsibilities</h2>
            <p className="mt-2">You agree to:</p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Provide accurate and lawful reference materials, product photos, brand guidelines and other inputs needed to create your deliverables.</li>
              <li>Ensure that any content you supply (including text, trademarks, logos, images and music) is your own or that you have obtained all necessary rights and licences to use it. You are solely responsible for any infringement caused by materials you provide.</li>
              <li>Give timely feedback and approvals within the time frames we agree; delays may impact delivery schedules.</li>
              <li>Not request or instruct us to generate content that is illegal, defamatory, hateful, violent, pornographic or otherwise harmful.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">4. Project process and deliverables</h2>
            <p className="mt-2">
              Each project scope will be outlined in a proposal or statement of work. Unless stated otherwise, our packages include a limited number of concept explorations and revision rounds. Additional revisions or new creative directions beyond the approved scope will be billed separately. Delivery timelines are estimates and may vary based on project complexity and your responsiveness. Deliverables are deemed accepted upon the earlier of (a) your written approval or (b) seven (7) days after delivery if no revisions are requested.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">5. Intellectual property and licensing</h2>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li><strong>Client materials:</strong> You retain all rights to the materials you supply. You grant us a non‑exclusive licence to use, edit, adapt and display those materials for the purpose of delivering the Service.</li>
              <li><strong>Our deliverables:</strong> Upon full payment, you receive a non‑exclusive, worldwide licence to use the final images, videos and creative assets for the purposes specified in your agreement (e.g., marketing, advertising, social media). Varyon Studios retains ownership of underlying models, source files, methodologies and pre‑existing intellectual property. You may not resell, redistribute or sublicense our deliverables without written permission.</li>
              <li><strong>Portfolio rights:</strong> Unless you request confidentiality in writing before the project begins, you grant us permission to showcase the final deliverables and a description of the project in our portfolio, case studies and promotional materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">6. Payments and invoicing</h2>
            <p className="mt-2">
              Fees, payment schedules and accepted methods will be detailed in your proposal or invoice. Unless otherwise agreed:
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>A non‑refundable deposit is due before work begins;</li>
              <li>The remaining balance is due upon delivery of the final files;</li>
              <li>Late payments may incur interest or suspension of work. You are responsible for any bank or transfer fees.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">7. Revisions and scope changes</h2>
            <p className="mt-2">
              Our packages include a defined number of revision rounds. Additional revisions, major scope changes or requests made after final approval are subject to additional charges. We will notify you and obtain your approval before commencing out‑of‑scope work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">8. Prohibited uses and content standards</h2>
            <p className="mt-2">You agree not to use the Service to create, upload or disseminate content that:</p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Violates any law, regulation or third‑party rights (including intellectual‑property rights);</li>
              <li>Depicts violence, hatred, harassment, discrimination, sexual content involving minors, or other harmful material;</li>
              <li>Promotes illegal or fraudulent activities;</li>
              <li>Contains malicious code or attempts to disrupt our systems.</li>
            </ul>
            <p className="mt-2">
              We reserve the right to refuse or terminate projects that violate these standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">9. Third‑party tools and AI models</h2>
            <p className="mt-2">
              We leverage third‑party software and generative models (e.g., Adobe Creative Cloud, Canva, CapCut, OpenAI, Midjourney, Stable Diffusion) to produce our work. These providers may collect or process data under their own terms. We make no warranty regarding the availability, performance or outputs of third‑party tools and are not liable for their acts or omissions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">10. Confidentiality</h2>
            <p className="mt-2">
              Each party agrees to keep confidential any proprietary or sensitive information disclosed by the other party in connection with the Service. We will not share your confidential information except with team members or processors who need it to fulfil the project. You agree not to disclose our proprietary techniques, pricing, internal documentation or source files.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">11. Disclaimer of warranties</h2>
            <p className="mt-2">
              The Service is provided "as is" and "as available". While we strive for high‑quality results, AI‑generated content is inherently variable. To the maximum extent permitted by law, we make no warranties—express or implied—regarding fitness for a particular purpose, merchantability, non‑infringement or that the Service will be error‑free or uninterrupted. You acknowledge that the creative outputs are subjective and may not exactly match your expectations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">12. Limitation of liability</h2>
            <p className="mt-2">
              To the maximum extent permitted by law, Varyon Studios, its directors, employees, partners, suppliers and affiliates will not be liable for any indirect, incidental, special or consequential damages—including lost profits, lost data or goodwill—arising from or related to your use of the Service. Our total liability for any claim shall not exceed the amount you paid for the portion of the Service giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">13. Termination</h2>
            <p className="mt-2">
              We may suspend or terminate your access to the Service immediately if we reasonably believe you have violated these Terms, provided false information or pose a legal or security risk. You may terminate a project before production begins by giving written notice; however, your deposit is non‑refundable and we retain the right to invoice you for work already completed. Upon termination, all licences granted to you will cease except for those expressly stated as surviving.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">14. Governing law and dispute resolution</h2>
            <p className="mt-2">
              These Terms are governed by the laws of the Arab Republic of Egypt, without regard to its conflict‑of‑law principles. Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Cairo, Egypt, unless Varyon Studios elects another competent venue. Before initiating legal proceedings, both parties agree to attempt in good faith to resolve the dispute informally.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">15. Changes to these terms</h2>
            <p className="mt-2">
              We may update or revise these Terms from time to time. Material changes will be posted on this page or notified via email if you have an account with us. Continued use of the Service after changes become effective constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">16. Contact us</h2>
            <p className="mt-2">
              Questions about these Terms or about our services? Contact us at info@varyonstudios.com or at the postal address provided in the "Who we are" section above.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
