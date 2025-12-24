
import { Section } from './types';
import { 
  HISTORY_CONTENT, 
  MEANING_CONTENT, 
  DOJO_KUN, 
  COUNTING_CONTENT, 
  BELTS, 
  BASES,
  KATAS_DETAILED
} from './data';

// --- Estado Global Simples ---
let activeSection: Section = Section.GRADUATION;
let selectedBeltIndex: number = 0;
let expandedBaseIndex: number | null = null;

// --- Utilitários de Renderização ---
function render() {
  const container = document.getElementById('content-area');
  if (!container) return;

  container.innerHTML = '';
  
  switch (activeSection) {
    case Section.HISTORY:
      container.innerHTML = renderHistory();
      break;
    case Section.BASICS:
      container.innerHTML = renderBasics();
      break;
    case Section.TECHNICAL:
      container.innerHTML = renderTechnical();
      break;
    case Section.GRADUATION:
      container.innerHTML = renderGraduation();
      break;
    case Section.KATA:
      container.innerHTML = renderKatas();
      break;
  }
  
  updateNav();
  attachEvents();
}

function updateNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const sections = [
    { id: Section.HISTORY, label: 'História' },
    { id: Section.BASICS, label: 'Fundamentos' },
    { id: Section.TECHNICAL, label: 'Bases' },
    { id: Section.GRADUATION, label: 'Graduação' },
    { id: Section.KATA, label: 'Katas' },
  ];

  nav.innerHTML = sections.map(s => `
    <button 
      data-section="${s.id}"
      class="flex flex-col items-center justify-center min-w-[80px] h-full transition-all relative group pt-1 ${activeSection === s.id ? 'tab-active' : 'text-zinc-500 hover:text-zinc-200'}"
    >
      <span class="text-[10px] font-black uppercase tracking-widest">${s.label}</span>
    </button>
  `).join('');
}

// --- Componentes de Conteúdo (Templates) ---

function renderHistory() {
  return `
    <div class="space-y-12 animate-fadeIn">
      <header class="border-l-8 border-red-600 pl-8 py-2">
        <h1 class="text-5xl font-black tracking-tighter uppercase italic">${HISTORY_CONTENT.title}</h1>
        <p class="text-xl text-zinc-500 mt-2 font-medium italic">"${HISTORY_CONTENT.funakoshiQuote}"</p>
      </header>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        ${HISTORY_CONTENT.founders.map(f => `
          <div class="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 hover:bg-zinc-900 hover:text-white transition-all group shadow-sm">
            <p class="font-black text-red-600 group-hover:text-red-500 text-lg uppercase tracking-tighter mb-2">${f.name}</p>
            <p class="text-xs text-zinc-500 group-hover:text-zinc-400 font-bold uppercase tracking-widest">${f.period}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderBasics() {
  return `
    <div class="space-y-12 animate-fadeIn">
      <header class="border-l-8 border-red-600 pl-8 py-2">
        <h1 class="text-5xl font-black tracking-tighter uppercase italic">Karatê-Do</h1>
        <p class="text-zinc-500 font-bold uppercase tracking-widest">Significado e Conduta</p>
      </header>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${MEANING_CONTENT.parts.map(p => `
          <div class="bg-zinc-900 text-white p-10 rounded-[3rem] text-center shadow-xl relative overflow-hidden group">
            <p class="text-7xl font-black mb-4 opacity-20">${p.kanji}</p>
            <p class="text-2xl font-black text-red-500 uppercase italic tracking-tighter">${p.romaji}</p>
            <p class="text-sm font-bold text-zinc-400 uppercase tracking-[0.3em] mt-2">${p.meaning}</p>
          </div>
        `).join('')}
      </div>

      <section class="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100 shadow-sm">
         <div class="flex flex-col md:flex-row justify-between items-baseline mb-10 border-b border-zinc-200 pb-4">
            <h2 class="text-3xl font-black uppercase italic tracking-tighter">Dōjō Kun (道場訓)</h2>
            <p class="text-red-600 font-black text-xs uppercase tracking-widest">Preceitos do Praticante</p>
         </div>
         <div class="space-y-8">
            ${DOJO_KUN.map(kun => `
              <div class="group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-l-4 border-zinc-200 hover:border-red-600 pl-6 transition-all">
                <div class="flex-1">
                  <p class="text-lg font-black text-zinc-900 group-hover:text-red-600 transition-colors">${kun.japanese}</p>
                  <p class="text-sm font-bold text-zinc-500 mt-1 uppercase tracking-tight">
                    <span class="text-red-600 mr-2">➡</span> ${kun.portuguese}
                  </p>
                </div>
              </div>
            `).join('')}
         </div>
      </section>
    </div>
  `;
}

function renderTechnical() {
  return `
    <div class="space-y-12 animate-fadeIn max-w-4xl mx-auto">
      <header class="border-l-8 border-red-600 pl-8 py-2">
        <h1 class="text-5xl font-black tracking-tighter uppercase italic">Dachi-Waza</h1>
        <p class="text-zinc-500 font-bold uppercase tracking-widest">Bases Fundamentais</p>
      </header>
      <div class="space-y-6">
        ${BASES.map((b, i) => `
          <div class="border border-zinc-100 rounded-[2rem] overflow-hidden bg-white shadow-sm">
            <button data-base-index="${i}" class="w-full flex items-center justify-between p-6 sm:p-8 text-left ${expandedBaseIndex === i ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}">
              <div class="flex items-baseline space-x-3">
                <h3 class="text-2xl font-black uppercase italic tracking-tighter">${b.name}</h3>
                <span class="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${expandedBaseIndex === i ? 'bg-red-600 text-white' : 'text-red-600 bg-red-50'}">Dachi</span>
              </div>
              <span class="transform transition-transform ${expandedBaseIndex === i ? 'rotate-180' : ''}">▼</span>
            </button>
            <div class="${expandedBaseIndex === i ? 'block' : 'hidden'} p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white border-t border-zinc-100">
               <img src="${b.imageUrl}" alt="${b.name}" class="w-full h-80 object-contain bg-zinc-50 rounded-[2rem] p-4">
               <div class="border-l-4 border-red-600 pl-6">
                 <h4 class="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">Descrição</h4>
                 <p class="text-lg text-zinc-700 font-medium">${b.description}</p>
               </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderGraduation() {
  const belt = BELTS[selectedBeltIndex];
  const beltColors: Record<string, string> = {
    'Branca': 'bg-zinc-200', 'Amarela': 'bg-yellow-400', 'Vermelha': 'bg-red-600',
    'Laranja': 'bg-orange-500', 'Verde': 'bg-green-600', 'Roxa': 'bg-purple-600',
    'Marrom': 'bg-amber-800', 'Preta': 'bg-black'
  };

  return `
    <div class="space-y-8 animate-fadeIn">
      <div class="flex space-x-3 overflow-x-auto pb-4 no-scrollbar">
        ${BELTS.map((b, i) => `
          <button data-belt-index="${i}" class="flex items-center px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm border ${selectedBeltIndex === i ? 'bg-zinc-950 text-white ring-4 ring-red-600/20' : 'bg-white text-zinc-600 border-zinc-200'}">
            <div class="w-3 h-3 rounded-full mr-3 border border-black/10 ${beltColors[b.color] || 'bg-zinc-400'}"></div>
            ${b.color}
          </button>
        `).join('')}
      </div>

      <div class="space-y-6 pb-10">
        <header class="bg-zinc-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
          <div class="flex justify-between items-start relative z-10">
            <div>
              <p class="text-red-500 font-black uppercase tracking-[0.3em] text-[10px] mb-1">Exame</p>
              <h2 class="text-4xl font-black tracking-tighter italic">Faixa ${belt.color}</h2>
            </div>
            <p class="text-xl font-black text-red-500">${belt.trainingTime}</p>
          </div>
          <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <div class="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p class="text-[9px] uppercase font-black text-red-500 mb-1">Significado</p>
              <p class="text-sm">${belt.meaning}</p>
            </div>
            <div class="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p class="text-[9px] uppercase font-black text-red-500 mb-1">Característica</p>
              <p class="text-sm">${belt.characteristic}</p>
            </div>
          </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 class="text-lg font-black text-red-600 mb-4 uppercase">Chutes Básicos</h3>
            <ul class="space-y-2 text-sm text-zinc-700">
              ${belt.chutes.map((c, i) => `<li class="flex items-start"><span class="mr-2 font-bold text-red-600">${i+1}.</span> ${c}</li>`).join('')}
            </ul>
          </section>
          <section class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 class="text-lg font-black text-zinc-900 mb-4 uppercase">Socos Básicos</h3>
            <ul class="space-y-2 text-sm text-zinc-700">
              ${belt.socos.map((s, i) => `<li class="flex items-start"><span class="mr-2 font-bold text-zinc-400">${i+1}.</span> ${s}</li>`).join('')}
            </ul>
          </section>
        </div>
      </div>
    </div>
  `;
}

function renderKatas() {
  return `
    <div class="space-y-16 animate-fadeIn">
      <header class="border-l-8 border-red-600 pl-8 py-2">
        <h1 class="text-5xl font-black tracking-tighter uppercase italic">Biblioteca de Katas</h1>
        <p class="text-zinc-500 font-bold uppercase tracking-widest">A Alma do Karatê</p>
      </header>
      
      ${KATAS_DETAILED.map(k => `
        <section class="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-100 mb-16">
          <div class="p-8 sm:p-12">
            <div class="flex flex-col md:flex-row justify-between items-baseline mb-8">
              <div>
                <h2 class="text-5xl font-black text-zinc-900 tracking-tighter uppercase italic">${k.name}</h2>
                <p class="text-red-600 font-black uppercase tracking-[0.4em] text-xs mt-2">${k.translation}</p>
              </div>
              <div class="flex gap-4 mt-4 md:mt-0">
                <div class="bg-zinc-950 text-white p-4 rounded-2xl text-center min-w-[80px]">
                  <p class="text-[8px] uppercase font-bold text-zinc-500 mb-1">Passos</p>
                  <p class="text-2xl font-black">${k.kyodos}</p>
                </div>
              </div>
            </div>
            <div class="bg-zinc-50 p-6 rounded-[2rem] border border-zinc-100 mb-6">
              <p class="text-zinc-700 text-sm italic">"${k.description}"</p>
            </div>
            <div class="aspect-video w-full rounded-[2rem] overflow-hidden bg-black shadow-inner">
               <iframe src="${k.videoUrl}" class="w-full h-full" allowfullscreen></iframe>
            </div>
          </div>
        </section>
      `).join('')}
    </div>
  `;
}

// --- Gestão de Eventos ---
function attachEvents() {
  // Navegação Principal
  document.querySelectorAll('[data-section]').forEach(btn => {
    // Cast Element to HTMLElement to fix 'Property onclick does not exist on type Element'
    (btn as HTMLElement).onclick = () => {
      activeSection = (btn as HTMLElement).dataset.section as Section;
      render();
    };
  });

  // Seleção de Faixas
  document.querySelectorAll('[data-belt-index]').forEach(btn => {
    // Cast Element to HTMLElement to fix 'Property onclick does not exist on type Element'
    (btn as HTMLElement).onclick = () => {
      selectedBeltIndex = parseInt((btn as HTMLElement).dataset.beltIndex || '0');
      render();
    };
  });

  // Acordeão de Bases
  document.querySelectorAll('[data-base-index]').forEach(btn => {
    // Cast Element to HTMLElement to fix 'Property onclick does not exist on type Element'
    (btn as HTMLElement).onclick = () => {
      const idx = parseInt((btn as HTMLElement).dataset.baseIndex || '0');
      expandedBaseIndex = expandedBaseIndex === idx ? null : idx;
      render();
    };
  });
}

// Iniciar App
document.addEventListener('DOMContentLoaded', render);
render(); // Chamada imediata para o ambiente de dev
