"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const homeNavItems = [
  { label: "What we offer", href: "#capabilities" },
  { label: "How it works", href: "#process" },
  { label: "Our work", href: "#library" },
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
        element.scrollIntoView({ behavior: "smooth", block: "start" });
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
      <div className="mx-auto flex w-full items-center justify-between px-6 py-5 text-white sm:px-8 lg:px-12">
        <Link href="/" aria-label="Varyon Studios" className="flex items-center">
          <div className="relative h-14 w-14">
            <Image
              src="/branding/vs-icon-light.png"
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
          <button
            type="button"
            onClick={() => handleNavClick("#faq")}
            className="text-xs uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
          >
            FAQ
          </button>
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

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Toggle menu</span>
          <span className="block h-0.5 w-5 bg-white" />
        </button>
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
