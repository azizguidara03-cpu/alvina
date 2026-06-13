"use client";
import { useState, useEffect } from "react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useLocaleStore } from "@/store/localeStore";
import { Minus, Plus, Heart } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { useRouter } from "next/navigation";

export default function ProductInfo({ product, initialColorSlug }: { product: Product, initialColorSlug?: string }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.colors.find(c => c.slug === initialColorSlug) || product.colors[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const { convertPrice, currency } = useLocaleStore();
  const { t, tp, language } = useTranslation();

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('alvina-wishlist') || '[]');
    setIsWishlisted(list.includes(product.id));
  }, [product.id]);

  const toggleWishlist = () => {
    let list = JSON.parse(localStorage.getItem('alvina-wishlist') || '[]');
    if (list.includes(product.id)) {
      list = list.filter((id: string) => id !== product.id);
      setIsWishlisted(false);
    } else {
      list.push(product.id);
      setIsWishlisted(true);
    }
    localStorage.setItem('alvina-wishlist', JSON.stringify(list));
  };

  const handleAddToCart = () => {
    addItem({
      product,
      selectedSize,
      selectedColor,
      quantity,
    });
  };

  return (
    <div className="flex flex-col h-full text-[var(--text-primary)]">
      <div className="mb-8">
        <span className="text-gold tracking-[0.2em] font-serif text-sm uppercase">ALVINA</span>
        <h1 className="font-serif text-4xl md:text-5xl mt-2 mb-4">{tp(product.name)}</h1>
        <div className="flex gap-4 items-center">
          {product.originalPrice && (
            <span suppressHydrationWarning className="text-warm-gray line-through text-lg">{convertPrice(product.originalPrice)}</span>
          )}
          <span suppressHydrationWarning className="text-2xl">{convertPrice(product.price)}</span>
        </div>
        {typeof product.stock === "number" && product.stock <= 4 && (
          <p className="mt-3 text-xs tracking-[0.18em] uppercase text-gold">
            {t.productStock.replace('{stock}', product.stock.toString())}
          </p>
        )}
      </div>

      <p className="text-warm-gray mb-10 leading-relaxed text-sm">
        {product.description}
      </p>

      {/* Colors */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="font-serif tracking-widest uppercase text-sm">{t.productColor}</span>
          <span className="text-sm text-warm-gray">{selectedColor.name}</span>
        </div>
        <div className="flex gap-3">
          {product.colors.map(color => (
            <button
              key={color.name}
              onClick={() => {
                setSelectedColor(color);
                router.push(`/shop/${color.slug}`);
              }}
              className={cn(
                "w-8 h-8 rounded-full border-2 transition-all duration-300",
                selectedColor.name === color.name ? "border-gold scale-110" : "border-transparent"
              )}
              style={{ backgroundColor: color.hex }}
              aria-label={`Select ${color.name}`}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <span className="font-serif tracking-widest uppercase text-sm">{t.productSize}</span>
          <button className="text-xs text-warm-gray underline uppercase tracking-widest">{t.productSizeGuide}</button>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "px-4 h-11 rounded-full border flex items-center justify-center transition-all duration-300 text-sm",
                selectedSize === size 
                  ? "border-gold text-gold bg-gold/10 shadow-[0_8px_20px_rgba(201,169,110,0.25)]" 
                  : "border-[var(--border-color)] hover:border-[var(--text-primary)]"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-stretch gap-4 mb-16">
        <div className="flex items-center border border-[var(--border-color)] w-32 justify-between">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:text-gold transition-colors">
            <Minus size={16} />
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="p-4 hover:text-gold transition-colors">
            <Plus size={16} />
          </button>
        </div>
        <button 
          onClick={handleAddToCart}
          className="luxury-button flex-1 bg-[var(--bg-inverse)] text-[var(--text-inverse)] hover:bg-gold hover:text-white transition-colors tracking-[0.15em] uppercase text-sm font-medium"
        >
          {t.addToCart}
        </button>
        <button 
          onClick={toggleWishlist}
          className="w-[54px] border border-[var(--border-color)] flex items-center justify-center hover:border-gold transition-colors group"
        >
          <Heart size={20} className={isWishlisted ? "fill-gold text-gold" : "text-[var(--text-primary)] group-hover:text-gold"} />
        </button>
      </div>

      {/* Accordions */}
      <div className="border-t border-[var(--border-color)] flex flex-col mt-auto text-sm">
        <details className="group border-b border-[var(--border-color)] pb-4 pt-4">
          <summary className="flex justify-between items-center cursor-pointer font-serif tracking-widest uppercase">
            {t.productDescription}
            <span className="transition group-open:rotate-180">
              <svg fill="none" height="16" width="16" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <p className="mt-4 text-warm-gray leading-relaxed">{product.description}</p>
        </details>
        
        <details className="group border-b border-[var(--border-color)] pb-4 pt-4 relative">
          <summary className="flex justify-between items-center cursor-pointer font-serif tracking-widest uppercase">
            {t.productComposition}
            <span className="transition group-open:rotate-180">
              <svg fill="none" height="16" width="16" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <p className="mt-4 text-warm-gray leading-relaxed">{product.composition}</p>
          <p className="mt-2 text-warm-gray leading-relaxed text-xs">{t.productCare}</p>
        </details>
        
        <details className="group border-b border-[var(--border-color)] pb-4 pt-4 relative">
          <summary className="flex justify-between items-center cursor-pointer font-serif tracking-widest uppercase">
            {t.footerDelivery}
            <span className="transition group-open:rotate-180">
              <svg fill="none" height="16" width="16" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <p className="mt-4 text-warm-gray leading-relaxed mb-2">{t.productDeliveryText}</p>
          <p className="text-warm-gray leading-relaxed text-xs">{t.productReturnText}</p>
        </details>
      </div>
    </div>
  );
}
