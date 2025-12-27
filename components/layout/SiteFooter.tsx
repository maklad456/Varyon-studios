import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "Work", href: "/case-studies" },
  { label: "How it works", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/50 bg-black text-white">
      <div className="site-container grid gap-8 py-6 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft">Quick links</p>
            <ul className="mt-4 space-y-4 text-sm text-white/80">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          {/* Logo - Centered */}
          <div className="mb-6 flex justify-center">
            <Link href="/" aria-label="Varyon Studios" className="flex items-center">
              <div className="relative h-32 w-auto md:h-40">
                <Image
                  src="/branding/vs-logo-light.png"
                  alt="Varyon Studios"
                  width={500}
                  height={160}
                  className="h-full w-auto object-contain"
                  sizes="500px"
                />
              </div>
            </Link>
          </div>
          <p className="text-base leading-relaxed text-white">
            AI-powered content studio for brands that want global-level visuals without global-level headaches.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft">Contact</p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/80">
              <a href="mailto:info@varyonstudios.com" className="block hover:text-white">
              info@varyonstudios.com
            </a>
            <a href="tel:+201116001400" className="block hover:text-white">
              +20 11 1600 1400
            </a>
            <a href="tel:+491706083757" className="block hover:text-white">
              +49 170 6083757
            </a>
            <p>
              Villa 9, Amr Ibn El Aas Street,
              <br /> South of Police Academy, First Settlement,
              <br /> New Cairo, Cairo, Egypt
            </p>
            <div className="mt-4 flex justify-end">
              <a
                href="https://www.instagram.com/varyonglobal"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/80 transition hover:text-white"
                aria-label="Follow us on Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                <span>@varyonglobal</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-8 text-center text-xs text-white/60">
        <div className="site-container">
        © {new Date().getFullYear()} Varyon Studios. Cookies & privacy focused. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
