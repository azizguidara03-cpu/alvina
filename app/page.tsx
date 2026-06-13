import HeroSection from "@/components/home/HeroSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import Marquee from "@/components/home/Marquee";
import NewArrivals from "@/components/home/NewArrivals";
import LookbookSection from "@/components/home/LookbookSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import BrandStory from "@/components/home/BrandStory";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedCollections />
      <Marquee />
      <NewArrivals />
      <LookbookSection />
      <BrandStory />
      <NewsletterSection />
    </main>
  );
}

