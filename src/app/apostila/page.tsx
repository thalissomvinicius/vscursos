'use client'

import React from 'react'

export default function ApostilaPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans print:bg-white print:text-black">
            {/* Botão de Impressão (Oculto na impressão) */}
            <div className="fixed bottom-8 right-8 z-50 print:hidden">
                <button
                    onClick={() => window.print()}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Imprimir / Salvar PDF
                </button>
            </div>

            <div className="max-w-[210mm] mx-auto bg-white p-0 sm:p-8 lg:p-12 shadow-2xl print:shadow-none print:p-0">
                {/* ────── CAPA ────── */}
                <section className="min-h-[297mm] flex flex-col items-center justify-center text-center border-[20px] border-blue-900/5 p-12 relative overflow-hidden break-after-page">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-3 mb-16">
                            <span className="text-6xl font-extrabold tracking-tighter">
                                <span className="text-blue-700">T</span>
                                <span className="text-slate-300 mx-px">&</span>
                                <span className="text-blue-700">S</span>
                            </span>
                            <div className="text-left">
                                <div className="text-xl font-bold text-slate-800 tracking-widest uppercase">Treinamentos</div>
                                <div className="h-1 w-full bg-blue-700 mt-1" />
                            </div>
                        </div>

                        <h1 className="text-5xl font-black text-slate-900 leading-tight mb-8">
                            eSocial na Prática <br />
                            <span className="text-blue-700">Segurança e Saúde no Trabalho</span>
                        </h1>

                        <div className="w-24 h-2 bg-blue-700 mx-auto mb-12 rounded-full" />

                        <p className="text-xl text-slate-500 font-medium mb-24 uppercase tracking-[0.2em]">
                            Apostila Completa do Curso
                        </p>

                        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto py-8 border-y border-slate-100 italic text-slate-400">
                            <div>S-2210</div>
                            <div>S-2220</div>
                            <div>S-2240</div>
                        </div>
                    </div>

                    <div className="absolute bottom-12 text-slate-400 text-sm font-medium">
                        © {new Date().getFullYear()} T&S Cursos • www.tes-treinamentos.vercel.app
                    </div>
                </section>

                {/* ────── SUMÁRIO ────── */}
                <section className="py-16 px-12 break-after-page">
                    <h2 className="text-3xl font-bold text-blue-900 mb-12 flex items-center gap-3">
                        Sumário 📚
                    </h2>
                    <nav className="space-y-6">
                        {[
                            { id: 'm1', title: 'Fundamentos do eSocial na SST', p: '01' },
                            { id: 'm2', title: 'S-2210 | Comunicação de Acidente de Trabalho (CAT)', p: '04' },
                            { id: 'm3', title: 'S-2220 | Monitoramento da Saúde Ocupacional (ASO)', p: '08' },
                            { id: 'm4', title: 'S-2240 | Condições Ambientais e Agentes Nocivos', p: '12' },
                            { id: 'm5', title: 'Considerações Finais e Checklist Prático', p: '16' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-end gap-2 group cursor-pointer hover:text-blue-700 transition-colors">
                                <span className="text-blue-900 font-bold text-lg min-w-[20px]">{i + 1}.</span>
                                <span className="font-semibold text-slate-700 group-hover:text-blue-700 whitespace-nowrap">{item.title}</span>
                                <div className="flex-1 border-b-2 border-dotted border-slate-200 mb-1.5" />
                                <span className="text-slate-400 font-mono">{item.p}</span>
                            </div>
                        ))}
                    </nav>
                </section>

                {/* ────── MÓDULO 1 ────── */}
                <article className="py-16 px-12 break-after-page">
                    <div className="text-blue-700 font-bold uppercase tracking-widest text-sm mb-4">Módulo 01</div>
                    <h2 className="text-4xl font-extrabold text-blue-900 mb-8 border-b-4 border-blue-100 pb-4">
                        Fundamentos do eSocial na SST
                    </h2>

                    <div className="prose prose-slate max-w-none">
                        <section className="mb-10">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">O que é o eSocial?</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                O <strong>eSocial</strong> (Sistema de Escrituração Digital das Obrigações Fiscais, Previdenciárias e Trabalhistas) é uma plataforma digital do Governo Federal que <strong>unifica o envio de informações</strong> trabalhistas, previdenciárias e fiscais dos empregadores em relação aos seus trabalhadores.
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl my-6">
                                <p className="text-blue-900 italic font-medium">
                                    💡 <strong>Em resumo:</strong> o eSocial é o "Google Docs" das obrigações trabalhistas — tudo em um só lugar, atualizado em tempo real.
                                </p>
                            </div>
                        </section>

                        <section className="mb-10">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">🎯 Objetivo na SST</h3>
                            <p className="text-slate-600 mb-4 text-justify">
                                Na área de <strong>Segurança e Saúde no Trabalho (SST)</strong>, o eSocial tem o papel fundamental de digitalizar documentos históricos, substituindo processos manuais complexos por envios eletrônicos padronizados.
                            </p>
                            <ul className="space-y-3 list-none p-0">
                                {['Registrar acidentes de trabalho (evento S-2210)', 'Monitorar a saúde dos trabalhadores (evento S-2220)', 'Mapear condições ambientais e agentes nocivos (evento S-2240)'].map((text, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700">
                                        <div className="w-2 h-2 bg-blue-700 rounded-full" />
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">📜 Legislação e Normas</h3>
                            <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm border border-slate-100">
                                <thead>
                                    <tr className="bg-slate-900 text-white text-left text-sm uppercase">
                                        <th className="p-4">Norma</th>
                                        <th className="p-4">Descrição Principal</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700 divide-y divide-slate-100">
                                    <tr className="bg-slate-50/50"><td className="p-4 font-bold">Decreto 8.373/14</td><td className="p-4">Instituiu o eSocial.</td></tr>
                                    <tr><td className="p-4 font-bold">NR-07 (PCMSO)</td><td className="p-4">Monitoramento da saúde.</td></tr>
                                    <tr className="bg-slate-50/50"><td className="p-4 font-bold">NR-09 (PGR)</td><td className="p-4">Gestão de riscos ambientais.</td></tr>
                                    <tr><td className="p-4 font-bold">NR-15</td><td className="p-4">Insalubridade e agentes nocivos.</td></tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </article>

                {/* ────── MÓDULO 2 ────── */}
                <article className="py-16 px-12 break-after-page">
                    <div className="text-rose-600 font-bold uppercase tracking-widest text-sm mb-4">Módulo 02</div>
                    <h2 className="text-4xl font-extrabold text-blue-900 mb-8 border-b-4 border-rose-100 pb-4">
                        S-2210 | Comunicação de Acidente de Trabalho
                    </h2>

                    <div className="prose prose-slate max-w-none">
                        <section className="mb-10">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Definição e Tipos</h3>
                            <p className="text-slate-600 mb-6 italic">O evento S-2210 é a digitalização da antiga CAT física.</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="font-bold text-rose-700 mb-1">Acidente Típico</h4>
                                    <p className="text-xs text-slate-500">Ocorrendo durante a jornada de trabalho habitual.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="font-bold text-rose-700 mb-1">Acidente de Trajeto</h4>
                                    <p className="text-xs text-slate-500">No percurso entre residência e o trabalho.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="font-bold text-rose-700 mb-1">Doença Profissional</h4>
                                    <p className="text-xs text-slate-500">Causada pela natureza do trabalho.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="font-bold text-rose-700 mb-1">Doença do Trabalho</h4>
                                    <p className="text-xs text-slate-500">Causada pelas condições ambientais específicas.</p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-10">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">⏰ Cronograma de Prazos</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-rose-50 text-rose-900 rounded-xl">
                                    <div className="text-2xl font-bold">24h</div>
                                    <div className="text-sm font-medium">Casos com óbito: Envio deve ser <strong>imediato</strong>.</div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-slate-50 text-slate-900 rounded-xl border border-slate-100">
                                    <div className="text-sm font-medium">Demais casos: Até o <strong>1º dia útil</strong> seguinte ao ocorrido.</div>
                                </div>
                            </div>
                            <div className="bg-rose-600 text-white p-6 rounded-2xl mt-8 shadow-lg">
                                <h4 className="font-bold mb-2 flex items-center gap-2">⚠️ Alerta de Multa</h4>
                                <p className="text-sm opacity-90 leading-relaxed">
                                    O descumprimento pode gerar multas entre R$ 1.100,00 e R$ 6.700,00 por trabalhador não informado corretamente.
                                </p>
                            </div>
                        </section>
                    </div>
                </article>

                {/* ────── MÓDULO 3 ────── */}
                <article className="py-16 px-12 break-after-page">
                    <div className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-4">Módulo 03</div>
                    <h2 className="text-4xl font-extrabold text-blue-900 mb-8 border-b-4 border-teal-100 pb-4">
                        S-2220 | Monitoramento da Saúde (ASO)
                    </h2>

                    <div className="grid grid-cols-3 gap-6 mb-12">
                        {[
                            { t: 'Admissional', d: 'Pré-contratação' },
                            { t: 'Periódico', d: 'Regularmente' },
                            { t: 'Retorno', d: 'Pós-afastamento' },
                            { t: 'Mudança', d: 'Novo risco' },
                            { t: 'Demissional', d: 'Pré-rescisão' },
                        ].map((ex, i) => (
                            <div key={i} className="text-center p-4 rounded-2xl bg-teal-50 border border-teal-100">
                                <div className="font-bold text-teal-800 mb-1">{ex.t}</div>
                                <div className="text-[10px] text-teal-600 uppercase tracking-wider">{ex.d}</div>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-6">📌 Dados Essenciais do ASO</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-slate-700 mb-10">
                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> CPF do trabalhador</div>
                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Data exata do exame</div>
                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> CRM e Nome do Médico</div>
                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Resultado (Apto/Inapto)</div>
                        <div className="flex items-center gap-2 font-bold"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Tabela 27 do eSocial</div>
                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Exames complementares</div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl translate-x-1/4 -translate-y-1/4" />
                        <h4 className="text-xl font-bold mb-4">Prazo de Envio S-2220</h4>
                        <div className="text-3xl font-black text-teal-400 mb-2">Até o dia 15</div>
                        <p className="text-slate-400 text-sm">do mês subsequente à data de realização do exame médico ocupacional.</p>
                    </div>
                </article>

                {/* ────── MÓDULO 4 ────── */}
                <article className="py-16 px-12 break-after-page">
                    <div className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4">Módulo 04</div>
                    <h2 className="text-4xl font-extrabold text-blue-900 mb-8 border-b-4 border-amber-100 pb-4">
                        S-2240 | Condições Ambientais e Agentes Nocivos
                    </h2>

                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Este é o evento para registro do <strong>Perfil Profissiográfico Previdenciário (PPP)</strong> eletrônico. Ele deve listar as exposições habituais de forma detalhada.
                    </p>

                    <div className="flex gap-4 mb-10">
                        <div className="flex-1 p-5 rounded-2xl border-2 border-amber-50 bg-white">
                            <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">🧪 Categorias</h4>
                            <div className="space-y-2 text-sm text-slate-500">
                                <div>• Químicos (Gases, poeiras)</div>
                                <div>• Físicos (Ruído, calor)</div>
                                <div>• Biológicos (Vírus, bactérias)</div>
                                <div>• Ergonômicos (Postura)</div>
                            </div>
                        </div>
                        <div className="flex-1 p-5 rounded-2xl border-2 border-slate-50 bg-slate-50/30">
                            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">🛡️ Equipamentos</h4>
                            <div className="space-y-2 text-sm text-slate-500">
                                <div>• EPC (Proteção Coletiva)</div>
                                <div>• EPI (Proteção Individual)</div>
                                <div>• CA obrigatório do EPI</div>
                                <div>• Declaração de Eficácia</div>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-4">📊 Referência: Tabela 24</h3>
                    <p className="text-xs text-slate-400 mb-4 italic uppercase tracking-widest">Base de códigos para agentes nocivos</p>
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-slate-500 mb-12">
                        <div className="p-3 bg-slate-100 rounded-lg">02.01.014 - Ruído</div>
                        <div className="p-3 bg-slate-100 rounded-lg">01.18.001 - Benzeno</div>
                        <div className="p-3 bg-slate-100 rounded-lg">03.01.001 - Bactor</div>
                    </div>

                    <div className="p-8 bg-amber-500 rounded-3xl text-white shadow-xl shadow-amber-500/20">
                        <p className="font-medium opacity-90 leading-relaxed italic">
                            "Atenção: O envio do S-2240 é obrigatório para <strong>todos os trabalhadores</strong>, incluindo aqueles com ausência de exposição."
                        </p>
                    </div>
                </article>

                {/* ────── CONCLUSÃO ────── */}
                <article className="py-16 px-12">
                    <div className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4">Módulo Final</div>
                    <h2 className="text-4xl font-extrabold text-blue-900 mb-8 border-b-4 border-indigo-100 pb-4 text-center">
                        Checklist e Considerações Finais
                    </h2>

                    <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm mb-12">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">📝 Rotina de Conformidade</h3>
                        <div className="space-y-4">
                            {[
                                'Verificar acidentes do período e prazos da CAT',
                                'Conferir todos os ASOs realizados no mês anterior',
                                'Sincronizar dados entre PGR e eSocial (S-2240)',
                                'Auditar Certificados de Aprovação (CA) de EPIs',
                                'Backup de protocolos de envio e recibos do portal',
                            ].map((text, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-6 h-6 border-2 border-slate-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                                        <div className="w-3 h-3 bg-slate-200 rounded-sm" />
                                    </div>
                                    <p className="text-sm text-slate-600 font-medium">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center py-20 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-[50px] text-white overflow-hidden relative">
                        <div className="relative z-10">
                            <span className="text-7xl mb-6 block">🏆</span>
                            <h3 className="text-3xl font-black mb-4">Parabéns pela Jornada!</h3>
                            <p className="text-blue-100 max-w-sm mx-auto mb-10 text-sm leading-relaxed">
                                Você concluiu a parte teórica e agora está apto a dominar os desafios do eSocial na Segurança do Trabalho.
                            </p>
                            <div className="text-xs font-bold uppercase tracking-widest bg-white/20 px-6 py-2 rounded-full inline-block">
                                T&S Cursos • Treinando Especialistas
                            </div>
                        </div>
                    </div>
                </article>

                {/* Contagem de Páginas */}
                <footer className="mt-20 py-8 border-t border-slate-100 flex justify-between text-[10px] text-slate-300 font-bold uppercase tracking-widest px-12 print:hidden">
                    <div>Documento Oficial T&S Cursos</div>
                    <div>Apostila eSocial na Prática</div>
                </footer>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .break-after-page {
                        page-break-after: always;
                    }
                }
                .break-after-page {
                    break-after: page;
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}
