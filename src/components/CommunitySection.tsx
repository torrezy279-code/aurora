import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const posts = [
    {
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      handle: '@clara.modelling',
      piece: 'Blazer Estruturado em Linho Cru'
    },
    {
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      handle: '@lucas_ferreira',
      piece: 'Camisa Linho Europeu'
    },
    {
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
      handle: '@isabela.v',
      piece: 'Vestido Midi Botânico'
    },
    {
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80',
      handle: '@camila.couto',
      piece: 'Saia Midi Evasê'
    }
  ];

  return (
    <section id="comunidade" className="py-16 bg-stone-100/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
              Comunidade & Estilo Real
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal">
              #AuroraNoMundo
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-stone-700 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Siga @auroratelier</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group relative rounded-xl overflow-hidden aspect-4/5 bg-stone-200 shadow-2xs border border-stone-200"
            >
              <img
                src={post.image}
                alt={post.handle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <span className="text-xs font-semibold">{post.handle}</span>
                <span className="text-[11px] text-stone-300 font-light truncate">{post.piece}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
