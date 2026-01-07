"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PoliciesContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"privacy" | "refund">("privacy");

  useEffect(() => {
    // Check for hash in URL first
    const hash = window.location.hash;
    if (hash === "#refund") {
      setActiveTab("refund");
      return;
    }
    
    // Then check for tab query parameter
    const tab = searchParams.get("tab");
    if (tab === "refund") {
      setActiveTab("refund");
    } else if (tab === "privacy") {
      setActiveTab("privacy");
    } else {
      setActiveTab("privacy");
    }
  }, [searchParams]);

  return (
    <div className="bg-vs-bgLight pt-32 pb-24 md:pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-4xl font-semibold text-vs-text-strong">Policies</h1>
        <p className="mt-4 text-sm text-vs-text-body">
          Last updated: January 7, 2026
        </p>

        {/* Tabs - Mobile and Desktop */}
        <div className="mt-8 flex gap-3 md:gap-4">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex-1 md:flex-none whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-all ${
              activeTab === "privacy"
                ? "bg-vs-accent text-black"
                : "border border-vs-text-body/30 bg-transparent text-vs-text-body hover:border-vs-accent hover:text-vs-accent"
            }`}
            aria-label="View Privacy Policy"
            aria-pressed={activeTab === "privacy"}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab("refund")}
            className={`flex-1 md:flex-none whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-all ${
              activeTab === "refund"
                ? "bg-vs-accent text-black"
                : "border border-vs-text-body/30 bg-transparent text-vs-text-body hover:border-vs-accent hover:text-vs-accent"
            }`}
            aria-label="View Refund Policy"
            aria-pressed={activeTab === "refund"}
          >
            Refund Policy
          </button>
        </div>

        {/* Privacy Policy Content */}
        {activeTab === "privacy" && (
          <div className="mt-8 space-y-6 text-base leading-relaxed text-vs-text-body">
            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">1. Introduction</h2>
              <p className="mt-2">
                Welcome to Varyon Studios (&quot;Varyon Studios&quot;, &quot;we&quot;, &quot;our&quot; or &quot;us&quot;). We are an AI‑powered content studio that creates images, videos and creative concepts for clients around the world. This notice explains how we collect, use, disclose and safeguard your personal information when you interact with us—whether through our website, contact forms, WhatsApp messages or client projects. We comply with the Egyptian Personal Data Protection Law No. 151/2020 (PDPL), the EU General Data Protection Regulation (GDPR) for visitors in the EEA/UK, and other applicable privacy laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">2. Who we are</h2>
              <p className="mt-2">
                Varyon Studios acts as the <strong>data controller</strong> for information processed through our website, enquiry forms and marketing channels. When we are engaged on a client project we may also act as a <strong>data processor</strong> under the client&apos;s instructions. You can contact us at:
              </p>
              <ul className="mt-2 ml-6 list-disc space-y-1">
                <li><strong>Email:</strong> info@varyonstudios.com</li>
                <li><strong>Phone:</strong> +20 11 1600 1400</li>
                <li><strong>Address:</strong> Villa 9, Amr Ibn El Aas Street, South of Police Academy, First Settlement, New Cairo, Cairo, Egypt.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">3. What data we collect</h2>
              <p className="mt-2">Depending on how you interact with us, we may collect:</p>
              <ul className="mt-2 ml-6 list-disc space-y-1">
                <li><strong>Identity data</strong> – your name, job title and company.</li>
                <li><strong>Contact data</strong> – email address, phone number, WhatsApp handle or social‑media username.</li>
                <li><strong>Project data</strong> – product photos, reference images, mood boards, descriptions, creative direction and other materials you supply for your project.</li>
                <li><strong>Financial & transaction data</strong> – invoices, payment records and billing details (handled through our payment processor; we do not store full card numbers).</li>
                <li><strong>Technical data</strong> – IP address, browser type, device IDs and cookie identifiers.</li>
                <li><strong>Usage data</strong> – pages visited on our website, time on page and interaction logs.</li>
                <li><strong>Communication data</strong> – messages, feedback and correspondence with our team.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">4. How we collect your data</h2>
              <ul className="mt-2 ml-6 list-disc space-y-1">
                <li><strong>Direct interactions:</strong> you provide information when you request a free sample, submit the 10 %‑off pop‑up, book a discovery call, send us files via email/WhatsApp or sign an agreement.</li>
                <li><strong>Automated technologies:</strong> we use first‑party cookies, server logs and analytics tools (e.g., Google Analytics 4 and Microsoft Clarity) to collect pseudonymous usage data and understand how visitors navigate our site.</li>
                <li><strong>Third‑party sources:</strong> we may receive limited information from referral partners, publicly available databases or social‑media platforms when legally permitted.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">5. How we use your personal data</h2>
              <p className="mt-2">
                We process personal data only when a lawful basis exists. Typical purposes include:
              </p>
              <ul className="mt-2 ml-6 list-disc space-y-1">
                <li>Preparing quotes and proposals, fulfilling sample requests and delivering creative services to you (contractual necessity).</li>
                <li>Communicating about your project, scheduling calls and collecting feedback.</li>
                <li>Improving our services, analysing website performance and developing new creative offerings (legitimate interests, balanced against your rights).</li>
                <li>Sending marketing updates or case studies with your consent; you can unsubscribe at any time.</li>
                <li>Complying with legal obligations, such as tax, accounting and regulatory requirements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">6. Our lawful bases</h2>
              <p className="mt-2">
                We rely on contractual necessity to perform our obligations under a service agreement; legitimate interests to run and grow our business; legal obligations to comply with laws; and consent when required (e.g., for optional marketing emails). You have the right to withdraw consent at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">7. Data security</h2>
              <p className="mt-2">
                We apply industry‑standard safeguards to protect your data, including encryption in transit and at rest, access controls, two‑factor authentication for systems, and secure AI processing environments. Only authorised team members and trusted third‑party processors can access your information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">8. Data retention</h2>
              <p className="mt-2">
                We keep personal information only for as long as necessary to fulfil the purposes described in this notice, satisfy legal/accounting requirements and resolve disputes. When retention is no longer required, we securely delete or anonymise the data. You may request deletion at any time by emailing info@varyonstudios.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">9. Your rights</h2>
              <p className="mt-2">Subject to applicable law, you have rights to:</p>
              <ul className="mt-2 ml-6 list-disc space-y-1">
                <li>Access, correct or update your personal data;</li>
                <li>Request deletion or anonymisation;</li>
                <li>Restrict or object to certain processing;</li>
                <li>Withdraw consent at any time;</li>
                <li>Receive a copy of your data in portable form;</li>
                <li>Lodge a complaint with a supervisory authority.</li>
              </ul>
              <p className="mt-2">We respond to legitimate requests within one calendar month.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">10. International transfers</h2>
              <p className="mt-2">
                We are a globally distributed studio. We may process your data outside Egypt or your country of residence—for example, when our cloud providers, AI model providers or collaborators operate overseas. Wherever we transfer data, we ensure an adequate level of protection using Standard Contractual Clauses, intra‑group agreements or transfers to jurisdictions recognised as providing appropriate safeguards.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">11. Cookies & analytics</h2>
              <p className="mt-2">
                Our website uses first‑party cookies and pseudonymous analytics services (Google Analytics 4 and Microsoft Clarity) to understand how visitors use our pages and to improve user experience. These cookies may set identifiers in your browser. You can manage cookie preferences through your browser settings or Google&apos;s opt‑out tools. We do not use tracking pixels for advertising.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">12. Third‑party tools and AI models</h2>
              <p className="mt-2">
                To deliver your project we rely on various third‑party platforms, including Adobe Creative Cloud, Canva, CapCut, EmailJS, cloud storage providers and multiple generative AI models (e.g., OpenAI, Midjourney, Stable Diffusion) to generate images and videos. These processors may handle the data you provide under their own terms. We evaluate each provider&apos;s security posture and ensure they process data only as necessary to deliver our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">13. Changes to this privacy policy</h2>
              <p className="mt-2">
                We may update this policy periodically. Material changes will be posted on this page and, where appropriate, notified via email. Continued use of our services after an update constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">14. Contact us</h2>
              <p className="mt-2">
                If you have any questions about this privacy notice or wish to exercise your rights, please contact us at info@varyonstudios.com or at the postal address listed above.
              </p>
            </section>
          </div>
        )}

        {/* Refund Policy Content */}
        {activeTab === "refund" && (
          <div className="mt-8 space-y-6 text-base leading-relaxed text-vs-text-body">
            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">1. No guarantee of refunds</h2>
              <p className="mt-2">
                All payments made to Varyon Studios for creative services—such as AI‑generated images and videos, creative direction, post‑production and retouching—are <strong>non‑refundable</strong> once production has begun. Because our work is bespoke and labour‑intensive, we cannot resell or reuse completed assets for other clients. This refund policy may change at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">2. Scope</h2>
              <p className="mt-2">
                This policy applies to all services, packages, subscriptions and any other offerings provided by Varyon Studios. Unless a separate written agreement states otherwise, these terms govern all refund requests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">3. Requesting a refund</h2>
              <p className="mt-2">
                If you believe you are eligible for a refund under a written agreement or special terms, you must submit your request in writing to info@varyonstudios.com. Please include:
              </p>
              <ul className="mt-2 ml-6 list-disc space-y-1">
                <li>Your name and contact details;</li>
                <li>The invoice number or order/reference ID;</li>
                <li>An explanation of the reason for requesting a refund;</li>
                <li>Any supporting documentation.</li>
              </ul>
              <p className="mt-2">
                We will review the request and may, at our sole discretion, grant or deny a refund in whole or in part. Our decision will be final and binding.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">4. Conditions & exceptions</h2>
              <ul className="mt-2 ml-6 list-disc space-y-1">
                <li><strong>Pre‑production:</strong> If you cancel before any creative work (concept design, AI generation or shoots) has commenced, we may refund all or part of your deposit, less any non‑recoverable costs (e.g., software licences, scheduling fees or third‑party expenses).</li>
                <li><strong>Production phase:</strong> Once AI models have been run, scenes designed or editing begun, payments are non‑refundable. We may offer revisions instead of refunds.</li>
                <li><strong>Unsuitable content:</strong> We reserve the right to refuse projects that involve illegal, hateful, infringing or otherwise harmful content. If a project is terminated for violating our content standards, no refund will be issued.</li>
                <li><strong>Force majeure:</strong> Delays or inability to deliver due to events beyond our control do not automatically entitle you to a refund. We will work with you to reschedule or modify the project where feasible.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">5. Revisions and scope changes</h2>
              <p className="mt-2">
                Our service packages include a stated number of revision rounds. Additional changes, new creative directions or scope expansions requested after final approval will be billed separately. Payments for extra work are due upfront and are non‑refundable once work begins.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">6. No implied rights</h2>
              <p className="mt-2">
                Nothing in this Refund Policy (or any other document on this site) creates an obligation for Varyon Studios beyond what is explicitly stated. No implied warranties, obligations or rights are created herein.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">7. Changes to this policy</h2>
              <p className="mt-2">
                We may modify this Refund Policy at any time, without prior notice. Changes take effect when posted on this page. Your continued use of our services after changes become effective constitutes acceptance of the new policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-vs-text-strong">8. Contact us</h2>
              <p className="mt-2">
                Questions about this refund policy? Contact us at info@varyonstudios.com or at the address listed above.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PoliciesPage() {
  return (
    <Suspense fallback={
      <div className="bg-vs-bgLight py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-4xl font-semibold text-vs-text-strong">Policies</h1>
          <p className="mt-4 text-sm text-vs-text-body">Loading...</p>
        </div>
      </div>
    }>
      <PoliciesContent />
    </Suspense>
  );
}
