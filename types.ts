export enum TipoUsuario {
  ALUNO = 'Aluno',
  ADMINISTRADOR = 'Administrador',
}

export interface Usuario {
  id: string;
  email: string;
  senha: string;
  tipo_usuario: TipoUsuario;
}

export interface Aluno {
  id_aluno: string;
  id_usuario: string;
  nome: string;
  data_nascimento: string;
  telefone: string;
  faixa_atual: string; // Nome da faixa
  data_entrada: string;
  observacoes: string;
}

export interface Graduacao {
  id_graduacao: string;
  nome_faixa: string;
  ordem: number; // 1 = Branca, 2 = Amarela...
  requisitos: string;
  cor_hex: string; // Para UI
}

export interface Exame {
  id_exame: string;
  id_aluno: string;
  faixa_avaliada: string;
  data: string;
  resultado: 'Aprovado' | 'Reprovado' | 'Pendente';
  observacoes: string;
}

// Helper para o contexto de sessão
export interface Sessao {
  usuario: Usuario | null;
  aluno?: Aluno | null; // Se for aluno
}