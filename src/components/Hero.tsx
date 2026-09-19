import React from 'react';
import { ArrowDownRight, ShieldCheck, Sparkles, RefreshCw, Feather } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onLookbookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onLookbookClick }) => {
  return (
    <section id="hero-section" className="relative overflow-hidden pt-4 pb-16 lg:pt-8 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/80 border border-stone-300 text-stone-800 text-xs tracking-wider uppercase font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-stone-700" />
              Coleção Primavera / Verão 2026
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-950 font-normal leading-[1.12] tracking-tight mb-6">
              O equilíbrio sutil entre <span className="italic font-normal text-stone-800">alfaiataria leve</span> e o conforto do linho.
            </h1>

            <p className="text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-light">
              Peças autorais desenhadas para durar estações. Fibras 100% nobres, caimentos ergonômicos e uma estética minimalista que traduz a sofisticação brasileira contemporânea.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 bg-stone-950 hover:bg-stone-800 text-white px-8 py-4 rounded-xl text-sm font-medium tracking-wider uppercase transition-all shadow-sm group cursor-pointer"
              >
                <span>Explorar Coleção</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>

              <button
                id="hero-lookbook-btn"
                onClick={onLookbookClick}
                className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 px-7 py-4 rounded-xl text-sm font-medium tracking-wider uppercase transition-all cursor-pointer"
              >
                <span>Ver Lookbook</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200/80 w-full max-w-lg">
              <div>
                <span className="block font-serif text-2xl lg:text-3xl font-bold text-stone-900">4.9 ★</span>
                <span className="text-xs text-stone-500 font-medium">Avaliação de clientes</span>
              </div>
              <div>
                <span className="block font-serif text-2xl lg:text-3xl font-bold text-stone-900">+15k</span>
                <span className="text-xs text-stone-500 font-medium">Peças entregues</span>
              </div>
              <div>
                <span className="block font-serif text-2xl lg:text-3xl font-bold text-stone-900">100%</span>
                <span className="text-xs text-stone-500 font-medium">Produção nacional</span>
              </div>
            </div>
          </div>

          {/* Right Editorial Image Grid */}
          <div className="lg:col-span-6 xl:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Featured Editorial Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-3/4 shadow-xl border border-stone-200 bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
                  alt="Modelo vestindo coleção autoral Aurora em linho"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />

                {/* Floating pill card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-stone-900/85 backdrop-blur-md text-white border border-white/10 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] tracking-widest text-amber-300 uppercase font-semibold block">
                        Destaque da Estação
                      </span>
                      <p className="font-serif text-base font-medium">Linho Europeu Certificado</p>
                    </div>
                    <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full text-white font-mono">
                      Edição 08
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Secondary Floating Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-stone-50 border border-stone-200 p-3.5 rounded-xl shadow-md hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Feather className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Fibras 100% Naturais</p>
                  <p className="text-[11px] text-stone-500">Zero poliéster virgem</p>
                </div>
              </div>

              {/* Bottom Left Floating Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-stone-50 border border-stone-200 p-3.5 rounded-xl shadow-md hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Troca Descomplicada</p>
                  <p className="text-[11px] text-stone-500">30 dias sem custos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
