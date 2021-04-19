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
            }
        ]
    },
    {
        id: 10,
        label: 'Procesos',
        icon: 'ri-arrow-left-right-line',
        subItems: [
            {
                id: 11,
                label: 'Cajeros',
                link: '/cajeros'
            },
            {
                id: 12,
                label: 'F.T.S.',
                link: ''
            },
            {
                id: 13,
                label: 'Programación',
                link: '/programacion'
            },
            {
                id: 14,
                label: 'Presupuesto',
                link: ''
            },
            {
                id: 15,
                label: 'Cotizaciones',
                link: ''
            },
            {
                id: 16,
                label: 'Pagos',
                link: ''
            },
            {
                id: 17,
                label: 'Servicios Adicionales',
                link: ''
            },
            {
                id: 18,
                label: 'Abonos',
                link: ''
            }
        ]
    },    {
        id: 19,
        label: 'Contables',
        icon: 'ri-pie-chart-2-line',
        subItems: [
            {
                id:  20,
                label: 'Productos',
                link: ''
            },
            {
                id: 21,
                label: 'Categorias',
                link: ''
            },
            {
                id: 22,
                label: 'Programación',
                link: ''
            },
            {
                id: 23,
                label: 'Presupuesto',
                link: ''
            }
        ]
    },
]