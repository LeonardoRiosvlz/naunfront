export const menuItems = [
    {
        id: 1,
        label: "NAUN APP v-1.0.1",
        isTitle: true
    },
    {
        id: 2,
        label: 'DASHBOARD',
        icon: 'ri-dashboard-line',
        badge: {
            variant: "success",
            text: "menuitems.dashboard.badge"
        },
        link: '/'
    },
    {
        id: 3,
        label: 'Gestión de clientes',
        icon: 'ri-hard-drive-fill',
        subItems: [
            {
                id: 4,
                label: 'Clientes',
                link: '/clientes'
            },
            {
                id: 5,
                label: 'Sedes Clientes',
                link: '/sedes'
            },
            {
                id: 6,
                label: 'Areas o dependencias',
                link: '/areas'
            },
            {
                id: 7,
                label: 'Cargos',
                link: '/cargos'
            },
            {
                id: 13,
                label: 'Lider de proceso',
                link: '/lider'
            },
            {
                id: 13,
                label: 'Consultor',
                link: '/consultor'
            },
            {
                id: 13,
                label: 'Colaboradores',
                link: '/colaboradores'
            },
        ]
    },
    {
        id: 11,
        label: 'Sistema integral de gestión',
        icon: 'ri-arrow-left-right-line',
        subItems: [
            {
                id: 12,
                label: 'Tipos de procesos',
                link: '/tipos-de-procesos'
            },
            {
                id: 13,
                label: 'Procesos',
                link: '/procesos'
            },
            {
                id: 14,
                label: 'Subprocesos',
                link: '/subprocesos',
            },
            {
                id: 16,
                label: 'Nomatividad',
                link: '/normativa'
            },
            
            {
                id: 17,
                label: 'Tipo de documentos',
                link: '/tipo-documento'
            },
            {
                id: 18,
                label: 'Gestor de documentos',
                link: ''
            },
            {
                id: 19,
                label: 'Gestor de formatos',
                link: ''
            },
        ]
    },    {
        id: 20,
        label: 'Gestion de eventos',
        icon: 'ri-pie-chart-2-line',
        subItems: [
            {
                id:  21,
                label: 'Cronograma',
                link: ''
            },
            {
                id: 22,
                label: 'Clasificación de eventos',
                link: ''
            },
            {
                id: 23,
                label: 'Eventos o actividades',
                link: ''
            },
        ]
    },
    {
        id: 25,
        label: 'Sistema de gestión de calidad',
        icon: 'ri-calendar-2-line',
        subItems: [
            {
                id:  21,
                label: 'Grupos estandares de acreditacion',
                link: ''
            },
            {
                id: 22,
                label: 'Base de aunto evaluación',
                link: ''
            },
            {
                id: 23,
                label: 'Autoevaluacion cualitativa',
                link: ''
            },
            {
                id: 23,
                label: 'Criterios de priorizacion, oportunidades de mejora',
                link: ''
            },
        ]
    },
    {
        id: 26,
        label: 'Plan de acción y auditorias',
        icon: 'ri-chat-4-line',
        subItems: [
            {
                id:  21,
                label: 'Categorías planes de acción',
                link: ''
            },
            {
                id: 22,
                label: 'Gestion de planes de acción',
                link: ''
            },
            {
                id: 23,
                label: 'Autoevaluacion cuantitativa',
                link: ''
            },
            {
                id: 23,
                label: 'Auditorias',
                link: ''
            },
            {
                id: 23,
                label: 'Auditorias internas',
                link: ''
            },
        ]
    },
    {
        id: 27,
        label: 'Actas e informes',
        icon: 'ri-git-merge-fill',
        subItems: [
            {
                id:  21,
                label: 'Acciones corretivas',
                link: ''
            },
           
        ]
    },

]