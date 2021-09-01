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
        path: '/notificaciones',
        name: 'Notificaciones',
        component: () => import('../views/pages/admin/notificaciones'),
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
        path: '/reset-password/:token',
        name: 'reset-password',
        component: () => import('../views/pages/account/reset-password'),
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
        path: '/clientes',
        name: 'clientes',
        component: () => import('../views/pages/admin/clientes'),
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
        path: '/documentos',
        name: 'documentos',
        component: () => import('../views/pages/admin/documentos'),
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
        path: '/sedes',
        name: 'sedes',
        component: () => import('../views/pages/admin/sedes'),
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
        path: '/sac',
        name: 'sac',
        component: () => import('../views/pages/admin/sac'),
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
        path: '/lider',
        name: 'lider',
        component: () => import('../views/pages/admin/lider'),
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
        path: '/clasificacion-actividades',
        name: 'clasificacion-actividades',
        component: () => import('../views/pages/eventos/clasificacion'),
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
        path: '/actividades',
        name: 'actividades',
        component: () => import('../views/pages/eventos/eventos'),
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
        path: '/clasificacion-planes-accion',
        name: 'clasificacion-planes-accion',
        component: () => import('../views/pages/planes_accion/clasificacion'),
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
        path: '/plan-accion/:id',
        name: 'plan-accion',
        component: () => import('../views/pages/planes_accion/index'),
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
        path: '/avances-planes-accion/:id',
        name: 'plan-accion',
        component: () => import('../views/pages/planes_accion/avances'),
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
        path: '/planes-accion',
        name: 'planes-accion',
        component: () => import('../views/pages/planes_accion/planes'),
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
        path: '/evaluacion-cuantitativa',
        name: 'planes-accion',
        component: () => import('../views/pages/cuantitativa/planes'),
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
        path: '/panel-evaluacion-cuantitativa/:id',
        name: 'plan-accion',
        component: () => import('../views/pages/cuantitativa/index'),
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
        path: '/consultor',
        name: 'consultor',
        component: () => import('../views/pages/admin/consultor'),
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
        path: '/colaboradores',
        name: 'colaboradores',
        component: () => import('../views/pages/admin/colaboradores'),
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
        path: '/tipos-de-procesos',
        name: 'tipos-de-procesos',
        component: () => import('../views/pages/admin/tiposprocesos'),
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
        path: '/procesos',
        name: 'procesos',
        component: () => import('../views/pages/admin/procesos'),
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
        path: '/auditorias-internas/:id',
        name: 'plan-accion',
        component: () => import('../views/pages/auditorias_internas/index'),
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
        path: '/normativa',
        name: 'normativa',
        component: () => import('../views/pages/admin/normativa'),
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
        path: '/tipo-documento',
        name: 'tipo-documento',
        component: () => import('../views/pages/admin/tipodocumento'),
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
        path: '/subprocesos',
        name: 'subprocesos',
        component: () => import('../views/pages/admin/subprocesos'),
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
        path: '/gestordoc',
        name: 'gestordoc',
        component: () => import('../views/pages/admin/gestordoc'),
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
        path: '/gestorformato',
        name: 'gestorformato',
        component: () => import('../views/pages/admin/gestorformato'),
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
        path: '/plantillas',
        name: 'plantillas',
        component: () => import('../views/pages/admin/plantillas'),
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
        path: '/gruposestandares',
        name: 'gruposestandares',
        component: () => import('../views/pages/admin/gruposestandares'),
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
        path: '/estandares',
        name: 'estandares',
        component: () => import('../views/pages/admin/estandares'),
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
        path: '/baseautoevaluacion',
        name: 'baseautoevaluacion',
        component: () => import('../views/pages/admin/baseautoevaluacion'),
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
        path: '/historial_autoevaluacion/:id',
        name: 'baseautoevaluacion',
        component: () => import('../views/pages/procesos/historialAutoevaluacion'),
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
        path: '/periodos',
        name: 'periodos',
        component: () => import('../views/pages/procesos/periodos'),
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
        path: '/autoevaluacion/:id',
        name: 'autoevaluacion',
        component: () => import('../views/pages/procesos/autoevaluacion'),
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
        path: '/mejoras/:id',
        name: 'autoevaluacion',
        component: () => import('../views/pages/procesos/mejoras'),
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
        path: '/detalles-procesos/:id',
        name: 'detallesprocesos',
        component: () => import('../views/pages/admin/detallesprocesos'),
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
        path: '/detalles-subprocesos/:id',
        name: 'detallesubprocesos',
        component: () => import('../views/pages/admin/detallesubprocesos'),
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
        path: '/gestion-versiones/:id',
        name: 'gestion-versiones',
        component: () => import('../views/pages/admin/dashboardDocs'),
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
        path: '/gestion-versiones-form/:id',
        name: 'gestion-versiones-form',
        component: () => import('../views/pages/admin/dashboardForm'),
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
        path: '/notificaciones',
        name: 'notificaciones',
        component: () => import('../views/pages/admin/notificaciones'),
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
        path: '/plantilla/:id',
        name: 'plantilla',
        component: () => import('../views/pages/admin/plantilla'),
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
        path: '/documentos/:id',
        name: 'documentos',
        component: () => import('@/components/previewdocs'),
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
        path: '/formatos/:id',
        name: 'documentos',
        component: () => import('@/components/previewform'),
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
        path: '/docs/:id',
        name: 'documentos',
        component: () => import('@/components/detallesDocs'),
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
        path: '/cronograma',
        name: 'cronograma',
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
