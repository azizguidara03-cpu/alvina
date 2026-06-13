const privacySections = [
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
];

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <header className="mb-12 text-center">
        <p className="text-gold tracking-[0.24em] uppercase text-xs mb-3">Protection Des Données</p>
        <h1 className="font-serif text-4xl md:text-5xl">Politique de Confidentialité</h1>
      </header>
      <div className="grid gap-6">
        {privacySections.map((section) => (
          <section key={section.title} className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 md:p-8">
            <h2 className="font-serif text-2xl mb-3 text-[var(--text-primary)]">{section.title}</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">{section.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
