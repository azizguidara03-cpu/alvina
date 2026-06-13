const faqData = [
  {
    category: "Commande",
    items: [
      { q: "Comment passer une commande ?", a: "Ajoutez vos pièces au panier, validez vos options de taille et finalisez le paiement sécurisé." },
      { q: "Puis-je modifier ma commande ?", a: "Une modification est possible dans l'heure suivant la validation, via notre service client." },
    ],
  },
  {
    category: "Livraison",
    items: [
      { q: "Quels sont les délais de livraison ?", a: "France et Europe: 2 à 5 jours ouvrés. International: 4 à 8 jours ouvrés." },
      { q: "Proposez-vous la livraison express ?", a: "Oui, l'option express est disponible à l'étape de paiement selon la destination." },
    ],
  },
  {
    category: "Retours",
    items: [
      { q: "Quel est le délai de retour ?", a: "Vous disposez de 14 jours après réception pour demander un retour." },
      { q: "Les articles soldés sont-ils retournables ?", a: "Les pièces soldées peuvent être échangées selon disponibilité, sauf mention contraire." },
    ],
  },
  {
    category: "Paiement",
    items: [
      { q: "Quels moyens de paiement acceptez-vous ?", a: "Cartes bancaires majeures, Apple Pay et autres options locales disponibles au checkout." },
      { q: "Le paiement est-il sécurisé ?", a: "Toutes les transactions sont chiffrées via des prestataires conformes aux standards de sécurité." },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
      <header className="text-center mb-14">
        <p className="text-gold tracking-[0.24em] uppercase text-xs mb-3">Service Client</p>
        <h1 className="font-serif text-4xl md:text-5xl tracking-wide">FAQ</h1>
      </header>
      <div className="space-y-8">
        {faqData.map((group) => (
          <section key={group.category} className="border border-[var(--border-color)] p-6 md:p-8 bg-[var(--bg-card)]">
            <h2 className="font-serif text-2xl mb-4">{group.category}</h2>
            <div className="space-y-3">
              {group.items.map((item) => (
                <details key={item.q} className="group border-b border-[var(--border-color)] pb-3">
                  <summary className="cursor-pointer py-2 flex justify-between items-center text-sm tracking-wide">
                    {item.q}
                    <span className="text-gold group-open:rotate-180 transition-transform">⌄</span>
                  </summary>
                  <p className="text-[var(--text-secondary)] leading-relaxed pb-1">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
