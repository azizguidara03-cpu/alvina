"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/translations";
import { useLocaleStore } from "@/store/localeStore";

const MIN_PRICE = 0;
const MAX_PRICE = 500;

/** Fully custom drag-based range slider using native DOM listeners */
function PriceSlider({
  value,
  onChange,
  convertPrice,
}: {
  value: number;
  onChange: (v: number) => void;
  convertPrice: (n: number) => string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const calcValue = (clientX: number) => {
      const { left, width } = track.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - left) / width));
      return Math.round(MIN_PRICE + ratio * (MAX_PRICE - MIN_PRICE));
    };

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      isDragging.current = true;
      track.setPointerCapture(e.pointerId);
      onChangeRef.current(calcValue(e.clientX));
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      onChangeRef.current(calcValue(e.clientX));
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      onChangeRef.current(calcValue(e.clientX));
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
    };
  }, []); // runs once — onChange is accessed via ref so no stale closures

  const pct = ((value - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <div className="relative pt-10 pb-2 select-none touch-none">
      {/* Floating tooltip above thumb */}
      <span
        suppressHydrationWarning
        className="absolute top-0 text-[11px] font-medium px-2 py-0.5 bg-gold text-charcoal rounded pointer-events-none whitespace-nowrap"
        style={{
          left: `clamp(18px, calc(${pct}% * 0.87 + 6.5%), calc(100% - 24px))`,
          transform: "translateX(-50%)",
        }}
      >
        {convertPrice(value)}
      </span>

      {/* Draggable track area */}
      <div
        ref={trackRef}
        className="relative h-6 flex items-center cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        {/* Track background */}
        <div className="absolute inset-y-0 my-auto h-1.5 w-full rounded-full bg-[var(--border-color)]" />
        {/* Filled portion */}
        <div
          className="absolute top-0 bottom-0 my-auto left-0 h-1.5 rounded-full bg-gold"
          style={{ width: `${pct}%` }}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-2 border-white shadow-md pointer-events-none"
          style={{ left: `${pct}%` }}
        />
      </div>

      {/* Min / Max labels */}
      <div className="flex justify-between text-xs text-warm-gray mt-1">
        <span suppressHydrationWarning>{convertPrice(MIN_PRICE)}</span>
        <span suppressHydrationWarning>{convertPrice(MAX_PRICE)}</span>
      </div>
    </div>
  );
}


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
  const { t, tp } = useTranslation();
  const { convertPrice, currency } = useLocaleStore();

  const categories = [
    { label: t.filterAll, value: "all" },
    ...availableCategories.map((cat) => ({ label: tp(cat), value: cat })),
  ];

  const currentSort = searchParams.get("sort") || "newest";
  const currentMaxPrice = Number(searchParams.get("maxPrice") || String(MAX_PRICE));
  const [sliderPrice, setSliderPrice] = useState(currentMaxPrice);

  useEffect(() => {
    setSliderPrice(currentMaxPrice);
  }, [currentMaxPrice]);

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

  const updateMaxPrice = useCallback(
    (value: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("maxPrice", String(value));
      router.replace(`/shop?${params.toString()}`);
    },
    [searchParams, router]
  );

  // Debounce URL update while dragging
  useEffect(() => {
    if (sliderPrice === currentMaxPrice) return;
    const timer = setTimeout(() => updateMaxPrice(sliderPrice), 300);
    return () => clearTimeout(timer);
  }, [sliderPrice]);

  const SidebarContent = () => (
    <>
      <div className="mb-8">
        <h3 className="font-serif tracking-widest text-lg mb-4 uppercase">{t.filterCategories}</h3>
        <ul className="flex flex-col gap-3">
          {categories.map((cat) => (
            <li key={cat.value}>
              <button
                onClick={() => updateFilters(cat.value)}
                className={cn(
                  "text-sm hover:text-gold transition-colors tracking-wide",
                  currentCategory === cat.value || (cat.value === "all" && !currentCategory)
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
        <PriceSlider
          value={sliderPrice}
          onChange={setSliderPrice}
          convertPrice={convertPrice}
        />
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

      {/* Mobile Bottom Sheet */}
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
                <button onClick={() => setMobileFilterOpen(false)}><X size={20} /></button>
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
