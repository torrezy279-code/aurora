import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Copy, Check } from 'lucide-react';

interface AnnouncementBarProps {
  onApplyCoupon?: (code: string) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onApplyCoupon }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!isVisible) return null;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('PRIMEIRACOMPRA');
    setCopied(true);
    if (onApplyCoupon) onApplyCoupon('PRIMEIRACOMPRA');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <aside aria-label="Aviso promocional" id="top-announcement-bar" className="bg-stone-900 text-stone-200 text-xs py-2.5 px-4 sticky top-0 z-40 border-b border-stone-800 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center flex-wrap gap-2 text-center">
          <span className="inline-flex items-center gap-1.5 font-medium text-amber-200/90">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 299
          </span>
          <span className="hidden md:inline text-stone-500">•</span>
          <span className="text-stone-300">
            Use o cupom{' '}
            <button
              id="announcement-copy-coupon-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 font-mono font-bold text-amber-300 hover:text-amber-200 underline decoration-dotted underline-offset-2 ml-1 cursor-pointer transition-colors"
              title="Copiar cupom de desconto"
            >
              PRIMEIRACOMPRA
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-stone-400" />}
            </button>{' '}
            para 15% OFF
          </span>
          <span className="hidden lg:inline text-stone-500">•</span>
          <span className="hidden lg:inline text-stone-400">Até 6x sem juros no cartão</span>
        </div>

        <button
          id="close-announcement-bar-btn"
          onClick={() => setIsVisible(false)}
          aria-label="Fechar aviso"
          className="text-stone-400 hover:text-stone-100 p-0.5 rounded transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
