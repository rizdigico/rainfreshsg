import React from "react";
import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
}

const colorMap: Record<string, string> = {
  cyan: "text-cyan-200 drop-shadow-[0_0_8px_rgba(164,255,255,0.3)]",
  pink: "text-pink-200 drop-shadow-[0_0_8px_rgba(255,164,200,0.3)]",
  amber: "text-amber-200 drop-shadow-[0_0_8px_rgba(255,200,164,0.3)]",
  orange: "text-orange-200 drop-shadow-[0_0_8px_rgba(255,180,164,0.3)]",
};

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const glowClass = colorMap[product.color] || "text-white/80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.25, 1, 0.3, 1] }}
      className="acrylic-card p-10 flex flex-col h-full group relative"
    >
      {/* Ambient light interaction */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 heavy-transition pointer-events-none" />
      
      <div className="relative z-10 mb-12">
        <h2 className="text-4xl font-serif text-white/90 leading-[1.1] tracking-tight mb-4">
          {product.title}
        </h2>
        <p className={`font-serif italic text-lg ${glowClass}`}>
          {product.subtitle}
        </p>
      </div>

      <div className="relative z-10 flex-grow space-y-8 mb-12">
        <div className="space-y-2">
          <h3 className="micro-label">Top Notes</h3>
          <p className="font-sans text-xs text-white/70 leading-relaxed font-light tracking-wide">{product.notes.top}</p>
        </div>
        <div className="space-y-2">
          <h3 className="micro-label">Heart Notes</h3>
          <p className="font-sans text-xs text-white/70 leading-relaxed font-light tracking-wide">{product.notes.heart}</p>
        </div>
        <div className="space-y-2">
          <h3 className="micro-label">Base Notes</h3>
          <p className="font-sans text-xs text-white/70 leading-relaxed font-light tracking-wide">{product.notes.base}</p>
        </div>
      </div>

      <a
        href="https://shop.tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 mt-auto flex items-center justify-center w-full py-5 px-6 rounded-sm text-white font-serif text-lg tracking-wide bg-white/[0.03] ring-1 ring-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/[0.08] hover:ring-white/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] heavy-transition"
      >
        <ShoppingBag className="w-5 h-5 mr-3 opacity-70" />
        Buy on TikTok Shop
      </a>
    </motion.div>
  );
};
