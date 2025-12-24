
export enum Section {
  HISTORY = 'História',
  BASICS = 'Conceitos Básicos',
  TECHNICAL = 'Técnicas',
  GRADUATION = 'Graduação (Faixas)',
  KATA = 'Lista de Katas'
}

export interface KihonSequence {
  name: string;
  moves: string;
}

export interface AttackDefenseSequence {
  ataque: string;
  defesa?: string;
  contraAtaque?: string;
  acao?: string; // Flexible field for complex sequences
}

export interface BaseInfo {
  name: string;
  description: string;
  imageUrl: string;
}

export interface KataDetails {
  name: string;
  bases: string;
  defesas?: string;
  ataques?: string;
  duracao: string;
  kyodos: number;
  kiai: string;
}

export interface BeltRequirement {
  color: string;
  kyu?: string;
  dan?: string;
  trainingTime: string;
  meaning: string;
  characteristic: string;
  kihon: KihonSequence[];
  kumite: string;
  kata: string;
  chutes: string[];
  socos: string[];
  defesas: string[];
  ataqueBraco?: string[];
  trocaPerna?: string[]; // Para Troca de Perna / Chutes com Salto
  recuos?: string[]; // Para seções de recuo técnico
  sequenciasTecnicas?: string[]; // Para Sequências complexas
  ataqueDefesaSequences?: AttackDefenseSequence[];
  kataDetails?: KataDetails; // Legado para compatibilidade
  katasDetails?: KataDetails[]; // Novo para múltiplos katas (ex: Faixa Roxa)
  observacaoKata?: string; // Nota para explicação de Bunkai
}

export interface KataInfo {
  name: string;
  translation: string;
  kyodos: number;
  kiai: number[];
  description: string;
  focus: string;
  videoUrl: string;
  diagramUrl: string; 
}
