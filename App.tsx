
import React, { useState } from 'react';
import { Section, BeltRequirement, KataInfo, BaseInfo, KataDetails } from './types';
import { 
  HISTORY_CONTENT, 
  MEANING_CONTENT, 
  DOJO_KUN, 
  COUNTING_CONTENT, 
  BELTS, 
  BASES,
  KATAS_DETAILED
} from './data';

const Icons = {
  History: () => (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  Basics: () => (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  Technical: () => (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012 2v1h-6V9a2 2 0 012-2z" /></svg>
  ),
  Graduation: () => (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
  ),
  Kata: () => (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
  Chevron: ({ open }: { open: boolean }) => (
    <svg className={`w-6 h-6 transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
  )
};

const ExpandableBaseCard: React.FC<{ base: BaseInfo, id: string, isOpen: boolean, onToggle: () => void }> = ({ base, id, isOpen, onToggle }) => (
  <div className={`border border-zinc-100 rounded-[2rem] overflow-hidden transition-all duration-500 bg-white ${isOpen ? 'shadow-2xl ring-2 ring-red-600/20' : 'shadow-sm hover:border-red-600/30'}`}>
    <button 
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`panel-${id}`}
      id={`button-${id}`}
      className={`w-full flex items-center justify-between p-6 sm:p-8 text-left transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-red-600/50 ${isOpen ? 'bg-zinc-950 text-white' : 'text-zinc-900 bg-white'}`}
    >
      <div className="flex items-baseline space-x-3">
        <h3 className="text-2xl font-black uppercase italic tracking-tighter">{base.name}</h3>
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${isOpen ? 'bg-red-600 text-white' : 'text-red-600 bg-red-50'}`}>Dachi</span>
      </div>
      <div className={isOpen ? 'text-red-600' : 'text-zinc-300'}>
        <Icons.Chevron open={isOpen} />
      </div>
    </button>
    
    <div 
      id={`panel-${id}`}
      role="region"
      aria-labelledby={`button-${id}`}
      className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white">
        <div className="relative group">
          <div className="absolute inset-0 bg-red-600/5 rounded-[2rem] scale-105 blur-xl group-hover:bg-red-600/10 transition-colors" aria-hidden="true"></div>
          <div className="relative h-80 rounded-[2rem] overflow-hidden bg-zinc-50 border border-zinc-100 p-4">
            <img 
              src={base.imageUrl} 
              alt={`Demonstração técnica da base ${base.name}`} 
              className="w-full h-full object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x600/000/fff?text=${base.name}`; }}
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="border-l-4 border-red-600 pl-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">Descrição Técnica</h4>
            <p className="text-lg text-zinc-700 font-medium leading-relaxed">{base.description}</p>
          </div>
          <div className="pt-4 flex space-x-2">
            <span className="bg-zinc-100 text-zinc-600 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Estabilidade</span>
            <span className="bg-zinc-100 text-zinc-600 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Equilíbrio</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const KataDetailCard: React.FC<{ kata: KataDetails, index: number }> = ({ kata, index }) => (
  <article className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-red-600 mb-4 last:mb-0">
    <div className="flex justify-between items-end mb-6">
      <div>
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Kata {index + 1} da Graduação</h3>
        <p className="text-3xl font-black text-gray-900">{kata.name}</p>
      </div>
      <div className="text-right">
        <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-bold">{kata.kyodos} Movimentos</span>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <div className="space-y-3">
        <p><strong className="text-gray-500 uppercase text-[9px] block">Bases</strong> {kata.bases}</p>
        {kata.defesas && <p><strong className="text-gray-500 uppercase text-[9px] block">Defesas</strong> {kata.defesas}</p>}
      </div>
      <div className="space-y-3">
        {kata.ataques && <p><strong className="text-gray-500 uppercase text-[9px] block">Ataques</strong> {kata.ataques}</p>}
        <p><strong className="text-gray-500 uppercase text-[9px] block">KIAI</strong> {kata.kiai}</p>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t text-center">
       <p className="text-[10px] text-gray-500 font-medium italic">Duração aproximada: {kata.duracao}</p>
    </div>
  </article>
);

const BeltDetailView: React.FC<{ belt: BeltRequirement }> = ({ belt }) => {
  const isPreta = belt.color === 'Preta';

  const renderChutesSocos = (numChutes: number, numSocos: number) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${belt.socos.length === 0 ? 'grid-cols-1' : ''}`}>
      {belt.chutes.length > 0 && (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100" aria-labelledby="chutes-heading">
          <h3 id="chutes-heading" className="text-lg font-black text-red-600 mb-4 uppercase tracking-tighter">{numChutes}. Chutes Básicos</h3>
          <ul className="space-y-2">
            {belt.chutes.map((c, i) => (
              <li key={i} className="flex items-start text-sm text-zinc-700">
                <span className="w-6 h-6 flex-shrink-0 bg-zinc-100 text-zinc-900 rounded flex items-center justify-center text-[10px] font-bold mr-2" aria-hidden="true">{i+1}</span>
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}
      {belt.socos.length > 0 && (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100" aria-labelledby="socos-heading">
          <h3 id="socos-heading" className="text-lg font-black text-zinc-900 mb-4 uppercase tracking-tighter">{numSocos}. Socos Básicos</h3>
          <ul className="space-y-2">
            {belt.socos.map((s, i) => (
              <li key={i} className="flex items-start text-sm text-zinc-700">
                <span className="w-6 h-6 flex-shrink-0 bg-zinc-100 text-zinc-900 rounded flex items-center justify-center text-[10px] font-bold mr-2" aria-hidden="true">{i+1}</span>
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );

  const renderTrocaPerna = (num: number) => (
    belt.trocaPerna && belt.trocaPerna.length > 0 && (
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100" aria-labelledby="troca-heading">
        <h3 id="troca-heading" className="text-lg font-black text-red-600 mb-4 uppercase tracking-tighter">
          {num}. Troca de Perna
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {belt.trocaPerna.map((t, i) => (
            <div key={i} className="p-3 bg-zinc-50 rounded-lg text-sm text-zinc-800 flex items-center border border-zinc-100">
              <span className="font-bold text-red-600 mr-2 text-xs" aria-hidden="true">{i+1}.</span>
              {t}
            </div>
          ))}
        </div>
      </section>
    )
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <header className="bg-zinc-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full -mr-16 -mt-16 blur-3xl" aria-hidden="true"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-red-500 font-black uppercase tracking-[0.3em] text-[10px] mb-1">Requisitos de Exame</p>
              <h2 className="text-4xl font-black tracking-tighter italic">Faixa {belt.color}</h2>
              <p className="text-xs font-bold opacity-70 uppercase tracking-widest mt-1">{belt.kyu ? belt.kyu + " Kyu" : "Dan"}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Tempo Mínimo</p>
              <p className="text-xl font-black text-red-500">{belt.trainingTime}</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[9px] uppercase font-black text-red-500 tracking-widest mb-1">Significado</p>
              <p className="text-sm font-medium">{belt.meaning}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[9px] uppercase font-black text-red-500 tracking-widest mb-1">Característica</p>
              <p className="text-sm font-medium">{belt.characteristic}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {isPreta ? null : (
          <>
            {renderChutesSocos(1, 2)}
            {renderTrocaPerna(3)}
          </>
        )}

        {belt.defesas.length > 0 && (
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100" aria-labelledby="defesas-heading">
            <h3 id="defesas-heading" className="text-lg font-black text-zinc-900 mb-4 uppercase tracking-tighter italic">Defesas Básicas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {belt.defesas.map((d, i) => (
                <div key={i} className="p-3 bg-zinc-50 rounded-lg text-sm text-zinc-700 flex items-center">
                  <span className="font-black text-red-600 mr-2 text-xs" aria-hidden="true">{i+1}.</span>
                  {d}
                </div>
              ))}
            </div>
          </section>
        )}

        {belt.ataqueDefesaSequences && (
          <section className="bg-zinc-950 p-8 rounded-3xl shadow-2xl text-white" aria-labelledby="kumite-heading">
            <h3 id="kumite-heading" className="text-2xl font-black mb-8 flex items-center italic">
              <span className="w-1.5 h-6 bg-red-600 mr-3" aria-hidden="true"></span>
              Ataque e Defesa (Kumite)
            </h3>
            <div className="space-y-8">
              {belt.ataqueDefesaSequences.map((seq, i) => (
                <div key={i} className="group border-b border-white/5 pb-8 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-3 mb-4">
                     <span className="bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-sm" aria-hidden="true">SEQ {i+1}</span>
                     <p className="text-white text-xs font-black uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">Ataque: {seq.ataque}</p>
                  </div>
                  <div className="space-y-3 ml-4 border-l-2 border-red-600/30 pl-6 group-hover:border-red-600 transition-colors">
                    {seq.acao ? (
                      <p className="text-sm text-zinc-400 leading-relaxed"><strong className="text-white font-black uppercase text-[10px] tracking-widest block mb-1">Ação Técnica:</strong> {seq.acao}</p>
                    ) : (
                      <>
                        <p className="text-sm text-zinc-400 leading-relaxed"><strong className="text-white font-black uppercase text-[10px] tracking-widest block mb-1">Defesa:</strong> {seq.defesa}</p>
                        <p className="text-sm text-red-500 leading-relaxed"><strong className="text-red-400 font-black uppercase text-[10px] tracking-widest block mb-1">Contra-ataque:</strong> {seq.contraAtaque}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-4" aria-label="Katas da Graduação">
          {belt.kataDetails && <KataDetailCard kata={belt.kataDetails} index={0} />}
          {belt.katasDetails && belt.katasDetails.map((k, i) => <KataDetailCard key={i} kata={k} index={i} />)}
        </section>
      </div>
    </div>
  );
};

const KataMediaBox: React.FC<{ kata: KataInfo }> = ({ kata }) => {
  const [view, setView] = useState<'video' | 'diagram'>('video');

  return (
    <div className="flex flex-col h-full">
      <div 
        role="tablist"
        aria-label="Opções de visualização do Kata"
        className="flex space-x-2 mb-6 bg-zinc-100 p-1 rounded-2xl w-fit self-center lg:self-start"
      >
        <button 
          role="tab"
          aria-selected={view === 'video'}
          aria-controls={`kata-video-${kata.name}`}
          id={`tab-video-${kata.name}`}
          onClick={() => setView('video')}
          className={`px-6 py-2 text-[10px] font-black uppercase rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 ${view === 'video' ? 'bg-zinc-900 shadow-md text-white' : 'text-zinc-500 hover:text-zinc-800'}`}
        >
          Vídeo
        </button>
        <button 
          role="tab"
          aria-selected={view === 'diagram'}
          aria-controls={`kata-diagram-${kata.name}`}
          id={`tab-diagram-${kata.name}`}
          onClick={() => setView('diagram')}
          className={`px-6 py-2 text-[10px] font-black uppercase rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 ${view === 'diagram' ? 'bg-zinc-900 shadow-md text-white' : 'text-zinc-500 hover:text-zinc-800'}`}
        >
          Diagrama
        </button>
      </div>

      <div className="flex-1 rounded-3xl overflow-hidden border border-zinc-100 shadow-inner bg-zinc-50 flex items-center justify-center min-h-[300px]">
        {view === 'video' ? (
          <div id={`kata-video-${kata.name}`} role="tabpanel" aria-labelledby={`tab-video-${kata.name}`} className="w-full h-full">
            <iframe 
              src={kata.videoUrl} 
              className="w-full h-full aspect-video"
              title={`Vídeo demonstrativo do Kata ${kata.name}`}
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div id={`kata-diagram-${kata.name}`} role="tabpanel" aria-labelledby={`tab-diagram-${kata.name}`} className="p-8 flex flex-col items-center justify-center w-full h-full">
             <img 
               src={kata.diagramUrl} 
               alt={`Diagrama detalhado dos movimentos do Kata ${kata.name}`} 
               className="max-w-full max-h-[450px] object-contain drop-shadow-lg"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = `https://placehold.co/600x400/000/fff?text=Diagrama+${kata.name.replace(' ', '+')}`;
               }}
             />
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.GRADUATION);
  const [selectedBelt, setSelectedBelt] = useState<BeltRequirement | null>(BELTS[0]);
  const [expandedBaseId, setExpandedBaseId] = useState<number | null>(null);

  const navItems = [
    { id: Section.HISTORY, icon: Icons.History, label: 'História' },
    { id: Section.BASICS, icon: Icons.Basics, label: 'Fundamentos' },
    { id: Section.TECHNICAL, icon: Icons.Technical, label: 'Bases' },
    { id: Section.GRADUATION, icon: Icons.Graduation, label: 'Graduação' },
    { id: Section.KATA, icon: Icons.Kata, label: 'Katas' },
  ];

  const getBeltColorIndicator = (color: string) => {
    const colors: Record<string, string> = {
      'Branca': 'bg-zinc-200', 'Amarela': 'bg-yellow-400', 'Vermelha': 'bg-red-600',
      'Laranja': 'bg-orange-500', 'Verde': 'bg-green-600', 'Roxa': 'bg-purple-600',
      'Marrom': 'bg-amber-800', 'Preta': 'bg-black'
    };
    return colors[color] || 'bg-zinc-400';
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <nav 
        className="bg-zinc-950 border-b border-white/5 sticky top-0 z-50 shadow-2xl"
        aria-label="Navegação Principal"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div 
            role="tablist"
            className="flex items-center h-20 overflow-x-auto no-scrollbar gap-2 sm:gap-6"
          >
            {navItems.map((item) => (
              <button 
                key={item.id}
                role="tab"
                aria-selected={activeSection === item.id}
                aria-controls={`section-${item.id}`}
                id={`nav-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center justify-center min-w-[80px] h-full transition-all relative group pt-1 focus:outline-none focus-visible:text-white ${activeSection === item.id ? 'text-red-600' : 'text-zinc-500 hover:text-zinc-200'}`}
              >
                <item.icon />
                <span className="text-[10px] font-black uppercase tracking-widest mt-1.5">{item.label}</span>
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 shadow-[0_-4px_12px_rgba(220,38,38,0.5)]"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main 
        id={`section-${activeSection}`} 
        className="max-w-6xl mx-auto p-4 sm:p-10 outline-none"
        tabIndex={-1}
      >
        {activeSection === Section.HISTORY && (
          <div className="space-y-12 animate-fadeIn">
            <header className="border-l-8 border-red-600 pl-8 py-2">
              <h1 className="text-5xl font-black tracking-tighter uppercase italic">{HISTORY_CONTENT.title}</h1>
              <p className="text-xl text-zinc-500 mt-2 font-medium italic">"{HISTORY_CONTENT.funakoshiQuote}"</p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {HISTORY_CONTENT.founders.map((founder, i) => (
                <article key={i} className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 hover:bg-zinc-900 hover:text-white transition-all group shadow-sm">
                  <p className="font-black text-red-600 group-hover:text-red-500 text-lg uppercase tracking-tighter leading-none mb-2">{founder.name}</p>
                  <p className="text-xs text-zinc-500 group-hover:text-zinc-400 font-bold uppercase tracking-widest">{founder.period}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeSection === Section.BASICS && (
          <div className="space-y-12 animate-fadeIn">
            <header className="border-l-8 border-red-600 pl-8 py-2">
              <h1 className="text-5xl font-black tracking-tighter uppercase italic">Karatê-Do</h1>
              <p className="text-zinc-500 font-bold uppercase tracking-widest">Significado e Conduta</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MEANING_CONTENT.parts.map((part, i) => (
                <div key={i} className="bg-zinc-900 text-white p-10 rounded-[3rem] text-center shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  <p className="text-7xl font-black mb-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500" aria-label={`Kanjii para ${part.romaji}`}>{part.kanji}</p>
                  <p className="text-2xl font-black text-red-500 uppercase italic tracking-tighter">{part.romaji}</p>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-[0.3em] mt-2">{part.meaning}</p>
                </div>
              ))}
            </div>

            <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100 shadow-sm" aria-labelledby="dojo-kun-title">
               <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 border-b border-zinc-200 pb-4">
                  <h2 id="dojo-kun-title" className="text-3xl font-black uppercase italic tracking-tighter">Dōjō Kun (道場訓)</h2>
                  <p className="text-red-600 font-black text-xs uppercase tracking-widest">Preceitos do Praticante</p>
               </div>
               <div className="space-y-8">
                  {DOJO_KUN.map((kun, i) => (
                    <div key={i} className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-l-4 border-zinc-200 hover:border-red-600 pl-6 transition-all">
                      <div className="flex-1">
                        <p className="text-lg font-black text-zinc-900 group-hover:text-red-600 transition-colors">{kun.japanese}</p>
                        <p className="text-sm font-bold text-zinc-500 mt-1 uppercase tracking-tight flex items-center">
                          <span className="text-red-600 mr-2" aria-hidden="true">➡</span>
                          {kun.portuguese}
                        </p>
                      </div>
                    </div>
                  ))}
               </div>
            </section>

            <section aria-labelledby="counting-title">
              <h2 id="counting-title" className="text-2xl font-black mb-6 uppercase italic">Contagem (Kazu)</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {COUNTING_CONTENT.map((c, i) => (
                  <div key={i} className="bg-zinc-900 text-white p-6 rounded-3xl shadow-lg text-center group hover:bg-red-600 transition-all duration-300">
                    <p className="text-4xl font-black mb-1 group-hover:scale-110 transition-transform">{c.n}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">{c.name}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === Section.TECHNICAL && (
          <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto">
            <header className="border-l-8 border-red-600 pl-8 py-2">
              <h1 className="text-5xl font-black tracking-tighter uppercase italic">Dachi-Waza</h1>
              <p className="text-zinc-500 font-bold uppercase tracking-widest">Bases Fundamentais</p>
            </header>
            
            <div className="space-y-6" role="list">
              {BASES.map((base, i) => (
                <ExpandableBaseCard 
                  key={i} 
                  id={`base-${i}`}
                  base={base} 
                  isOpen={expandedBaseId === i}
                  onToggle={() => setExpandedBaseId(expandedBaseId === i ? null : i)}
                />
              ))}
            </div>
          </div>
        )}

        {activeSection === Section.GRADUATION && (
          <div className="space-y-8 animate-fadeIn">
            <div 
              role="tablist"
              aria-label="Seleção de faixas"
              className="flex space-x-3 overflow-x-auto pb-8 no-scrollbar"
            >
              {BELTS.map((belt, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={selectedBelt?.color === belt.color}
                  aria-controls="belt-details-panel"
                  id={`belt-tab-${belt.color}`}
                  onClick={() => setSelectedBelt(belt)}
                  className={`flex items-center px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm border focus:outline-none focus-visible:ring-4 focus-visible:ring-red-600/50 ${
                    selectedBelt?.color === belt.color 
                    ? 'bg-zinc-950 text-white border-zinc-950' 
                    : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full mr-3 border border-black/10 ${getBeltColorIndicator(belt.color)}`} aria-hidden="true"></div>
                  {belt.color}
                </button>
              ))}
            </div>

            <div id="belt-details-panel" role="tabpanel" aria-labelledby={`belt-tab-${selectedBelt?.color}`}>
              {selectedBelt && <BeltDetailView belt={selectedBelt} />}
            </div>
          </div>
        )}

        {activeSection === Section.KATA && (
          <div className="space-y-16 animate-fadeIn">
            <header className="border-l-8 border-red-600 pl-8 py-2">
              <h1 className="text-5xl font-black tracking-tighter uppercase italic">Biblioteca de Katas</h1>
              <p className="text-zinc-500 font-bold uppercase tracking-widest">A Alma do Karatê Shotokan</p>
            </header>
            
            {KATAS_DETAILED.map((kata, i) => (
              <section key={i} className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-100 mb-16 last:mb-0" aria-labelledby={`kata-title-${i}`}>
                <div className="p-8 sm:p-12">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                    <div>
                      <h2 id={`kata-title-${i}`} className="text-6xl font-black text-zinc-900 tracking-tighter uppercase italic leading-none">{kata.name}</h2>
                      <p className="text-red-600 font-black uppercase tracking-[0.4em] text-xs mt-3">{kata.translation}</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-zinc-950 text-white p-6 rounded-3xl text-center min-w-[100px] shadow-lg">
                        <p className="text-[9px] uppercase font-black text-zinc-400 tracking-[0.2em] mb-1">Passos</p>
                        <p className="text-3xl font-black">{kata.kyodos}</p>
                      </div>
                      <div className="bg-red-600 text-white p-6 rounded-3xl text-center min-w-[100px] shadow-lg">
                        <p className="text-[9px] uppercase font-black text-red-200 tracking-[0.2em] mb-1">KIAI</p>
                        <p className="text-3xl font-black">{kata.kiai.join(' / ')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4 space-y-10">
                      <div className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 relative group">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-red-600 rounded-r-full" aria-hidden="true"></div>
                        <h3 className="text-xs uppercase font-black text-zinc-400 mb-4 tracking-[0.2em]">Descrição Técnica</h3>
                        <p className="text-sm text-zinc-700 leading-relaxed font-bold">{kata.description}</p>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-xs uppercase font-black text-red-600 mb-4 tracking-[0.2em]">Foco do Mestre</h3>
                        <p className="text-xl font-black text-zinc-900 leading-tight tracking-tight italic">"{kata.focus}"</p>
                      </div>
                    </div>

                    <div className="lg:col-span-8">
                       <KataMediaBox kata={kata} />
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
