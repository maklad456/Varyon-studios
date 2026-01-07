"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const homeNavItems = [
  { label: "Why Varyon", href: "#challenges" },
  { label: "What we offer", href: "#capabilities" },
  { label: "How it works", href: "#process" },
  { label: "Our work", href: "#library" },
  { label: "FAQs", href: "#faq" },
];

const otherPagesNavItems = [
  { label: "Home", href: "/" },
  { label: "Library", href: "/library" },
  { label: "Case studies", href: "/case-studies" },
];

const WHATSAPP_URL =
  "https://wa.me/201116001400?text=Hi%20Varyon%20Studios,%20I%27d%20love%20to%20see%20a%20free%20sample%20for%20my%20brand.";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Check if we're on the homepage
  const isHomePage = pathname === "/";
  
  // Check if we're on a library detail page
  const isLibraryDetailPage = pathname?.startsWith("/library/") && pathname !== "/library";
  
  // Determine which nav items to use
  const navItems = isHomePage ? homeNavItems : otherPagesNavItems;

  useEffect(() => {
    if (!isLibraryDetailPage) {
      // On non-library pages, always use the overlay style
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLibraryDetailPage]);

  const handleWhatsApp = () => {
    trackEvent("whatsapp_click", { location: "header" });
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        // Get the computed scroll-margin-top from the element (matches scroll-mt-24 = 96px)
        const computedStyle = window.getComputedStyle(element);
        const scrollMarginTop = parseInt(computedStyle.scrollMarginTop) || 96;
        
        // Get element position relative to document
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        
        // Scroll to position accounting for scroll margin
        const offsetPosition = elementPosition - scrollMarginTop;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth"
        });
      }
    } else if (href.startsWith("/")) {
      router.push(href);
    }
    setMenuOpen(false);
  };

  // Determine header background classes based on scroll state and page type
  const headerBgClass = isLibraryDetailPage && !isScrolled
    ? "bg-[#020202] backdrop-blur-none" // Solid black when at top on library pages
    : "bg-[#020202]/70 backdrop-blur-xl"; // Gray overlay when scrolled or on other pages

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-white/5 transition-all duration-300 ${headerBgClass}`}>
      <div className="mx-auto grid w-full grid-cols-3 items-center pl-6 pr-6 py-5 text-white sm:px-8 lg:px-12 md:pr-1">
        <Link href="/" aria-label="Varyon Studios" className="flex items-center justify-start">
          <div className="relative h-14 w-14">
            <Image
              src="/branding/vs-icon-light.webp"
              alt="Varyon Studios"
              fill
              className="object-contain"
              sizes="56px"
              priority={pathname === "/"}
            />
          </div>
        </Link>

        <nav className="hidden items-center justify-center gap-10 text-sm font-medium tracking-wide md:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavClick(item.href)}
              className="text-white/80 transition hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-4 md:flex">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={handleWhatsApp}
            className="flex flex-col items-center rounded-full bg-vs-accent px-6 py-3 text-[11px] font-semibold uppercase leading-tight tracking-[0.2em] text-black transition hover:bg-emerald-500"
          >
            <span className="block">Get your free</span>
            <span className="block">sample</span>
          </a>
        </div>

        <div className="flex items-center justify-end md:hidden col-start-3">
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Toggle menu</span>
            <span className="block h-0.5 w-5 bg-white" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#020202]/95 px-4 py-6 shadow-lg md:hidden">
          <div className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            {navItems.map((item) => (
              <button key={item.href} type="button" onClick={() => handleNavClick(item.href)} className="text-left">
                {item.label}
              </button>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                handleWhatsApp();
                setMenuOpen(false);
              }}
              className="flex flex-col items-center rounded-full bg-vs-accent px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black"
            >
              <span>Get your free</span>
              <span>sample</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
