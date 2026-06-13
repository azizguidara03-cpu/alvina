"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { useLocaleStore } from "@/store/localeStore";
import { useTranslation } from "@/lib/translations";

// Removed pre-computed searchable since we need dynamic translation

function highlight(text: string, query: string) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-gold/30 text-inherit rounded-[2px] px-[1px]">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { convertPrice, currency } = useLocaleStore();
  const { t, tp, isRTL } = useTranslation();

  const popularTerms = t.searchPopularTerms.split(",");

  const results = query.trim().length >= 1
    ? products.filter((p) => {
        const translatedName = tp(p.name);
        const searchStr = `${translatedName} ${p.category} ${p.description ?? ""}`.toLowerCase();
        return searchStr.includes(query.trim().toLowerCase());
      }).slice(0, 8)
    : [];

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 80); }
    else { setQuery(""); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[150] bg-[var(--bg-primary)]/95 backdrop-blur-lg flex flex-col"
          role="dialog"
          aria-modal="true"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Top bar */}
          <div className="flex items-center gap-4 px-6 md:px-16 pt-8 pb-6 border-b border-[var(--border-color)]">
            <Search size={20} className="text-gold flex-shrink-0" />
            <input
              ref={inputRef}
              id="search-overlay-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="flex-1 bg-transparent text-[var(--text-primary)] text-lg md:text-2xl font-serif tracking-wide placeholder:text-[var(--text-muted)] focus:outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              onClick={onClose}
              aria-label="Close search"
              className="text-[var(--text-muted)] hover:text-gold transition-colors duration-200"
            >
              <X size={22} />
            </button>
          </div>

          {/* Results area */}
          <div className="flex-1 overflow-y-auto px-6 md:px-16 py-8">
            <AnimatePresence mode="wait">
              {query.trim().length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-secondary)] mb-4">
                    {t.searchPopular}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {popularTerms.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:border-gold hover:text-gold transition-colors duration-200 tracking-wide"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : results.length === 0 ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-center py-16"
                >
                  <p className="font-serif text-2xl text-[var(--text-muted)] mb-2">{t.searchNoResults}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{t.searchNoResultsSub}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-secondary)] mb-6">
                    {results.length} {results.length > 1 ? t.searchResults_pl : t.searchResults}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {results.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.25 }}
                      >
                        <Link href={`/shop/${product.slug}`} onClick={onClose} className="group flex flex-col gap-3">
                          <div className="relative aspect-[3/4] overflow-hidden bg-champagne">
                            {product.images?.[0] && (
                              <Image
                                src={product.colors[0]?.images?.[0] || product.images[0]}
                                alt={product.name}
                                fill
                                unoptimized
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-serif text-sm text-[var(--text-primary)] leading-snug">
                              {highlight(tp(product.name), query)}
                            </p>
                            <p suppressHydrationWarning className="text-xs text-gold mt-1">{convertPrice(product.price)}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10 pt-6 border-t border-[var(--border-color)]">
                    <Link
                      href="/shop"
                      onClick={onClose}
                      className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-[var(--text-secondary)] hover:text-gold transition-colors duration-200"
                    >
                      {t.searchViewAll}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
