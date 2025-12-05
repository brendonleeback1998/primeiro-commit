import { Usuario, Aluno, Graduacao, Exame, TipoUsuario } from '../types';

// Dados Iniciais (Seeds)
const INITIAL_USUARIOS: Usuario[] = [
  { id: 'u1', email: 'admin@dojo.com', senha: '123', tipo_usuario: TipoUsuario.ADMINISTRADOR },
  { id: 'u2', email: 'joao@dojo.com', senha: '123', tipo_usuario: TipoUsuario.ALUNO },
  { id: 'u3', email: 'maria@dojo.com', senha: '123', tipo_usuario: TipoUsuario.ALUNO },
];

const INITIAL_ALUNOS: Aluno[] = [
  { 
    id_aluno: 'a1', id_usuario: 'u2', nome: 'João Silva', data_nascimento: '1995-05-20', 
    telefone: '(11) 99999-9999', faixa_atual: 'Faixa Amarela', data_entrada: '2023-01-15', observacoes: 'Aluno dedicado.' 
  },
  { 
    id_aluno: 'a2', id_usuario: 'u3', nome: 'Maria Oliveira', data_nascimento: '2000-10-10', 
    telefone: '(11) 98888-8888', faixa_atual: 'Faixa Branca', data_entrada: '2023-06-01', observacoes: 'Precisa melhorar o kata.' 
  },
];

const INITIAL_GRADUACOES: Graduacao[] = [
  { id_graduacao: 'g1', nome_faixa: 'Faixa Branca', ordem: 1, requisitos: 'Iniciante.', cor_hex: '#f8f9fa' },
  { id_graduacao: 'g2', nome_faixa: 'Faixa Amarela', ordem: 2, requisitos: 'Kata Heian Shodan. 3 meses de treino.', cor_hex: '#fbbf24' },
  { id_graduacao: 'g3', nome_faixa: 'Faixa Vermelha', ordem: 3, requisitos: 'Kata Heian Nidan. 4 meses de treino.', cor_hex: '#ef4444' },
  { id_graduacao: 'g4', nome_faixa: 'Faixa Laranja', ordem: 4, requisitos: 'Kata Heian Sandan. 6 meses de treino.', cor_hex: '#f97316' },
  { id_graduacao: 'g5', nome_faixa: 'Faixa Verde', ordem: 5, requisitos: 'Kata Heian Yondan. 6 meses de treino.', cor_hex: '#22c55e' },
  { id_graduacao: 'g6', nome_faixa: 'Faixa Roxa', ordem: 6, requisitos: 'Kata Heian Godan. 8 meses de treino.', cor_hex: '#a855f7' },
  { id_graduacao: 'g7', nome_faixa: 'Faixa Marrom', ordem: 7, requisitos: 'Kata Tekki Shodan. 1 ano de treino.', cor_hex: '#78350f' },
  { id_graduacao: 'g8', nome_faixa: 'Faixa Preta', ordem: 8, requisitos: 'Todos os Katas básicos. 2 anos de marrom.', cor_hex: '#000000' },
];

const INITIAL_EXAMES: Exame[] = [
  { id_exame: 'e1', id_aluno: 'a1', faixa_avaliada: 'Faixa Amarela', data: '2023-06-20', resultado: 'Aprovado', observacoes: 'Excelente técnica.' },
];

// Helper para LocalStorage
const getStorage = <T>(key: string, initial: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

const setStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Classe "Database" simulada
export class DbService {
  static getUsuarios(): Usuario[] { return getStorage('usuarios', INITIAL_USUARIOS); }
  static getAlunos(): Aluno[] { return getStorage('alunos', INITIAL_ALUNOS); }
  static getGraduacoes(): Graduacao[] { return getStorage('graduacoes', INITIAL_GRADUACOES).sort((a, b) => a.ordem - b.ordem); }
  static getExames(): Exame[] { return getStorage('exames', INITIAL_EXAMES); }

  static saveUsuarios(data: Usuario[]) { setStorage('usuarios', data); }
  static saveAlunos(data: Aluno[]) { setStorage('alunos', data); }
  static saveGraduacoes(data: Graduacao[]) { setStorage('graduacoes', data); }
  static saveExames(data: Exame[]) { setStorage('exames', data); }

  static addAluno(aluno: Aluno, usuario: Usuario) {
    const usuarios = this.getUsuarios();
    const alunos = this.getAlunos();
    this.saveUsuarios([...usuarios, usuario]);
    this.saveAlunos([...alunos, aluno]);
  }

  static updateAluno(updatedAluno: Aluno) {
    const alunos = this.getAlunos().map(a => a.id_aluno === updatedAluno.id_aluno ? updatedAluno : a);
    this.saveAlunos(alunos);
  }
  
  static deleteAluno(id: string) {
    const alunos = this.getAlunos().filter(a => a.id_aluno !== id);
    this.saveAlunos(alunos);
    // Nota: Em um app real, deletaríamos o usuário também, mas vou simplificar.
  }

  static addExame(exame: Exame) {
    const exames = this.getExames();
    this.saveExames([...exames, exame]);
  }

  static updateGraduacao(grad: Graduacao) {
    const graduacoes = this.getGraduacoes().map(g => g.id_graduacao === grad.id_graduacao ? grad : g);
    this.saveGraduacoes(graduacoes);
  }
}