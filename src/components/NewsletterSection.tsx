import React, { useState } from 'react';
import { Mail, Check, Copy, Sparkles } from 'lucide-react';

interface NewsletterSectionProps {
  onApplyCoupon?: (code: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onApplyCoupon }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      if (onApplyCoupon) {
        onApplyCoupon('PRIMEIRACOMPRA');
      }
    }
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('PRIMEIRACOMPRA');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="newsletter" className="py-16 bg-stone-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-stone-700">
          <Sparkles className="w-3.5 h-3.5" />
          Clube Privado Aurora
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal mb-4">
          Receba 15% OFF na sua primeira compra
        </h2>

        <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
          Cadastre seu e-mail para ter acesso antecipado a novas edições limitadas, convites para eventos exclusivos e descontos de abertura de temporada.
        </p>

        {subscribed ? (
          <div className="bg-stone-800/90 border border-amber-400/40 p-6 rounded-2xl max-w-md mx-auto animate-in zoom-in-95">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-medium text-white mb-1">
              Bem-vindo(a) ao Clube Aurora!
            </h3>
            <p className="text-xs text-stone-300 mb-4">
              Seu cupom de 15% OFF foi gerado e já está pré-ativado na sua sacola de compras.
            </p>
            <div className="flex items-center justify-between bg-stone-900 px-4 py-2.5 rounded-xl border border-stone-700">
              <span className="font-mono font-bold text-amber-300 tracking-wider text-sm">
                PRIMEIRACOMPRA
              </span>
              <button
                id="newsletter-copy-code-btn"
                onClick={handleCopyCoupon}
                className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="newsletter-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail..."
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-1 focus:ring-amber-300"
              />
            </div>
            <button
              id="newsletter-submit-btn"
              type="submit"
              className="py-3.5 px-6 rounded-xl bg-stone-100 hover:bg-white text-stone-950 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
            >
              Garantir 15% OFF
            </button>
          </form>
        )}

        <p className="text-[11px] text-stone-500 mt-4">
          Respeitamos sua privacidade. Cancele o recebimento quando quiser com um clique.
        </p>
      </div>
    </section>
  );
};
