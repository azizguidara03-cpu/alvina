"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, ShoppingBag, Menu, X, Search } from "lucide-react";
import { useUiStore } from "@/store/uiStore";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/translations";
import LocaleModal from "./LocaleModal";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useUiStore();
  const { items, toggleDrawer } = useCartStore();
  const { t, isRTL } = useTranslation();
  const pathname = usePathname();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const links = [
    { name: t.navShop,    href: "/shop" },
    { name: t.navAbout,   href: "/about" },
    { name: t.navContact, href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // RTL support: update document dir when Arabic selected
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  if (!mounted) return null;

  const isHome = pathname === "/";
  const isTransparent = !isScrolled && isHome && !mobileMenuOpen;

  const navClass = cn(
    "fixed top-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-12 flex justify-between items-center",
    isTransparent
      ? "bg-transparent"
      : "bg-[var(--bg-primary)]/90 backdrop-blur-md shadow-sm border-b border-[var(--border-color)]/30"
  );

  const textClass = isTransparent ? "text-white" : "text-[var(--text-primary)]";

  return (
    <>
      <header className={navClass}>
        {/* Left — nav links + mobile hamburger */}
        <div className={cn("flex items-center gap-6", isRTL && "flex-row-reverse")}>
          <button
            className={cn("md:hidden transition-colors hover:text-gold", textClass)}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={cn("hidden md:flex gap-8", isRTL && "flex-row-reverse")}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm tracking-widest uppercase hover:text-gold transition-colors duration-300",
                  textClass,
                  pathname === link.href && "text-gold"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center — Logo */}
        <Link
          href="/"
          className={cn(
            "absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-serif tracking-widest cursor-pointer hover:text-gold transition-colors duration-300",
            textClass
          )}
        >
          ALVINA
        </Link>

        {/* Right — Search | Locale | Dark | Cart */}
        <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
          {/* Search */}
          <button
            id="search-btn"
            onClick={() => setSearchOpen(true)}
            aria-label={t.navSearch}
            className={cn("hidden md:inline-flex hover:text-gold transition-colors duration-300", textClass)}
          >
            <Search size={18} strokeWidth={1.5} />
          </button>

          {/* Language / Currency selector */}
          <div className={cn("transition-colors duration-300", textClass)}>
            <LocaleModal />
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className={cn("hover:text-gold transition-colors duration-300", textClass)}
            aria-label={isDarkMode ? t.navLight : t.navDark}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart */}
          <button
            className={cn(
              "relative hover:text-gold transition-colors flex items-center duration-300",
              textClass
            )}
            onClick={toggleDrawer}
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className={cn(
              "fixed inset-0 z-40 bg-[var(--bg-primary)] pt-24 px-6 flex flex-col gap-6",
              isRTL && "text-right"
            )}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-serif tracking-wide text-[var(--text-primary)] hover:text-gold transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
            {/* Mobile search shortcut */}
            <button
              onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
              className={cn(
                "flex items-center gap-3 text-4xl font-serif tracking-wide text-[var(--text-primary)] hover:text-gold transition-colors duration-300",
                isRTL && "flex-row-reverse"
              )}
            >
              <Search size={28} strokeWidth={1} />
              {t.navSearch}
            </button>
            <div className="mt-auto pb-12 border-t border-[var(--border-color)] pt-6">
              <p className="text-[var(--text-muted)] text-xs tracking-[0.2em] uppercase">
                Istanbul · Sfax · Monde
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
