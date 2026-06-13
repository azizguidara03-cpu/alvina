"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslation } from "@/lib/translations";

export default function NewsletterSection() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();

  const schema = z.object({
    email: z.string().email({ message: t.newsletterEmailInvalid }),
  });

  type FormValues = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Newsletter subscription:", data.email);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--bg-alt)] text-[var(--text-primary)] relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl tracking-widest uppercase mb-6">
            {t.newsletterTitle}
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 max-w-lg mx-auto leading-relaxed">
            {t.newsletterSub}
          </p>
        </motion.div>

        <div className="relative max-w-xl mx-auto h-[60px]">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute inset-0 flex items-center justify-center text-gold font-medium tracking-widest gap-2"
              >
                <Check size={20} />
                <span>{t.newsletterSuccess}</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="absolute inset-0 flex w-full"
              >
                <div className="flex-1 relative">
                  <input
                    {...register("email")}
                    type="text"
                    placeholder={t.newsletterPlaceholder}
                    className="w-full h-full bg-transparent border-b border-[var(--border-color)] px-4 focus:outline-none focus:border-gold transition-colors uppercase tracking-widest text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] placeholder:text-xs placeholder:tracking-[0.15em]"
                  />
                  {errors.email && (
                    <span className="absolute -bottom-6 left-0 text-red-500 text-xs text-left">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="luxury-button bg-[var(--bg-inverse)] text-[var(--text-inverse)] px-8 uppercase tracking-[0.2em] text-xs hover:bg-gold hover:text-white transition-colors"
                >
                  {t.newsletterBtn}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </section>
  );
}
