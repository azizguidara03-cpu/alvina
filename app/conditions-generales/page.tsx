"use client";

import { useLocaleStore } from "@/store/localeStore";
import { Language } from "@/store/localeStore";

const content: Record<Language, {
  badge: string;
  title: string;
  sections: { title: string; content: string }[];
}> = {
  fr: {
    badge: "Informations Légales",
    title: "Conditions Générales",
    sections: [
      {
        title: "1. Objet",
        content: "Les présentes conditions générales encadrent les ventes réalisées sur le site ALVINA et définissent les droits et obligations des parties.",
      },
      {
        title: "2. Produits et disponibilité",
        content: "Chaque produit est présenté avec le plus grand soin. Les disponibilités sont mises à jour en temps réel sous réserve d'écart technique ponctuel.",
      },
      {
        title: "3. Prix et paiement",
        content: "Les prix sont indiqués en euros, toutes taxes comprises. Le paiement est exigible immédiatement à la commande via les moyens proposés.",
      },
      {
        title: "4. Livraison et retours",
        content: "Les délais de livraison sont communiqués à titre indicatif. Les retours sont acceptés dans un délai de 14 jours selon notre politique dédiée.",
      },
      {
        title: "5. Responsabilité",
        content: "ALVINA ne saurait être tenue responsable des dommages indirects liés à l'usage du site ou de cas de force majeure impactant la logistique.",
      },
    ],
  },
  en: {
    badge: "Legal Information",
    title: "Terms & Conditions",
    sections: [
      {
        title: "1. Purpose",
        content: "These general terms and conditions govern sales made on the ALVINA website and define the rights and obligations of the parties.",
      },
      {
        title: "2. Products & Availability",
        content: "Each product is presented with the greatest care. Availability is updated in real time, subject to occasional technical discrepancies.",
      },
      {
        title: "3. Pricing & Payment",
        content: "Prices are listed in euros, all taxes included. Payment is due immediately upon ordering via the available payment methods.",
      },
      {
        title: "4. Shipping & Returns",
        content: "Delivery times are provided as an indication. Returns are accepted within 14 days in accordance with our dedicated policy.",
      },
      {
        title: "5. Liability",
        content: "ALVINA cannot be held liable for indirect damages related to the use of the site or force majeure events affecting logistics.",
      },
    ],
  },
  ar: {
    badge: "المعلومات القانونية",
    title: "الشروط والأحكام",
    sections: [
      {
        title: "١. الغرض",
        content: "تحكم هذه الشروط العامة المبيعات التي تتم على موقع ALVINA وتحدد حقوق والتزامات الطرفين.",
      },
      {
        title: "٢. المنتجات والتوفر",
        content: "يُقدَّم كل منتج بأقصى عناية. تُحدَّث التوفرات في الوقت الفعلي مع مراعاة أي تباين تقني عرضي.",
      },
      {
        title: "٣. الأسعار والدفع",
        content: "تُعرض الأسعار باليورو شاملة جميع الضرائب. الدفع مستحق فور تقديم الطلب عبر الوسائل المتاحة.",
      },
      {
        title: "٤. الشحن والإرجاع",
        content: "مواعيد التسليم معطاة على سبيل الإشارة. تُقبل المرتجعات خلال 14 يومًا وفقًا لسياستنا المخصصة.",
      },
      {
        title: "٥. المسؤولية",
        content: "لا تتحمل ALVINA المسؤولية عن الأضرار غير المباشرة المرتبطة باستخدام الموقع أو حالات القوة القاهرة المؤثرة على الخدمات اللوجستية.",
      },
    ],
  },
  tr: {
    badge: "Yasal Bilgiler",
    title: "Genel Şartlar ve Koşullar",
    sections: [
      {
        title: "1. Amaç",
        content: "Bu genel şartlar ve koşullar, ALVINA web sitesinde gerçekleştirilen satışları düzenler ve tarafların hak ve yükümlülüklerini tanımlar.",
      },
      {
        title: "2. Ürünler ve Stok Durumu",
        content: "Her ürün büyük bir özenle sunulmaktadır. Stok bilgileri, olası teknik farklılıklar saklı kalmak kaydıyla gerçek zamanlı güncellenir.",
      },
      {
        title: "3. Fiyatlar ve Ödeme",
        content: "Fiyatlar tüm vergiler dahil euro olarak belirtilmektedir. Ödeme, sipariş verildiği anda sunulan ödeme yöntemleriyle hemen alınır.",
      },
      {
        title: "4. Kargo ve İadeler",
        content: "Teslimat süreleri bilgi amaçlıdır. İadeler, özel politikamız çerçevesinde 14 gün içinde kabul edilir.",
      },
      {
        title: "5. Sorumluluk",
        content: "ALVINA, sitenin kullanımından kaynaklanan dolaylı zararlardan veya lojistiği etkileyen mücbir sebep durumlarından sorumlu tutulamaz.",
      },
    ],
  },
};

export default function ConditionsPage() {
  const language = useLocaleStore((state) => state.language);
  const t = content[language] ?? content.fr;

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <header className="mb-12 text-center">
        <p className="text-gold tracking-[0.24em] uppercase text-xs mb-3">{t.badge}</p>
        <h1 className="font-serif text-4xl md:text-5xl">{t.title}</h1>
      </header>
      <article className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
        {t.sections.map((section) => (
          <section key={section.title} className="border-l border-gold/40 pl-6">
            <h2 className="font-serif text-2xl text-[var(--text-primary)] mb-3">{section.title}</h2>
            <p>{section.content}</p>
          </section>
        ))}
      </article>
    </main>
  );
}
