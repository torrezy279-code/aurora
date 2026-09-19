import React from 'react';
import { ShieldCheck, Instagram, Facebook, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-white uppercase block">
              AURORA
            </span>
            <span className="text-[10px] tracking-[0.3em] text-stone-400 uppercase font-medium -mt-2 block">
              Atelier Contemporâneo
            </span>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light max-w-sm">
              Design autoral brasileiro inspirado na harmonia entre a natureza e a vida urbana. Confeccionamos peças perenes que celebram a textura nobre das fibras naturais.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="#instagram"
                className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-800"
                aria-label="Instagram Aurora"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-800"
                aria-label="Facebook Aurora"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:contato@auroratelier.com.br"
                className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-800"
                aria-label="E-mail contato"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links: Coleções */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-200 mb-4">
              Coleções
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li><a href="#catalogo" className="hover:text-white transition-colors">Novidades da Estação</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors">Alfaiataria Masculina & Feminina</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors">Linho Puro Europeu</a></li>
              <li><a href="#catalogo" className="hover:text-white transition-colors">Algodão Orgânico BCI</a></li>
              <li><a href="#lookbook" className="hover:text-white transition-colors">Lookbook Editorial</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-200 mb-4">
              Ajuda & Suporte
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li><a href="#faq" className="hover:text-white transition-colors">Primeira Troca Grátis</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Guia de Tamanhos & Medidas</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Prazos e Rastreamento</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Cuidados com os Tecidos</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Fale com uma Consultora</a></li>
            </ul>
          </div>

          {/* Contact / Showroom */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-200 mb-4">
              Atendimento & Ateliê
            </h4>
            <div className="space-y-3 text-xs text-stone-400 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Rua Oscar Freire, 1240 - Jardins, São Paulo - SP</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>WhatsApp: (11) 98765-4321</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>contato@auroraatelier.com.br</span>
              </p>
              <p className="text-[11px] text-stone-500 pt-1">
                Segunda a Sexta: 09h às 19h • Sábados: 10h às 16h
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Security & Payments Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          <div className="flex items-center flex-wrap gap-4">
            <span className="font-semibold text-stone-400">Formas de Pagamento:</span>
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-emerald-400 font-bold">PIX (5% OFF)</span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-stone-300">Cartão até 6x</span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-stone-300">Boleto</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Ambiente Seguro SSL</span>
            </div>
            <span>•</span>
            <span>CNPJ: 42.109.831/0001-92</span>
          </div>
        </div>

        <div className="mt-8 text-center text-[11px] text-stone-600">
          <p>© {new Date().getFullYear()} Aurora Atelier de Moda. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
