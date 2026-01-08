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
    "Cairo-based AI content studio turning simple product photos into cinematic campaigns, ecommerce imagery and launch assets that sell.",
  keywords: [
    "AI media production agency",
    "AI product photography",
    "AI content studio",
    "Product images for e-commerce",
    "AI visuals for brands",
  ],
  icons: {
    icon: "/branding/vs-icon-dark.png",
    shortcut: "/branding/vs-icon-dark.png",
    apple: "/branding/vs-icon-dark.png",
  },
  openGraph: {
    title: "Varyon Studios | AI Media Production & Product Photography",
    description:
      "Million-dollar photoshoots that actually sell. Get cinematic imagery, campaigns and videos built for conversion.",
    url: siteUrl,
    type: "website",
    locale: "en_US",
    siteName: "Varyon Studios",
    images: [
      {
        url: "/branding/vs-logo-light.png",
        width: 800,
        height: 400,
        alt: "Varyon Studios — Million-dollar photoshoots that actually sell.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Varyon Studios | AI Media Production & Product Photography",
    description:
      "AI-powered content studio for ecommerce brands in Egypt and beyond. Free sample within days.",
    images: ["/branding/vs-logo-light.png"],
  },
  other: {
    "geo.region": "EG",
    "geo.placename": "Cairo",
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
