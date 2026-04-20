/**
 * effects/Backgrounds.jsx
 * Zbiór dynamicznych teł i efektów wizualnych.
 */

import React, { useRef, useEffect } from "react";

/**
 * MeshBackground
 * Statyczne, rozmyte kule światła tworzące głębię w tle.
 */
export function MeshBackground({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="hero-mesh-orb hero-mesh-orb--one" />
      <div className="hero-mesh-orb hero-mesh-orb--two" />
    </div>
  );
}

/**
 * DotGridCanvas
 * Interaktywna siatka punktów reagująca na ruch myszki.
 * Wykorzystuje Canvas API dla maksymalnej wydajności.
 */
export function DotGridCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const spacing = 44;
    const baseSize = 1;
    const maxSize = 3.5;
    const baseOpacity = 0.18;
    const maxOpacity = 0.95;
    const influence = 160;

    let dots = [];
    let width = 0;
    let height = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let rafId = null;

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.floor(width / spacing) + 1;
      const rows = Math.floor(height / spacing) + 1;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          dots.push({
            x: offsetX + col * spacing,
            y: offsetY + row * spacing,
            size: baseSize,
            opacity: baseOpacity,
          });
        }
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetSize = baseSize;
        let targetOpacity = baseOpacity;

        if (distance < influence) {
          const factor = 1 - distance / influence;
          targetSize = baseSize + (maxSize - baseSize) * factor;
          targetOpacity = baseOpacity + (maxOpacity - baseOpacity) * factor;
        }

        dot.size += (targetSize - dot.size) * 0.15;
        dot.opacity += (targetOpacity - dot.opacity) * 0.15;

        context.fillStyle = `rgba(255,255,255,${dot.opacity})`;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        context.fill();
      });

      rafId = window.requestAnimationFrame(draw);
    };

    const handleMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    const handleLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const handleResize = () => {
      setup();
    };

    setup();
    rafId = window.requestAnimationFrame(draw);
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseout", handleLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
