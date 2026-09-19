import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-16 lg:py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
              Opiniões Reais
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal">
              Quem usa, recomenda
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-stone-100 p-3 rounded-xl border border-stone-200">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <span className="text-sm font-bold text-stone-900 font-mono">4.9 / 5.0</span>
            <span className="text-xs text-stone-500">(+340 clientes verificados)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              id={`testimonial-card-${t.id}`}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{t.date}</span>
                </div>

                <p className="text-stone-700 text-sm leading-relaxed mb-6 font-light italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-900 truncate">{t.name}</span>
                    <span title="Compra Verificada" className="inline-flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 block truncate">
                    Comprou: {t.purchasedItem}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
