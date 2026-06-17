"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslation } from "@/lib/translations";



export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();

  const contactDetails = [
    { icon: Phone, label: t.contactPhoneLabel, value: "+905365203266\n+21698418423" },
    { icon: Mail,  label: "E-mail",             value: "Alvina.sfax@gmail.com" },
    { icon: MapPin,label: t.contactAddressLabel, value: "Sfax, Tunisie" },
    { icon: Clock, label: t.contactHoursLabel,   value: "Lun–Ven · 09h–18h" },
  ];


  const schema = z.object({
    nom: z.string().min(2, { message: t.contactNameMin }),
    email: z.string().email({ message: t.contactEmailInvalid }),
    objet: z.string().min(1, { message: t.contactSubjectRequired }),
    message: z.string().min(10, { message: t.contactMessageMin }),
  });

  type FormValues = z.infer<typeof schema>;

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
          {t.contactService}
        </span>
        <h1 className="font-serif text-4xl md:text-6xl uppercase tracking-widest mb-6">
          {t.contactTitle}
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
            {t.contactIntro}
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
              {t.contactFollow}
            </p>
            <div className="flex gap-6">
              {[
                { label: "Instagram", href: "https://www.instagram.com/alvina.sfax?igsh=MWkzZmtzZGwwM252dQ==" },
                { label: "Facebook", href: "https://www.facebook.com/Alvina.Sfax" }
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
                  {t.contactSent}
                </h2>
                <p className="text-[var(--text-secondary)]">
                  {t.contactSentSub}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                {/* BUG #1 FIX: labels use adaptive text-[var(--text-secondary)] */}
                <label className="text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] mb-2">
                  {t.contactName}
                </label>
                <input
                  {...register("nom")}
                  className="bg-transparent border-b border-[var(--border-color)] py-3 focus:outline-none focus:border-gold transition-colors text-[var(--text-primary)]"
                />
                {errors.nom && <span className="text-red-500 text-xs mt-1">{errors.nom.message}</span>}
              </div>
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] mb-2">
                  {t.contactEmail}
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
                {t.contactSubject}
              </label>
              <select
                {...register("objet")}
                className="bg-[var(--bg-card)] text-[var(--text-primary)] border-b border-[var(--border-color)] py-3 focus:outline-none focus:border-gold transition-colors appearance-none"
              >
                <option value="" disabled>-- {t.contactSubject} --</option>
                <option value="commande">{t.contactOptOrder}</option>
                <option value="retour">{t.contactOptReturn}</option>
                <option value="presse">{t.contactOptPress}</option>
                <option value="autre">{t.contactOptOther}</option>
              </select>
              {errors.objet && <span className="text-red-500 text-xs mt-1">{errors.objet.message}</span>}
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] mb-2">
                {t.contactMessage}
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
              {isSubmitting ? t.contactSending : t.contactSend}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
