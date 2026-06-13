import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import ProductGrid from "@/components/shop/ProductGrid";
import CollectionHeader from "@/components/shop/CollectionHeader";

const collectionMeta: Record<string, { title: string, subtitle: string, image: string }> = {
  robes: {
    title: "Robes & Tuniques",
    subtitle: "L'élégance fluide et la pudeur raffinée.",
    image: "https://cdn.alvinaonline.com/ContentImages/Product/2026-kis/26KELB0045823-001/45823-2-li-triko-elbise-38-46_26kelb0045823-001_siyah-siyah_1_659x985.jpg"
  },
  veste: {
    title: "Manteaux & Vestes",
    subtitle: "L'allure structurée, l'hiver maîtrisé.",
    image: "https://cdn.alvinaonline.com/ContentImages/Product/2026-kis/26KKBN0090603-036/90603-winter-almeda-kaban-38-46-tek42_26kkbn0090603-036_gumus-gumus_3_659x985.jpg"
  },
  pantalon: {
    title: "Ensembles & Pantalons",
    subtitle: "Le confort absolu pour une prestance quotidienne.",
    image: "https://cdn.alvinaonline.com/ContentImages/Product/2026-kis/26KTKP0046020-045/46020-17235-2li-pant-tk-38-42-tek38-cift40_26ktkp0046020-045_kahve-kahve_1_659x985.jpg"
  }
};

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const meta = collectionMeta[params.slug];
  
  if (!meta) {
    notFound();
  }

  const collectionProducts = products.filter(p => p.category === params.slug);

  return (
    <main className="min-h-screen">
      <section className="relative h-[60vh] w-full flex flex-col items-center justify-center text-center">
        <Image
          src={meta.image}
          alt={meta.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
          <span className="text-gold tracking-[0.2em] font-serif text-sm uppercase mb-4">Collection SS2025</span>
          <h1 className="font-serif text-5xl md:text-7xl tracking-widest uppercase mb-6">{meta.title}</h1>
          <p className="text-lg md:text-xl font-light italic font-serif">{meta.subtitle}</p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <CollectionHeader count={collectionProducts.length} />
        <ProductGrid products={collectionProducts} />
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return [
    { slug: 'robes' },
    { slug: 'veste' },
    { slug: 'pantalon' }
  ];
}
