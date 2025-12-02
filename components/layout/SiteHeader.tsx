"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

const navItems = [
  { label: "Work", href: "#case-studies" },
  { label: "How it works", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const WHATSAPP_URL =
  "https://wa.me/201116001400?text=Hi%20Varyon%20Studios,%20I%27d%20love%20to%20see%20a%20free%20sample%20for%20my%20brand.";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
      window.location.href = href;
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#020202]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-white sm:px-6">
        <Link href="/" aria-label="Varyon Studios">
          <div className="relative h-8 w-36">
            <Image src="/branding/vs-logo-light.png" alt="Varyon Studios" fill className="object-contain" sizes="144px" priority={pathname === "/"} />
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide uppercase md:flex">
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
          <Link
            href="/case-studies"
            className="text-white/80 transition hover:text-white"
          >
            Case studies
          </Link>
        </nav>
        <div className="hidden items-center gap-4 md:flex">
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
            className="rounded-full bg-vs-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-500"
          >
            Get your free sample
          </a>
        </div>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white md:hidden"
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
            <Link href="/case-studies" onClick={() => setMenuOpen(false)}>
              Case studies
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                handleWhatsApp();
                setMenuOpen(false);
              }}
              className="rounded-full bg-vs-accent px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black"
            >
              Get your free sample
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
