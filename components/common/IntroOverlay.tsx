"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function IntroOverlay() {
  const [shouldShow, setShouldShow] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const pathname = usePathname();

  const finishIntro = () => {
    setAnimationComplete(true);
    setShouldShow(false);
    document.body.classList.remove("intro-lock");
    
    // Show app content
    const appContent = document.getElementById("app-content");
    if (appContent) {
      appContent.classList.remove("appContent--hidden");
      appContent.classList.add("appContent--visible");
    }

    // Mark as seen for this session
    if (typeof window !== "undefined") {
      sessionStorage.setItem("varyon_intro_seen", "1");
    }
  };

  useEffect(() => {
    // Only run on homepage
    if (pathname !== "/") {
      // Show content immediately if not homepage
      const appContent = document.getElementById("app-content");
      if (appContent) {
        appContent.classList.remove("appContent--hidden");
        appContent.classList.add("appContent--visible");
      }
      const headerLogo = document.querySelector('[data-header-logo]') as HTMLElement;
      if (headerLogo) headerLogo.style.opacity = "1";
      return;
    }

    // Check if intro already seen this session
    if (typeof window === "undefined") {
      // On server-side, ensure content is visible to prevent FCP blocking
      const appContent = document.getElementById("app-content");
      if (appContent) {
        appContent.classList.remove("appContent--hidden");
        appContent.classList.add("appContent--visible");
      }
      return;
    }
    
    const hasSeenIntro = sessionStorage.getItem("varyon_intro_seen");
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (hasSeenIntro || prefersReducedMotion) {
      setAnimationComplete(true);
      finishIntro();
      return;
    }

    // Show the intro
    setShouldShow(true);
    document.body.classList.add("intro-lock");

    return () => {
      document.body.classList.remove("intro-lock");
    };
  }, [pathname]);

  const runIntroAnimation = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200)); // Small delay to ensure DOM is ready

    const overlay = document.getElementById("intro-overlay");
    const logoContainer = overlay?.querySelector('[data-intro-logo-container]') as HTMLElement;

    if (!overlay || !logoContainer) {
      console.error("Missing required elements:", { overlay: !!overlay, logoContainer: !!logoContainer });
      finishIntro();
      return;
    }

    try {
      // Wait a moment to show the logo
      await new Promise((resolve) => setTimeout(resolve, 1400));

      // Fade out entire logo
      logoContainer.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 560, fill: "forwards" }
      );
      
      await new Promise((resolve) => setTimeout(resolve, 560));

      // Fade in the site content
      const appContent = document.getElementById("app-content");
      if (appContent) {
        appContent.classList.remove("appContent--hidden");
        appContent.classList.add("appContent--visible");
      }

      // Reveal header logo
      const headerLogo = document.querySelector('[data-header-logo]') as HTMLElement;
      if (headerLogo) {
        headerLogo.style.transition = "opacity 400ms ease";
        headerLogo.style.opacity = "1";
      }

      // Small delay for content to start fading in
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Fade out overlay
      await overlay.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 250, fill: "forwards" }
      ).finished;

      finishIntro();
    } catch (error) {
      console.error("Intro animation error:", error);
      finishIntro();
    }
  };

  // Run animation when image is loaded
  useEffect(() => {
    if (shouldShow && imageLoaded) {
      runIntroAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShow, imageLoaded]);

  if (!shouldShow) return null;

  return (
    <div id="intro-overlay" className="introOverlay" aria-hidden="true">
      <div className="introStage">
        <div data-intro-logo-container className="w-full flex flex-col items-center">
          <div className="introLogo">
            <Image
              src="/brand/full-logo-tagline.webp"
              alt="Varyon Studios"
              width={3237}
              height={2030}
              priority
              fetchPriority="high"
              quality={90}
              className="w-full h-auto"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
