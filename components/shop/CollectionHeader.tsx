"use client";
import Link from "next/link";
import { useTranslation } from "@/lib/translations";

export default function CollectionHeader({ count }: { count: number }) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-end mb-12">
      <p className="text-warm-gray">{count} {count > 1 ? t.shopArticles : t.shopArticle}</p>
      <Link href="/shop" className="text-xs tracking-widest uppercase border-b border-charcoal/20 dark:border-white/20 hover:border-gold transition-colors pb-1">
        {t.cartReturnShop}
      </Link>
    </div>
  );
}
