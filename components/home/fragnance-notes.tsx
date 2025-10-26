"use client";

import { motion, useInView, Variants } from "motion/react";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const notes = [
  {
    type: "Top Notes",
    description: "First impression, lasting 15-30 minutes",
    ingredients: ["Bergamot", "Pink Pepper", "Cardamom", "Fresh Citrus"],
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    type: "Heart Notes",
    description: "The soul of the fragrance, lasting 3-4 hours",
    ingredients: ["Rose Petals", "Jasmine", "Lily of Valley", "Peony"],
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    type: "Base Notes",
    description: "The foundation, lasting 6-8 hours or more",
    ingredients: ["Sandalwood", "Vanilla", "Musk", "Amber"],
    color: "from-amber-500/20 to-yellow-600/20",
  },
];

export const FragranceNotes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.25,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <section className="section-padding bg-gradient-to-b from-secondary/5 to-background">
      <div className="container mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-light tracking-wide mb-6 luxury-text-gradient">
            Fragrance Symphony
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the artistry of scent through our carefully orchestrated
            blend of premium ingredients
          </p>
        </motion.div>

        {/* Notes */}
        <motion.div
          ref={containerRef}
          className="grid md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {notes.map((note, index) => (
            <motion.div
              key={note.type}
              variants={cardVariants}
              whileHover={{
                y: -12,
                scale: 1.03,
                boxShadow: "0 12px 40px rgba(255,255,255,0.08)",
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              className="group"
            >
              <Card className="luxury-card border-0 h-full overflow-hidden transition-all duration-700 group-hover:glow-effect">
                {/* Header */}
                <div
                  className={`h-36 bg-gradient-to-br ${note.color} relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/15 to-transparent"
                    animate={{ x: [-120, 120] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.8,
                    }}
                  />
                  <div className="absolute bottom-5 left-6">
                    <motion.h3
                      className="text-2xl font-light luxury-text-gradient"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                    >
                      {note.type}
                    </motion.h3>
                  </div>
                </div>

                {/* Body */}
                <CardContent className="p-6">
                  <motion.p
                    className="text-sm text-muted-foreground mb-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.15 }}
                  >
                    {note.description}
                  </motion.p>

                  {/* Ingredients */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-light text-primary mb-3">
                      Key Ingredients
                    </h4>
                    <motion.div
                      className="grid grid-cols-2 gap-3"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.12,
                            delayChildren: 0.9 + index * 0.25,
                          },
                        },
                      }}
                    >
                      {note.ingredients.map((ingredient) => (
                        <motion.div
                          key={ingredient}
                          className="px-3 py-2 bg-muted/30 rounded-md text-sm text-center border border-primary/20 hover:border-primary/40 transition-colors duration-300"
                          variants={{
                            hidden: { opacity: 0, scale: 0.85, y: 10 },
                            visible: {
                              opacity: 1,
                              scale: 1,
                              y: 0,
                              transition: { duration: 0.35, ease: "easeInOut" },
                            },
                          }}
                          whileHover={{
                            scale: 1.08,
                            backgroundColor: "hsl(var(--primary) / 0.1)",
                          }}
                        >
                          {ingredient}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Animated scent rings */}
                  <motion.div
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 + index * 0.2 }}
                  >
                    <motion.div
                      className="relative w-20 h-20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full border border-primary/30 blur-sm"
                          style={{ transform: `scale(${1 + i * 0.35})` }}
                          animate={{
                            opacity: [0.2, 0.7, 0.2],
                            scale: [
                              1 + i * 0.35,
                              1.15 + i * 0.35,
                              1 + i * 0.35,
                            ],
                          }}
                          transition={{
                            duration: 2.5 + i * 0.7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
