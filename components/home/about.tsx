"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { siteConfig } from "@/lib/site-config";

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-20">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-background"
        style={{ y: backgroundY }}
      />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-thin mb-8 luxury-text-gradient"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {siteConfig.brand.philosophy}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {siteConfig.brand.description}
            </motion.p>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Our master perfumers work in harmony with nature, creating timeless 
              fragrances that evolve with your skin, telling your unique story with 
              every note.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center lg:text-left">
                <motion.div
                  className="text-3xl font-light luxury-text-gradient mb-2"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {new Date().getFullYear() - parseInt(siteConfig.brand.founded)}+
                </motion.div>
                <p className="text-sm text-muted-foreground">Years of Excellence</p>
              </div>
              <div className="text-center lg:text-left">
                <motion.div
                  className="text-3xl font-light luxury-text-gradient mb-2"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                >
                  {siteConfig.products.length}+
                </motion.div>
                <p className="text-sm text-muted-foreground">Signature Fragrances</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Visual elements */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Main decorative element */}
            <motion.div
              className="relative w-80 h-80 mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 border border-primary/20 rounded-full" />
              <div className="absolute inset-4 border border-primary/30 rounded-full" />
              <div className="absolute inset-8 border border-primary/40 rounded-full" />
              
              {/* Center element */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full backdrop-blur-sm border border-primary/50"
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 20px rgba(255, 215, 0, 0.3)",
                    "0 0 40px rgba(255, 215, 0, 0.5)", 
                    "0 0 20px rgba(255, 215, 0, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Floating elements */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/40 rounded-full"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${20 + (i * 8)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 3 + (i * 0.5),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};