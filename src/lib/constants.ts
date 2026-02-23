import type { ModuleMeta } from '@/types'

// ─── Course Information ────────────────────────────────────────────

export const COURSE_NAME = 'eSocial na Prática — SST'
export const ISSUER_NAME = 'VS Capacitação Profissional'
export const WHATSAPP_NUMBER = '5511999999999'
export const WHATSAPP_MESSAGE = 'Olá! Tenho interesse no curso eSocial SST.'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

// ─── Routes ────────────────────────────────────────────────────────

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    ADMIN: '/admin',
    CHECKOUT: '/checkout',
    PROVA: '/prova',
    VALIDAR: '/validar',
    SUCESSO: '/sucesso',
    APOSTILA: '/apostila',
    CERTIFICADO: '/dashboard/certificado',
} as const

// ─── Module Definitions ────────────────────────────────────────────

export const MODULES: ModuleMeta[] = [
    {
        slug: 'modulo-1-esocial',
        title: 'Fundamentos do eSocial',
        description: 'O que é o eSocial, legislação e importância para o Técnico em SST.',
        icon: '📋',
        order: 1,
        gradient: 'from-blue-600 to-blue-700',
    },
    {
        slug: 'modulo-2-s2210',
        title: 'S-2210 | CAT',
        description: 'Comunicação de Acidente de Trabalho: prazos, preenchimento e impactos.',
        icon: '🚨',
        order: 2,
        gradient: 'from-rose-500 to-rose-600',
    },
    {
        slug: 'modulo-3-s2220',
        title: 'S-2220 | ASO',
        description: 'Monitoramento da Saúde Ocupacional: exames, Tabela 27 e prazos.',
        icon: '🩺',
        order: 3,
        gradient: 'from-teal-500 to-teal-600',
    },
    {
        slug: 'modulo-4-s2240',
        title: 'S-2240 | Agentes Nocivos',
        description: 'Condições Ambientais: agentes nocivos, Tabela 24, EPI/EPC.',
        icon: '⚠️',
        order: 4,
        gradient: 'from-amber-500 to-amber-600',
    },
    {
        slug: 'modulo-5-conclusao',
        title: 'Considerações Finais',
        description: 'Síntese dos eventos, checklist prático e certificado VS Cursos.',
        icon: '🎓',
        order: 5,
        gradient: 'from-indigo-500 to-indigo-600',
    },
    {
        slug: 'prova-final',
        title: 'Prova Final',
        description: 'Avaliação final com 10 questões. Acerte 70% para liberar seu certificado.',
        icon: '🏁',
        order: 6,
        gradient: 'from-slate-800 to-slate-900',
    },
]

/** All module slugs (including prova-final) */
export const MODULE_SLUGS = MODULES.map((m) => m.slug)

/** Only the 5 content modules (excluding prova-final) */
export const CORE_MODULE_SLUGS = MODULE_SLUGS.filter((slug) => slug !== 'prova-final')

/** All required modules/exams for certificate eligibility */
export const REQUIRED_MODULES = [
    'modulo-1-esocial',
    'modulo-2-s2210',
    'modulo-3-s2220',
    'modulo-4-s2240',
    'modulo-5-conclusao',
    'prova-final',
]

/** Lookup map: slug → ModuleMeta (for module pages) */
export const MODULE_META_MAP: Record<string, ModuleMeta> = Object.fromEntries(
    MODULES.map((m) => [m.slug, m])
)
