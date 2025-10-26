"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOccasion, setSelectedOccasion] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let filtered = siteConfig.products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory
      );
    }

    // Filter by occasion
    if (selectedOccasion !== "all") {
      filtered = filtered.filter(product => 
        product.occasion.includes(selectedOccasion.charAt(0).toUpperCase() + selectedOccasion.slice(1))
      );
    }

    // Filter by season
    if (selectedSeason !== "all") {
      filtered = filtered.filter(product => 
        product.season.includes(selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1))
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.topNotes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.heartNotes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.baseNotes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseInt(a.price.replace("$", "")) - parseInt(b.price.replace("$", "")));
        break;
      case "price-high":
        filtered.sort((a, b) => parseInt(b.price.replace("$", "")) - parseInt(a.price.replace("$", "")));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.bestseller && !b.bestseller) return -1;
          if (!a.bestseller && b.bestseller) return 1;
          return 0;
        });
        break;
    }

    return filtered;
  }, [selectedCategory, selectedOccasion, selectedSeason, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/5 to-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-thin mb-6 luxury-text-gradient">
              Our Collection
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our exquisite range of fragrances, each crafted with the finest ingredients 
              and designed to capture the essence of luxury and sophistication.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="glass rounded-2xl p-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search fragrances..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/20 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/50 transition-colors duration-300"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/20 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/50 transition-colors duration-300"
                >
                  {siteConfig.categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Occasion Filter */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Occasion
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/20 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/50 transition-colors duration-300"
                >
                  <option value="all">All Occasions</option>
                  {siteConfig.occasions.map((occasion) => (
                    <option key={occasion.value} value={occasion.value}>
                      {occasion.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/20 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/50 transition-colors duration-300"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Quick Filter Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              {siteConfig.categories.slice(1).map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`filter-button ${
                    selectedCategory === category.value ? "active" : ""
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="luxury-card h-full overflow-hidden">
                    <div className="relative">
                      {/* Product Image */}
                      <div className="h-80 bg-gradient-to-br from-muted to-secondary/40 flex items-center justify-center relative overflow-hidden">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-32 h-40 object-cover rounded-xl product-image"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.bestseller && (
                            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full backdrop-blur-sm">
                              Bestseller
                            </span>
                          )}
                          {product.limitedEdition && (
                            <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full backdrop-blur-sm">
                              Limited Edition
                            </span>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="absolute top-4 right-4 flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-muted-foreground">{product.rating}</span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                          <Link href={`/products/${product.id}`}>
                            <motion.button
                              className="luxury-button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              View Details
                            </motion.button>
                          </Link>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-light luxury-text-gradient mb-2">
                              {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {product.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-light luxury-text-gradient">
                                {product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {product.originalPrice}
                                </span>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">
                                {product.size}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {product.concentration}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{product.category}</span>
                            <span>{product.gender}</span>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-light luxury-text-gradient mb-4">
                No fragrances found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedOccasion("all");
                  setSelectedSeason("all");
                  setSearchQuery("");
                }}
                className="luxury-button"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
