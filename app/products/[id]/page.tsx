"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("100ml");

  const product = siteConfig.products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const sizes = [
    { size: "30ml", price: Math.round(parseInt(product.price.replace("$", "")) * 0.4) },
    { size: "50ml", price: Math.round(parseInt(product.price.replace("$", "")) * 0.7) },
    { size: "100ml", price: parseInt(product.price.replace("$", "")) },
  ];

  const currentPrice = sizes.find(s => s.size === selectedSize)?.price || parseInt(product.price.replace("$", ""));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`rating-star ${i < Math.floor(rating) ? "filled" : ""}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/5 to-background">
      {/* Breadcrumb */}
      <div className="pt-32 pb-8">
        <div className="container mx-auto px-4">
          <motion.nav
            className="flex items-center space-x-2 text-sm text-muted-foreground mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary transition-colors">
              Collection
            </Link>
            <span>/</span>
            <span className="text-primary">{product.name}</span>
          </motion.nav>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Image */}
            <div className="relative h-96 bg-gradient-to-br from-muted to-secondary/40 rounded-2xl overflow-hidden">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.bestseller && (
                  <span className="px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full backdrop-blur-sm">
                    Bestseller
                  </span>
                )}
                {product.limitedEdition && (
                  <span className="px-4 py-2 bg-red-500/20 text-red-400 text-sm font-medium rounded-full backdrop-blur-sm">
                    Limited Edition
                  </span>
                )}
                {product.featured && (
                  <span className="px-4 py-2 bg-green-500/20 text-green-400 text-sm font-medium rounded-full backdrop-blur-sm">
                    Featured
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-white">{product.rating}</span>
                <span className="text-xs text-white/80">({product.reviews})</span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {[product.image, product.image, product.image].map((img, index) => (
                <motion.div
                  key={index}
                  className={`relative h-24 bg-gradient-to-br from-muted to-secondary/40 rounded-lg overflow-hidden cursor-pointer ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-thin luxury-text-gradient mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price and Size Selection */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-light luxury-text-gradient">
                  ${currentPrice}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Size</h3>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size.size)}
                      className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
                        selectedSize === size.size
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-primary/20 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-medium">{size.size}</div>
                        <div className="text-sm">${size.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-primary/20 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-primary/10 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 border-x border-primary/20">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-primary/10 transition-colors"
                  >
                    +
                  </button>
                </div>
                <motion.button
                  className="flex-1 luxury-button text-lg py-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart - ${currentPrice * quantity}
                </motion.button>
              </div>
            </div>

            {/* Fragrance Notes */}
            <Card className="luxury-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-light luxury-text-gradient mb-6">Fragrance Notes</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.topNotes.map((note, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Heart Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.heartNotes.map((note, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Base Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.baseNotes.map((note, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="luxury-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-light luxury-text-gradient mb-6">Product Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Concentration:</span>
                    <span className="ml-2">{product.concentration}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Intensity:</span>
                    <span className="ml-2">{product.intensity}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Longevity:</span>
                    <span className="ml-2">{product.longevity}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sillage:</span>
                    <span className="ml-2">{product.sillage}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gender:</span>
                    <span className="ml-2">{product.gender}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <span className="ml-2">{product.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Occasion & Season */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="luxury-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-light luxury-text-gradient mb-4">Perfect For</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.occasion.map((occ, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm"
                      >
                        {occ}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="luxury-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-light luxury-text-gradient mb-4">Best Seasons</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.season.map((season, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm"
                      >
                        {season}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.section
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-thin luxury-text-gradient mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {siteConfig.products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 3)
              .map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="luxury-card h-full overflow-hidden">
                    <div className="h-64 bg-gradient-to-br from-muted to-secondary/40 flex items-center justify-center">
                      <motion.img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-24 h-32 object-cover rounded-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-light luxury-text-gradient mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {relatedProduct.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-light luxury-text-gradient">
                          {relatedProduct.price}
                        </span>
                        <Link href={`/products/${relatedProduct.id}`}>
                          <motion.button
                            className="luxury-button text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View
                          </motion.button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProductPage;
