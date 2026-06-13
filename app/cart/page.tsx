"use client";
import Link from "next/link";
import Image from "next/image";
import { useLocaleStore } from "@/store/localeStore";
import { useCartStore } from "@/store/cartStore";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useTranslation } from "@/lib/translations";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const { t } = useTranslation();
  const { convertPrice, currency } = useLocaleStore();
  const [mounted, setMounted] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 300 || subtotal === 0 ? 0 : 15;
  const total = subtotal - (subtotal * discount) + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === "ALVINA10") {
      setDiscount(0.10);
      setToastMessage(t.cartCouponSuccess);
    } else {
      setToastMessage(t.cartCouponInvalid);
    }
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleCheckout = () => {
    setToastMessage(t.cartComingSoon);
    setTimeout(() => setToastMessage(""), 3000);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-40 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-4xl tracking-widest uppercase mb-6">{t.cartTitle}</h1>
        <p className="text-warm-gray mb-8">{t.cartEmpty}</p>
        <Link href="/shop" className="bg-charcoal text-white dark:bg-white dark:text-charcoal px-8 py-4 uppercase tracking-widest text-sm hover:bg-gold dark:hover:bg-gold hover:text-white transition-colors">
          {t.cartReturnShop}
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl tracking-widest uppercase mb-12 text-center">{t.cartMyCart}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="hidden border-b border-charcoal/20 dark:border-white/20 pb-4 mb-6 md:grid grid-cols-12 gap-4 uppercase tracking-[0.2em] text-xs font-medium">
            <span className="col-span-6">{t.cartProduct}</span>
            <span className="col-span-2 text-center">{t.cartPrice}</span>
            <span className="col-span-2 text-center">{t.cartQuantity}</span>
            <span className="col-span-2 text-right">{t.cartTotal}</span>
          </div>

          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-charcoal/10 dark:border-white/10 pb-6 relative">
                 <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-0 right-0 md:static md:col-span-1 text-warm-gray hover:text-red-500 transition-colors flex md:justify-center p-2"
                  >
                    <Trash2 size={16} />
                 </button>
                 
                 <div className="md:col-span-5 flex gap-4 pr-8 md:pr-0">
                   <div className="relative w-20 h-28 md:w-24 md:h-32 bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                     <Image src={item.selectedColor.images?.[0] || item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                   </div>
                   <div className="flex flex-col justify-center">
                     <Link href={`/shop/${item.product.slug}`} className="font-serif text-lg mb-1 hover:text-gold transition-colors">{item.product.name}</Link>
                     <span className="text-sm text-warm-gray mb-1">{t.productColor} : {item.selectedColor.name}</span>
                     <span className="text-sm text-warm-gray">{t.productSize} : {item.selectedSize}</span>
                   </div>
                 </div>

                 <div className="md:col-span-2 hidden md:block text-center">
                    {convertPrice(item.product.price)}
                 </div>

                 <div className="md:col-span-2 flex justify-start md:justify-center">
                   <div className="flex items-center border border-charcoal/20 dark:border-white/20">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 hover:bg-gold hover:text-white transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 hover:bg-gold hover:text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                 </div>

                 <div className="md:col-span-2 text-right font-medium text-lg md:text-base mt-2 md:mt-0">
                    {convertPrice(item.product.price * item.quantity)}
                 </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Link href="/shop" className="text-sm tracking-widest uppercase border-b border-charcoal dark:border-white hover:text-gold hover:border-gold transition-colors pb-1">
              {t.cartContinue}
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-cream dark:bg-[#151515] p-8 border border-charcoal/10 dark:border-white/10 sticky top-32 relative">
            
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-12 left-0 right-0 bg-charcoal text-white dark:bg-white dark:text-charcoal text-sm text-center px-4 py-2 rounded"
                >
                  {toastMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <h2 className="font-serif text-2xl tracking-widest uppercase mb-8 border-b border-charcoal/10 dark:border-white/10 pb-4">{t.cartSummary}</h2>
            
            <div className="flex flex-col gap-4 mb-8 text-sm">
              <div className="flex justify-between">
                <span className="text-warm-gray tracking-wide">{t.cartSubtotal}</span>
                <span>{convertPrice(subtotal)}</span>
              </div>
              
              {discount > 0 && (
                 <div className="flex justify-between text-gold">
                    <span className="tracking-wide">{t.cartDiscount} (10%)</span>
                    <span>-{convertPrice(subtotal * discount)}</span>
                 </div>
              )}

              <div className="flex justify-between">
                <span className="text-warm-gray tracking-wide">{t.cartShipping}</span>
                <span>{shipping === 0 ? t.cartFree : convertPrice(shipping)}</span>
              </div>
              <div className="border-t border-charcoal/10 dark:border-white/10 pt-4 flex justify-between font-serif text-2xl mt-2">
                <span>{t.cartTotal}</span>
                <span>{convertPrice(total)}</span>
              </div>
            </div>

            <form onSubmit={handleApplyCoupon} className="mb-8 flex gap-2">
               <input 
                  type="text" 
                  placeholder={t.cartPromo} 
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full bg-transparent border border-charcoal/30 dark:border-white/30 px-4 py-2 focus:outline-none focus:border-gold dark:focus:border-gold text-sm uppercase"
               />
               <button type="submit" className="bg-charcoal text-white dark:bg-white dark:text-charcoal px-4 text-xs tracking-widest uppercase hover:bg-gold hover:text-white dark:hover:bg-gold transition-colors">
                 {t.cartApply}
               </button>
            </form>

            <button 
              onClick={handleCheckout}
              className="w-full bg-gold hover:bg-gold-dark text-white py-4 uppercase tracking-[0.2em] text-sm font-medium transition-colors"
            >
              {t.cartCheckout}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
