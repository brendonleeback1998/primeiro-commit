import React, { useState } from 'react';
import { Sessao, Usuario, Aluno, TipoUsuario } from './types';
import { Login } from './components/Login';
import { AdminPanel } from './components/AdminPanel';
import { StudentPanel } from './components/StudentPanel';

const App: React.FC = () => {
  const [sessao, setSessao] = useState<Sessao | null>(null);

  const handleLogin = (usuario: Usuario, aluno?: Aluno | null) => {
    setSessao({ usuario, aluno });
  };

  const handleLogout = () => {
    setSessao(null);
  };

  // Se não houver sessão, exibe login
  if (!sessao) {
    return <Login onLogin={handleLogin} />;
  }

  // Se for admin, exibe painel admin
  if (sessao.usuario?.tipo_usuario === TipoUsuario.ADMINISTRADOR) {
    return <AdminPanel onLogout={handleLogout} />;
  }

  // Se for aluno (e tiver dados de aluno), exibe painel aluno
  if (sessao.usuario?.tipo_usuario === TipoUsuario.ALUNO && sessao.aluno) {
    return <StudentPanel aluno={sessao.aluno} onLogout={handleLogout} />;
  }

  // Fallback de erro
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-red-600 font-bold mb-2">Erro de Perfil</h2>
        <p className="text-slate-600 mb-4">Perfil de aluno incompleto.</p>
        <button onClick={handleLogout} className="underline">Voltar</button>
      </div>
    </div>
  );
};

export default App;