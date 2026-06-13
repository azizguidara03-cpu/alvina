"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, ChevronDown } from "lucide-react";
import { useLocaleStore, LANGUAGES, CURRENCIES, type Language, type Currency } from "@/store/localeStore";
import { useTranslation } from "@/lib/translations";
import { cn } from "@/lib/utils";

export default function LocaleModal() {
  const { language, currency, setLanguage, setCurrency } = useLocaleStore();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [tempLang, setTempLang] = useState<Language>(language);
  const [tempCur, setTempCur] = useState<Currency>(currency);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (open) { setTempLang(language); setTempCur(currency); }
  }, [open, language, currency]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleConfirm = () => {
    setLanguage(tempLang);
    setCurrency(tempCur);
    setOpen(false);
  };

  if (!mounted) return null;

  const currentLang = LANGUAGES.find((l) => l.code === language)!;
  const currentCur  = CURRENCIES.find((c) => c.code === currency)!;

  return (
    <>
      {/* Trigger Badge */}
      <button
        id="locale-selector-btn"
        onClick={() => setOpen(true)}
        aria-label={t.localeTitle}
        className="flex items-center gap-1.5 text-xs tracking-widest font-sans uppercase hover:text-gold transition-colors duration-300"
      >
        <Globe size={13} strokeWidth={1.5} />
        <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
        <span className="hidden sm:inline text-[var(--text-muted)]">|</span>
        <span>{currentCur.symbol}</span>
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="locale-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              ref={modalRef}
              key="locale-modal"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gold px-6 py-5 flex items-center justify-between">
                <h2 className="font-sans font-semibold tracking-[0.2em] uppercase text-sm text-white">
                  {t.localeTitle}
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-5">

                {/* Language selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] font-sans">
                    {t.localeLang}
                  </label>
                  <div className="relative">
                    <select
                      value={tempLang}
                      onChange={(e) => setTempLang(e.target.value as Language)}
                      className="w-full appearance-none bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm px-4 py-3 pr-10 focus:outline-none focus:border-gold transition-colors"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.nativeLabel} ({lang.label})
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                  </div>
                </div>

                {/* Currency selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] font-sans">
                    {t.localeCurrency}
                  </label>
                  <div className="relative">
                    <select
                      value={tempCur}
                      onChange={(e) => setTempCur(e.target.value as Currency)}
                      className="w-full appearance-none bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm px-4 py-3 pr-10 focus:outline-none focus:border-gold transition-colors"
                    >
                      {CURRENCIES.map((cur) => (
                        <option key={cur.code} value={cur.code}>
                          {cur.symbol} — {cur.label} ({cur.code})
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                  </div>
                </div>

                {/* Preview badges */}
                <div className="flex gap-3 flex-wrap">
                  {LANGUAGES.filter((l) => l.code === tempLang).map((l) => (
                    <span key={l.code} className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/30 text-gold text-xs tracking-widest uppercase">
                      {l.flag} {l.nativeLabel}
                    </span>
                  ))}
                  {CURRENCIES.filter((c) => c.code === tempCur).map((c) => (
                    <span key={c.code} className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/30 text-gold text-xs tracking-widest uppercase">
                      {c.symbol} {c.code}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  id="locale-confirm-btn"
                  onClick={handleConfirm}
                  className="w-full bg-gold text-white py-3.5 text-xs tracking-[0.25em] uppercase font-sans font-medium hover:bg-[#c9a454] transition-colors duration-300"
                >
                  {t.localeConfirm}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
