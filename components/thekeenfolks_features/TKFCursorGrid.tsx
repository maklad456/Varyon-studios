"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const COLS = 28;
const ROWS = 16;
const TRAIL_LENGTH = 20;

export function TKFCursorGrid() {
  const [trail, setTrail] = useState<number[]>([]);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarsePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const updateTrail = (index: number) => {
    setTrail((prev) => {
      if (prev[prev.length - 1] === index) {
        return prev;
      }
      const next = [...prev, index];
      if (next.length > TRAIL_LENGTH) {
        next.splice(0, next.length - TRAIL_LENGTH);
      }
      return next;
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(COLS - 1, Math.floor(((event.clientX - rect.left) / rect.width) * COLS)));
    const y = Math.max(0, Math.min(ROWS - 1, Math.floor(((event.clientY - rect.top) / rect.height) * ROWS)));
    updateTrail(y * COLS + x);
  };

  const handlePointerLeave = () => setTrail([]);

  if (isCoarsePointer) {
    return <div className="tkf-grid-fallback" />;
  }

  return (
    <div
      ref={containerRef}
      className="tkf-grid"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {Array.from({ length: COLS * ROWS }).map((_, index) => (
        <div
          key={index}
          className={clsx("tkf-grid-cell", trail.includes(index) && "active")}
        />
      ))}
    </div>
  );
}



