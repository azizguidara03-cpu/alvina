"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/translations";
import { MapPin } from "lucide-react";

const socials = [
  { label: "INSTAGRAM", href: "https://www.instagram.com/alvina.sfax?igsh=MWkzZmtzZGwwM252dQ==" },
  { label: "FACEBOOK",  href: "https://www.facebook.com/Alvina.Sfax" },
];

export default function Footer() {
  const { t, tp } = useTranslation();

  const footerLinks = {
    collections: [
      { label: tp("Robe de Soirée"), href: "/shop?category=Robe%20de%20Soirée" },
      { label: tp("Chemisier"), href: "/shop?category=Chemisier" },
      { label: tp("Abaya"), href: "/shop?category=Abaya" },
      { label: tp("Veste"), href: "/shop?category=Veste" },
      { label: tp("Jean"), href: "/shop?category=Jean" },
    ],
    info: [
      { label: t.navAbout, href: "/about" },
      { label: t.navShop,  href: "/shop" },
      { label: t.navContact, href: "/contact" },
    ],
    service: [
      { label: t.footerDelivery, href: "/livraison-retours" },
      { label: t.footerFAQ, href: "/faq" },
      { label: t.footerTerms, href: "/conditions-generales" },
      { label: t.footerPrivacy, href: "/politique-confidentialite" },
    ],
  };

  const adTypes = [t.adBanner, t.adSponsor, t.adCapsule, t.adInfluencer];

  return (
    <motion.footer
      className="bg-[#111008] text-[#FAF7F2] py-20 px-6 md:px-12 mt-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8 }}
    >
      {/* ── PARTNERSHIPS & ADVERTISING ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto mb-16 pb-10 border-b border-[#FAF7F2]/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-gold tracking-[0.25em] text-xs uppercase font-sans mb-3 block">
              {t.footerPartnerLabel}
            </span>
            <h3 className="font-serif text-xl md:text-2xl tracking-widest text-[#FAF7F2] mb-3">
              {t.footerPartnerTitle}
            </h3>
            <p className="text-[#8C8279] text-sm leading-relaxed max-w-md">
              {t.footerPartnerBody}
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex flex-wrap gap-3">
              {adTypes.map((label) => (
                <span
                  key={label}
                  className="text-xs tracking-widest text-[#8C8279] border border-[#FAF7F2]/10 px-3 py-1.5"
                >
                  {label}
                </span>
              ))}
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 mt-2 text-xs tracking-[0.2em] uppercase text-gold border border-gold/40 px-5 py-2.5 hover:bg-gold hover:text-white transition-colors duration-300"
            >
              {t.footerPartnerCta}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand */}
        <div className="md:col-span-4">
          <Link
            href="/"
            className="text-3xl font-serif tracking-widest mb-6 inline-block hover:text-gold transition-colors duration-300"
          >
            ALVINA
          </Link>
          <div className="h-px bg-gold/30 w-12 mb-6" />
          <p className="text-[#B5ADA6] text-sm max-w-xs mb-8 leading-relaxed">
            {t.footerTagline}<br />
            {t.footerSub}
          </p>
          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8C8279] hover:text-gold transition-colors duration-300 font-sans text-xs tracking-[0.2em]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className="md:col-span-2">
          <h4 className="font-serif text-base tracking-widest mb-6 text-[#FAF7F2]/90 uppercase">
            {t.footerCollections}
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-[#8C8279]">
            {footerLinks.collections.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="luxury-link hover:text-gold transition-colors duration-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div className="md:col-span-2">
          <h4 className="font-serif text-base tracking-widest mb-6 text-[#FAF7F2]/90 uppercase">
            {t.footerInfo}
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-[#8C8279]">
            {footerLinks.info.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="luxury-link hover:text-gold transition-colors duration-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service */}
        <div className="md:col-span-4">
          <h4 className="font-serif text-base tracking-widest mb-6 text-[#FAF7F2]/90 uppercase">
            {t.footerService}
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-[#8C8279] mb-8">
            {footerLinks.service.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="luxury-link hover:text-gold transition-colors duration-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-sm text-[#8C8279] mt-6">
            <p className="tracking-widest mb-2">+905365203266</p>
            <p className="tracking-widest mb-4">Alvina.sfax@gmail.com</p>
            <a 
              href="https://maps.app.goo.gl/iefehyP152gvEumC8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 tracking-widest hover:text-gold transition-colors duration-300"
            >
              <MapPin size={16} />
              Sfax, Tunisie
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#FAF7F2]/8 flex items-center justify-between text-xs text-[#8C8279] flex-wrap gap-4">
        <p>&copy; {new Date().getFullYear()} ALVINA. {t.footerRights}</p>
        <p className="tracking-widest">Istanbul · Sfax · Monde</p>
      </div>
    </motion.footer>
  );
}
