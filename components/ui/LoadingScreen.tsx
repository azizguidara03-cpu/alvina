"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUiStore } from "@/store/uiStore";

export default function LoadingScreen() {
  const { isFirstLoad, setFirstLoadComplete } = useUiStore();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isFirstLoad) {
      setIsVisible(true);
    }
  }, [isFirstLoad]);

  useEffect(() => {
    if (mounted && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setFirstLoadComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [mounted, isVisible, setFirstLoadComplete]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cream dark:bg-charcoal text-charcoal dark:text-cream"
        >
          <div className="relative">
            <motion.h1
              className="text-4xl md:text-6xl font-serif font-light tracking-widest text-transparent overflow-hidden"
              style={{ WebkitTextStroke: "1px currentColor" }}
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "circInOut" }}
                className="absolute inset-0 text-charcoal dark:text-cream whitespace-nowrap overflow-hidden"
              >
                ALVINA
              </motion.span>
              ALVINA
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
              className="h-[1px] w-full bg-gold mt-4 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
