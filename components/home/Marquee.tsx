"use client";

const items = [
  "ALVINA", "·", "HAUTE COUTURE", "·", "TUNISIA", "·", "SS2026",
  "·", "SFAX", "·", "MODEST LUXURY", "·", "ALVINA", "·",
  "HAUTE COUTURE", "·", "TUNISIA", "·", "SS2026", "·", "SFAX", "·",
];

export default function Marquee() {
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

