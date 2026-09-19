import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedCollectionsProps {
  onSelectCollection: (category: string) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ onSelectCollection }) => {
  const collections = [
    {
      id: 'alfaiataria',
      title: 'Alfaiataria Contemporânea',
      subtitle: 'Blazers desconstruídos e calças wide leg com caimento impecável.',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      badge: 'Tendência',
      colSpan: 'md:col-span-8',
      aspect: 'aspect-4/3 md:aspect-16/9'
    },
    {
      id: 'linho',
      title: 'Puro Linho Orgânico',
      subtitle: 'A nobreza e a respirabilidade da fibra vegetal mais antiga do mundo.',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      badge: 'Fresco & Chic',
      colSpan: 'md:col-span-4',
      aspect: 'aspect-4/3 md:aspect-auto'
    },
    {
      id: 'feminino',
      title: 'Vestidos & Fluidez',
      subtitle: 'Silhuetas marcantes criadas para celebrar o movimento feminino.',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      badge: 'Best-Sellers',
      colSpan: 'md:col-span-6',
      aspect: 'aspect-4/3'
    },
    {
      id: 'masculino',
      title: 'Casual Masculino Premium',
      subtitle: 'Camisas amaciadas, camisetas Pima e bermudas de alfaiataria.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      badge: 'Clássicos',
      colSpan: 'md:col-span-6',
      aspect: 'aspect-4/3'
    }
  ];

  return (
    <section id="colecoes" className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
              Universo Aurora
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal">
              Coleções Curadas
            </h2>
          </div>
          <p className="text-stone-600 text-sm max-w-md">
            Cada linha foi pensada para compor um guarda-roupa cápsula versátil, onde todas as peças conversam entre si.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {collections.map((item) => (
            <div
              key={item.id}
              id={`collection-card-${item.id}`}
              onClick={() => onSelectCollection(item.id)}
              className={`${item.colSpan} group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-stone-200 bg-stone-900`}
            >
              <div className={`${item.aspect} w-full relative overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-95"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-stone-50/90 text-stone-900 backdrop-blur-xs">
                    {item.badge}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl lg:text-3xl text-white font-medium mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm max-w-lg font-light leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-stone-900 transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
