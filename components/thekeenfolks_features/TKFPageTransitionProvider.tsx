"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { TKFPreloaderOverlay } from "./TKFPreloaderOverlay";

const INTRO_DURATION = 2800;
const TRANSITION_DURATION = 900;

export function TKFPageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [overlay, setOverlay] = useState<{ visible: boolean; mode: "intro" | "transition" }>({
    visible: true,
    mode: "intro",
  });
  const initialRender = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const lastShown = Number(localStorage.getItem("tkf_preloader_lastShown") || 0);
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const shouldShowIntro = !lastShown || now - lastShown > day;

    if (shouldShowIntro) {
      localStorage.setItem("tkf_preloader_lastShown", String(now));
      const timer = setTimeout(() => {
        setOverlay((prev) => ({ ...prev, visible: false }));
      }, INTRO_DURATION);
      return () => clearTimeout(timer);
    }

    setOverlay({ visible: false, mode: "transition" });
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    setOverlay({ visible: true, mode: "transition" });
    const timer = setTimeout(() => {
      setOverlay((prev) => ({ ...prev, visible: false }));
    }, TRANSITION_DURATION);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <TKFPreloaderOverlay isVisible={overlay.visible} mode={overlay.mode} />
      {children}
    </>
  );
}



