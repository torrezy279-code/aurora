import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Search, RotateCcw, Sparkles, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: 'PP' | 'P' | 'M' | 'G' | 'GG', color: ProductColor) => void;
  onOpenSizeFinder: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenSizeFinder,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');
  const [onlySustainable, setOnlySustainable] = useState<boolean>(false);

  const categories = [
    { id: 'todos', label: 'Todos os Modelos' },
    { id: 'feminino', label: 'Feminino' },
    { id: 'masculino', label: 'Masculino' },
    { id: 'alfaiataria', label: 'Alfaiataria' },
    { id: 'linho', label: 'Linho Puro' },
    { id: 'novidades', label: 'Novidades' },
  ];

  const sizes = ['PP', 'P', 'M', 'G', 'GG'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory === 'novidades') {
          if (!p.isNew) return false;
        } else if (activeCategory !== 'todos' && activeCategory !== '') {
          if (p.category !== activeCategory && !p.subcategory.toLowerCase().includes(activeCategory)) {
            return false;
          }
        }

        // Size filter
        if (selectedSize !== 'all') {
          if (!p.sizes.includes(selectedSize as any)) return false;
        }

        // Sustainable filter
        if (onlySustainable && !p.isSustainable) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchSub = p.subcategory.toLowerCase().includes(query);
          const matchComp = p.composition.toLowerCase().includes(query);
          const matchDesc = p.description.toLowerCase().includes(query);
          if (!matchName && !matchSub && !matchComp && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // relevance
      });
  }, [products, activeCategory, selectedSize, onlySustainable, searchQuery, sortBy]);

  const resetFilters = () => {
    onSelectCategory('todos');
    setSelectedSize('all');
    setSortBy('relevance');
    setOnlySustainable(false);
    onSearchChange('');
  };

  const hasActiveFilters =
    activeCategory !== 'todos' ||
    selectedSize !== 'all' ||
    onlySustainable ||
    searchQuery.trim() !== '';

  return (
    <section id="catalogo" className="py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
              Vitrine Oficial
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal">
              Coleção Completa
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="catalog-open-size-helper-btn"
              onClick={onOpenSizeFinder}
              className="text-xs font-medium text-stone-700 hover:text-stone-950 underline decoration-dotted underline-offset-4 cursor-pointer"
            >
              Dúvidas sobre o tamanho ideal? Abra o Provador
            </button>
            <span className="text-xs text-stone-400">|</span>
            <span className="text-xs font-mono font-medium text-stone-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'peça' : 'peças'}
            </span>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {categories.map((cat) => {
            const isSelected =
              activeCategory === cat.id ||
              (cat.id === 'todos' && activeCategory === '');
            return (
              <button
                key={cat.id}
                id={`cat-filter-btn-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-200/70 text-stone-700 hover:bg-stone-200 hover:text-stone-950'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filters and Sorting Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-stone-100/80 border border-stone-200 mb-8">
          {/* Size Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-stone-500 font-medium">Tamanho:</span>
            <button
              id="size-filter-all-btn"
              onClick={() => setSelectedSize('all')}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                selectedSize === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              Todos
            </button>
            {sizes.map((s) => (
              <button
                key={s}
                id={`size-filter-${s.toLowerCase()}-btn`}
                onClick={() => setSelectedSize(s)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  selectedSize === s
                    ? 'bg-stone-900 text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Right Toolbar: Sustainable Toggle & Sorting */}
          <div className="flex items-center gap-3 flex-wrap ml-auto">
            {/* Sustainable Filter Toggle */}
            <button
              id="toggle-sustainable-filter-btn"
              onClick={() => setOnlySustainable(!onlySustainable)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                onlySustainable
                  ? 'bg-emerald-900 text-emerald-100 border-emerald-800'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apenas Sustentáveis</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-stone-800 font-medium focus:outline-none cursor-pointer"
              >
                <option value="relevance">Destaques</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="rating">Mais Bem Avaliados</option>
              </select>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                id="catalog-reset-filters-btn"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors cursor-pointer"
                title="Limpar todos os filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Search Notification */}
        {searchQuery.trim() && (
          <div className="mb-6 flex items-center justify-between bg-stone-200/60 px-4 py-2 rounded-lg text-xs text-stone-700">
            <span>
              Resultados para a busca por: <strong>"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => onSearchChange('')}
              className="text-stone-500 hover:text-stone-900 underline font-medium"
            >
              Limpar busca
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-stone-100/50 rounded-2xl border border-dashed border-stone-300">
            <p className="font-serif text-xl text-stone-800 mb-2">Nenhuma peça encontrada com esses filtros.</p>
            <p className="text-stone-500 text-sm mb-6 max-w-sm mx-auto">
              Tente redefinir a busca ou remover filtros de tamanho e categoria para ver toda a coleção.
            </p>
            <button
              id="empty-state-reset-btn"
              onClick={resetFilters}
              className="px-6 py-2.5 bg-stone-900 text-white text-xs font-medium uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-colors"
            >
              Restaurar Catálogo
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
