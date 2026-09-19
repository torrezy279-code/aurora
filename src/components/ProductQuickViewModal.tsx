import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Truck, Shirt, ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: 'PP' | 'P' | 'M' | 'G' | 'GG', color: ProductColor, quantity: number) => void;
  onOpenSizeFinder: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenSizeFinder,
}) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.primaryImage);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<'PP' | 'P' | 'M' | 'G' | 'GG'>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [cepInput, setCepInput] = useState('');
  const [freteResult, setFreteResult] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const images = [product.primaryImage, product.secondaryImage];

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const installmentValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price / 6);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleCalculateFrete = (e: React.FormEvent) => {
    e.preventDefault();
    if (cepInput.trim().length >= 8) {
      if (product.price >= 299) {
        setFreteResult('Frete Grátis com entrega estimada em 2 a 4 dias úteis!');
      } else {
        setFreteResult('Entrega Padrão R$ 18,90 (3 dias) ou Expressa R$ 26,00 (1 dia útil).');
      }
    }
  };

  return (
    <div
      id="quickview-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="quickview-modal-content"
        className="relative w-full max-w-4xl bg-stone-50 rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-quickview-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-xs transition-colors"
          aria-label="Fechar janela de detalhes"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-stone-100 border-b md:border-b-0 md:border-r border-stone-200">
          {/* Main Display Image */}
          <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-stone-200 shadow-inner mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded bg-stone-900 text-white">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedImage === img
                    ? 'border-stone-900 ring-2 ring-stone-900/20'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Product Details & Actions */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[80vh] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                {product.subcategory}
              </span>
              <button
                id={`modal-wishlist-toggle-${product.id}`}
                onClick={() => onToggleWishlist(product)}
                className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-rose-600 transition-colors"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                <span>{isWishlisted ? 'Salvo' : 'Favoritar'}</span>
              </button>
            </div>

            <h2 className="font-serif text-2xl lg:text-3xl text-stone-950 font-normal mb-2">
              {product.name}
            </h2>

            {/* Price & Installments */}
            <div className="mb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-stone-900 font-mono">
                  {formattedPrice}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through font-mono">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                ou em até <strong>6x de {installmentValue}</strong> sem juros no cartão
              </p>
            </div>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-5 border-y border-stone-200 py-3">
              {product.description}
            </p>

            {/* Colors Selection */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                  Cor: <span className="font-normal text-stone-600">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-stone-950 ring-offset-2 border-transparent scale-110'
                        : 'border-stone-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                  Tamanho: <span className="font-mono font-normal text-stone-600">{selectedSize}</span>
                </span>
                <button
                  id="modal-open-size-finder-btn"
                  onClick={() => {
                    onClose();
                    onOpenSizeFinder();
                  }}
                  className="inline-flex items-center gap-1 text-xs text-stone-700 hover:text-stone-950 underline decoration-dotted font-medium cursor-pointer"
                >
                  <Shirt className="w-3.5 h-3.5 text-stone-600" />
                  Provador Virtual
                </button>
              </div>

              <div className="flex items-center gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    id={`quickview-size-${s.toLowerCase()}`}
                    onClick={() => setSelectedSize(s)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-stone-200/80 text-stone-800 hover:bg-stone-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Bag Button */}
            <div className="flex items-center gap-3 mb-6">
              {/* Quantity Selector */}
              <div className="flex items-center border border-stone-300 rounded-xl bg-stone-100 p-1">
                <button
                  id="quickview-qty-decrease-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-950 font-bold cursor-pointer"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-semibold font-mono text-stone-900">
                  {quantity}
                </span>
                <button
                  id="quickview-qty-increase-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-950 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                id="modal-add-to-cart-submit-btn"
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Adicionado com sucesso!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar à Sacola</span>
                  </>
                )}
              </button>
            </div>

            {/* CEP / Frete Estimator */}
            <div className="pt-4 border-t border-stone-200/80 mb-4">
              <form onSubmit={handleCalculateFrete} className="flex gap-2">
                <input
                  id="quickview-cep-input"
                  type="text"
                  value={cepInput}
                  onChange={(e) => setCepInput(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  placeholder="Calcular frete (CEP)"
                  className="flex-1 bg-stone-100 border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-800"
                />
                <button
                  id="quickview-calc-cep-btn"
                  type="submit"
                  className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-medium cursor-pointer"
                >
                  Calcular
                </button>
              </form>
              {freteResult && (
                <p className="text-[11px] text-emerald-800 mt-2 font-medium bg-emerald-50 p-2 rounded border border-emerald-200">
                  {freteResult}
                </p>
              )}
            </div>

            {/* Composition & Sustainability Notes */}
            <div className="bg-stone-100/60 p-3 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
              <p>
                <strong>Composição:</strong> {product.composition}
              </p>
              <p>
                <strong>Garantia:</strong> 30 dias para trocas ou devoluções gratuitas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
