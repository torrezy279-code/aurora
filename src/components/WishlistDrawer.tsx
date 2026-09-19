import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: 'PP' | 'P' | 'M' | 'G' | 'GG', color: ProductColor) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="wishlist-drawer-backdrop"
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="wishlist-drawer-panel"
        className="w-full max-w-md bg-stone-50 h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-100/60">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-stone-900 fill-stone-900" />
            <h2 className="font-serif text-lg font-medium text-stone-900">
              Meus Favoritos ({products.length})
            </h2>
          </div>
          <button
            id="close-wishlist-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Fechar favoritos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-stone-200/80 text-stone-400 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <p className="font-serif text-lg text-stone-800 mb-1">Nenhuma peça favoritada ainda</p>
              <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">
                Clique no coração das peças que você mais amou para salvá-las aqui.
              </p>
              <button
                id="empty-wishlist-explore-btn"
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-stone-800 transition-colors"
              >
                Ver Coleção
              </button>
            </div>
          ) : (
            products.map((prod) => {
              const formattedPrice = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(prod.price);

              return (
                <div
                  key={prod.id}
                  id={`wishlist-item-${prod.id}`}
                  className="flex gap-3.5 p-3 rounded-xl bg-white border border-stone-200 shadow-2xs"
                >
                  <img
                    src={prod.primaryImage}
                    alt={prod.name}
                    className="w-18 h-24 object-cover rounded-lg bg-stone-100 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-medium text-stone-900 line-clamp-1">
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => onRemoveWishlist(prod)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                          title="Remover dos favoritos"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500">{prod.subcategory}</p>
                      <span className="text-xs font-semibold font-mono text-stone-900 mt-1 block">
                        {formattedPrice}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(prod, prod.sizes[0], prod.colors[0]);
                      }}
                      className="mt-2 py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Adicionar à Sacola</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
