const sections = [
  {
    title: "1. Objet",
    content:
      "Les présentes conditions générales encadrent les ventes réalisées sur le site ALVINA et définissent les droits et obligations des parties.",
  },
  {
    title: "2. Produits et disponibilité",
    content:
      "Chaque produit est présenté avec le plus grand soin. Les disponibilités sont mises à jour en temps réel sous réserve d'écart technique ponctuel.",
  },
  {
    title: "3. Prix et paiement",
    content:
      "Les prix sont indiqués en euros, toutes taxes comprises. Le paiement est exigible immédiatement à la commande via les moyens proposés.",
  },
  {
    title: "4. Livraison et retours",
    content:
      "Les délais de livraison sont communiqués à titre indicatif. Les retours sont acceptés dans un délai de 14 jours selon notre politique dédiée.",
  },
  {
    title: "5. Responsabilité",
    content:
      "ALVINA ne saurait être tenue responsable des dommages indirects liés à l'usage du site ou de cas de force majeure impactant la logistique.",
  },
];

export default function ConditionsPage() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <header className="mb-12 text-center">
        <p className="text-gold tracking-[0.24em] uppercase text-xs mb-3">Informations Légales</p>
        <h1 className="font-serif text-4xl md:text-5xl">Conditions Générales</h1>
      </header>
      <article className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
        {sections.map((section) => (
          <section key={section.title} className="border-l border-gold/40 pl-6">
            <h2 className="font-serif text-2xl text-[var(--text-primary)] mb-3">{section.title}</h2>
            <p>{section.content}</p>
          </section>
        ))}
      </article>
    </main>
  );
}
