import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Shirt, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSizeFinder: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSizeFinder,
  onSelectCategory,
  activeCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Novidades', category: 'novidades', href: '#catalogo' },
    { label: 'Feminino', category: 'feminino', href: '#catalogo' },
    { label: 'Masculino', category: 'masculino', href: '#catalogo' },
    { label: 'Alfaiataria', category: 'alfaiataria', href: '#catalogo' },
    { label: 'Linho Puro', category: 'linho', href: '#catalogo' },
    { label: 'Lookbook', category: '', href: '#lookbook' },
    { label: 'Valores', category: '', href: '#valores' },
  ];

  const handleNavClick = (category: string, href: string) => {
    if (category) {
      onSelectCategory(category);
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navigation-header"
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-50/95 backdrop-blur-md shadow-xs border-b border-stone-200/80 py-3.5'
          : 'bg-stone-50/80 backdrop-blur-xs border-b border-stone-200/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <a
              href="#"
              id="brand-logo-link"
              className="flex flex-col text-left group cursor-pointer"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-stone-900 group-hover:text-stone-700 transition-colors uppercase">
                AURORA
              </span>
              <span className="text-[10px] tracking-[0.35em] text-stone-500 uppercase -mt-1 font-medium">
                Atelier Autoral
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Navegação principal" className="hidden lg:flex items-center space-x-7">
            {navLinks.map((item) => {
              const isActive = activeCategory === item.category && item.category !== '';
              return (
                <button
                  key={item.label}
                  id={`nav-link-${item.label.toLowerCase()}`}
                  onClick={() => handleNavClick(item.category, item.href)}
                  className={`text-sm font-medium tracking-wider uppercase transition-colors relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-stone-950 font-semibold'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-900 animate-in fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Toggle */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-stone-100 rounded-full px-3 py-1.5 border border-stone-300 w-44 sm:w-60 transition-all">
                  <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                  <input
                    id="search-navbar-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscar linho, vestido..."
                    autoFocus
                    className="w-full bg-transparent text-xs text-stone-800 placeholder-stone-400 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      onSearchChange('');
                      setShowSearchInput(false);
                    }}
                    aria-label="Limpar busca"
                    className="text-stone-400 hover:text-stone-600 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  id="open-search-input-btn"
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors"
                  title="Pesquisar catálogo"
                  aria-label="Pesquisar catálogo"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Virtual Size Finder Button */}
            <button
              id="open-size-finder-navbar-btn"
              onClick={onOpenSizeFinder}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-200/70 hover:bg-stone-200 rounded-full transition-all border border-stone-300/60"
              title="Descubra seu tamanho ideal"
            >
              <Shirt className="w-3.5 h-3.5 text-stone-600" />
              <span>Provador Virtual</span>
            </button>

            {/* Wishlist Button */}
            <button
              id="open-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors relative"
              title="Meus Favoritos"
              aria-label="Meus Favoritos"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span
                  id="wishlist-badge-counter"
                  className="absolute -top-0.5 -right-0.5 bg-stone-800 text-white text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center border-2 border-stone-50"
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              id="open-cart-drawer-btn"
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-3.5 py-2 rounded-full text-xs font-medium transition-all shadow-xs"
              title="Abrir Sacola de Compras"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span
                    id="cart-badge-counter"
                    className="absolute -top-1.5 -right-2 bg-amber-400 text-stone-950 font-bold text-[9px] rounded-full h-3.5 min-w-3.5 px-1 flex items-center justify-center"
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-sans">Sacola</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-t border-stone-200 bg-stone-50 px-5 pt-4 pb-6 mt-3 space-y-3 animate-in slide-in-from-top-2"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.category, item.href)}
                className="text-left py-2 text-stone-800 hover:text-stone-950 text-sm font-medium tracking-wide flex items-center justify-between border-b border-stone-200/50"
              >
                <span>{item.label}</span>
                {activeCategory === item.category && item.category !== '' && (
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Ativo
                  </span>
                )}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSizeFinder();
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 bg-stone-200 text-stone-900 rounded-lg text-xs font-semibold"
            >
              <Shirt className="w-4 h-4" />
              Abrir Provador Virtual
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
