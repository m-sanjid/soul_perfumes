"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring configs
  const springConfig = { stiffness: 90, damping: 20, mass: 0.5 };

  /** -----------------------
   * BRAND NAME "SOUL"
   * ---------------------- */
  const ySoulRaw = useTransform(scrollYProgress, [0, 0.25], [320, 0]); // Move up
  const scaleSoulRaw = useTransform(scrollYProgress, [0, 0.25], [1.5, 1]); // Shrink to logo size
  const opacitySoulRaw = useTransform(scrollYProgress, [0, 0.05, 0.25], [1, 1, 0.9]);
  const colorSoulRaw = useTransform(scrollYProgress, [0, 0.25], ["#FFD700", "#FFD700"]); // Yellow color
  const fontSoulRaw = useTransform(scrollYProgress, [0, 0.25], [700, 100]); // Thin font

  const ySoul = useSpring(ySoulRaw, springConfig);
  const scaleSoul = useSpring(scaleSoulRaw, springConfig);
  const opacitySoul = useSpring(opacitySoulRaw, springConfig);
  const colorSoul = useSpring(colorSoulRaw, springConfig);
  const fontSoul = useSpring(fontSoulRaw, springConfig);

  /** -----------------------
   * BOTTLE
   * ---------------------- */
  const yBottleRaw = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [250, 80, 0, -120]);
  const scaleBottleRaw = useTransform(scrollYProgress, [0.1, 0.25, 0.8, 1], [0.7, 1, 0.9, 0.85]);
  const opacityBottleRaw = useTransform(scrollYProgress, [0.1, 0.25, 0.8, 1], [0, 1, 1, 0]);

  const yBottle = useSpring(yBottleRaw, springConfig);
  const scaleBottle = useSpring(scaleBottleRaw, springConfig);
  const opacityBottle = useSpring(opacityBottleRaw, springConfig);

  /** -----------------------
   * TITLE + SUBTITLE
   * ---------------------- */
  const yTitleRaw = useTransform(scrollYProgress, [0.2, 0.5, 1], [100, 0, -60]);
  const opacityTitleRaw = useTransform(scrollYProgress, [0.2, 0.35, 0.9], [0, 1, 0]);

  const ySubtitleRaw = useTransform(scrollYProgress, [0.25, 0.5, 1], [60, 0, -40]);
  const opacitySubtitleRaw = useTransform(scrollYProgress, [0.25, 0.4, 0.9], [0, 1, 0]);

  const yTitle = useSpring(yTitleRaw, springConfig);
  const opacityTitle = useSpring(opacityTitleRaw, springConfig);
  const ySubtitle = useSpring(ySubtitleRaw, springConfig);
  const opacitySubtitle = useSpring(opacitySubtitleRaw, springConfig);

  /** -----------------------
   * BACKGROUND
   * ---------------------- */
  const bgOpacityRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.35, 0.1]);
  const bgOpacity = useSpring(bgOpacityRaw, springConfig);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] w-full bg-gradient-to-b from-neutral-950 via-neutral-900 to-black"
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Background shimmer */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.25),transparent)] blur-3xl"
        />

        {/* Brand name "SOUL" */}
        <motion.h1
          style={{ y: ySoul, scale: scaleSoul, opacity: opacitySoul, color: colorSoul, fontWeight: fontSoul }}
          className="fixed top-6 left-1/2 z-50 -translate-x-1/2 font-mono text-5xl font-thin tracking-widest text-yellow-600 md:text-6xl"
        >
          SOUL
        </motion.h1>

        {/* Title */}
        <motion.h2
          style={{ y: yTitle, opacity: opacityTitle }}
          className="z-10 mb-6 mt-60 font-serif text-6xl font-bold tracking-wide text-white drop-shadow-lg md:text-8xl"
        >
          PARFUM
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          style={{ y: ySubtitle, opacity: opacitySubtitle }}
          className="z-10 mb-8 text-2xl font-light uppercase tracking-widest text-yellow-400 md:text-3xl"
        >
          The Essence of Timeless Elegance
        </motion.p>

        {/* Product Bottle */}
        <motion.img
          src="/subject.png"
          alt="Perfume Bottle"
          style={{
            y: yBottle,
            opacity: opacityBottle,
            scale: scaleBottle,
          }}
          className="z-10 w-sm drop-shadow-2xl"
        />
      </div>
    </section>
  );
};
