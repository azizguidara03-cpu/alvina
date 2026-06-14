"use client";

import { useLocaleStore } from '@/store/localeStore';
import { Language } from '@/store/localeStore';

const translations: Record<Language, Record<string, string>> = {
  fr: { HAUTE_COUTURE: "HAUTE COUTURE", MODEST_LUXURY: "ÉLÉGANCE MODESTE", TUNISIA: "TUNISIE", SFAX: "SFAX" },
  en: { HAUTE_COUTURE: "HAUTE COUTURE", MODEST_LUXURY: "MODEST LUXURY", TUNISIA: "TUNISIA", SFAX: "SFAX" },
  ar: { HAUTE_COUTURE: "الأزياء الراقية", MODEST_LUXURY: "فخامة متواضعة", TUNISIA: "تونس", SFAX: "صفاقس" },
  tr: { HAUTE_COUTURE: "HAUTE COUTURE", MODEST_LUXURY: "MÜHTESEM LÜKS", TUNISIA: "TUNUS", SFAX: "SFAX" },
};

const BASE_ITEMS = ["ALVINA", "·", "HAUTE_COUTURE", "·", "TUNISIA", "·", "SS2026", "·", "SFAX", "·", "MODEST_LUXURY", "·"];

export default function Marquee() {
  const language = useLocaleStore((state) => state.language);
  const t = (key: string) => translations[language]?.[key] ?? key;

  const items = BASE_ITEMS.map((item) =>
    item === "·" || item === "ALVINA" || item === "SS2026" ? item : t(item)
  );

  return (
    <div className="marquee-wrapper relative overflow-hidden bg-charcoal text-gold py-6 border-y border-gold/20 dark:bg-[#080808] z-10 cursor-default select-none">
      <div className="animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={
              item === "·"
                ? "mx-5 text-gold/40 text-xl"
                : "font-sans font-light tracking-[0.3em] text-base md:text-lg uppercase mx-6 whitespace-nowrap"
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
