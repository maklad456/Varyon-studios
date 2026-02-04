import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Discovery Call | Varyon Studios",
  description:
    "Schedule a discovery call with Varyon Studios. Plan your launch or campaign visuals with our team.",
  alternates: {
    canonical: "https://varyonstudios.com/book-call",
  },
};

export default function BookCallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
