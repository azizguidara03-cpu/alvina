"use client";
import { useTranslation } from "@/lib/translations";

export default function TranslatedText({ id }: { id: string }) {
  const { t } = useTranslation();
  return <>{t[id as keyof typeof t]}</>;
}
