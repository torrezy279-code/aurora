/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandValues } from './components/BrandValues';
import { FeaturedCollections } from './components/FeaturedCollections';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { SizeFinderModal } from './components/SizeFinderModal';
import { LookbookSection } from './components/LookbookSection';
import { ReviewsSection } from './components/ReviewsSection';
import { CommunitySection } from './components/CommunitySection';
import { FaqSection } from './components/FaqSection';
import { NewsletterSection } from './components/NewsletterSection';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ProductColor } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Local storage backed states
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aurora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aurora_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
    } catch {
      return ['prod-1', 'prod-3'];
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string>('PRIMEIRACOMPRA');

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isSizeFinderOpen, setIsSizeFinderOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('aurora_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('aurora_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart actions
  const handleAddToCart = (
    product: Product,
    size: 'PP' | 'P' | 'M' | 'G' | 'GG',
    color: ProductColor,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${size}-${color.name}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, selectedSize: size, selectedColor: color, quantity }];
    });
    showToast(`Adicionado: ${product.name} (Tam: ${size})`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removido dos favoritos: ${product.name}`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Adicionado aos favoritos: ${product.name}`);
        return [...prev, product.id];
      }
    });
  };

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleExploreClick = () => {
    const catalogElem = document.getElementById('catalogo');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLookbookClick = () => {
    const lookbookElem = document.getElementById('lookbook');
    if (lookbookElem) {
      lookbookElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    const catalogElem = document.getElementById('catalogo');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* Top Ticker Announcement */}
      <AnnouncementBar onApplyCoupon={(code) => setAppliedCoupon(code)} />

      {/* Main Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSizeFinder={() => setIsSizeFinderOpen(true)}
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Editorial Hero */}
        <Hero onExploreClick={handleExploreClick} onLookbookClick={handleLookbookClick} />

        {/* Brand Core Values */}
        <BrandValues />

        {/* Bento Featured Collections */}
        <FeaturedCollections onSelectCollection={handleSelectCategory} />

        {/* Interactive Product Catalog with Filters */}
        <ProductCatalog
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={(prod, size, color) => handleAddToCart(prod, size, color, 1)}
          onOpenSizeFinder={() => setIsSizeFinderOpen(true)}
        />

        {/* Editorial Lookbook Showcase */}
        <LookbookSection onQuickViewProduct={(prod) => setQuickViewProduct(prod)} />

        {/* Real Customer Reviews */}
        <ReviewsSection />

        {/* Community Instagram Grid */}
        <CommunitySection />

        {/* FAQ Accordion */}
        <FaqSection />

        {/* VIP Newsletter Section */}
        <NewsletterSection onApplyCoupon={(code) => setAppliedCoupon(code)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(prod, size, color, qty) => handleAddToCart(prod, size, color, qty)}
        onOpenSizeFinder={() => setIsSizeFinderOpen(true)}
      />

      <SizeFinderModal
        isOpen={isSizeFinderOpen}
        onClose={() => setIsSizeFinderOpen(false)}
        onSelectSize={(size) => {
          setIsSizeFinderOpen(false);
          showToast(`Tamanho ${size} selecionado.`);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        couponCode={appliedCoupon}
        onApplyCoupon={(code) => {
          setAppliedCoupon(code);
          showToast(`Cupom ${code} ativado!`);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlistedProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(prod, size, color) => {
          handleAddToCart(prod, size, color, 1);
          setIsWishlistOpen(false);
          setIsCartOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        couponCode={appliedCoupon}
        onClearCart={() => setCartItems([])}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div
          id="app-toast-notification"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-stone-950 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-medium border border-stone-800 animate-in slide-in-from-bottom-3"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
