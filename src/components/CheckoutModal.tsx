import React, { useState } from 'react';
import { X, CheckCircle2, QrCode, CreditCard, FileText, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  couponCode: string;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  couponCode,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | 'boleto'>('pix');
  const [pixCopied, setPixCopied] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: 'Helena Ribeiro',
    email: 'helena.ribeiro@email.com',
    phone: '(11) 98765-4321',
    cep: '01415-000',
    street: 'Rua Oscar Freire',
    number: '1240',
    complement: 'Apto 82',
    city: 'São Paulo',
    state: 'SP',
    cardNumber: '•••• •••• •••• 4590',
    cardName: 'HELENA RIBEIRO',
    cardExpiry: '10/29',
    cardCvv: '382',
    installments: '6',
  });

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountPercent = couponCode.toUpperCase() === 'PRIMEIRACOMPRA' ? 0.15 : 0;
  const discountAmount = subtotal * discountPercent;
  const shippingCost = subtotal >= 299 ? 0 : 18.90;
  
  // Pix extra 5% discount
  const pixDiscount = paymentMethod === 'pix' ? (subtotal - discountAmount) * 0.05 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount - pixDiscount + shippingCost);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    onClearCart();
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136aurora-atelier-pagamento-pix-984215204000053039865802BR5925AURORA ATELIER MODA LTDA6009SAO PAULO62070503***6304E8F2');
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  return (
    <div
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="checkout-modal-content"
        className="relative w-full max-w-3xl bg-stone-50 rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-checkout-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
          aria-label="Fechar checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                Checkout Seguro SSL 256-bit
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-950 font-normal mb-6">
              Finalização do Pedido
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Personal Data */}
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                  1. Dados do Comprador
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">E-mail</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Telefone / Celular</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                  2. Endereço de Entrega
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">CEP</label>
                    <input
                      type="text"
                      required
                      value={formData.cep}
                      onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[11px] text-stone-500 block mb-1">Endereço (Rua/Avenida)</label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Número</label>
                    <input
                      type="text"
                      required
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                  3. Forma de Pagamento
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'pix'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                        : 'border-stone-200 hover:border-stone-400 text-stone-700'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1 text-emerald-700" />
                    <span className="block text-xs">Pix (5% OFF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'credit'
                        ? 'border-stone-900 bg-stone-900 text-white font-bold'
                        : 'border-stone-200 hover:border-stone-400 text-stone-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1" />
                    <span className="block text-xs">Cartão (Até 6x)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('boleto')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'boleto'
                        ? 'border-stone-900 bg-stone-900 text-white font-bold'
                        : 'border-stone-200 hover:border-stone-400 text-stone-700'
                    }`}
                  >
                    <FileText className="w-5 h-5 mx-auto mb-1" />
                    <span className="block text-xs">Boleto</span>
                  </button>
                </div>

                {paymentMethod === 'pix' && (
                  <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 text-xs text-stone-700">
                    <p className="font-semibold text-emerald-900 mb-1">
                      Aprovação instantânea + 5% de desconto extra aplicado!
                    </p>
                    <p className="text-[11px] text-stone-600 mb-3">
                      Ao clicar em "Confirmar Pedido", o QR Code dinâmico será gerado para pagamento no aplicativo do seu banco.
                    </p>
                  </div>
                )}

                {paymentMethod === 'credit' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="col-span-2">
                      <label className="text-[11px] text-stone-500 block mb-1">Número do Cartão</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full p-2 rounded-lg border border-stone-300 bg-stone-50"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-500 block mb-1">Validade</label>
                      <input
                        type="text"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full p-2 rounded-lg border border-stone-300 bg-stone-50"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-500 block mb-1">CVV</label>
                      <input
                        type="text"
                        value={formData.cardCvv}
                        onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                        className="w-full p-2 rounded-lg border border-stone-300 bg-stone-50"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'boleto' && (
                  <div className="bg-stone-100 p-3 rounded-lg text-xs text-stone-600">
                    O boleto tem vencimento em 3 dias úteis e pode ser pago em qualquer banco ou lotérica.
                  </div>
                )}
              </div>

              {/* Order Final Summary */}
              <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs space-y-1">
                  <div className="text-stone-600">
                    Total a pagar: <strong className="text-stone-900 font-mono text-base ml-1">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(finalTotal)}
                    </strong>
                  </div>
                  {paymentMethod === 'pix' && (
                    <span className="text-emerald-700 font-medium">Economia de 5% com Pix</span>
                  )}
                </div>

                <button
                  id="checkout-confirm-order-btn"
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Confirmar Pedido</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Order Confirmed View */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold block mb-1">
              Pedido Confirmado com Sucesso!
            </span>
            <h2 className="font-serif text-3xl text-stone-900 font-normal mb-2">
              Obrigado pela sua compra, {formData.name.split(' ')[0]}!
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Código do pedido: <strong className="font-mono text-stone-900">#AUR-83921</strong>
            </p>

            {paymentMethod === 'pix' ? (
              <div className="max-w-sm mx-auto bg-stone-100 p-5 rounded-2xl border border-stone-200 mb-6">
                <div className="w-40 h-40 bg-white mx-auto p-2 rounded-xl border border-stone-300 flex items-center justify-center mb-3">
                  {/* Visual QR Code simulation */}
                  <div className="w-full h-full bg-stone-900 rounded flex flex-col items-center justify-center text-white p-2">
                    <QrCode className="w-24 h-24 text-white" />
                    <span className="text-[9px] font-mono mt-1">PIX COPIA E COLA</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mb-3">
                  Escaneie o QR Code acima ou copie o código Pix abaixo para efetuar o pagamento.
                </p>

                <button
                  id="checkout-copy-pix-code-btn"
                  onClick={handleCopyPix}
                  className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  {pixCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{pixCopied ? 'Código Pix Copiado!' : 'Copiar Chave Pix'}</span>
                </button>
              </div>
            ) : (
              <div className="max-w-sm mx-auto bg-stone-100 p-4 rounded-xl border border-stone-200 mb-6 text-xs text-stone-600">
                Enviamos os detalhes da nota fiscal e o link de rastreamento para <strong>{formData.email}</strong>.
              </div>
            )}

            <button
              id="checkout-finish-back-home-btn"
              onClick={onClose}
              className="px-8 py-3 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Continuar Navegando
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
