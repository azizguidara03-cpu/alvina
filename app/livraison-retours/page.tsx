"use client";

import { useLocaleStore } from "@/store/localeStore";
import { Language } from "@/store/localeStore";

const content: Record<Language, {
  badge: string;
  title: string;
  blocks: { title: string; text: string }[];
}> = {
  fr: {
    badge: "Service Client",
    title: "Livraison & Retours",
    blocks: [
      {
        title: "Livraison",
        text: "France et Europe: expédition sous 24 à 48h, livraison estimée entre 2 et 5 jours ouvrés selon la destination.",
      },
      {
        title: "Livraison Express",
        text: "Une option express est disponible au moment du paiement pour les villes éligibles, avec suivi premium en temps réel.",
      },
      {
        title: "Retours",
        text: "Les retours sont acceptés sous 14 jours après réception. Les articles doivent être non portés, intacts et avec étiquettes d'origine.",
      },
      {
        title: "Échanges & Remboursements",
        text: "Après validation qualité, le remboursement ou l'échange est traité rapidement via le moyen de paiement initial.",
      },
    ],
  },
  en: {
    badge: "Customer Service",
    title: "Shipping & Returns",
    blocks: [
      {
        title: "Shipping",
        text: "France and Europe: dispatched within 24 to 48 hours, estimated delivery between 2 and 5 business days depending on destination.",
      },
      {
        title: "Express Shipping",
        text: "An express option is available at checkout for eligible cities, with premium real-time tracking.",
      },
      {
        title: "Returns",
        text: "Returns are accepted within 14 days of receipt. Items must be unworn, intact, and with original tags.",
      },
      {
        title: "Exchanges & Refunds",
        text: "After quality validation, the refund or exchange is processed quickly via the original payment method.",
      },
    ],
  },
  ar: {
    badge: "خدمة العملاء",
    title: "الشحن والإرجاع",
    blocks: [
      {
        title: "الشحن",
        text: "فرنسا وأوروبا: الشحن خلال 24 إلى 48 ساعة، مع تسليم متوقع بين يومين وخمسة أيام عمل حسب الوجهة.",
      },
      {
        title: "الشحن السريع",
        text: "يتوفر خيار التوصيل السريع عند الدفع للمدن المؤهلة مع تتبع مميز في الوقت الفعلي.",
      },
      {
        title: "الإرجاع",
        text: "يُقبل الإرجاع خلال 14 يومًا من الاستلام. يجب أن تكون المنتجات غير مستخدمة وسليمة وبعلاماتها الأصلية.",
      },
      {
        title: "التبادل والاسترداد",
        text: "بعد التحقق من الجودة، تتم معالجة الاسترداد أو التبادل بسرعة عبر طريقة الدفع الأصلية.",
      },
    ],
  },
  tr: {
    badge: "Müşteri Hizmetleri",
    title: "Kargo & İadeler",
    blocks: [
      {
        title: "Kargo",
        text: "Fransa ve Avrupa: 24 ila 48 saat içinde sevkiyat, varış noktasına bağlı olarak tahminen 2 ila 5 iş günü teslimat.",
      },
      {
        title: "Ekspres Kargo",
        text: "Ödeme sırasında uygun şehirler için ekspres seçenek mevcuttur; gerçek zamanlı premium takip sunulmaktadır.",
      },
      {
        title: "İadeler",
        text: "İadeler teslim alınmasından itibaren 14 gün içinde kabul edilir. Ürünler giyilmemiş, sağlam ve orijinal etiketleriyle olmalıdır.",
      },
      {
        title: "Değişim & İade",
        text: "Kalite doğrulamasının ardından geri ödeme veya değişim, orijinal ödeme yöntemiyle hızla işleme alınır.",
      },
    ],
  },
};

export default function LivraisonRetoursPage() {
  const language = useLocaleStore((state) => state.language);
  const t = content[language] ?? content.fr;

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <header className="mb-12 text-center">
        <p className="text-gold tracking-[0.24em] uppercase text-xs mb-3">{t.badge}</p>
        <h1 className="font-serif text-4xl md:text-5xl">{t.title}</h1>
      </header>
      <div className="grid gap-6">
        {t.blocks.map((block) => (
          <section key={block.title} className="border border-[var(--border-color)] bg-[var(--bg-card)] p-6 md:p-8">
            <h2 className="font-serif text-2xl mb-3">{block.title}</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">{block.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
