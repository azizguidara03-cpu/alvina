import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductCard from "@/components/shop/ProductCard";
import TranslatedText from "@/components/layout/TranslatedText";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.colors.some(c => c.slug === params.slug));

  if (!product) {
    notFound();
  }
  
  const currentColor = product.colors.find(c => c.slug === params.slug) || product.colors[0];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  const completeLook = products
    .filter((p) => p.category !== product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="pt-32 pb-24 min-h-screen relative max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 px-6 md:px-12 mb-32">
        <div className="lg:sticky lg:top-32 h-max">
          <ImageGallery images={currentColor.images.length > 0 ? currentColor.images : product.images} />
        </div>
        <div>
          <ProductInfo product={product} initialColorSlug={currentColor.slug} />
        </div>
      </div>

      {completeLook.length > 0 && (
        <section className="px-6 md:px-12 mb-20">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl tracking-widest uppercase mb-4"><TranslatedText id="productCompleteLook" /></h2>
            <div className="w-16 h-px bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {completeLook.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl tracking-widest uppercase mb-4"><TranslatedText id="productYouMayAlsoLike" /></h2>
            <div className="w-16 h-px bg-gold mx-auto" />
          </div>
          <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-2">
            {relatedProducts.map(p => (
              <div key={p.id} className="min-w-[260px] sm:min-w-[280px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export function generateStaticParams() {
  return products.flatMap((product) => 
    product.colors.map(color => ({
      slug: color.slug,
    }))
  );
}
