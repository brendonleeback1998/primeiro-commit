
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Section, BeltRequirement, AttackDefenseSequence, KataDetails } from './types';
import { 
  HISTORY_CONTENT, 
  MEANING_CONTENT, 
  DOJO_KUN, 
  COUNTING_CONTENT, 
  BELTS, 
  BASES,
  KATAS_DETAILED
} from './data';

// --- Componentes de UI ---

const TechnicalList = ({ title, items, accent = "black" }: { title: string, items?: string[], accent?: string }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-6">
      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 border-b border-zinc-100 pb-3">
        {title}
      </h4>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start group">
            <span className={`text-red-600 mr-3 font-bold transition-transform group-hover:translate-x-1`}>/</span>
            <span className={`text-sm font-bold leading-tight ${accent === 'red' ? 'text-red-600' : 'text-black'}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.GRADUATION);
  const [selectedBeltIdx, setSelectedBeltIdx] = useState(0);
  const [expandedBase, setExpandedBase] = useState<number | null>(null);

  const belt = BELTS[selectedBeltIdx];

  // Estilos de cores para as faixas
  const beltColors: Record<string, string> = {
    'Branca': 'bg-zinc-200', 'Amarela': 'bg-yellow-400', 'Vermelha': 'bg-red-600',
    'Laranja': 'bg-orange-500', 'Verde': 'bg-green-600', 'Roxa': 'bg-purple-600',
    'Marrom': 'bg-amber-900', 'Preta': 'bg-black'
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-red-100 selection:text-red-900">
      {/* Navegação Superior Minimalista */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <span className="text-white font-black text-lg">空</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden sm:block">Shotokan / Guia</span>
          </div>
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-2">
            {[Section.HISTORY, Section.BASICS, Section.TECHNICAL, Section.GRADUATION, Section.KATA].map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors whitespace-nowrap ${activeSection === s ? 'text-red-600' : 'text-zinc-400 hover:text-black'}`}
              >
                {s.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        {/* Renderização Condicional */}
        
        {activeSection === Section.HISTORY && (
          <div className="animate-content space-y-32 max-w-4xl">
            <header className="space-y-8">
              <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8]">ORIGEM.</h1>
              <p className="text-2xl text-zinc-400 font-light italic leading-relaxed">"{HISTORY_CONTENT.funakoshiQuote}"</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
              {HISTORY_CONTENT.founders.map((f, i) => (
                <div key={i} className="group border-t border-zinc-100 pt-8 hover:border-black transition-colors">
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-2">{f.period}</span>
                  <h3 className="text-3xl font-bold tracking-tight">{f.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === Section.BASICS && (
          <div className="animate-content space-y-40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
              {MEANING_CONTENT.parts.map((p, i) => (
                <div key={i} className="space-y-6">
                  <p className="text-8xl font-black text-black leading-none">{p.kanji}</p>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-widest">{p.romaji}</h3>
                    <p className="text-zinc-400 uppercase tracking-widest text-xs mt-1">{p.meaning}</p>
                  </div>
                </div>
              ))}
            </div>

            <section className="space-y-20 max-w-3xl">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300">Dōjō Kun / Preceitos</h2>
              <div className="space-y-16">
                {DOJO_KUN.map((kun, i) => (
                  <div key={i} className="relative pl-12">
                    <span className="absolute left-0 top-0 text-5xl font-black text-zinc-100 -z-10 leading-none">0{i+1}</span>
                    <p className="text-2xl font-bold mb-2">{kun.japanese}</p>
                    <p className="text-zinc-500 font-medium leading-relaxed">{kun.portuguese}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === Section.TECHNICAL && (
          <div className="animate-content space-y-12">
            <header className="mb-20">
              <h1 className="text-7xl font-black tracking-tighter">BASES.</h1>
              <p className="text-zinc-400 text-lg">A fundação de toda técnica.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BASES.map((b, i) => (
                <div 
                  key={i} 
                  className={`border p-8 transition-all cursor-pointer ${expandedBase === i ? 'border-black bg-zinc-50 lg:col-span-2' : 'border-zinc-100 hover:border-zinc-300'}`}
                  onClick={() => setExpandedBase(expandedBase === i ? null : i)}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">{b.name}</h3>
                    <span className={`w-2 h-2 rounded-full ${expandedBase === i ? 'bg-red-600' : 'bg-zinc-200'}`}></span>
                  </div>
                  {expandedBase === i && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-content">
                      <div className="aspect-square bg-white flex items-center justify-center p-4 border border-zinc-100">
                        <img src={b.imageUrl} className="max-w-full max-h-full object-contain" alt={b.name} />
                      </div>
                      <p className="text-sm text-zinc-600 leading-relaxed self-center font-medium">{b.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === Section.GRADUATION && (
          <div className="animate-content space-y-24">
            {/* Seletor de Faixa Estilo "Timeline" */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 border-b border-zinc-100">
              {BELTS.map((b, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedBeltIdx(i)}
                  className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] border transition-all whitespace-nowrap ${selectedBeltIdx === i ? 'bg-black text-white border-black shadow-lg translate-y-[-4px]' : 'text-zinc-400 border-zinc-100 hover:border-zinc-300'}`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full mr-3 ${beltColors[b.color]}`}></span>
                  {b.color}
                </button>
              ))}
            </div>

            {/* Cabeçalho da Faixa */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
              <div className="space-y-2">
                <span className="text-[12px] font-black text-red-600 uppercase tracking-[0.4em]">{belt.kyu ? belt.kyu + ' Kyu' : 'Grau Dan'}</span>
                <h2 className="text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8]">
                  {belt.color.toUpperCase()}.
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-12 border-l border-zinc-100 pl-12">
                <div>
                  <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mb-2">Conceito</p>
                  <p className="text-xl font-bold uppercase italic">{belt.meaning}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mb-2">Treino Mín.</p>
                  <p className="text-xl font-bold uppercase">{belt.trainingTime}</p>
                </div>
              </div>
            </div>

            {/* Dossiê Técnico (Kihon Completo) */}
            <div className="pt-16 border-t border-zinc-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
                <TechnicalList title="Ataques de Braço" items={[...(belt.socos || []), ...(belt.ataqueBraco || [])]} />
                <TechnicalList title="Chutes Técnicos" items={belt.chutes} accent="red" />
                <TechnicalList title="Defesas Básicas" items={belt.defesas} />
                <TechnicalList title="Troca de Perna / Tobi" items={belt.trocaPerna} />
                <TechnicalList title="Recuos Técnicos" items={belt.recuos} />
                <TechnicalList title="Sequências Combinadas" items={belt.sequenciasTecnicas} />
              </div>
            </div>

            {/* Seção Kumite (Impacto Visual) */}
            {(belt.kumite || (belt.ataqueDefesaSequences && belt.ataqueDefesaSequences.length > 0)) && (
              <section className="bg-black text-white -mx-6 px-6 py-24 lg:px-24">
                <div className="max-w-7xl mx-auto space-y-16">
                  <header className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-red-600">Kumite / Aplicação Prática</h3>
                    <p className="text-4xl font-black italic tracking-tighter">{belt.kumite || "Combate Controlado"}</p>
                  </header>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                    {belt.ataqueDefesaSequences?.map((seq, i) => (
                      <div key={i} className="border-l border-zinc-800 pl-8 space-y-4 group">
                        <span className="text-red-600 font-black text-[10px]">#0{i+1}</span>
                        <div className="space-y-1">
                          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Ataque</p>
                          <p className="text-xl font-bold group-hover:text-red-500 transition-colors">{seq.ataque}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Defesa / Ação</p>
                          <p className="text-sm font-medium leading-relaxed text-zinc-300">{seq.acao || seq.defesa}</p>
                        </div>
                        {seq.contraAtaque && (
                          <div className="pt-2">
                            <span className="bg-red-600 text-white text-[9px] font-black px-2 py-1 uppercase tracking-tighter italic">Kime: {seq.contraAtaque}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Seção Kata */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 pt-24 border-t border-zinc-100">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Kata Principal</h3>
                  <p className="text-5xl font-black italic">{belt.kata}</p>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed italic">{belt.observacaoKata}</p>
                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Característica da Graduação</h4>
                   <p className="text-lg font-bold leading-tight">{belt.characteristic}</p>
                </div>
              </div>
              
              <div className="bg-zinc-50 p-10 space-y-10">
                {(belt.katasDetails || (belt.kataDetails ? [belt.kataDetails] : [])).map((k, i) => (
                  <div key={i} className="space-y-6">
                    <div className="flex justify-between items-baseline border-b border-zinc-200 pb-2">
                      <h4 className="text-xl font-black">{k.name}</h4>
                      <span className="text-[10px] font-black text-red-600 uppercase">{k.kyodos} Mov.</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div><p className="text-[9px] font-black text-zinc-400 uppercase mb-1">Bases</p><p className="text-xs font-bold">{k.bases}</p></div>
                      <div><p className="text-[9px] font-black text-zinc-400 uppercase mb-1">Kiai</p><p className="text-xs font-bold">{k.kiai}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === Section.KATA && (
          <div className="animate-content space-y-40">
            <header className="mb-32">
              <h1 className="text-7xl font-black tracking-tighter">LISTA DE KATAS.</h1>
              <p className="text-zinc-400 text-lg">As formas fundamentais do estilo Shotokan.</p>
            </header>
            
            <div className="space-y-64">
              {KATAS_DETAILED.map((k, i) => (
                <div key={i} className="space-y-16">
                  <div className="flex flex-col lg:flex-row justify-between items-baseline gap-4 border-b-2 border-black pb-6">
                    <h2 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase italic leading-none">{k.name}</h2>
                    <span className="text-red-600 font-black text-lg uppercase tracking-[0.3em]">{k.translation}</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5 space-y-12">
                      <p className="text-xl text-zinc-600 leading-relaxed font-light">{k.description}</p>
                      <div className="grid grid-cols-2 gap-12 border-t border-zinc-100 pt-8">
                        <div>
                          <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-1">Foco Técnico</p>
                          <p className="text-sm font-bold uppercase">{k.focus}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-1">Movimentos</p>
                          <p className="text-2xl font-black">{k.kyodos}</p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <div className="aspect-video bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
                        <iframe 
                          src={k.videoUrl} 
                          className="w-full h-full opacity-80 hover:opacity-100 transition-opacity" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-zinc-100 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-black text-2xl">空</div>
             <div>
               <p className="text-sm font-black uppercase tracking-widest leading-none">Shotokan Ryu</p>
               <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Guia Técnico Oficial</p>
             </div>
          </div>
          <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.5em]">Karatê-do: Caminho das mãos vazias.</p>
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('content-area')!);
root.render(<App />);
