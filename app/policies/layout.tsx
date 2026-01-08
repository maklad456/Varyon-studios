import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies | Privacy Policy & Refund Policy | Varyon Studios",
  description: "Review Varyon Studios' privacy policy and refund policy. Learn how we handle your data and our refund terms for creative services.",
  alternates: {
    canonical: "https://varyonstudios.com/policies",
  },
};

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
