import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies | Varyon Studios",
  description: "Privacy Policy and Refund Policy for Varyon Studios services.",
};

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
