"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useLocaleStore } from "@/store/localeStore";
import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/translations";

export default function CartDrawer() {
  const { items, isOpen, toggleDrawer, updateQuantity, removeItem } = useCartStore();
  const { convertPrice, currency } = useLocaleStore();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const fallbackImage =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='420'><rect width='100%' height='100%' fill='#f0eae0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#8c8279' font-size='24' font-family='serif'>ALVINA</text></svg>`
    );
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    setToastMessage("Fonctionnalité bientôt disponible");
    setTimeout(() => setToastMessage(""), 3000);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleDrawer}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Drawer — BUG #1 FIX: use CSS variable tokens instead of hardcoded bg/text */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[var(--bg-primary)] text-[var(--text-primary)] z-[60] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
              <h2 className="font-serif text-2xl tracking-widest uppercase">{t.cartTitle}</h2>
              <button
                onClick={toggleDrawer}
                className="hover:text-gold transition-colors p-1"
                aria-label="Fermer le panier"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-[var(--text-secondary)]">
                  <p>{t.cartEmpty}</p>
                  <button
                    onClick={toggleDrawer}
                    className="text-[var(--text-primary)] underline uppercase tracking-widest text-sm hover:text-gold transition-colors"
                  >
                    {t.cartContinue}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.06 }}
                      className="flex gap-4"
                    >
                      <div className="relative w-24 h-32 flex-shrink-0 bg-[var(--bg-secondary)]">
                        <Image
                          src={brokenImages[item.id] ? fallbackImage : (item.selectedColor.images?.[0] || item.product.images[0])}
                          alt={item.product.name}
                          fill
                          unoptimized
                          className="object-cover"
                          onError={() =>
                            setBrokenImages((prev) => ({
                              ...prev,
                              [item.id]: true,
                            }))
                          }
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            {/* BUG #1 FIX: product name uses adaptive token (no hardcoded color) */}
                            <h3 className="font-serif text-lg text-[var(--text-primary)]">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)]">
                              {item.selectedColor.name} / {item.selectedSize}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--text-secondary)] hover:text-red-500 transition-colors p-1 ml-2"
                            aria-label="Retirer de panier"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-[var(--border-color)]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-gold hover:text-white transition-colors"
                              aria-label="Diminuer la quantité"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-4 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-gold hover:text-white transition-colors"
                              aria-label="Augmenter la quantité"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-medium text-[var(--text-primary)]">
                            {convertPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] relative">
                <AnimatePresence>
                  {toastMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[var(--bg-inverse)] text-[var(--text-inverse)] text-xs px-4 py-2 rounded shadow-xl whitespace-nowrap"
                    >
                      {toastMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-center mb-6 font-serif text-xl">
                  <span>{t.cartSubtotal}</span>
                  <span>{convertPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-4 text-center">
                  {t.cartFreeShipping} {convertPrice(300)}
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/cart"
                    onClick={toggleDrawer}
                    className="w-full border border-[var(--text-primary)] py-3 text-center uppercase tracking-widest text-sm hover:bg-[var(--text-primary)] hover:text-[var(--text-inverse)] transition-colors"
                  >
                    {t.cartView}
                  </Link>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gold hover:bg-[var(--gold-dark)] text-white py-3 text-center uppercase tracking-widest text-sm transition-colors"
                  >
                    {t.cartCheckout}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
