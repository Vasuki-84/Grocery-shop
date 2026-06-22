import React, { useState, MouseEvent } from 'react';
import { Heart, Star, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product) => void;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function ProductCard({ product, onAddToCart, isFavorited, onToggleFavorite }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  return (
    <div className="glass-card rounded-[24px] overflow-hidden border border-outline-variant/30 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] group hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col h-full bg-white/70">
      {/* Floating favorite heart button */}
      <button
        onClick={() => onToggleFavorite(product.id)}
        className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md active:scale-75 transition-all"
        title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
        id={`fav-btn-${product.id}`}
      >
        <Heart 
          className={`w-4 h-4 transition-colors ${
            isFavorited ? 'text-error fill-error' : 'text-on-surface-variant'
          }`} 
        />
      </button>

      {/* Floating Category badge */}
      {product.badge && (
        <span className="absolute top-3.5 left-3.5 z-10 bg-primary-container px-3 py-1 text-[10px] uppercase font-extrabold tracking-wider rounded-lg text-on-primary-container shadow-sm">
          {product.badge}
        </span>
      )}

      {/* Product Image cover wrapper */}
      <div className="h-44 md:h-52 bg-surface-container-low overflow-hidden relative">
        <img
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={product.image}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Product contents details */}
      <div className="p-4 flex flex-col flex-grow gap-1">
        {/* Rating and Reviews count */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-secondary fill-secondary-container" />
            <span className="text-[11px] font-semibold text-on-surface-variant">
              {product.rating} ({product.reviewsCount ?? 0})
            </span>
          </div>
        )}

        <span className="text-[11px] uppercase tracking-widest font-semibold font-sans text-primary">
          {product.category}
        </span>

        <h3 className="font-sans text-sm md:text-base font-bold text-on-surface truncate group-hover:text-primary transition-colors" title={product.name}>
          {product.name}
        </h3>

        <p className="text-xs text-on-surface-variant font-sans line-clamp-2 min-h-[32px] leading-relaxed mt-0.5">
          {product.subtext}
        </p>

        {/* Price and Add button */}
        <div className="mt-auto pt-3 flex justify-between items-center border-t border-outline-variant/10">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant font-sans">Price</span>
            <span className="font-display font-extrabold text-base md:text-lg text-on-surface">
              ₹{product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all ${
              added ? 'bg-primary-container text-on-primary-container' : 'bg-primary text-white hover:bg-primary-container hover:text-on-primary-container'
            }`}
            title="Add to shopping cart"
            id={`add-btn-${product.id}`}
          >
            {added ? (
              <Check className="w-4 h-4 animate-scale-checked" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
