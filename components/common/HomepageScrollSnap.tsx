"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function HomepageScrollSnap() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;

    if (isHomePage) {
      html.classList.add("homeSnap");
      html.style.scrollPaddingTop = "96px";
    } else {
      html.classList.remove("homeSnap");
      html.style.scrollPaddingTop = "";
    }

    return () => {
      html.classList.remove("homeSnap");
      html.style.scrollPaddingTop = "";
    };
  }, [isHomePage]);

  return null;
}

