"use client";
import { useTranslation } from "@/lib/translations";

export default function ShopHeader({ count }: { count: number }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center mb-16 text-center">
      <span className="text-gold tracking-[0.25em] text-xs uppercase font-medium mb-3 block">
        {count} {count > 1 ? t.shopArticles : t.shopArticle}
      </span>
      <h1 className="font-serif text-4xl md:text-5xl tracking-widest uppercase mb-4">
        {t.shopTitle}
      </h1>
      <div className="w-16 h-px bg-gold" />
    </div>
  );
}
