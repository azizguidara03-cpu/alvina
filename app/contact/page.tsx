"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MapPin, Phone, Mail, Clock } from "lucide-react";

const schema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  objet: z.string().min(1, { message: "Veuillez sélectionner un objet." }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." }),
});

type FormValues = z.infer<typeof schema>;

const contactDetails = [
  { icon: Phone, label: "Téléphone", value: "0850 222 30 80" },
  { icon: Mail, label: "E-mail", value: "contact@alvinaonline.com" },
  { icon: MapPin, label: "Adresse", value: "Istanbul, Turquie" },
  { icon: Clock, label: "Horaires", value: "Lun–Ven · 09h–18h" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Contact form submitted:", data);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Page title */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-gold tracking-[0.3em] uppercase text-xs font-sans mb-4 block">
          Service Client
        </span>
        <h1 className="font-serif text-4xl md:text-6xl uppercase tracking-widest mb-6">
          Contactez Nous
        </h1>
        <div className="h-px bg-gold w-16 mx-auto" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left — Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-[var(--text-secondary)] mb-12 leading-relaxed max-w-md text-sm md:text-base">
            Pour toute demande concernant nos collections, vos commandes, ou un rendez-vous sur mesure,
            notre équipe est à votre disposition en semaine de 09h00 à 18h00.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {contactDetails.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 text-gold">
                  <Icon size={16} />
                </div>
                <div>
                  {/* BUG #1 FIX: label uses adaptive text-[var(--text-primary)] */}
                  <strong className="block font-serif text-sm uppercase tracking-widest mb-1 text-[var(--text-primary)]">
                    {label}
                  </strong>
                  <span className="text-[var(--text-secondary)] text-sm tracking-wide">{value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
            <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-4">
              Suivez-nous
            </p>
            <div className="flex gap-6">
              {[
                { label: "Instagram", href: "https://www.instagram.com/alvinaonline/" },
                { label: "Facebook", href: "https://www.facebook.com/alvinaonline/" },
                { label: "Pinterest", href: "https://www.pinterest.com/alvinaofficial/" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] uppercase text-[var(--text-secondary)] hover:text-gold transition-colors duration-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          // BUG #1 FIX: form card uses adaptive bg-[var(--bg-card)] instead of hardcoded bg-white
          className="bg-[var(--bg-card)] p-8 md:p-12 border border-[var(--border-color)] relative overflow-hidden"
        >
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[var(--bg-card)] z-20 flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
                  <Check size={32} />
                </div>
                <h2 className="font-serif text-2xl tracking-widest uppercase mb-2 text-[var(--text-primary)]">
                  Message Envoyé
                </h2>
                <p className="text-[var(--text-secondary)]">
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                {/* BUG #1 FIX: labels use adaptive text-[var(--text-secondary)] */}
                <label className="text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] mb-2">
                  Nom Complet
                </label>
                <input
                  {...register("nom")}
                  className="bg-transparent border-b border-[var(--border-color)] py-3 focus:outline-none focus:border-gold transition-colors text-[var(--text-primary)]"
                />
                {errors.nom && <span className="text-red-500 text-xs mt-1">{errors.nom.message}</span>}
              </div>
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] mb-2">
                  Adresse E-mail
                </label>
                <input
                  {...register("email")}
                  autoComplete="email"
                  className="bg-transparent border-b border-[var(--border-color)] py-3 focus:outline-none focus:border-gold transition-colors text-[var(--text-primary)]"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] mb-2">
                Sujet
              </label>
              <select
                {...register("objet")}
                className="bg-[var(--bg-card)] text-[var(--text-primary)] border-b border-[var(--border-color)] py-3 focus:outline-none focus:border-gold transition-colors appearance-none"
              >
                <option value="" disabled>-- Sélectionner --</option>
                <option value="commande">Suivi de commande</option>
                <option value="retour">Retours &amp; Échanges</option>
                <option value="presse">Presse &amp; Influenceurs</option>
                <option value="autre">Autre question</option>
              </select>
              {errors.objet && <span className="text-red-500 text-xs mt-1">{errors.objet.message}</span>}
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] mb-2">
                Message
              </label>
              <textarea
                {...register("message")}
                rows={5}
                className="bg-transparent border-b border-[var(--border-color)] py-3 focus:outline-none focus:border-gold transition-colors resize-none text-[var(--text-primary)]"
              />
              {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              // BUG #1 FIX: uses adaptive tokens — proper in both modes
              className="bg-[var(--bg-inverse)] text-[var(--text-inverse)] hover:bg-gold hover:text-white py-4 tracking-[0.2em] uppercase text-sm transition-colors disabled:opacity-50 w-full"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
