"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ImageGallery({ images }: { images: string[] }) {
  const fallbackImage =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='1200'><rect width='100%' height='100%' fill='#f0eae0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#8c8279' font-size='34' font-family='serif'>ALVINA</text></svg>`
    );
  const [activeImg, setActiveImg] = useState(images[0] || fallbackImage);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: "scale(2)" });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transformOrigin: "center", transform: "scale(1)" });
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Main Image */}
      <div
        className="relative w-full aspect-[3/4] overflow-hidden bg-champagne dark:bg-[#1a1a1a] cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={activeImg}
          alt="Produit Alvina"
          fill
          unoptimized
          className="object-cover transition-transform duration-200"
          style={zoomStyle}
          priority
          onError={() => setActiveImg(fallbackImage)}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-row gap-3 hide-scrollbar overflow-x-auto pb-1">
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveImg(img)}
              whileHover={{ y: -3 }}
              className={cn(
                "relative w-20 h-28 flex-shrink-0 border-2 transition-all duration-300",
                activeImg === img
                  ? "border-gold"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`Vue ${i + 1}`}
                fill
                unoptimized
                className="object-cover"
                onError={() => setActiveImg(fallbackImage)}
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
