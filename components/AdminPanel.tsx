
import React, { useState, useEffect } from 'react';
import { Aluno, Graduacao, Exame, TipoUsuario, Usuario } from '../types';
import { DbService } from '../services/db';
import { Users, Award, Calendar, Settings, Plus, Trash2, Edit2, Save, X, Search } from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'alunos' | 'graduacoes' | 'exames' | 'config'>('alunos');
  
  // Data State
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [graduacoes, setGraduacoes] = useState<Graduacao[]>([]);
  const [exames, setExames] = useState<Exame[]>([]);
  
  // Refresh Data
  const refreshData = () => {
    setAlunos(DbService.getAlunos());
    setGraduacoes(DbService.getGraduacoes());
    setExames(DbService.getExames());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // --- Sub-components logic would typically be split, but combining for the single-file requirement ---

  // Student CRUD State
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Aluno | null>(null);
  const [studentForm, setStudentForm] = useState<Partial<Aluno>>({});
  
  const handleSaveStudent = () => {
    if (!studentForm.nome || !studentForm.id_aluno) return; // Simple validation

    if (editingStudent) {
        DbService.updateAluno({ ...editingStudent, ...studentForm } as Aluno);
    } else {
        // Create User first
        const firstName = studentForm.nome?.split(' ')[0].toLowerCase() || 'user';
        const newUser: Usuario = {
            id: `u-${Date.now()}`,
            email: `${firstName}@dojo.com`,
            username: firstName,
            senha: '123',
            tipo_usuario: TipoUsuario.ALUNO
        };
        const newStudent: Aluno = {
            id_aluno: `a-${Date.now()}`,
            id_usuario: newUser.id,
            nome: studentForm.nome!,
            data_nascimento: studentForm.data_nascimento || '',
            telefone: studentForm.telefone || '',
            faixa_atual: studentForm.faixa_atual || graduacoes[0]?.nome_faixa || 'Faixa Branca',
            data_entrada: studentForm.data_entrada || new Date().toISOString().split('T')[0],
            observacoes: studentForm.observacoes || ''
        };
        DbService.addAluno(newStudent, newUser);
    }
    setShowStudentModal(false);
    setEditingStudent(null);
    setStudentForm({});
    refreshData();
  };

  const handleDeleteStudent = (id: string) => {
    if(window.confirm('Tem certeza que deseja excluir este aluno?')) {
        DbService.deleteAluno(id);
        refreshData();
    }
  };

  // Exam Logic
  const [showExamModal, setShowExamModal] = useState(false);
  const [examForm, setExamForm] = useState<Partial<Exame>>({ resultado: 'Aprovado', data: new Date().toISOString().split('T')[0] });

  const handleSaveExam = () => {
      if(!examForm.id_aluno || !examForm.faixa_avaliada) return;

      const newExam: Exame = {
          id_exame: `e-${Date.now()}`,
          id_aluno: examForm.id_aluno,
          faixa_avaliada: examForm.faixa_avaliada,
          data: examForm.data!,
          resultado: examForm.resultado as any,
          observacoes: examForm.observacoes || ''
      };
      
      DbService.addExame(newExam);
      
      // Auto promote if approved
      if(newExam.resultado === 'Aprovado') {
          const student = alunos.find(a => a.id_aluno === newExam.id_aluno);
          if(student && student.faixa_atual !== newExam.faixa_avaliada) {
             DbService.updateAluno({...student, faixa_atual: newExam.faixa_avaliada});
          }
      }

      setShowExamModal(false);
      setExamForm({ resultado: 'Aprovado', data: new Date().toISOString().split('T')[0] });
      refreshData();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
       {/* Top Navbar */}
       <header className="bg-slate-900 text-white shadow-md">
         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center font-bold">DM</div>
                <h1 className="text-xl font-bold">Painel do Sensei</h1>
            </div>
            <button onClick={onLogout} className="text-sm text-slate-300 hover:text-white">Sair</button>
         </div>
       </header>

       <div className="flex-1 max-w-7xl mx-auto w-full p-4 flex gap-6">
          {/* Sidebar Tabs */}
          <aside className="w-64 flex-shrink-0 hidden md:block">
            <nav className="space-y-2">
                <button onClick={() => setActiveTab('alunos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'alunos' ? 'bg-white text-red-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>
                    <Users className="w-5 h-5"/> Alunos
                </button>
                <button onClick={() => setActiveTab('graduacoes')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'graduacoes' ? 'bg-white text-red-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>
                    <Award className="w-5 h-5"/> Regras de Graduação
                </button>
                <button onClick={() => setActiveTab('exames')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'exames' ? 'bg-white text-red-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>
                    <Calendar className="w-5 h-5"/> Exames
                </button>
                <button onClick={() => setActiveTab('config')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'config' ? 'bg-white text-red-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>
                    <Settings className="w-5 h-5"/> Configurações
                </button>
            </nav>
          </aside>

          {/* Content Area */}
          <main className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-x-auto min-h-[500px]">
             
             {/* --- ALUNOS TAB --- */}
             {activeTab === 'alunos' && (
                 <div>
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Gestão de Alunos</h2>
                        <button onClick={() => { setEditingStudent(null); setStudentForm({}); setShowStudentModal(true); }} className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                            <Plus className="w-4 h-4"/> Novo Aluno
                        </button>
                     </div>
                     <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="p-3">Nome</th>
                                <th className="p-3">Usuário</th>
                                <th className="p-3">Faixa</th>
                                <th className="p-3">Telefone</th>
                                <th className="p-3 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {alunos.map(aluno => {
                                // Find associated username for display
                                const user = DbService.getUsuarios().find(u => u.id === aluno.id_usuario);
                                return (
                                <tr key={aluno.id_aluno} className="hover:bg-slate-50">
                                    <td className="p-3 font-medium text-slate-900">{aluno.nome}</td>
                                    <td className="p-3 text-slate-500">{user?.username}</td>
                                    <td className="p-3">
                                        <span className="bg-slate-100 px-2 py-1 rounded text-xs border border-slate-200">{aluno.faixa_atual}</span>
                                    </td>
                                    <td className="p-3 text-slate-600">{aluno.telefone}</td>
                                    <td className="p-3 text-right flex justify-end gap-2">
                                        <button onClick={() => { setEditingStudent(aluno); setStudentForm(aluno); setShowStudentModal(true); }} className="p-1 hover:bg-blue-50 text-blue-600 rounded"><Edit2 className="w-4 h-4"/></button>
                                        <button onClick={() => handleDeleteStudent(aluno.id_aluno)} className="p-1 hover:bg-red-50 text-red-600 rounded"><Trash2 className="w-4 h-4"/></button>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                     </table>
                 </div>
             )}

             {/* --- GRADUACOES TAB --- */}
             {activeTab === 'graduacoes' && (
                 <div>
                     <h2 className="text-xl font-bold text-slate-800 mb-6">Regras de Graduação</h2>
                     <div className="space-y-4">
                         {graduacoes.map(grad => (
                             <div key={grad.id_graduacao} className="flex items-start gap-4 p-4 border rounded-lg hover:border-slate-300 transition-colors group">
                                 <div className="w-10 h-10 rounded-full flex-shrink-0 shadow-sm border border-slate-200" style={{backgroundColor: grad.cor_hex}}></div>
                                 <div className="flex-1">
                                     <div className="flex justify-between">
                                        <h3 className="font-bold text-slate-900">{grad.nome_faixa}</h3>
                                        <span className="text-xs text-slate-400">Ordem: {grad.ordem}</span>
                                     </div>
                                     <input 
                                        className="w-full mt-2 text-sm border-0 border-b border-transparent focus:border-red-500 focus:ring-0 bg-transparent p-0 text-slate-600"
                                        defaultValue={grad.requisitos}
                                        onBlur={(e) => {
                                            if(e.target.value !== grad.requisitos) {
                                                DbService.updateGraduacao({...grad, requisitos: e.target.value});
                                                refreshData();
                                            }
                                        }}
                                     />
                                     <p className="text-xs text-slate-400 mt-1">Clique no texto para editar os requisitos.</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             )}

             {/* --- EXAMES TAB --- */}
             {activeTab === 'exames' && (
                 <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Histórico de Exames</h2>
                        <button onClick={() => setShowExamModal(true)} className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                            <Plus className="w-4 h-4"/> Registrar Exame
                        </button>
                     </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500">
                                <tr>
                                    <th className="p-3">Data</th>
                                    <th className="p-3">Aluno</th>
                                    <th className="p-3">Faixa Alvo</th>
                                    <th className="p-3">Resultado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {exames.map(exame => {
                                    const alunoNome = alunos.find(a => a.id_aluno === exame.id_aluno)?.nome || 'Desconhecido';
                                    return (
                                        <tr key={exame.id_exame}>
                                            <td className="p-3">{new Date(exame.data).toLocaleDateString()}</td>
                                            <td className="p-3 font-medium">{alunoNome}</td>
                                            <td className="p-3">{exame.faixa_avaliada}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded text-xs ${exame.resultado === 'Aprovado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {exame.resultado}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                     </div>
                 </div>
             )}

             {/* --- CONFIG TAB --- */}
             {activeTab === 'config' && (
                 <div className="text-center py-20 text-slate-400">
                     <Settings className="w-16 h-16 mx-auto mb-4 opacity-20"/>
                     <p>Configurações gerais do Dojo (Cores, Logo, Regras públicas) estariam aqui.</p>
                 </div>
             )}

          </main>
       </div>

       {/* --- MODALS --- */}
       
       {/* Student Modal */}
       {showStudentModal && (
           <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
               <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                   <h3 className="text-lg font-bold mb-4">{editingStudent ? 'Editar Aluno' : 'Novo Aluno'}</h3>
                   <div className="space-y-3">
                       <input 
                          placeholder="Nome Completo" 
                          className="w-full border p-2 rounded"
                          value={studentForm.nome || ''}
                          onChange={e => setStudentForm({...studentForm, nome: e.target.value})}
                       />
                       <input 
                          placeholder="Telefone" 
                          className="w-full border p-2 rounded"
                          value={studentForm.telefone || ''}
                          onChange={e => setStudentForm({...studentForm, telefone: e.target.value})}
                       />
                       <input 
                          type="date" 
                          placeholder="Data Nascimento" 
                          className="w-full border p-2 rounded"
                          value={studentForm.data_nascimento || ''}
                          onChange={e => setStudentForm({...studentForm, data_nascimento: e.target.value})}
                       />
                       <select 
                          className="w-full border p-2 rounded"
                          value={studentForm.faixa_atual || ''}
                          onChange={e => setStudentForm({...studentForm, faixa_atual: e.target.value})}
                       >
                           {graduacoes.map(g => <option key={g.id_graduacao} value={g.nome_faixa}>{g.nome_faixa}</option>)}
                       </select>
                       <textarea
                          placeholder="Observações iniciais"
                          className="w-full border p-2 rounded"
                          value={studentForm.observacoes || ''}
                          onChange={e => setStudentForm({...studentForm, observacoes: e.target.value})}
                       />
                   </div>
                   <div className="flex justify-end gap-2 mt-6">
                       <button onClick={() => setShowStudentModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded">Cancelar</button>
                       <button onClick={handleSaveStudent} className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800">Salvar</button>
                   </div>
               </div>
           </div>
       )}

       {/* Exam Modal */}
       {showExamModal && (
           <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
               <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                   <h3 className="text-lg font-bold mb-4">Registrar Resultado de Exame</h3>
                   <div className="space-y-3">
                       <div>
                           <label className="text-xs text-slate-500">Aluno</label>
                           <select 
                              className="w-full border p-2 rounded"
                              onChange={e => setExamForm({...examForm, id_aluno: e.target.value})}
                           >
                               <option value="">Selecione um aluno</option>
                               {alunos.map(a => <option key={a.id_aluno} value={a.id_aluno}>{a.nome} ({a.faixa_atual})</option>)}
                           </select>
                       </div>
                       <div>
                           <label className="text-xs text-slate-500">Faixa Avaliada</label>
                           <select 
                              className="w-full border p-2 rounded"
                              onChange={e => setExamForm({...examForm, faixa_avaliada: e.target.value})}
                           >
                               <option value="">Selecione a faixa</option>
                               {graduacoes.map(g => <option key={g.id_graduacao} value={g.nome_faixa}>{g.nome_faixa}</option>)}
                           </select>
                       </div>
                       <div>
                           <label className="text-xs text-slate-500">Resultado</label>
                           <select 
                              className="w-full border p-2 rounded"
                              value={examForm.resultado}
                              onChange={e => setExamForm({...examForm, resultado: e.target.value as any})}
                           >
                               <option value="Aprovado">Aprovado</option>
                               <option value="Reprovado">Reprovado</option>
                               <option value="Pendente">Pendente</option>
                           </select>
                       </div>
                       <input 
                          type="date"
                          className="w-full border p-2 rounded"
                          value={examForm.data}
                          onChange={e => setExamForm({...examForm, data: e.target.value})}
                       />
                       <textarea
                          placeholder="Observações do exame"
                          className="w-full border p-2 rounded"
                          onChange={e => setExamForm({...examForm, observacoes: e.target.value})}
                       />
                   </div>
                   <div className="flex justify-end gap-2 mt-6">
                       <button onClick={() => setShowExamModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded">Cancelar</button>
                       <button onClick={handleSaveExam} className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800">Registrar</button>
                   </div>
               </div>
           </div>
       )}
    </div>
  );
};
