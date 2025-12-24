
import React, { useState, useEffect } from 'react';
import { Section, BeltRequirement, KataInfo, BaseInfo, AttackDefenseSequence, KataDetails } from './types';
import { 
  HISTORY_CONTENT, 
  MEANING_CONTENT, 
  OATH_CONTENT, 
  COUNTING_CONTENT, 
  BELTS, 
  BASES,
  KATAS_DETAILED
} from './data';

const Icons = {
  History: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  Basics: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  Technical: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012 2v1h-6V9a2 2 0 012-2z" /></svg>
  ),
  Graduation: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
  ),
  Kata: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
};

const KataDetailCard: React.FC<{ kata: KataDetails, index: number }> = ({ kata, index }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-red-600 mb-4 last:mb-0">
    <div className="flex justify-between items-end mb-6">
      <div>
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kata {index + 1} da Graduação</h3>
        <p className="text-3xl font-black text-gray-900">{kata.name}</p>
      </div>
      <div className="text-right">
        <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-bold">{kata.kyodos} Movimentos</span>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <div className="space-y-3">
        <p><strong className="text-gray-400 uppercase text-[9px] block">Bases</strong> {kata.bases}</p>
        {kata.defesas && <p><strong className="text-gray-400 uppercase text-[9px] block">Defesas</strong> {kata.defesas}</p>}
      </div>
      <div className="space-y-3">
        {kata.ataques && <p><strong className="text-gray-400 uppercase text-[9px] block">Ataques</strong> {kata.ataques}</p>}
        <p><strong className="text-gray-400 uppercase text-[9px] block">KIAI</strong> {kata.kiai}</p>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t text-center">
       <p className="text-[10px] text-gray-400 font-medium italic">Duração aproximada: {kata.duracao}</p>
    </div>
  </div>
);

const BeltDetailView: React.FC<{ belt: BeltRequirement }> = ({ belt }) => {
  const beltColors: Record<string, string> = {
    "Branca": "bg-white text-gray-800 border-2 border-gray-200",
    "Amarela": "bg-yellow-400 text-yellow-900",
    "Vermelha": "bg-red-600 text-white",
    "Laranja": "bg-orange-500 text-white",
    "Verde": "bg-green-600 text-white",
    "Roxa": "bg-purple-600 text-white",
    "Marrom": "bg-amber-800 text-white",
    "Preta": "bg-gray-900 text-white"
  };

  const isLaranja = belt.color === 'Laranja';
  const isVerde = belt.color === 'Verde';
  const isRoxa = belt.color === 'Roxa';
  const isMarrom = belt.color === 'Marrom';
  const isPreta = belt.color === 'Preta';

  const renderChutesSocos = (numChutes: number, numSocos: number) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${belt.socos.length === 0 ? 'grid-cols-1' : ''}`}>
      {belt.chutes.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-red-600 mb-4 uppercase tracking-tighter">{numChutes}. Chutes Básicos</h3>
          <ul className="space-y-2">
            {belt.chutes.map((c, i) => (
              <li key={i} className="flex items-start text-sm text-gray-700">
                <span className="w-6 h-6 flex-shrink-0 bg-red-50 text-red-600 rounded flex items-center justify-center text-[10px] font-bold mr-2">{i+1}</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
      {belt.socos.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-blue-600 mb-4 uppercase tracking-tighter">{numSocos}. Socos Básicos</h3>
          <ul className="space-y-2">
            {belt.socos.map((s, i) => (
              <li key={i} className="flex items-start text-sm text-gray-700">
                <span className="w-6 h-6 flex-shrink-0 bg-blue-50 text-blue-600 rounded flex items-center justify-center text-[10px] font-bold mr-2">{i+1}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderTrocaPerna = (num: number) => (
    belt.trocaPerna && belt.trocaPerna.length > 0 && (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-emerald-600 mb-4 uppercase tracking-tighter">
          {num}. Troca de Perna {belt.color === 'Vermelha' || belt.color === 'Laranja' || belt.color === 'Verde' || belt.color === 'Roxa' || belt.color === 'Marrom' ? '(Técnica)' : ''}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {belt.trocaPerna.map((t, i) => (
            <div key={i} className="p-3 bg-emerald-50 rounded-lg text-sm text-emerald-800 flex items-center">
              <span className="font-bold opacity-40 mr-2 text-xs">{i+1}.</span>
              {t}
            </div>
          ))}
        </div>
      </div>
    )
  );

  const renderSequencias = (num: number) => (
    belt.sequenciasTecnicas && belt.sequenciasTecnicas.length > 0 && (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-indigo-600 mb-4 uppercase tracking-tighter">{num}. Sequências</h3>
        <div className="space-y-2">
          {belt.sequenciasTecnicas.map((seq, i) => (
            <div key={i} className="flex items-center text-sm text-gray-700 bg-indigo-50/50 p-2 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-3"></div>
              {seq}
            </div>
          ))}
        </div>
      </div>
    )
  );

  const renderRecuos = (num: number) => (
    belt.recuos && belt.recuos.length > 0 && (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-rose-600 mb-4 uppercase tracking-tighter">{num}. Recuos</h3>
        <div className="space-y-2">
          {belt.recuos.map((r, i) => (
            <div key={i} className="flex items-center text-sm text-gray-700 bg-rose-50/50 p-2 rounded-lg border-l-2 border-rose-400">
              <span className="font-bold opacity-40 mr-2 text-xs">{i+1}.</span>
              {r}
            </div>
          ))}
        </div>
      </div>
    )
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      {/* Header Info */}
      <div className={`p-6 rounded-2xl shadow-sm ${beltColors[belt.color]}`}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold">Faixa {belt.color}</h2>
            <p className="text-sm font-bold opacity-80 uppercase tracking-widest">{belt.kyu ? belt.kyu + " Kyu" : "Dan"}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold opacity-60">Tempo Estimado</p>
            <p className="font-bold">{belt.trainingTime}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-black/5 p-3 rounded-lg">
            <p className="text-[10px] uppercase font-bold opacity-60">Significado</p>
            <p className="text-sm font-medium">{belt.meaning}</p>
          </div>
          <div className="bg-black/5 p-3 rounded-lg">
            <p className="text-[10px] uppercase font-bold opacity-60">Característica</p>
            <p className="text-sm font-medium">{belt.characteristic}</p>
          </div>
        </div>
      </div>

      {/* Conditional Order Rendering based on Belt Curriculum */}
      {isLaranja ? (
        <>
          {renderTrocaPerna(1)}
          {renderSequencias(2)}
          {renderRecuos(3)}
          {renderChutesSocos(4, 0)}
        </>
      ) : isVerde ? (
        <>
          {renderChutesSocos(1, 0)}
          {renderSequencias(2)}
          {renderRecuos(3)}
          {renderTrocaPerna(4)}
        </>
      ) : isRoxa || isMarrom ? (
        <>
          {renderChutesSocos(1, 0)}
          {renderTrocaPerna(2)}
          {renderSequencias(3)}
          {renderRecuos(4)}
        </>
      ) : isPreta ? (
        /* Preta only shows Attack/Defense and Katas in the prompt */
        null
      ) : (
        <>
          {renderChutesSocos(1, 2)}
          {renderTrocaPerna(belt.color === 'Vermelha' ? 2 : 3)}
          {renderRecuos(belt.color === 'Vermelha' ? 3 : 0)}
          {renderSequencias(4)}
        </>
      )}

      {belt.defesas.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-tighter">Defesas Básicas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {belt.defesas.map((d, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 flex items-center">
                <span className="font-bold text-gray-400 mr-2 text-xs">{i+1}.</span>
                {d}
              </div>
            ))}
          </div>
        </div>
      )}

      {belt.ataqueBraco && belt.ataqueBraco.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-amber-600 mb-4 uppercase tracking-tighter">Ataques de Braço</h3>
          <div className="space-y-2">
            {belt.ataqueBraco.map((a, i) => (
              <p key={i} className="text-sm font-medium text-gray-800 border-l-2 border-amber-500 pl-3 py-1 bg-amber-50/50">{a}</p>
            ))}
          </div>
        </div>
      )}

      {/* Partner Drills (Ataque e Defesa) */}
      {belt.ataqueDefesaSequences && (
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <span className="w-2 h-8 bg-red-600 mr-3"></span>
            {isPreta ? '1.' : '5.'} Ataque e Defesa
          </h3>
          <div className="space-y-6">
            {belt.ataqueDefesaSequences.map((seq, i) => (
              <div key={i} className="border-b border-gray-800 pb-6 last:border-0">
                <div className="flex items-center space-x-2 mb-2">
                   <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded">SEQ {i+1}</span>
                   <p className="text-red-400 text-xs font-bold uppercase tracking-widest">Ataque: {seq.ataque}</p>
                </div>
                <div className="space-y-2 ml-4 border-l border-gray-700 pl-4">
                  {seq.acao ? (
                    <p className="text-sm text-gray-300 leading-relaxed"><strong className="text-gray-100 font-bold uppercase text-[10px]">Defesa/Ação:</strong> {seq.acao}</p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-300 leading-relaxed"><strong className="text-gray-100 font-bold uppercase text-[10px]">Defesa:</strong> {seq.defesa}</p>
                      <p className="text-sm text-red-300 leading-relaxed"><strong className="text-white font-bold uppercase text-[10px]">Contra-ataque:</strong> {seq.contraAtaque}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kata Info for this belt */}
      <div className="space-y-4">
        {isPreta && belt.kata && (
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-gray-900">
             <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">2. Katas da Graduação</h3>
             <p className="text-sm text-gray-700 leading-relaxed">
               {belt.kata}
             </p>
           </div>
        )}
        
        {belt.kataDetails && <KataDetailCard kata={belt.kataDetails} index={0} />}
        {belt.katasDetails && belt.katasDetails.map((k, i) => <KataDetailCard key={i} kata={k} index={i} />)}
        
        {belt.observacaoKata && (
          <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-center">
            <p className="text-xs text-red-800 font-medium"><strong>Obs:</strong> {belt.observacaoKata}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Component to handle individual Kata media (Video vs Diagram toggle)
const KataMediaBox: React.FC<{ kata: KataInfo }> = ({ kata }) => {
  const [view, setView] = useState<'video' | 'diagram'>('video');

  return (
    <div className="flex flex-col h-full">
      <div className="flex space-x-2 mb-4 bg-gray-100 p-1 rounded-xl w-fit self-center lg:self-start">
        <button 
          onClick={() => setView('video')}
          className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${view === 'video' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Vídeo Aula
        </button>
        <button 
          onClick={() => setView('diagram')}
          className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${view === 'diagram' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Diagrama (Enbusen)
        </button>
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center min-h-[280px]">
        {view === 'video' ? (
          <iframe 
            src={kata.videoUrl} 
            className="w-full h-full aspect-video"
            title={`Demonstração de ${kata.name}`}
            allowFullScreen
          ></iframe>
        ) : (
          <div className="p-4 flex flex-col items-center justify-center w-full h-full group">
             <img 
               src={kata.diagramUrl} 
               alt={`Diagrama ${kata.name}`} 
               className="max-w-full max-h-[400px] object-contain transition-transform duration-300 group-hover:scale-105"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = `https://placehold.co/600x400/f3f4f6/9ca3af?text=Diagrama+${kata.name.replace(' ', '+')}`;
               }}
             />
             <p className="mt-4 text-[9px] text-gray-400 font-bold uppercase tracking-widest">Clique para ampliar (em breve)</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component managing navigation between sections
const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.GRADUATION);
  const [selectedBelt, setSelectedBelt] = useState<BeltRequirement | null>(BELTS[0]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setActiveSection(Section.HISTORY)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${activeSection === Section.HISTORY ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Icons.History />
              <span className="text-sm font-bold">História</span>
            </button>
            <button 
              onClick={() => setActiveSection(Section.BASICS)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${activeSection === Section.BASICS ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Icons.Basics />
              <span className="text-sm font-bold">Básicos</span>
            </button>
            <button 
              onClick={() => setActiveSection(Section.TECHNICAL)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${activeSection === Section.TECHNICAL ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Icons.Technical />
              <span className="text-sm font-bold">Bases</span>
            </button>
            <button 
              onClick={() => setActiveSection(Section.GRADUATION)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${activeSection === Section.GRADUATION ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Icons.Graduation />
              <span className="text-sm font-bold">Graduação</span>
            </button>
            <button 
              onClick={() => setActiveSection(Section.KATA)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${activeSection === Section.KATA ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Icons.Kata />
              <span className="text-sm font-bold">Katas</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        {/* History Section */}
        {activeSection === Section.HISTORY && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h1 className="text-4xl font-black mb-4 tracking-tight">{HISTORY_CONTENT.title}</h1>
              <p className="text-lg italic text-gray-600 mb-6">"{HISTORY_CONTENT.funakoshiQuote}"</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {HISTORY_CONTENT.founders.map((founder, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="font-bold text-red-600">{founder.name}</p>
                    <p className="text-sm text-gray-500">{founder.period}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Basics Section */}
        {activeSection === Section.BASICS && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h2 className="text-2xl font-bold mb-4">{MEANING_CONTENT.title}</h2>
              <div className="flex space-x-4">
                {MEANING_CONTENT.parts.map((part, i) => (
                  <div key={i} className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-3xl mb-1">{part.kanji}</p>
                    <p className="text-sm font-bold text-red-600">{part.romaji}</p>
                    <p className="text-xs text-gray-500">{part.meaning}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Juramento do Dojo</h2>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <ol className="space-y-3">
                  {OATH_CONTENT.map((oath, i) => (
                    <li key={i} className="flex items-center text-sm font-medium">
                      <span className="w-6 h-6 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-[10px] font-bold mr-3">{i+1}</span>
                      {oath}
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contagem</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {COUNTING_CONTENT.map((c, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-xl font-black text-gray-900">{c.n}</p>
                    <p className="text-sm text-red-600 font-bold">{c.name}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Bases Section */}
        {activeSection === Section.TECHNICAL && (
          <div className="space-y-8 animate-fadeIn">
             <div className="flex flex-col sm:flex-row justify-between items-end mb-8">
               <h2 className="text-3xl font-black">Bases Fundamentais (Dachi)</h2>
               <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter hidden sm:block">Demonstração Técnica</p>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               {BASES.map((base, i) => (
                 <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group transition-all hover:shadow-lg">
                   <div className="h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                     <img 
                       src={base.imageUrl} 
                       alt={base.name} 
                       className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                       onError={(e) => {
                         (e.target as HTMLImageElement).src = `https://placehold.co/400x600/f3f4f6/9ca3af?text=${base.name.replace(' ', '+')}`;
                       }}
                     />
                   </div>
                   <div className="p-6 border-t border-gray-50">
                     <div className="flex items-center justify-between mb-2">
                       <h3 className="font-black text-xl text-gray-900 tracking-tight">{base.name}</h3>
                       <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">Dachi</span>
                     </div>
                     <p className="text-sm text-gray-600 leading-relaxed font-medium">{base.description}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* Graduation Section */}
        {activeSection === Section.GRADUATION && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
              {BELTS.map((belt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedBelt(belt)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap shadow-sm border ${
                    selectedBelt?.color === belt.color 
                    ? 'ring-2 ring-red-600 ring-offset-2 scale-105 bg-red-600 text-white' 
                    : 'bg-white text-gray-600 border-gray-200 opacity-60'
                  }`}
                >
                  {belt.color}
                </button>
              ))}
            </div>

            {selectedBelt && <BeltDetailView belt={selectedBelt} />}
          </div>
        )}

        {/* Katas Section */}
        {activeSection === Section.KATA && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-8">
               <h2 className="text-3xl font-black">Biblioteca de Katas</h2>
               <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter hidden sm:block">Shotokan Technical Guide</p>
            </div>
            
            {KATAS_DETAILED.map((kata, i) => (
              <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 mb-12 last:mb-0 transition-all hover:shadow-md">
                <div className="p-6 md:p-10">
                  {/* Kata Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                      <h3 className="text-4xl font-black text-gray-900 tracking-tight">{kata.name}</h3>
                      <p className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs mt-1">{kata.translation}</p>
                    </div>
                    <div className="flex space-x-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <div className="text-center px-4">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Kyodos</p>
                        <p className="text-2xl font-black text-gray-800">{kata.kyodos}</p>
                      </div>
                      <div className="w-px h-8 bg-gray-200 self-center"></div>
                      <div className="text-center px-4">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Kiai</p>
                        <p className="text-2xl font-black text-red-600">{kata.kiai.join(' & ')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Kata Text Info */}
                    <div className="lg:col-span-2 space-y-8">
                      <div className="relative">
                        <div className="absolute -left-4 top-0 w-1 h-12 bg-red-600 rounded-full opacity-20"></div>
                        <h4 className="text-[10px] uppercase font-black text-gray-400 mb-3 tracking-widest">Sobre o Kata</h4>
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">{kata.description}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <h4 className="text-[10px] uppercase font-black text-gray-400 mb-3 tracking-widest">Foco do Treinamento</h4>
                        <p className="text-sm text-gray-700 leading-relaxed italic">"{kata.focus}"</p>
                      </div>
                    </div>

                    {/* Kata Media (Interactive Video/Diagram Box) */}
                    <div className="lg:col-span-3">
                       <KataMediaBox kata={kata} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
