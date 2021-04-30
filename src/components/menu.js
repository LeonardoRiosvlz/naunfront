export const menuItems = [
    {
        id: 1,
        label: "PRISTEL APP v-1.0.1",
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
        label: 'Gestión corporativa',
        icon: 'ri-hard-drive-fill',
        subItems: [
            {
                id: 4,
                label: 'Usuarios',
                link: '/usuarios'
            },
            {
                id: 5,
                label: 'Cargos',
                link: '/cargos'
            },
            {
                id: 6,
                label: 'Areas',
                link: '/areas'
            },
            {
                id: 7,
                label: 'Terceros',
                link: '/terceros'
            },
            {
                id: 8,
                label: 'Categorias',
                link: '/categorias'
            },
            {
                id: 9,
                label: 'Entidades',
                link: '/entidades'
            },
            {
                id: 10,
                label: 'Imputaciones',
                link: '/codigos_imputacion'
            },
            {
                id: 11,
                label: 'Regional',
                link: '/regional'
            },
            {
                id: 11,
                label: 'Ciudades',
                link: '/ciudades'
            }
        ]
    },
    {
        id: 11,
        label: 'Procesos',
        icon: 'ri-arrow-left-right-line',
        subItems: [
            {
                id: 12,
                label: 'Cajeros',
                link: '/cajeros'
            },
            {
                id: 13,
                label: 'F.T.S.',
                link: 'fst'
            },
            {
                id: 14,
                label: 'Llamadas',
                link: '/llamadas',
            },
            {
                id: 16,
                label: 'Presupuesto',
                link: ''
            },
            {
                id: 16,
                label: 'Cotizaciones',
                link: ''
            },
            {
                id: 17,
                label: 'Pagos',
                link: ''
            },
            {
                id: 18,
                label: 'Servicios Adicionales',
                link: ''
            },
            {
                id: 19,
                label: 'Abonos',
                link: ''
            }
        ]
    },    {
        id: 20,
        label: 'Contables',
        icon: 'ri-pie-chart-2-line',
        subItems: [
            {
                id:  21,
                label: 'Productos',
                link: ''
            },
            {
                id: 22,
                label: 'Categorias',
                link: ''
            },
            {
                id: 23,
                label: 'Programación',
                link: ''
            },
            {
                id: 24,
                label: 'Presupuesto',
                link: ''
            }
        ]
    },
    {
        id: 25,
        label: 'Mensajes',
        icon: 'ri-chat-4-line',
        link: '/chat'
    },
    {
        id: 26,
        label: 'Organigrama',
        icon: 'ri-git-merge-fill',
        link: '/organigrama'
    },
]