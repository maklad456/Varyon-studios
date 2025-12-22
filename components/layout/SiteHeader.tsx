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
      <div className="mx-auto flex w-full items-center justify-between px-6 py-4 text-white sm:px-8 lg:px-12">
        <Link href="/" aria-label="Varyon Studios" className="flex items-center">
          <div className="relative h-20 w-20">
            <Image
              src="/branding/vs-icon-light.png"
              alt="Varyon Studios"
              fill
              className="object-contain"
              sizes="80px"
              quality={100}
              priority={pathname === "/"}
            />
          </div>
        </Link>

        <nav className="hidden items-center justify-center gap-8 text-base font-medium tracking-wide md:flex">
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
          <Link href="/case-studies" className="text-white/80 transition hover:text-white">
            Success stories
          </Link>
        </nav>

        <div className="hidden items-center justify-end gap-4 md:flex">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={handleWhatsApp}
            className="rounded-full bg-vs-accent px-6 py-3 text-center text-[11px] font-semibold uppercase leading-tight tracking-[0.2em] text-black transition hover:bg-emerald-500"
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
            <Link href="/case-studies" onClick={() => setMenuOpen(false)}>
              Success stories
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
              Get your free
              <br />
              sample
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
