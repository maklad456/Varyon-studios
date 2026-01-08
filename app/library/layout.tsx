import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library | Before & After Gallery | Varyon Studios",
  description: "Explore real transformations across industries. Each project showcases how we elevate brands with AI-powered visual content.",
  alternates: {
    canonical: "https://varyonstudios.com/library",
  },
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
