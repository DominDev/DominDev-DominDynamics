/**
 * App.jsx
 * Główny punkt wejścia aplikacji. 
 * Składa modularne sekcje w spójną całość i zarządza globalnymi stanami (kursor).
 */

import React from "react";
import { Header, Footer } from "./components/layout/Navigation";
import { Hero } from "./components/sections/Hero";
import { About, Approach } from "./components/sections/AboutApproach";
import { Architecture, Work, Contact } from "./components/sections/MainSections";
import { ScrollToTop } from "./components/ui/ScrollToTop";
import { useCustomCursor } from "./hooks/useCustomCursor";

export default function App() {
  const { cursorVisible, cursorExpanded, cursorPosition } = useCustomCursor();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Autorski kursor - React 19 zoptymalizuje jego renderowanie */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed z-[9999] hidden rounded-full bg-white mix-blend-difference transition-[width,height,opacity,transform] duration-300 ease-out [@media(pointer:fine)]:block ${
          cursorVisible ? "opacity-100" : "opacity-0"
        } ${cursorExpanded ? "h-[60px] w-[60px]" : "h-5 w-5"}`}
        style={{
          left: cursorExpanded ? cursorPosition.x - 30 : cursorPosition.x - 10,
          top: cursorExpanded ? cursorPosition.y - 30 : cursorPosition.y - 10,
        }}
      />

      {/* Skip link dla a11y */}
      <a
        href="#main"
        className="absolute left-4 top-4 z-[120] -translate-y-24 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black focus:translate-y-0"
      >
        Przejdź do treści
      </a>

      {/* Subtelne tło globalne */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.05),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(255,255,255,0.04),transparent_50%)]" />

      <Header />

      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Approach />
        <Architecture />
        <Work />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
