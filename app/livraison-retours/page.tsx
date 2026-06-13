const blocks = [
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
];

export default function LivraisonRetoursPage() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <header className="mb-12 text-center">
        <p className="text-gold tracking-[0.24em] uppercase text-xs mb-3">Service Client</p>
        <h1 className="font-serif text-4xl md:text-5xl">Livraison & Retours</h1>
      </header>
      <div className="grid gap-6">
        {blocks.map((block) => (
          <section key={block.title} className="border border-[var(--border-color)] bg-[var(--bg-card)] p-6 md:p-8">
            <h2 className="font-serif text-2xl mb-3">{block.title}</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">{block.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
