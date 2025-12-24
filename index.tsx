
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Section, BeltRequirement, AttackDefenseSequence, BaseInfo, KataInfo, KataDetails } from './types';
import { 
  HISTORY_CONTENT, 
  MEANING_CONTENT, 
  DOJO_KUN, 
  COUNTING_CONTENT, 
  BELTS, 
  BASES,
  KATAS_DETAILED
} from './data';

// --- UI Kit Minimalista ---

const SectionTitle = ({ label, title }: { label: string, title: string }) => (
  <header className="space-y-2 mb-16 lg:mb-24">
    <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] block">
      {label}
    </span>
    <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none">
      {title.toUpperCase()}.
    </h1>
  </header>
);

const TechnicalList = ({ title, items, color = "black" }: { title: string, items?: string[], color?: string }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-6">
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 border-b border-zinc-100 pb-3">
        {title}
      </h4>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start group">
            <span className={`mr-3 font-bold ${color === 'red' ? 'text-red-600' : 'text-black'}`}>/</span>
            <span className="text-sm font-bold text-zinc-800 leading-tight group-hover:text-black transition-colors">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- App Component ---

const App = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.GRADUATION);
  const [selectedBeltIdx, setSelectedBeltIdx] = useState(0);
  const [expandedBase, setExpandedBase] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const belt = BELTS[selectedBeltIdx];
  const beltColors: Record<string, string> = {
    'Branca': 'bg-zinc-100', 'Amarela': 'bg-yellow-400', 'Vermelha': 'bg-red-600',
    'Laranja': 'bg-orange-500', 'Verde': 'bg-green-600', 'Roxa': 'bg-purple-600',
    'Marrom': 'bg-amber-900', 'Preta': 'bg-black'
  };

  const navItems = [
    { id: Section.HISTORY, label: 'Origem' },
    { id: Section.BASICS, label: 'Dojo' },
    { id: Section.TECHNICAL, label: 'Posturas' },
    { id: Section.GRADUATION, label: 'Currículo' },
    { id: Section.KATA, label: 'Formas' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-black mx-auto flex items-center justify-center animate-pulse">
            <span className="text-white font-black text-xl">空</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300">Sincronizando Mente e Corpo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navegação Editorial */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100 px-6">
        <div className="max-w-6xl mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-black text-lg">空</div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden md:block">Shotokan Guide</span>
          </div>
          <div className="flex gap-6 sm:gap-10 overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative py-2 ${activeSection === item.id ? 'text-red-600' : 'text-zinc-400 hover:text-black'}`}
              >
                {item.label}
                {activeSection === item.id && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600" />}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 lg:py-20 w-full animate-content">
        {/* ORIGEM */}
        {activeSection === Section.HISTORY && (
          <div className="space-y-24 max-w-4xl">
            <SectionTitle label="Nossa Linhagem" title="Raízes." />
            <p className="text-2xl text-zinc-400 italic font-light leading-relaxed max-w-2xl">
              "{HISTORY_CONTENT.funakoshiQuote}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 border-t border-zinc-100 pt-16">
              {HISTORY_CONTENT.founders.map((f, i) => (
                <div key={i} className="group">
                  <span className="text-[9px] font-black text-red-600 uppercase tracking-widest block mb-1">{f.period}</span>
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-red-600 transition-colors">{f.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOJO */}
        {activeSection === Section.BASICS && (
          <div className="space-y-32">
            <SectionTitle label="Conceitos Fundamentais" title="Conduta." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-zinc-100 pb-20">
              {MEANING_CONTENT.parts.map((p, i) => (
                <div key={i} className="space-y-4">
                  <p className="text-8xl font-black text-black leading-none">{p.kanji}</p>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest">{p.romaji}</h3>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">{p.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
            <section className="space-y-16 max-w-3xl">
              <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-300">O Dōjō Kun</h2>
              <div className="space-y-12">
                {DOJO_KUN.map((kun, i) => (
                  <div key={i} className="relative pl-12">
                    <span className="absolute left-0 top-0 text-5xl font-black text-zinc-50 -z-10 leading-none opacity-50">0{i+1}</span>
                    <p className="text-xl font-bold mb-2">{kun.japanese}</p>
                    <p className="text-sm text-zinc-500 font-medium leading-relaxed uppercase tracking-tight">{kun.portuguese}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* POSTURAS */}
        {activeSection === Section.TECHNICAL && (
          <div className="space-y-12">
            <SectionTitle label="Fundamentos da Base" title="Dachi." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {BASES.map((b, i) => (
                <div 
                  key={i} 
                  className={`border border-zinc-100 p-8 transition-all cursor-pointer group ${expandedBase === i ? 'bg-zinc-50 border-black z-10' : 'hover:bg-zinc-50'}`}
                  onClick={() => setExpandedBase(expandedBase === i ? null : i)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-black uppercase tracking-tighter italic">{b.name}</h3>
                    <span className={`w-2 h-2 rounded-full ${expandedBase === i ? 'bg-red-600' : 'bg-zinc-200'}`} />
                  </div>
                  {expandedBase === i && (
                    <div className="mt-8 space-y-6 animate-content">
                      <div className="aspect-square bg-white flex items-center justify-center p-4 border border-zinc-100">
                        <img src={b.imageUrl} className="max-w-full max-h-full object-contain" alt={b.name} />
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed font-bold uppercase tracking-wider">{b.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CURRÍCULO */}
        {activeSection === Section.GRADUATION && (
          <div className="space-y-24">
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6 border-b border-zinc-100">
              {BELTS.map((b, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedBeltIdx(i)}
                  className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] border transition-all whitespace-nowrap ${selectedBeltIdx === i ? 'belt-active shadow-lg' : 'text-zinc-400 border-zinc-100 hover:border-zinc-300'}`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full mr-3 ${beltColors[b.color]}`} />
                  {b.color}
                </button>
              ))}
            </div>

            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
              <div className="space-y-4">
                <span className="text-[12px] font-black text-red-600 uppercase tracking-[0.4em]">
                  {belt.kyu ? `${belt.kyu} Kyu` : 'Grau Dan'}
                </span>
                <h2 className="text-7xl lg:text-9xl font-black tracking-tighter leading-none">
                  {belt.color.toUpperCase()}.
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-10 border-l border-zinc-100 pl-10 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <div><p className="opacity-40 mb-1">CONCEITO</p><p className="text-black text-lg font-bold">{belt.meaning}</p></div>
                <div><p className="opacity-40 mb-1">TEMPO MÍN.</p><p className="text-black text-lg font-bold">{belt.trainingTime}</p></div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 py-20 border-t border-zinc-100">
              <TechnicalList title="Ataques de Braço" items={[...(belt.socos || []), ...(belt.ataqueBraco || [])]} />
              <TechnicalList title="Chutes Técnicos" items={belt.chutes} color="red" />
              <TechnicalList title="Defesas Básicas" items={belt.defesas} />
              <TechnicalList title="Trocas de Perna" items={belt.trocaPerna} />
              <TechnicalList title="Recuos Técnicos" items={belt.recuos} />
              <TechnicalList title="Combinações" items={belt.sequenciasTecnicas} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <section className="bg-black text-white p-10 lg:p-16 space-y-12">
                  <header>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-red-600">Kumite</span>
                    <h3 className="text-4xl font-black italic tracking-tighter mt-2">{belt.kumite || "Aplicação"}</h3>
                  </header>
                  <div className="space-y-8">
                    {belt.ataqueDefesaSequences?.map((seq, i) => (
                      <div key={i} className="border-l border-zinc-800 pl-6 space-y-3">
                        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">#0{i+1}</p>
                        <p className="text-lg font-bold">{seq.ataque}</p>
                        <p className="text-sm text-zinc-400 italic font-light">{seq.acao || seq.defesa}</p>
                        {seq.contraAtaque && <p className="text-sm font-black text-red-600 uppercase">Kime: {seq.contraAtaque}</p>}
                      </div>
                    ))}
                  </div>
               </section>

               <section className="border border-zinc-100 p-10 lg:p-16 space-y-12">
                  <header>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-300">Kata Exigido</span>
                    <h3 className="text-6xl font-black italic tracking-tighter mt-2">{belt.kata}</h3>
                  </header>
                  <div className="space-y-8">
                    <p className="text-sm text-zinc-500 leading-relaxed font-medium uppercase">{belt.observacaoKata || belt.characteristic}</p>
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-100">
                      <div><p className="text-[9px] font-black text-zinc-300 mb-1">MOVIMENTOS</p><p className="text-2xl font-bold">{belt.kataDetails?.kyodos || "--"}</p></div>
                      <div><p className="text-[9px] font-black text-zinc-300 mb-1">PONTOS KIAI</p><p className="text-xs font-bold uppercase">{belt.kataDetails?.kiai || "Geral"}</p></div>
                    </div>
                  </div>
               </section>
            </div>
          </div>
        )}

        {/* FORMAS */}
        {activeSection === Section.KATA && (
          <div className="space-y-40">
            <SectionTitle label="A Alma do Estilo" title="Formas." />
            <div className="space-y-64">
              {KATAS_DETAILED.map((k, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-16 group">
                  <div className="lg:col-span-5 space-y-10">
                    <div className="border-b-4 border-black pb-4">
                      <h2 className="text-6xl font-black uppercase tracking-tighter italic group-hover:text-red-600 transition-colors leading-none">{k.name}</h2>
                      <p className="text-sm font-black text-red-600 uppercase tracking-[0.4em] mt-3">{k.translation}</p>
                    </div>
                    <p className="text-lg text-zinc-600 font-light leading-relaxed">{k.description}</p>
                    <div className="grid grid-cols-2 gap-10 text-[10px] font-black uppercase tracking-widest pt-4">
                      <div><p className="text-zinc-300 mb-1">MOVIMENTOS</p><p className="text-black text-xl">{k.kyodos}</p></div>
                      <div><p className="text-zinc-300 mb-1">FOCO TÉCNICO</p><p className="text-black">{k.focus}</p></div>
                    </div>
                  </div>
                  <div className="lg:col-span-7 aspect-video bg-zinc-900 border border-zinc-200 shadow-2xl overflow-hidden group-hover:scale-[1.02] transition-transform">
                    <iframe src={k.videoUrl} className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" allowFullScreen />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-100 py-24 px-6 mt-32">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-black text-2xl">空</div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] leading-none">Shotokan Ryu</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Dojo Digital v2.1</p>
            </div>
          </div>
          <p className="text-[10px] font-black text-zinc-200 uppercase tracking-[0.6em] text-center">
            Karatê-Do: O caminho das mãos vazias.
          </p>
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('content-area')!);
root.render(<App />);
