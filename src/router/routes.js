import store from '@/state/store'

export default [
    {
        path: '/',
        name: '/',
        component: () => import('../views/pages/account/login'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.state.usuarioDB) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/pages/account/register'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/forgot-password',
        name: 'Forgot-password',
        component: () => import('../views/pages/account/forgot-password'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {
                if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
                    store.dispatch('auth/logOut')
                } else {
                    store.dispatch('authfack/logout')
                }
                const authRequiredOnPreviousRoute = routeFrom.matched.some(
                    (route) => route.push('/login')
                )
                // Navigate back to previous page, or home as a fallback
                next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
            },
        },
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/pages/dashboard/index'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                    next()
                }
            }
        },
    },   
    {
        path: '/usuarios',
        name: 'usuarios',
        component: () => import('../views/pages/admin/usuarios'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    }, 
    {
        path: '/cargos',
        name: 'cargos',
        component: () => import('../views/pages/admin/cargos'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    }, 
    {
        path: '/areas',
        name: 'areas',
        component: () => import('../views/pages/admin/areas'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/categorias',
        name: 'categorias',
        component: () => import('../views/pages/admin/categorias'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    }, 
    {
        path: '/subcategorias',
        name: 'subcategorias',
        component: () => import('../views/pages/admin/subcategorias'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/terceros',
        name: 'terceros',
        component: () => import('../views/pages/admin/terceros'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/entidades',
        name: 'entidades',
        component: () => import('../views/pages/admin/entidades'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/perfil',
        name: 'perfil',
        component: () => import('../views/pages/admin/perfil'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/cajeros',
        name: 'cajeros',
        component: () => import('../views/pages/procesos/cajeros'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/cajeros_ATH',
        name: 'cajeros_ATH',
        component: () => import('../views/pages/procesos/cajeros_ath'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/cajero_details/:id/:entidad',
        name: 'cajero_details',
        component: () => import('../views/pages/procesos/cajero_details'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/llamada_ath_tablero',
        name: 'llamada_ath_tablero',
        component: () => import('../views/pages/programacion/dashboardProgramacionAth'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/llamadas',
        name: 'llamadas',
        component: () => import('../views/pages/procesos/programacion'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/legalizaciones',
        name: 'legalizaciones',
        component: () => import('../views/pages/procesos/legalizaciones'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/calendario',
        name: 'calendario',
        component: () => import('../views/pages/calendar'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/fst',
        name: 'fst',
        component: () => import('../views/pages/procesos/fst'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/llamadas_ath',
        name: 'llamadas_ath',
        component: () => import('../views/pages/programacion/programacion_ath'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/organigrama',
        name: 'organigrama',
        component: () => import('../views/pages/admin/organigrama'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/seguridad',
        name: 'seguridad',
        component: () => import('../views/pages/admin/seguridad'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/regional',
        name: 'regional',
        component: () => import('../views/pages/admin/regional'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/ciudades',
        name: 'ciudades',
        component: () => import('../views/pages/admin/ciudades'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/codigos_imputacion',
        name: 'codigos_imputacion',
        component: () => import('../views/pages/admin/imputaciones'),
        meta: {
            beforeEnter: (to, from, next) => {
                if (!store.state.usuarioDB) {
                    console.log(store.state.usuarioDB);
                    // Redirect to the home page instead
                    next({ name: 'login' })
                } else {
                    // Continue to the login page
                   next()
                }
            }
        },
    },
    {
        path: '/chat',
        name: 'Chat',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/chat/index')
    },
]