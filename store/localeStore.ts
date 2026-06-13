import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'fr' | 'en' | 'ar' | 'tr';
export type Currency = 'EUR' | 'USD' | 'TND' | 'TRY' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  label: string;
  rate: number; // relative to EUR
}

export interface LanguageConfig {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageConfig[] = [
  { code: 'fr', label: 'French',  nativeLabel: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'en', label: 'English', nativeLabel: 'English',  flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', label: 'Arabic',  nativeLabel: 'العربية',  flag: '🇸🇦', dir: 'rtl' },
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe',   flag: '🇹🇷', dir: 'ltr' },
];

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'EUR', symbol: '€', label: 'Euro',             rate: 1     },
  { code: 'USD', symbol: '$', label: 'US Dollar',        rate: 1.08  },
  { code: 'GBP', symbol: '£', label: 'British Pound',    rate: 0.86  },
  { code: 'TND', symbol: 'DT', label: 'Tunisian Dinar',  rate: 3.35  },
  { code: 'TRY', symbol: '₺', label: 'Turkish Lira',     rate: 35.2  },
];

interface LocaleState {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (cur: Currency) => void;
  // Helpers
  getCurrentLanguage: () => LanguageConfig;
  getCurrentCurrency: () => CurrencyConfig;
  convertPrice: (priceEur: number) => string;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      language: 'fr',
      currency: 'EUR',

      setLanguage: (lang) => set({ language: lang }),
      setCurrency: (cur) => set({ currency: cur }),

      getCurrentLanguage: () =>
        LANGUAGES.find((l) => l.code === get().language) ?? LANGUAGES[0],

      getCurrentCurrency: () =>
        CURRENCIES.find((c) => c.code === get().currency) ?? CURRENCIES[0],

      convertPrice: (priceEur: number) => {
        const cur = CURRENCIES.find((c) => c.code === get().currency) ?? CURRENCIES[0];
        const converted = priceEur * cur.rate;
        return `${cur.symbol}${converted % 1 === 0 ? converted.toFixed(0) : converted.toFixed(2)}`;
      },
    }),
    {
      name: 'alvina-locale-storage',
      partialize: (state) => ({ language: state.language, currency: state.currency }),
    }
  )
);
