import Link from "next/link";

const quickLinks = [
  { label: "Work", href: "/case-studies" },
  { label: "How it works", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3 lg:px-12">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-vs-accent-soft">Varyon Studios</p>
          <p className="mt-4 text-lg text-white">
            AI-powered content studio for brands that want global-level visuals without global-level headaches.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft">Quick links</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft">Contact</p>
          <div className="mt-4 space-y-2 text-sm text-white/80">
            <a href="mailto:info@varyonstudios.com" className="hover:text-white">
              info@varyonstudios.com
            </a>
            <a href="tel:+491706083757" className="block hover:text-white">
              +49 170 6083757
            </a>
            <p>
              Villa 9, Amr Ibn El Aas Street,
              <br /> South of Police Academy, First Settlement,
              <br /> New Cairo, Cairo, Egypt
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/60 sm:px-8 lg:px-12">
        © {new Date().getFullYear()} Varyon Studios. Cookies & privacy focused. All rights reserved.
      </div>
    </footer>
  );
}
