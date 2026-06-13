"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/translations";

export default function BrandStory() {
  const { t } = useTranslation();

  const milestones = [
    { year: "2011", text: t.brandMilestone1 },
    { year: "2016", text: t.brandMilestone2 },
    { year: "2020", text: t.brandMilestone3 },
    { year: "2026", text: t.brandMilestone4 },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold tracking-[0.24em] uppercase text-xs mb-3">{t.brandLabel}</p>
          <h2 className="font-serif text-4xl md:text-5xl">{t.brandTitle}</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
            {t.brandBody}
          </p>
          <div className="space-y-5">
            {milestones.map((step, index) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="border-l border-gold/50 pl-4"
              >
                <p className="font-serif text-2xl text-[var(--text-primary)]">{step.year}</p>
                <p className="text-[var(--text-secondary)]">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
