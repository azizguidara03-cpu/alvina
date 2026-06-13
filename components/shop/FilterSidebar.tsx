"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/translations";
import { useLocaleStore } from "@/store/localeStore";



export default function FilterSidebar({
  currentCategory,
  availableCategories,
}: {
  currentCategory: string;
  availableCategories: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isSlidingPrice, setIsSlidingPrice] = useState(false);
  const { t, tp } = useTranslation();
  const { convertPrice, currency } = useLocaleStore();

  const categories = [
    { label: t.filterAll, value: "all" },
    ...availableCategories.map(cat => ({ label: tp(cat), value: cat }))
  ];

  const currentSort = searchParams.get("sort") || "newest";
  const currentMaxPrice = Number(searchParams.get("maxPrice") || "500");
  const [sliderPrice, setSliderPrice] = useState(currentMaxPrice);

  useEffect(() => {
    setSliderPrice(currentMaxPrice);
  }, [currentMaxPrice]);

  const visibleCategories = categories;

  const updateFilters = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/shop?${params.toString()}`);
    setMobileFilterOpen(false);
  };

  const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`/shop?${params.toString()}`);
  };

  const updateMaxPrice = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("maxPrice", String(value));
    router.replace(`/shop?${params.toString()}`);
  };

  useEffect(() => {
    if (sliderPrice === currentMaxPrice) return;
    const timer = setTimeout(() => {
      updateMaxPrice(sliderPrice);
    }, 120);
    return () => clearTimeout(timer);
  }, [sliderPrice, currentMaxPrice]);

  const SidebarContent = () => (
    <>
      <div className="mb-8">
        <h3 className="font-serif tracking-widest text-lg mb-4 uppercase">{t.filterCategories}</h3>
        <ul className="flex flex-col gap-3">
          {visibleCategories.map((cat) => (
            <li key={cat.value}>
              <button
                onClick={() => updateFilters(cat.value)}
                className={cn(
                  "text-sm hover:text-gold transition-colors tracking-wide",
                  (currentCategory === cat.value || (cat.value === "all" && !currentCategory))
                    ? "font-semibold text-gold"
                    : "text-[var(--text-primary)] opacity-80"
                )}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="font-serif tracking-widest text-lg mb-4 uppercase">{t.filterPrice}</h3>
         <div className="relative pt-8">
           {isSlidingPrice && (
             <span
               suppressHydrationWarning
               className="absolute -top-0 text-xs px-2 py-1 bg-gold text-white rounded-sm pointer-events-none"
               style={{
                 left: `calc(${((sliderPrice - 40) / (500 - 40)) * 100}% - 20px)`,
               }}
             >
               {convertPrice(sliderPrice)}
             </span>
           )}
           <input
             type="range"
             className="w-full accent-gold"
             min="0"
             max="500"
             step="1"
             value={sliderPrice}
             onChange={(e) => setSliderPrice(Number(e.target.value))}
             onMouseDown={() => setIsSlidingPrice(true)}
             onMouseUp={() => {
               setIsSlidingPrice(false);
               updateMaxPrice(sliderPrice);
             }}
             onTouchStart={() => setIsSlidingPrice(true)}
             onTouchEnd={() => {
               setIsSlidingPrice(false);
               updateMaxPrice(sliderPrice);
             }}
           />
         </div>
         <div className="flex justify-between text-xs text-warm-gray mt-2">
            <span suppressHydrationWarning>{convertPrice(0)}</span>
            <span suppressHydrationWarning>{convertPrice(sliderPrice)}</span>
         </div>
      </div>

      <div className="mb-8">
        <h3 className="font-serif tracking-widest text-lg mb-4 uppercase">{t.filterSort}</h3>
        <select 
          onChange={updateSort}
          value={currentSort}
          className="w-full border-b border-[var(--border-color)] bg-transparent py-2 text-sm focus:outline-none focus:border-gold text-[var(--text-primary)]"
        >
          <option value="newest" className="bg-[var(--bg-card)] text-[var(--text-primary)]">{t.filterSortNewest}</option>
          <option value="price-asc" className="bg-[var(--bg-card)] text-[var(--text-primary)]">{t.filterSortPriceAsc}</option>
          <option value="price-desc" className="bg-[var(--bg-card)] text-[var(--text-primary)]">{t.filterSortPriceDesc}</option>
          <option value="popularity" className="bg-[var(--bg-card)] text-[var(--text-primary)]">{t.filterSortPopularity}</option>
        </select>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden flex justify-between items-center mb-6 border-y border-charcoal/10 dark:border-white/10 py-4">
         <button onClick={() => setMobileFilterOpen(true)} className="flex items-center gap-2 uppercase tracking-widest text-sm">
            <Filter size={16} /> {t.filterFilters}
         </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block sticky top-24 h-max">
        <SidebarContent />
      </div>

      {/* Mobile Bottom Sheet Sidebar */}
      <AnimatePresence>
         {mobileFilterOpen && (
            <>
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileFilterOpen(false)}
                  className="fixed inset-0 bg-black z-40 md:hidden"
               />
                  <motion.div 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="fixed bottom-0 left-0 right-0 bg-[var(--bg-card)] text-[var(--text-primary)] z-50 p-6 rounded-t-2xl md:hidden overflow-y-auto max-h-[80vh]"
               >
                  <div className="flex justify-between items-center mb-6">
                     <h2 className="font-serif text-xl tracking-widest uppercase">{t.filterFilters}</h2>
                     <button onClick={() => setMobileFilterOpen(false)}><X size={20}/></button>
                  </div>
                  <SidebarContent />
                  
                  <button 
                     onClick={() => setMobileFilterOpen(false)}
                     className="w-full bg-gold text-white py-3 mt-6 uppercase tracking-widest text-sm"
                  >
                     {t.filterApply}
                  </button>
               </motion.div>
            </>
         )}
      </AnimatePresence>
    </>
  );
}
