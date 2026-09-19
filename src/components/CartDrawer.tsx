import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Check, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  couponCode: string;
  onApplyCoupon: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  couponCode,
  onApplyCoupon,
}) => {
  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 299;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const discountPercent = couponCode.toUpperCase() === 'PRIMEIRACOMPRA' ? 0.15 : 0;
  const discountAmount = subtotal * discountPercent;

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : 18.90;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    if (inputCoupon.trim().toUpperCase() === 'PRIMEIRACOMPRA') {
      onApplyCoupon('PRIMEIRACOMPRA');
      setCouponError('');
      setInputCoupon('');
    } else {
      setCouponError('Cupom inválido ou expirado.');
    }
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-stone-50 h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-100/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h2 className="font-serif text-lg font-medium text-stone-900">
              Sua Sacola ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Fechar sacola"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-stone-200/50 border-b border-stone-200 text-xs">
          {isFreeShipping ? (
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Parabéns! Você desbloqueou FRETE GRÁTIS!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-stone-700">
                <span>
                  Faltam{' '}
                  <strong className="text-stone-950 font-mono">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      amountUntilFreeShipping
                    )}
                  </strong>{' '}
                  para Frete Grátis
                </span>
                <span className="font-mono text-stone-500">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full bg-stone-300 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-stone-900 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-stone-200/80 text-stone-400 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-serif text-lg text-stone-800 mb-1">Sua sacola está vazia</p>
              <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">
                Explore nossas peças autorais em puro linho e alfaiataria contemporânea.
              </p>
              <button
                id="empty-cart-continue-btn"
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-stone-800 transition-colors"
              >
                Explorar Coleção
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                className="flex gap-3.5 p-3 rounded-xl bg-white border border-stone-200 shadow-2xs"
              >
                <img
                  src={item.product.primaryImage}
                  alt={item.product.name}
                  className="w-18 h-24 object-cover rounded-lg bg-stone-100 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-sm font-medium text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                        title="Remover peça"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                      <span>Tam: <strong className="font-mono text-stone-800">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-stone-300 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:text-stone-950"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-medium text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:text-stone-950"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-semibold font-mono text-stone-900">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                        item.product.price * item.quantity
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Calculations */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-white space-y-3">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="cart-coupon-input"
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                  placeholder="Cupom de desconto"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-stone-800"
                />
              </div>
              <button
                id="apply-coupon-btn"
                type="submit"
                className="px-3.5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Aplicar
              </button>
            </form>

            {couponCode && (
              <div className="flex items-center justify-between text-xs bg-amber-50 text-amber-900 p-2 rounded-lg border border-amber-200">
                <span className="flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Cupom <strong>{couponCode}</strong> (15% OFF)
                </span>
                <button
                  onClick={() => onApplyCoupon('')}
                  className="text-stone-400 hover:text-stone-800"
                  title="Remover cupom"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-stone-900">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Desconto (15%)</span>
                  <span className="font-mono">
                    - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Frete</span>
                <span className="font-mono text-stone-900">
                  {isFreeShipping ? (
                    <span className="text-emerald-700 font-semibold uppercase">Grátis</span>
                  ) : (
                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(shippingCost)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                <span>Total</span>
                <span className="font-mono">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="cart-checkout-proceed-btn"
              onClick={onCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Finalizar Compra</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-stone-400">
              Pagamento 100% seguro via Pix, Cartão ou Boleto.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
