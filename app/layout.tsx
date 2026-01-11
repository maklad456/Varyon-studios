import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
// TKFPageTransitionProvider removed - no page transition animations
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LeadCaptureModal } from "@/components/common/LeadCaptureModal";
import { IntroOverlay } from "@/components/common/IntroOverlay";
import { HomepageScrollSnap } from "@/components/common/HomepageScrollSnap";

const suisseIntl = localFont({
  src: [
    { path: "../public/fonts/suisse-intl/suisse-intl-regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/suisse-intl/suisse-intl-medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/suisse-intl/suisse-intl-semibold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/suisse-intl/suisse-intl-bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-suisse-intl",
  display: "swap",
});

const siteUrl = "https://varyonstudios.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Varyon Studios | AI Media Production & Product Photography",
  description:
    "AI-powered content studio for brands that want global-level visuals without global-level headaches.",
  keywords: [
    "AI media production agency",
    "AI product photography",
    "AI content studio",
    "Product images for e-commerce",
    "AI visuals for brands",
  ],
  openGraph: {
    title: "Varyon Studios | AI Media Production & Product Photography",
    description:
      "AI-powered content studio for brands that want global-level visuals without global-level headaches.",
    url: siteUrl,
    type: "website",
    locale: "en_US",
    siteName: "Varyon Studios",
    images: [
      {
        url: "/brand/full-logo-tagline-black-bg.webp",
        width: 3237,
        height: 2030,
        alt: "Varyon Studios — AI-powered content studio for brands that want global-level visuals without global-level headaches.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Varyon Studios | AI Media Production & Product Photography",
    description:
      "AI-powered content studio for brands that want global-level visuals without global-level headaches.",
    images: ["/brand/full-logo-tagline-black-bg.webp"],
  },
  other: {
    "geo.region": "EG",
    "geo.placename": "Cairo",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Varyon Studios",
      url: siteUrl,
      logo: `${siteUrl}/branding/vs-logo-light.png`,
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@varyonstudios.com",
        telephone: "+20 11 1600 1400",
        contactType: "sales",
      },
    },
    {
      "@type": "LocalBusiness",
      name: "Varyon Studios",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Villa 9, Amr Ibn El Aas Street, South of Police Academy, First Settlement",
        addressLocality: "New Cairo",
        addressRegion: "Cairo",
        addressCountry: "EG",
      },
      email: "info@varyonstudios.com",
      telephone: "+20 11 1600 1400",
      url: siteUrl,
    },
    {
      "@type": "WebSite",
      name: "Varyon Studios",
      url: siteUrl,
      description: "AI-powered content studio turning simple product photos into cinematic campaigns, ecommerce imagery and launch assets that sell.",
      publisher: {
        "@type": "Organization",
        name: "Varyon Studios",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SiteNavigationElement",
      name: "Main Navigation",
      url: siteUrl,
      hasPart: [
        {
          "@type": "SiteNavigationElement",
          name: "Home",
          url: siteUrl,
        },
        {
          "@type": "SiteNavigationElement",
          name: "Library",
          url: `${siteUrl}/library`,
          description: "Explore real transformations across industries. Each project showcases how we elevate brands with AI-powered visual content.",
        },
        {
          "@type": "SiteNavigationElement",
          name: "Case Studies",
          url: `${siteUrl}/case-studies`,
          description: "Real client success stories and portfolio showcases of AI-powered visual content production.",
        },
        {
          "@type": "SiteNavigationElement",
          name: "Policies",
          url: `${siteUrl}/policies`,
          description: "Review Varyon Studios' privacy policy and refund policy. Learn how we handle your data and our refund terms for creative services.",
        },
        {
          "@type": "SiteNavigationElement",
          name: "Terms & Conditions",
          url: `${siteUrl}/terms`,
          description: "Legal terms covering Varyon Studios creative services and website use.",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suisseIntl.variable} font-sans bg-vs-bgLight text-vs-textBody antialiased`}>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RCYFF994BH"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RCYFF994BH');
          `}
        </Script>
        <HomepageScrollSnap />
        <IntroOverlay />
        <div id="app-content" className="appContent--hidden">
          <SiteHeader />
          <main className="pt-0">{children}</main>
          <SiteFooter />
          <LeadCaptureModal />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
