import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Varyon Studios",
  description: "How Varyon Studios handles data, cookies, analytics and EmailJS submissions.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-vs-bgLight py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-4xl font-semibold text-vs-text-strong">Privacy Policy</h1>
        <p className="mt-4 text-sm text-vs-text-body">
          Last updated: {new Date().getFullYear()}
        </p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-vs-text-body">
          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">What data we collect</h2>
            <p className="mt-2">
              When you request a free sample, submit the 10% popup or contact us, we collect the details you provide (name, company, email, phone, project intent). This data lives inside our EmailJS account and CRM; we never sell or rent it.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">Cookies & analytics</h2>
            <p className="mt-2">
              We use Google Analytics 4 and Microsoft Clarity to understand aggregate behavior. These tools rely on first-party cookies and pseudonymous IDs. You can opt out using your browser settings or Google’s opt-out tools.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">EmailJS</h2>
            <p className="mt-2">
              EmailJS sends the 10% code and notifies our team. It stores your submission so we can honor the offer. By submitting the form you consent to that processing.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-vs-text-strong">Data retention</h2>
            <p className="mt-2">
              We keep lead data for as long as needed to provide services. You can request deletion anytime by emailing info@varyonstudios.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
