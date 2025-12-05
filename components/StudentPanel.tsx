import React, { useState, useEffect } from 'react';
import { Aluno, Graduacao, Exame } from '../types';
import { DbService } from '../services/db';
import { Award, Calendar, User, CheckCircle, Clock, XCircle, ChevronRight } from 'lucide-react';

interface StudentPanelProps {
  aluno: Aluno;
  onLogout: () => void;
}

export const StudentPanel: React.FC<StudentPanelProps> = ({ aluno, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'graduacoes' | 'historico' | 'perfil'>('graduacoes');
  const [graduacoes, setGraduacoes] = useState<Graduacao[]>([]);
  const [exames, setExames] = useState<Exame[]>([]);

  useEffect(() => {
    setGraduacoes(DbService.getGraduacoes());
    const allExames = DbService.getExames();
    setExames(allExames.filter(e => e.id_aluno === aluno.id_aluno).sort((a,b) => new Date(b.data).getTime() - new Date(a.data).getTime()));
  }, [aluno.id_aluno]);

  const currentGraduacaoIndex = graduacoes.findIndex(g => g.nome_faixa === aluno.faixa_atual);
  const nextGraduacao = graduacoes[currentGraduacaoIndex + 1];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Mobile/Desktop */}
      <aside className="bg-white md:w-64 border-r border-slate-200 flex-shrink-0">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white text-sm">DM</span>
            Dojo Master
          </h2>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-sm font-medium text-slate-800">{aluno.nome}</p>
            <p className="text-xs text-slate-500">{aluno.faixa_atual}</p>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          <button
            onClick={() => setActiveTab('graduacoes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'graduacoes' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Award className="w-5 h-5" /> Graduações
          </button>
          <button
            onClick={() => setActiveTab('historico')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'historico' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Calendar className="w-5 h-5" /> Histórico de Exames
          </button>
          <button
            onClick={() => setActiveTab('perfil')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'perfil' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <User className="w-5 h-5" /> Meus Dados
          </button>
        </nav>
        <div className="p-4 mt-auto border-t border-slate-100">
          <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-slate-500 hover:text-red-600 transition-colors">
            Sair do sistema
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            {activeTab === 'graduacoes' && 'Minha Jornada'}
            {activeTab === 'historico' && 'Histórico de Avaliações'}
            {activeTab === 'perfil' && 'Dados Cadastrais'}
          </h1>
        </header>

        {activeTab === 'graduacoes' && (
          <div className="space-y-6">
            {/* Current Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-slate-100" style={{backgroundColor: graduacoes.find(g => g.nome_faixa === aluno.faixa_atual)?.cor_hex || '#ddd'}}>
                <span className="font-bold text-white drop-shadow-md text-xs uppercase text-center px-2">
                   {aluno.faixa_atual.replace('Faixa ', '')}
                </span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-semibold text-slate-800">Faixa Atual: {aluno.faixa_atual}</h3>
                <p className="text-slate-500">Continue treinando para alcançar o próximo nível.</p>
              </div>
              {nextGraduacao && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 max-w-xs w-full">
                  <h4 className="font-semibold text-blue-900 text-sm mb-1">Próximo Objetivo:</h4>
                  <p className="text-blue-700 font-bold mb-2">{nextGraduacao.nome_faixa}</p>
                  <div className="text-xs text-blue-600 bg-white p-2 rounded border border-blue-100">
                     <span className="font-semibold">Requisito:</span> {nextGraduacao.requisitos}
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-4">
              <h3 className="font-semibold text-slate-800">Caminho do Guerreiro</h3>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 {graduacoes.map((grad, idx) => {
                   const isPast = idx <= currentGraduacaoIndex;
                   const isCurrent = idx === currentGraduacaoIndex;
                   return (
                     <div key={grad.id_graduacao} className={`p-4 border-b border-slate-100 last:border-0 flex items-center gap-4 ${isCurrent ? 'bg-red-50' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm border border-slate-200`} style={{backgroundColor: grad.cor_hex}}>
                          {/* Circle color representation */}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className={`font-medium ${isCurrent ? 'text-red-700' : 'text-slate-700'}`}>{grad.nome_faixa}</span>
                            {isPast && <CheckCircle className="w-5 h-5 text-green-500" />}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{grad.requisitos}</p>
                        </div>
                     </div>
                   );
                 })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'historico' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {exames.length === 0 ? (
              <div className="p-8 text-center text-slate-500">Nenhum exame registrado ainda.</div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4">Faixa Avaliada</th>
                    <th className="px-6 py-4">Resultado</th>
                    <th className="px-6 py-4">Observações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {exames.map((exame) => (
                    <tr key={exame.id_exame} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-700">{new Date(exame.data).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{exame.faixa_avaliada}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          exame.resultado === 'Aprovado' ? 'bg-green-100 text-green-700' :
                          exame.resultado === 'Reprovado' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {exame.resultado === 'Aprovado' && <CheckCircle className="w-3 h-3"/>}
                          {exame.resultado === 'Reprovado' && <XCircle className="w-3 h-3"/>}
                          {exame.resultado === 'Pendente' && <Clock className="w-3 h-3"/>}
                          {exame.resultado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 max-w-xs truncate" title={exame.observacoes}>{exame.observacoes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'perfil' && (
          <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Ficha do Aluno</h3>
                <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">Somente Leitura</span>
             </div>
             <div className="p-6 grid gap-6 md:grid-cols-2">
                <div>
                   <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Nome Completo</label>
                   <p className="text-slate-800 font-medium">{aluno.nome}</p>
                </div>
                <div>
                   <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Faixa Atual</label>
                   <p className="text-slate-800 font-medium">{aluno.faixa_atual}</p>
                </div>
                <div>
                   <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Data de Nascimento</label>
                   <p className="text-slate-800">{new Date(aluno.data_nascimento).toLocaleDateString()}</p>
                </div>
                <div>
                   <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Telefone</label>
                   <p className="text-slate-800">{aluno.telefone}</p>
                </div>
                <div>
                   <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Data de Início</label>
                   <p className="text-slate-800">{new Date(aluno.data_entrada).toLocaleDateString()}</p>
                </div>
                <div className="md:col-span-2">
                   <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Observações do Mestre</label>
                   <div className="bg-yellow-50 p-3 rounded border border-yellow-100 text-yellow-800 text-sm italic">
                     "{aluno.observacoes}"
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};