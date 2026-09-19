import React from 'react';
import { Leaf, Scissors, HeartHandshake, Truck } from 'lucide-react';

export const BrandValues: React.FC = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Fibras Naturais & Orgânicas',
      description: 'Linhos europeus rastreados e algodão com certificação BCI e GOTS, livres de agrotóxicos nocivos.'
    },
    {
      icon: Scissors,
      title: 'Modelagem Autoral & Caimento',
      description: 'Cortes estruturados com estudos antropométricos reais. Peças que valorizam o corpo com fluidez.'
    },
    {
      icon: HeartHandshake,
      title: 'Produção Justa no Brasil',
      description: 'Costurado artesanalmente por ateliês familiares em São Paulo e Minas Gerais com remuneração digna.'
    },
    {
      icon: Truck,
      title: 'Envio Rápido & Sustentável',
      description: 'Embalagens 100% livres de plástico convencional e compensação da pegada de carbono do frete.'
    }
  ];

  return (
    <section id="valores" className="py-14 bg-stone-100/70 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
            Nossos Pilares
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
            Moda consciente feita para durar décadas, não temporadas.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                id={`brand-value-item-${idx}`}
                className="flex flex-col items-start p-6 rounded-xl bg-stone-50 border border-stone-200/90 shadow-2xs hover:border-stone-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-200/80 text-stone-900 flex items-center justify-center mb-4 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
