"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUiStore } from "@/store/uiStore";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorText = useUiStore((state) => state.cursorText);

  useEffect(() => {
    // only on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference hidden md:block"
      animate={{
        x: mousePosition.x - (cursorText ? 40 : isHovering ? 20 : 4),
        y: mousePosition.y - (cursorText ? 40 : isHovering ? 20 : 4),
        width: cursorText ? 80 : isHovering ? 40 : 8,
        height: cursorText ? 80 : isHovering ? 40 : 8,
        backgroundColor: cursorText ? "#C9A96E" : "#FFFFFF",
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      {cursorText && (
        <span className="flex items-center justify-center w-full h-full text-black text-xs font-sans tracking-widest uppercase opacity-100 mix-blend-normal">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}
