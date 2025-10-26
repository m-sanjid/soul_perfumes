"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

const { products } = siteConfig;

export const FeaturedProducts = () => {
  return (
    <section
      className="section-padding bg-gradient-to-b from-background via-secondary/5 to-background"
    >
      <div className="container mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-thin mb-6 luxury-text-gradient">
            Signature Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Each fragrance tells a unique story, crafted with the finest
            ingredients from around the world
          </p>
        </motion.div>

        {/* Products */}
        <motion.div
          className="grid md:grid-cols-3 gap-10"
        >
          {products.slice(0, 3).map((product, index) => (
            <motion.div
              key={product.name}
              transition={{
                duration: 0.7,
                delay: index * 0.25,
                ease: "easeOut",
              }}
              whileHover={{ y: -12 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl"
            >
              {/* Product Image */}
              <motion.img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                initial={{ scale: 1 }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />

              {/* Content Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-4"
              >
                <h3 className="text-2xl font-light">{product.name}</h3>
                <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium">{product.price}</span>
                  <Link href={`/products/${product.id || "#"}`}>
                    <motion.button
                      className="px-5 py-2 border border-white/40 rounded-full text-sm tracking-wide backdrop-blur-md hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Discover
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/products">
            <motion.button
              className="luxury-button text-lg px-12 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Collection
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
