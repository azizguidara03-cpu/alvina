"use client";
import { useTranslation } from "@/lib/translations";

export default function FaqPage() {
  const { t } = useTranslation();

  const faqData = [
    {
      category: t.faqCatOrder,
      items: [
        { q: t.faqQ1, a: t.faqA1 },
        { q: t.faqQ2, a: t.faqA2 },
      ],
    },
    {
      category: t.faqCatShipping,
      items: [
        { q: t.faqQ3, a: t.faqA3 },
        { q: t.faqQ4, a: t.faqA4 },
      ],
    },
    {
      category: t.faqCatReturns,
      items: [
        { q: t.faqQ5, a: t.faqA5 },
        { q: t.faqQ6, a: t.faqA6 },
      ],
    },
    {
      category: t.faqCatPayment,
      items: [
        { q: t.faqQ7, a: t.faqA7 },
        { q: t.faqQ8, a: t.faqA8 },
      ],
    },
  ];
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
      <header className="text-center mb-14">
        <p className="text-gold tracking-[0.24em] uppercase text-xs mb-3">{t.contactService}</p>
        <h1 className="font-serif text-4xl md:text-5xl tracking-wide">{t.faqTitle}</h1>
      </header>
      <div className="space-y-8">
        {faqData.map((group) => (
          <section key={group.category} className="border border-[var(--border-color)] p-6 md:p-8 bg-[var(--bg-card)]">
            <h2 className="font-serif text-2xl mb-4">{group.category}</h2>
            <div className="space-y-3">
              {group.items.map((item) => (
                <details key={item.q} className="group border-b border-[var(--border-color)] pb-3">
                  <summary className="cursor-pointer py-2 flex justify-between items-center text-sm tracking-wide">
                    {item.q}
                    <span className="text-gold group-open:rotate-180 transition-transform">⌄</span>
                  </summary>
                  <p className="text-[var(--text-secondary)] leading-relaxed pb-1">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
