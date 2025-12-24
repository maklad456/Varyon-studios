"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function IntroOverlay() {
  const [shouldShow, setShouldShow] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [svgContent, setSvgContent] = useState<string>("");
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

  // Load SVG content
  useEffect(() => {
    if (pathname === "/" && !svgContent) {
      fetch("/brand/full-logo.svg")
        .then((res) => res.text())
        .then((text) => {
          // Add data attributes to SVG elements for targeting
          let modified = text;
          // Add data attributes if they don't exist
          if (!modified.includes('data-intro-line="1"')) {
            modified = modified.replace(/<g id="ARYON">/g, '<g id="ARYON" data-intro-line="1">');
          }
          if (!modified.includes('data-intro-line="2"')) {
            modified = modified.replace(/<g id="STUDIOS">/g, '<g id="STUDIOS" data-intro-line="2">');
          }
          // Find and mark the V mark image
          modified = modified.replace(/(<image[^>]*id="[^"]*Image[^"]*"[^>]*>)/i, '$1 data-intro-v="true"');
          setSvgContent(modified);
        })
        .catch((err) => {
          console.error("Failed to load logo SVG:", err);
          finishIntro();
        });
    }
  }, [pathname, svgContent]);

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
    if (typeof window === "undefined") return;
    
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

  // Run animation when SVG is loaded
  useEffect(() => {
    if (shouldShow && svgContent) {
      runIntroAnimation();
    }
  }, [shouldShow, svgContent]);

  const runIntroAnimation = async () => {
    // Wait for SVG to load
    if (!svgContent) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      if (!svgContent) {
        finishIntro();
        return;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 200)); // Small delay to ensure DOM is ready

    const overlay = document.getElementById("intro-overlay");
    const svg = overlay?.querySelector("svg");
    const line1 = svg?.querySelector('#ARYON');
    const line2 = svg?.querySelector('#STUDIOS');
    // Try multiple ways to find the V mark image
    const vMark = svg?.querySelector('[data-intro-v]') || 
                  svg?.querySelector('image[data-intro-v]') ||
                  svg?.querySelector('image') ||
                  svg?.querySelector('#Outline_copy_Image image') ||
                  svg?.querySelector('g#Outline_copy_Image image');

    if (!overlay || !svg || !line1 || !line2) {
      console.error("Missing required elements:", { overlay: !!overlay, svg: !!svg, line1: !!line1, line2: !!line2 });
      finishIntro();
      return;
    }

    if (!vMark) {
      console.warn("V mark not found, proceeding without V animation");
    }

    // Logo appears as a whole - no initial hiding
    // All elements are visible from the start

    try {
      // Wait a moment to show the logo
      await new Promise((resolve) => setTimeout(resolve, 1400));

      // Fade out text lines
      (line1 as HTMLElement).animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 560, fill: "forwards" }
      );
      (line2 as HTMLElement).animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 560, fill: "forwards" }
      );
      
      await new Promise((resolve) => setTimeout(resolve, 560));

      // Animate V mark to scale down and move to header position
      console.log("🔍 V mark animation check:", { 
        vMarkFound: !!vMark, 
        vMarkTag: vMark?.tagName,
        vMarkId: (vMark as HTMLElement)?.id 
      });
      
      if (vMark) {
        const headerTarget = document.querySelector('[data-header-v-target]') as HTMLElement;
        console.log("🔍 Header target check:", { 
          headerTargetFound: !!headerTarget 
        });
        
        if (headerTarget) {
          // Get bounding boxes relative to viewport
          const vRect = (vMark as HTMLElement).getBoundingClientRect();
          const targetRect = headerTarget.getBoundingClientRect();
          
          console.log("📐 Bounding boxes:", {
            vRect: { left: vRect.left, top: vRect.top, width: vRect.width, height: vRect.height },
            targetRect: { left: targetRect.left, top: targetRect.top, width: targetRect.width, height: targetRect.height }
          });
          
          // Calculate the transform needed
          const vCenterX = vRect.left + vRect.width / 2;
          const vCenterY = vRect.top + vRect.height / 2;
          const targetCenterX = targetRect.left + targetRect.width / 2;
          const targetCenterY = targetRect.top + targetRect.height / 2;
          
          const dx = targetCenterX - vCenterX;
          const dy = targetCenterY - vCenterY;
          const scale = targetRect.width / vRect.width;
          
          console.log("📊 Transform calculations:", { dx, dy, scale });
          
          // Find the image element or its parent group
          const vImage = (vMark.tagName === 'image' || vMark.tagName === 'IMAGE' 
            ? vMark 
            : vMark.querySelector('image')) as SVGImageElement;
          
          const vGroup = vImage?.closest('g') || vMark;
          
          console.log("🖼️ Element search:", {
            vImageFound: !!vImage,
            vImageTag: vImage?.tagName,
            vGroupFound: !!vGroup,
            vGroupTag: vGroup?.tagName,
            vGroupId: (vGroup as HTMLElement)?.id
          });
          
          // Use the same image as header logo for perfect visual continuity
          try {
            // Create clone using header logo image
            const vClone = document.createElement('img');
            vClone.src = '/branding/vs-icon-light.png';
            vClone.style.position = "fixed";
            vClone.style.left = `${vRect.left}px`;
            vClone.style.top = `${vRect.top}px`;
            vClone.style.width = `${vRect.width}px`;
            vClone.style.height = `${vRect.height}px`;
            vClone.style.objectFit = "contain";
            vClone.style.pointerEvents = "none";
            vClone.style.zIndex = "10000";
            vClone.style.transformOrigin = "center center";
            vClone.style.opacity = "0"; // Start invisible
            document.body.appendChild(vClone);
            
            // Wait for image to fully load
            await new Promise((resolve) => {
              if (vClone.complete) {
                resolve(null);
              } else {
                vClone.onload = () => resolve(null);
                setTimeout(() => resolve(null), 200); // Fallback timeout
              }
            });
            
            // Fade IN clone while original is still visible (overlap prevents blink)
            vClone.style.opacity = "1";
            await new Promise((resolve) => setTimeout(resolve, 50));
            
            // NOW hide original (clone is already visible = no blink)
            (vMark as HTMLElement).style.transition = "opacity 100ms ease";
            (vMark as HTMLElement).style.opacity = "0";
            
            // Small delay to ensure smooth handoff
            await new Promise((resolve) => setTimeout(resolve, 100));
            
            console.log("🎬 Starting V mark animation...");
            
            // Animate clone moving and scaling to header
            const animation = vClone.animate(
              [
                { transform: "translate(0, 0) scale(1)", opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 1 },
              ],
              {
                duration: 800,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards",
              }
            );
            
            await animation.finished;
            
            console.log("✅ V mark reached header position");
            
            // Start revealing header logo BEFORE clone fades out (overlap = no blink)
            const headerLogo = document.querySelector('[data-header-logo]') as HTMLElement;
            if (headerLogo) {
              headerLogo.style.transition = "opacity 400ms ease";
              headerLogo.style.opacity = "1";
            }
            
            // Wait a bit for header logo to start appearing
            await new Promise((resolve) => setTimeout(resolve, 150));
            
            // NOW fade out clone (header logo is already visible = no blink)
            await vClone.animate(
              [{ opacity: 1 }, { opacity: 0 }],
              { duration: 250, fill: "forwards", easing: "ease-out" }
            ).finished;
            
            // Remove clone after it's fully invisible
            vClone.remove();
            
            console.log("✅ Seamless V handoff complete");
          } catch (error) {
            console.error("❌ V mark animation error:", error);
          }
        } else {
          console.error("❌ Header target not found");
        }
      } else {
        console.error("❌ V mark not found");
      }

      // Header logo already revealed above during V handoff
      // Now fade in the site content
      const appContent = document.getElementById("app-content");
      if (appContent) {
        appContent.classList.remove("appContent--hidden");
        appContent.classList.add("appContent--visible");
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

  if (!shouldShow) return null;

  return (
    <div id="intro-overlay" className="introOverlay" aria-hidden="true">
      <div className="introStage">
        {svgContent ? (
          <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
            className="introLogo"
          />
        ) : (
          <div className="introLogo" />
        )}
      </div>
    </div>
  );
}
