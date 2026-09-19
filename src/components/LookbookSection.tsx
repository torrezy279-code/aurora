import React, { useState } from 'react';
import { Sparkles, ArrowRight, Eye } from 'lucide-react';
import { LOOKBOOK_ITEMS, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface LookbookSectionProps {
  onQuickViewProduct: (product: Product) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onQuickViewProduct }) => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const activeLook = LOOKBOOK_ITEMS[activeLookIndex];

  // Find products tagged in active look
  const taggedProducts = PRODUCTS.filter((p) => activeLook.productIds.includes(p.id));

  return (
    <section id="lookbook" className="py-20 bg-stone-900 text-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300 block mb-2">
              Editorial & Inspiração
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
              Lookbook Autoral
            </h2>
          </div>

          {/* Look Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {LOOKBOOK_ITEMS.map((look, idx) => (
              <button
                key={look.id}
                id={`lookbook-tab-${look.id}`}
                onClick={() => setActiveLookIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeLookIndex === idx
                    ? 'bg-white text-stone-900 shadow-md'
                    : 'bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700'
                }`}
              >
                {look.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Look Image */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/10 shadow-2xl border border-stone-800">
              <img
                src={activeLook.image}
                alt={activeLook.title}
                className="w-full h-full object-cover object-center transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-semibold block mb-1">
                  {activeLook.season}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                  {activeLook.title}
                </h3>
                <p className="text-stone-300 text-sm max-w-lg font-light">
                  {activeLook.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Tagged Products in this Look */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <div className="border-b border-stone-800 pb-3">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block">
                Peças Selecionadas Neste Visual
              </span>
            </div>

            {taggedProducts.map((prod) => {
              const formattedPrice = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(prod.price);

              return (
                <div
                  key={prod.id}
                  id={`lookbook-product-${prod.id}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-stone-800/80 border border-stone-700/80 hover:border-stone-500 transition-colors group cursor-pointer"
                  onClick={() => onQuickViewProduct(prod)}
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={prod.primaryImage}
                      alt={prod.name}
                      className="w-14 h-16 rounded-lg object-cover bg-stone-900 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                        {prod.subcategory}
                      </span>
                      <h4 className="font-serif text-sm text-white font-medium group-hover:text-amber-200 transition-colors line-clamp-1">
                        {prod.name}
                      </h4>
                      <span className="text-xs font-mono font-semibold text-amber-300">
                        {formattedPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    className="p-2 rounded-lg bg-stone-700 group-hover:bg-amber-400 group-hover:text-stone-950 text-stone-300 transition-colors"
                    title="Ver Detalhes da Peça"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              );
            })}

            <div className="pt-3">
              <p className="text-xs text-stone-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                Compre as duas peças juntas e ganhe frete grátis para todo o Brasil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
