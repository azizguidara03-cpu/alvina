"use client";

import { useLocaleStore } from "@/store/localeStore";
import { Language } from "@/store/localeStore";

const content: Record<Language, {
  badge: string;
  title: string;
  sections: { title: string; text: string }[];
}> = {
  fr: {
    badge: "Protection Des Données",
    title: "Politique de Confidentialité",
    sections: [
      {
        title: "Collecte des données",
        text: "Nous collectons les informations strictement nécessaires au traitement des commandes, à la relation client et à l'amélioration du service.",
      },
      {
        title: "Utilisation des données",
        text: "Les données sont utilisées pour la gestion des paiements, la livraison, l'assistance client et, avec consentement, les communications éditoriales.",
      },
      {
        title: "Conservation",
        text: "Les informations sont conservées pour la durée requise par les obligations légales et contractuelles, puis archivées ou supprimées.",
      },
      {
        title: "Partage et sécurité",
        text: "Nous partageons uniquement les données nécessaires avec nos partenaires logistiques et prestataires de paiement sécurisés, dans un cadre contractuel strict.",
      },
      {
        title: "Vos droits",
        text: "Vous pouvez demander l'accès, la rectification ou la suppression de vos données à tout moment en contactant notre service dédié.",
      },
    ],
  },
  en: {
    badge: "Data Protection",
    title: "Privacy Policy",
    sections: [
      {
        title: "Data Collection",
        text: "We collect only the information strictly necessary for order processing, customer relations, and service improvement.",
      },
      {
        title: "Data Usage",
        text: "Data is used for payment management, delivery, customer support and, with consent, editorial communications.",
      },
      {
        title: "Retention",
        text: "Information is kept for the duration required by legal and contractual obligations, then archived or deleted.",
      },
      {
        title: "Sharing & Security",
        text: "We share only necessary data with our logistics partners and secure payment providers, within a strict contractual framework.",
      },
      {
        title: "Your Rights",
        text: "You can request access, correction, or deletion of your data at any time by contacting our dedicated service.",
      },
    ],
  },
  ar: {
    badge: "حماية البيانات",
    title: "سياسة الخصوصية",
    sections: [
      {
        title: "جمع البيانات",
        text: "نجمع فقط المعلومات الضرورية لمعالجة الطلبات وخدمة العملاء وتحسين الخدمة.",
      },
      {
        title: "استخدام البيانات",
        text: "تُستخدم البيانات لإدارة المدفوعات والتسليم ودعم العملاء، وبموافقتكم، للتواصل التحريري.",
      },
      {
        title: "الاحتفاظ بالبيانات",
        text: "تُحفظ المعلومات للمدة التي تستوجبها الالتزامات القانونية والتعاقدية، ثم تُؤرشف أو تُحذف.",
      },
      {
        title: "المشاركة والأمان",
        text: "لا نشارك سوى البيانات الضرورية مع شركاء الخدمات اللوجستية ومزودي الدفع الآمن ضمن إطار تعاقدي صارم.",
      },
      {
        title: "حقوقكم",
        text: "يمكنكم طلب الوصول إلى بياناتكم أو تصحيحها أو حذفها في أي وقت عبر التواصل مع خدمتنا المخصصة.",
      },
    ],
  },
  tr: {
    badge: "Veri Koruma",
    title: "Gizlilik Politikası",
    sections: [
      {
        title: "Veri Toplama",
        text: "Yalnızca sipariş işleme, müşteri ilişkileri ve hizmet iyileştirme için kesinlikle gerekli bilgileri topluyoruz.",
      },
      {
        title: "Veri Kullanımı",
        text: "Veriler; ödeme yönetimi, teslimat, müşteri desteği ve onaylı durumlarda editoryal iletişim için kullanılmaktadır.",
      },
      {
        title: "Saklama",
        text: "Bilgiler, yasal ve sözleşmesel yükümlülüklerin gerektirdiği süre boyunca saklanır, ardından arşivlenir veya silinir.",
      },
      {
        title: "Paylaşım ve Güvenlik",
        text: "Yalnızca gerekli verileri lojistik ortaklarımız ve güvenli ödeme sağlayıcılarımızla katı bir sözleşme çerçevesinde paylaşıyoruz.",
      },
      {
        title: "Haklarınız",
        text: "Verilerinize erişim, düzeltme veya silme talebinde bulunmak için dilediğiniz zaman özel hizmetimizle iletişime geçebilirsiniz.",
      },
    ],
  },
};

export default function PrivacyPage() {
  const language = useLocaleStore((state) => state.language);
  const t = content[language] ?? content.fr;

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <header className="mb-12 text-center">
        <p className="text-gold tracking-[0.24em] uppercase text-xs mb-3">{t.badge}</p>
        <h1 className="font-serif text-4xl md:text-5xl">{t.title}</h1>
      </header>
      <div className="grid gap-6">
        {t.sections.map((section) => (
          <section key={section.title} className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 md:p-8">
            <h2 className="font-serif text-2xl mb-3 text-[var(--text-primary)]">{section.title}</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">{section.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
