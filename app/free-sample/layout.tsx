import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Sample | Request Your Sample | Varyon Studios",
  description: "Request a free sample of AI-powered visual content. Share your brand details and assets — we'll deliver within 72 hours.",
  alternates: {
    canonical: "https://varyonstudios.com/free-sample",
  },
};

export default function FreeSampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
