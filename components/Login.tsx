import React, { useState } from 'react';
import { TipoUsuario, Usuario, Aluno } from '../types';
import { DbService } from '../services/db';
import { Shield, User, Lock, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (usuario: Usuario, aluno?: Aluno | null) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState<TipoUsuario>(TipoUsuario.ALUNO);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const usuarios = DbService.getUsuarios();
    const user = usuarios.find(u => u.email === email && u.senha === senha);

    if (!user) {
      setError('Credenciais inválidas.');
      return;
    }

    if (user.tipo_usuario !== tipo) {
      setError(`Este usuário não é um ${tipo}.`);
      return;
    }

    if (user.tipo_usuario === TipoUsuario.ALUNO) {
      const alunos = DbService.getAlunos();
      const aluno = alunos.find(a => a.id_usuario === user.id);
      if (!aluno) {
        setError('Registro de aluno não encontrado para este usuário.');
        return;
      }
      onLogin(user, aluno);
    } else {
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-red-700 p-8 text-center">
          <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Dojo Master</h1>
          <p className="text-red-100">Entre para continuar seu treinamento</p>
        </div>

        <div className="p-8">
          <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setTipo(TipoUsuario.ALUNO)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                tipo === TipoUsuario.ALUNO ? 'bg-white text-red-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sou Aluno
            </button>
            <button
              onClick={() => setTipo(TipoUsuario.ADMINISTRADOR)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                tipo === TipoUsuario.ADMINISTRADOR ? 'bg-white text-red-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sou Sensei/Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">E-mail</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 group"
            >
              Entrar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Dica: Use <b>admin@dojo.com</b> / <b>123</b> para Admin<br/>
              ou <b>joao@dojo.com</b> / <b>123</b> para Aluno
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};