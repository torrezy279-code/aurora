import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: 'PP' | 'P' | 'M' | 'G' | 'GG', color: ProductColor) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<'PP' | 'P' | 'M' | 'G' | 'GG'>(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1800);
  };

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(product.originalPrice)
    : null;

  return (
    <div
      id={`product-card-${product.id}`}
      className="group flex flex-col h-full bg-transparent text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Frame */}
      <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 mb-3">
        <img
          src={isHovered ? product.secondaryImage : product.primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
          loading="lazy"
        />

        {/* Badge / Tag */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded bg-stone-900/90 text-white backdrop-blur-xs shadow-xs">
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-xs transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-950'
          }`}
          aria-label={isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          title={isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center justify-center gap-1 bg-white/95 backdrop-blur-xs p-1.5 rounded-lg border border-stone-200 shadow-sm">
            <span className="text-[11px] text-stone-500 font-medium mr-1 hidden sm:inline">Tam:</span>
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(s);
                }}
                className={`text-[11px] px-2 py-0.5 rounded font-medium transition-colors ${
                  selectedSize === s
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              id={`quick-view-btn-${product.id}`}
              onClick={() => onQuickView(product)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-medium transition-colors shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Espiar</span>
            </button>

            <button
              id={`add-to-bag-btn-${product.id}`}
              onClick={handleQuickAdd}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all shadow-xs ${
                addedSuccess
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Adicionado!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Sacola</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Colors Swatches */}
      <div className="flex items-center gap-1.5 mb-2">
        {product.colors.map((c) => (
          <button
            key={c.name}
            onClick={() => setSelectedColor(c)}
            className={`w-3.5 h-3.5 rounded-full border transition-all ${
              selectedColor.name === c.name
                ? 'ring-2 ring-stone-900 ring-offset-1 border-transparent scale-110'
                : 'border-stone-300 hover:scale-105'
            }`}
            style={{ backgroundColor: c.hex }}
            title={`${c.name}`}
            aria-label={`Cor ${c.name}`}
          />
        ))}
        <span className="text-[11px] text-stone-500 ml-1">
          {selectedColor.name}
        </span>
      </div>

      {/* Title & Subcategory */}
      <div className="flex-1">
        <p className="text-[11px] uppercase tracking-wider text-stone-500 font-medium mb-1">
          {product.subcategory}
        </p>
        <h3
          onClick={() => onQuickView(product)}
          className="font-serif text-base text-stone-900 font-medium group-hover:text-stone-700 transition-colors cursor-pointer line-clamp-1 mb-1"
        >
          {product.name}
        </h3>
      </div>

      {/* Price & Rating */}
      <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-stone-200/60">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-stone-900 font-mono">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="text-xs text-stone-400 line-through font-mono">
              {formattedOriginalPrice}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-stone-500">
          <span className="text-amber-500">★</span>
          <span className="font-medium text-stone-700">{product.rating.toFixed(1)}</span>
          <span className="text-[11px] text-stone-400">({product.reviewsCount})</span>
        </div>
      </div>
    </div>
  );
};
