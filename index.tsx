
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

// --- Estado Global ---
let activeSection: Section = Section.GRADUATION;
let selectedBeltIndex: number = 0;
let expandedBaseIndex: number | null = null;

// --- Renderização Principal ---
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
    { id: Section.BASICS, label: 'Dojo' },
    { id: Section.TECHNICAL, label: 'Bases' },
    { id: Section.GRADUATION, label: 'Faixas' },
    { id: Section.KATA, label: 'Katas' },
  ];

  nav.innerHTML = sections.map(s => `
    <button 
      data-section="${s.id}"
      class="nav-link text-[11px] font-bold uppercase tracking-[0.15em] px-2 h-full ${activeSection === s.id ? 'nav-link-active' : 'text-zinc-400 hover:text-zinc-900'}"
    >
      ${s.label}
    </button>
  `).join('');
}

// --- Helpers de Template ---

function renderTechnicalList(title: string, items: string[], accentColor: string = 'text-zinc-400') {
  if (!items || items.length === 0) return '';
  return `
    <div class="space-y-4">
      <h3 class="text-[10px] font-extrabold ${accentColor} uppercase tracking-[0.2em] border-b border-zinc-50 pb-2">${title}</h3>
      <ul class="space-y-2.5">
        ${items.map(item => `
          <li class="flex items-start text-sm group">
            <span class="text-red-500 mr-2 font-black">/</span>
            <span class="text-zinc-600 font-medium leading-tight">${item}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
}

function renderKumiteSection(description: string, sequences: AttackDefenseSequence[]) {
  if (!description && (!sequences || sequences.length === 0)) return '';
  return `
    <section class="mt-20 pt-10 border-t border-zinc-100 space-y-10">
      <div class="space-y-2">
        <h3 class="text-xs font-bold text-zinc-900 uppercase tracking-widest">Kumite (Luta)</h3>
        ${description ? `<p class="text-sm text-zinc-500 italic">${description}</p>` : ''}
      </div>
      
      ${sequences && sequences.length > 0 ? `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${sequences.map((seq, i) => `
            <div class="p-6 rounded-2xl bg-zinc-50/50 border border-zinc-100 hover:border-red-100 transition-colors">
              <div class="flex items-center gap-3 mb-4">
                <span class="bg-zinc-900 text-white text-[9px] font-bold px-2 py-0.5 rounded">SEQ ${i+1}</span>
                <p class="text-sm font-bold text-zinc-800">${seq.ataque}</p>
              </div>
              <div class="pl-4 border-l border-zinc-200 space-y-3">
                ${seq.defesa ? `<p class="text-xs text-zinc-500"><strong class="text-zinc-800 uppercase text-[9px] block mb-0.5">Defesa</strong> ${seq.defesa}</p>` : ''}
                ${seq.contraAtaque ? `<p class="text-xs text-red-600 font-medium"><strong class="text-zinc-800 uppercase text-[9px] block mb-0.5">Contra-ataque</strong> ${seq.contraAtaque}</p>` : ''}
                ${seq.acao ? `<p class="text-xs text-zinc-500 leading-relaxed"><strong class="text-zinc-800 uppercase text-[9px] block mb-0.5">Ação Técnica</strong> ${seq.acao}</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </section>
  `;
}

// --- Templates Principais ---

function renderHistory() {
  return `
    <div class="animate-content space-y-16">
      <header class="text-center space-y-4">
        <h1 class="text-4xl font-extrabold tracking-tight text-zinc-900">${HISTORY_CONTENT.title}</h1>
        <p class="text-zinc-400 italic text-sm max-w-lg mx-auto leading-relaxed">"${HISTORY_CONTENT.funakoshiQuote}"</p>
      </header>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
        ${HISTORY_CONTENT.founders.map(f => `
          <div class="border-b border-zinc-100 pb-6 group">
            <h3 class="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">${f.period}</h3>
            <p class="text-lg font-semibold text-zinc-800 group-hover:text-zinc-900 transition-colors">${f.name}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderBasics() {
  return `
    <div class="animate-content space-y-20">
      <div class="grid grid-cols-3 gap-8">
        ${MEANING_CONTENT.parts.map(p => `
          <div class="text-center group">
            <p class="text-5xl font-light text-zinc-200 mb-4 group-hover:text-red-500 transition-colors duration-700">${p.kanji}</p>
            <p class="text-sm font-extrabold uppercase tracking-widest text-zinc-900">${p.romaji}</p>
            <p class="text-[10px] text-zinc-400 uppercase tracking-wider mt-1">${p.meaning}</p>
          </div>
        `).join('')}
      </div>

      <section class="space-y-12">
        <h2 class="text-center text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">Dōjō Kun</h2>
        <div class="space-y-8 max-w-2xl mx-auto">
          ${DOJO_KUN.map((kun, i) => `
            <div class="flex gap-6 items-start">
              <span class="text-zinc-200 font-extrabold text-2xl leading-none">0${i+1}</span>
              <div>
                <p class="text-sm font-bold text-zinc-900 mb-1">${kun.japanese}</p>
                <p class="text-xs text-zinc-500 leading-relaxed">${kun.portuguese}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="pt-10 border-t border-zinc-100">
        <div class="grid grid-cols-5 gap-4 text-center">
          ${COUNTING_CONTENT.map(c => `
            <div>
              <p class="text-xl font-bold text-zinc-800">${c.n}</p>
              <p class="text-[9px] text-zinc-400 uppercase font-bold tracking-tighter">${c.name}</p>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

function renderTechnical() {
  return `
    <div class="animate-content space-y-10">
      <header class="mb-12">
        <h1 class="text-3xl font-extrabold tracking-tight">Dachi-Waza</h1>
        <p class="text-zinc-400 text-sm mt-1">O segredo de um Karatê forte reside na sua base.</p>
      </header>
      <div class="space-y-2">
        ${BASES.map((b, i) => `
          <div class="group">
            <button data-base-index="${i}" class="w-full flex items-center justify-between py-6 px-4 rounded-xl transition-all hover:bg-white hover:shadow-sm ${expandedBaseIndex === i ? 'bg-white shadow-sm' : ''}">
              <span class="text-sm font-bold tracking-tight ${expandedBaseIndex === i ? 'text-red-500' : 'text-zinc-600 group-hover:text-zinc-900'}">${b.name}</span>
              <svg class="w-4 h-4 text-zinc-300 transition-transform ${expandedBaseIndex === i ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="${expandedBaseIndex === i ? 'max-h-[800px] opacity-100 py-8' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-500 px-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div class="bg-white p-4 rounded-2xl border border-zinc-50">
                  <img src="${b.imageUrl}" alt="${b.name}" class="w-full h-48 object-contain">
                </div>
                <div class="space-y-3">
                  <p class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Anotações técnicas</p>
                  <p class="text-sm text-zinc-600 leading-relaxed font-medium">${b.description}</p>
                </div>
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
    'Branca': 'bg-zinc-100', 'Amarela': 'bg-yellow-400', 'Vermelha': 'bg-red-500',
    'Laranja': 'bg-orange-400', 'Verde': 'bg-green-500', 'Roxa': 'bg-purple-500',
    'Marrom': 'bg-amber-800', 'Preta': 'bg-zinc-900'
  };

  // Unifica socos e ataques de braço para o Kihon
  const braçoTrabalho = [...(belt.socos || []), ...(belt.ataqueBraco || [])];

  return `
    <div class="animate-content space-y-12">
      <div class="flex space-x-2 overflow-x-auto no-scrollbar py-2">
        ${BELTS.map((b, i) => `
          <button data-belt-index="${i}" class="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${selectedBeltIndex === i ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300'}">
            <span class="inline-block w-2 h-2 rounded-full mr-2 ${beltColors[b.color] || 'bg-zinc-200'}"></span>
            ${b.color}
          </button>
        `).join('')}
      </div>

      <div class="space-y-16">
        <header class="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-zinc-100 pb-10">
          <div class="space-y-1">
            <h2 class="text-4xl font-extrabold text-zinc-900 tracking-tight">Faixa ${belt.color}</h2>
            <p class="text-xs font-bold text-red-500 uppercase tracking-[0.2em]">${belt.kyu ? belt.kyu + ' Kyu' : 'Grau Dan'}</p>
          </div>
          <div class="flex gap-8 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <div>
              <p class="text-[8px] opacity-60 mb-1">Tempo Mínimo</p>
              <p class="text-zinc-900">${belt.trainingTime}</p>
            </div>
            <div>
              <p class="text-[8px] opacity-60 mb-1">Conceito</p>
              <p class="text-zinc-900">${belt.meaning}</p>
            </div>
          </div>
        </header>

        <section class="space-y-12">
          <div class="space-y-4">
            <h3 class="text-xs font-bold text-zinc-900 uppercase tracking-widest">Kihon (Trabalho Técnico)</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
              ${renderTechnicalList("Ataques de Braço", braçoTrabalho, "text-zinc-900")}
              ${renderTechnicalList("Chutes", belt.chutes || [], "text-red-500")}
              ${renderTechnicalList("Defesas", belt.defesas || [], "text-zinc-900")}
              ${renderTechnicalList("Troca de Perna / Tobi", belt.trocaPerna || [])}
              ${renderTechnicalList("Recuos Técnicos", belt.recuos || [])}
              ${renderTechnicalList("Sequências", belt.sequenciasTecnicas || [])}
            </div>
          </div>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-2 gap-16 pt-10 border-t border-zinc-100">
          <div class="space-y-4">
            <h3 class="text-xs font-bold text-zinc-900 uppercase tracking-widest">Kata da Graduação</h3>
            <p class="text-lg font-bold text-zinc-800">${belt.kata}</p>
            ${belt.observacaoKata ? `<p class="text-xs text-zinc-400 leading-relaxed italic">${belt.observacaoKata}</p>` : ''}
          </div>
          <div class="space-y-4">
            <h3 class="text-xs font-bold text-zinc-900 uppercase tracking-widest">Característica</h3>
            <p class="text-sm text-zinc-500 leading-relaxed font-medium">${belt.characteristic}</p>
          </div>
        </section>

        ${renderKumiteSection(belt.kumite || '', belt.ataqueDefesaSequences || [])}
      </div>
    </div>
  `;
}

function renderKatas() {
  return `
    <div class="animate-content space-y-12">
      <header class="mb-16">
        <h1 class="text-3xl font-extrabold tracking-tight">Katas</h1>
        <p class="text-zinc-400 text-sm mt-1">A alma do Shotokan.</p>
      </header>
      
      <div class="space-y-24">
        ${KATAS_DETAILED.map(k => `
          <div class="group space-y-8">
            <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-zinc-100 pb-6">
              <div>
                <h2 class="text-4xl font-extrabold text-zinc-900 tracking-tighter">${k.name}</h2>
                <p class="text-xs font-bold text-red-500 uppercase tracking-[0.3em] mt-1">${k.translation}</p>
              </div>
              <div class="text-right">
                <span class="text-[10px] font-black text-zinc-300 uppercase tracking-widest">${k.kyodos} Movimentos</span>
              </div>
            </div>
            <p class="text-sm text-zinc-500 leading-relaxed max-w-2xl">${k.description}</p>
            <div class="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 group-hover:border-red-100 transition-colors">
               <iframe src="${k.videoUrl}" class="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" allowfullscreen></iframe>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// --- Gestão de Eventos ---
function attachEvents() {
  document.querySelectorAll('[data-section]').forEach(btn => {
    (btn as HTMLElement).onclick = () => {
      activeSection = (btn as HTMLElement).dataset.section as Section;
      expandedBaseIndex = null;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      render();
    };
  });

  document.querySelectorAll('[data-belt-index]').forEach(btn => {
    (btn as HTMLElement).onclick = () => {
      selectedBeltIndex = parseInt((btn as HTMLElement).dataset.beltIndex || '0');
      render();
    };
  });

  document.querySelectorAll('[data-base-index]').forEach(btn => {
    (btn as HTMLElement).onclick = () => {
      const idx = parseInt((btn as HTMLElement).dataset.baseIndex || '0');
      expandedBaseIndex = expandedBaseIndex === idx ? null : idx;
      render();
    };
  });
}

// Iniciar App
document.addEventListener('DOMContentLoaded', render);
render();
