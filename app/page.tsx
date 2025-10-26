
import { HeroSection } from "@/components/home/hero";
import { AboutSection } from "@/components/home/about";
import { FeaturedProducts } from "@/components/home/featured-products";
import { FragranceNotes } from "@/components/home/fragnance-notes";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FragranceNotes />
      <FeaturedProducts />
    </div>
  );
}
