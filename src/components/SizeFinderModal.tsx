import React, { useState, useMemo } from 'react';
import { X, Shirt, CheckCircle2, Ruler, Sparkles } from 'lucide-react';

interface SizeFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
}

export const SizeFinderModal: React.FC<SizeFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
}) => {
  if (!isOpen) return null;

  const [height, setHeight] = useState<number>(172);
  const [weight, setWeight] = useState<number>(68);
  const [fitPreference, setFitPreference] = useState<'fitted' | 'regular' | 'loose'>('regular');
  const [silhouette, setSilhouette] = useState<'fem' | 'masc'>('fem');

  // Realistic sizing logic based on BMI and fit preference
  const recommendation = useMemo(() => {
    const bmi = weight / Math.pow(height / 100, 2);
    let baseSize: 'PP' | 'P' | 'M' | 'G' | 'GG' = 'M';

    if (silhouette === 'fem') {
      if (bmi < 19.5) baseSize = 'PP';
      else if (bmi < 22.5) baseSize = 'P';
      else if (bmi < 26.0) baseSize = 'M';
      else if (bmi < 29.5) baseSize = 'G';
      else baseSize = 'GG';
    } else {
      if (bmi < 21.0) baseSize = 'P';
      else if (bmi < 24.5) baseSize = 'M';
      else if (bmi < 28.0) baseSize = 'G';
      else baseSize = 'GG';
    }

    // Adjust for fit preference
    const sizesList: ('PP' | 'P' | 'M' | 'G' | 'GG')[] = ['PP', 'P', 'M', 'G', 'GG'];
    const currentIndex = sizesList.indexOf(baseSize);

    if (fitPreference === 'fitted' && currentIndex > 0) {
      baseSize = sizesList[currentIndex - 1];
    } else if (fitPreference === 'loose' && currentIndex < sizesList.length - 1) {
      baseSize = sizesList[currentIndex + 1];
    }

    return {
      size: baseSize,
      confidence: 94,
      bmi: bmi.toFixed(1),
    };
  }, [height, weight, fitPreference, silhouette]);

  const measurementsTable = [
    { size: 'PP', chest: '80-86 cm', waist: '62-68 cm', hip: '88-94 cm' },
    { size: 'P', chest: '86-92 cm', waist: '68-74 cm', hip: '94-100 cm' },
    { size: 'M', chest: '92-98 cm', waist: '74-80 cm', hip: '100-106 cm' },
    { size: 'G', chest: '98-106 cm', waist: '80-88 cm', hip: '106-114 cm' },
    { size: 'GG', chest: '106-114 cm', waist: '88-96 cm', hip: '114-122 cm' },
  ];

  return (
    <div
      id="size-finder-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="size-finder-modal-content"
        className="relative w-full max-w-2xl bg-stone-50 rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-size-finder-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
          aria-label="Fechar Provador"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-stone-900 font-medium">
              Provador Virtual Inteligente
            </h2>
            <p className="text-xs text-stone-500">
              Insira suas medidas para recomendação precisa de modelagem autoral.
            </p>
          </div>
        </div>

        {/* Silhouette Selector */}
        <div className="flex gap-2 p-1 bg-stone-200/70 rounded-xl mb-6">
          <button
            id="size-calc-gender-fem"
            onClick={() => setSilhouette('fem')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              silhouette === 'fem'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            Silhueta Feminina
          </button>
          <button
            id="size-calc-gender-masc"
            onClick={() => setSilhouette('masc')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              silhouette === 'masc'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            Silhueta Masculina / Reta
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Height Slider */}
          <div className="bg-stone-100 p-4 rounded-xl border border-stone-200">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="height-range-slider" className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
                Sua Altura
              </label>
              <span className="text-base font-mono font-bold text-stone-900">{height} cm</span>
            </div>
            <input
              id="height-range-slider"
              type="range"
              min="145"
              max="205"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>145 cm</span>
              <span>175 cm</span>
              <span>205 cm</span>
            </div>
          </div>

          {/* Weight Slider */}
          <div className="bg-stone-100 p-4 rounded-xl border border-stone-200">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="weight-range-slider" className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
                Seu Peso
              </label>
              <span className="text-base font-mono font-bold text-stone-900">{weight} kg</span>
            </div>
            <input
              id="weight-range-slider"
              type="range"
              min="40"
              max="130"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>40 kg</span>
              <span>85 kg</span>
              <span>130 kg</span>
            </div>
          </div>
        </div>

        {/* Fit Preference */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-2">
            Como você prefere que a roupa fique no corpo?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'fitted', label: 'Mais Justo', desc: 'Desenhando a silhueta' },
              { id: 'regular', label: 'Equilibrado', desc: 'Caimento padrão natural' },
              { id: 'loose', label: 'Solto / Oversized', desc: 'Despojado e amplo' },
            ].map((f) => (
              <button
                key={f.id}
                id={`fit-pref-${f.id}`}
                onClick={() => setFitPreference(f.id as any)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  fitPreference === f.id
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 bg-stone-100 hover:border-stone-400 text-stone-900'
                }`}
              >
                <span className="block text-xs font-bold mb-0.5">{f.label}</span>
                <span
                  className={`block text-[11px] ${
                    fitPreference === f.id ? 'text-stone-300' : 'text-stone-500'
                  }`}
                >
                  {f.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Result Banner */}
        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-stone-900 text-amber-300 font-mono font-bold text-2xl flex items-center justify-center shrink-0 shadow-xs">
              {recommendation.size}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-amber-900 font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Tamanho Ideal Recomendado
              </div>
              <p className="text-xs text-stone-700">
                Calculado para <strong>{height} cm</strong> e <strong>{weight} kg</strong> com caimento{' '}
                <strong>{fitPreference === 'fitted' ? 'justo' : fitPreference === 'loose' ? 'solto' : 'equilibrado'}</strong>.
              </p>
            </div>
          </div>

          {onSelectSize && (
            <button
              id="apply-recommended-size-btn"
              onClick={() => {
                onSelectSize(recommendation.size);
                onClose();
              }}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Filtrar Tamanho {recommendation.size}
            </button>
          )}
        </div>

        {/* Measurement Table Accordion */}
        <div className="border-t border-stone-200 pt-5">
          <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold text-stone-700 uppercase tracking-wide">
            <Ruler className="w-4 h-4 text-stone-500" />
            Tabela de Medidas Corporais (em centímetros)
          </div>
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-100 text-stone-600 border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Tamanho</th>
                  <th className="py-2.5 px-3 font-semibold">Busto / Tórax</th>
                  <th className="py-2.5 px-3 font-semibold">Cintura</th>
                  <th className="py-2.5 px-3 font-semibold">Quadril</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {measurementsTable.map((row) => (
                  <tr
                    key={row.size}
                    className={
                      recommendation.size === row.size
                        ? 'bg-amber-100/40 font-semibold text-stone-950'
                        : 'hover:bg-stone-100/50'
                    }
                  >
                    <td className="py-2 px-3 font-mono">{row.size}</td>
                    <td className="py-2 px-3 text-stone-600">{row.chest}</td>
                    <td className="py-2 px-3 text-stone-600">{row.waist}</td>
                    <td className="py-2 px-3 text-stone-600">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
