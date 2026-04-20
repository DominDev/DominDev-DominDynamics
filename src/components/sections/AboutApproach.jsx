/**
 * sections/About.jsx
 * Sekcja "O mnie" prezentująca sylwetkę i kluczowe kompetencje.
 */

import React from "react";
import { motion } from "framer-motion";
import { PrimaryButton, GhostButton } from "../ui/Button";
import { ArrowRightIcon } from "../ui/Icons";
import { MeshBackground } from "../effects/Backgrounds";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-white/10 px-5 py-24 sm:px-8 lg:px-10"
    >
      <MeshBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_90%)]" />

      <div className="relative z-[3] mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-block border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            01 · O mnie
          </div>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Tworzę rzeczy, które
            <br />
            <span className="text-zinc-400">mają sens i działają.</span>
          </h2>

          <p className="mt-6 max-w-[48ch] text-lg leading-8 text-zinc-300">
            Jestem studentem informatyki, który projektuje i koduje
            nowoczesne doświadczenia webowe — od estetycznych landing page'y
            po interfejsy nastawione na czytelność, szybkość i konwersję.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton as="a" href="#contact">
              Współpraca
              <ArrowRightIcon className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton as="a" href="#work">
              Zobacz projekty
            </GhostButton>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 text-sm text-zinc-400 sm:max-w-md">
            <div>
              <div className="text-2xl font-semibold text-white">Frontend</div>
              <div>UI, UX, React</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-white">Performance</div>
              <div>Szybkość, SEO</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="glow-card relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-2">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex items-center justify-center">
              <span className="font-mono text-xs text-zinc-500">
                [ Twoje zdjęcie ]
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * sections/Approach.jsx
 * Sekcja prezentująca zasady i filozofię pracy.
 */
import { principles } from "../../data/content";
import { SectionHeader } from "../ui/Cards";
import * as Icons from "../ui/Icons";

export function Approach() {
  const handleGlowMove = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section id="approach" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader eyebrow="02 · Podejście" title="Zasady, od których nie odchodzę." />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:auto-rows-[minmax(240px,auto)]">
        {principles.map((item, index) => {
          const Icon = Icons[item.iconName] || Icons.CodeIcon;
          const layoutClass =
            index === 0 ? "lg:col-span-7" : 
            index === 1 ? "lg:col-span-5" : 
            index === 2 ? "lg:col-span-5" : "lg:col-span-7";

          return (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              onPointerMove={handleGlowMove}
              className={`glow-card group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-7 transition-transform duration-300 ease-out hover:-translate-y-1 ${layoutClass}`}
            >
              <div className="relative z-10 flex h-full flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                      {item.number}
                    </span>
                    <h3 className="mt-2 max-w-[12ch] text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.15rem]">
                      {item.title}
                    </h3>
                  </div>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-white transition group-hover:border-white/20 group-hover:bg-white/[0.07]">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-auto max-w-[36ch] pt-3 text-sm leading-7 text-zinc-400 sm:text-[15px]">
                  {item.text}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
