import Home from '@/components/Home'
import HomeUser from '@/components/HomeUser'
import HomeSign from '@/components/HomeSign'

import Tests from '@/pages/evaluaciones/Tests'
import TestsListar from '@/pages/evaluaciones/TestsListar'

import EvaluacionDetalle from '@/pages/users/evaluaciones/EvaluacionDetalle'
import EvaluacionDetalleDesempeno from '@/pages/users/evaluaciones/EvaluacionDetalleDesempeno'
import EvaluacionesLista from '@/pages/users/evaluaciones/EvaluacionesLista'

/*import PorCalificarDetalle from '@/pages/users/evaluaciones/PorCalificarDetalle'
import PorCalificarLista from '@/pages/users/evaluaciones/PorCalificarLista'*/

import Empresas from '@/pages/empresas/Empresas'
import EmpresasListar from '@/pages/empresas/EmpresasListar'

import Subdimensiones from '@/pages/subdimensiones/Subdimensiones'
import SubdimensionesListar from '@/pages/subdimensiones/SubdimensionesListar'

import Departamentos from '@/pages/departamentos/Departamentos'
import DepartamentosListar from '@/pages/departamentos/DepartamentosListar'

import Cargos from '@/pages/cargos/Cargos'
import CargosListar from '@/pages/cargos/CargosListar'

import Admins from '@/pages/admins/Admins'
import AdminsListar from '@/pages/admins/AdminsListar'

import ReporteClima from '@/pages/reportes/ReporteClima'
import ReportePostCovid from '@/pages/reportes/ReportePostCovid'
import ReporteDiagnostico from '@/pages/reportes/ReporteDiagnostico'
import ReporteDesempenoEspecifico from '@/pages/reportes/ReporteDesempenoEspecifico'
import ReporteDesempenoGeneral from '@/pages/reportes/ReporteDesempenoGeneral'


import LoginSuperAdminCx from '@/pages/auth/LoginSuperAdminCx'
import LoginUserCx from '@/pages/auth/LoginUserCx'
import UnauthorizedCx from '@/pages/UnauthorizedCx'

export default [
    { path: '/', component: HomeUser, children: [
        { path: '/',meta: { requiresAuth: true, rol: ['user']}, redirect: { name: 'EvaluacionesLista' } },
        { path: 'evaluaciones-lista', meta: { requiresAuth: true, rol: ['user'], listName:'evaluaciones'}, name: 'EvaluacionesLista', component: EvaluacionesLista },
        { path: 'evaluacion/:id', meta: { requiresAuth: true, rol: ['user'], listName:'evaluaciones'}, name: 'EvaluacionesDetalle', component: EvaluacionDetalle },
        { path: 'evaluacion/:id/:_id_usuario', meta: { requiresAuth: true, rol: ['user'], listName:'evaluaciones'}, name: 'EvaluacionesDetalleDesempeno', component: EvaluacionDetalleDesempeno },

        /*{ path: 'evaluaciones-por-calificar', meta: { requiresAuth: true, rol: 'user', listName:'evaluaciones'}, name: 'PorCalificarLista', component: PorCalificarLista },
        { path: 'evaluacion-por-calificar/:id/user/:usuario', meta: { requiresAuth: true, rol: 'user', listName:'evaluaciones'}, name: 'PorCalificarDetalle', component: PorCalificarDetalle }*/
      ]
    },
    { path: '/backoffice', component: Home, children: [
        { path: '/',meta: { requiresAuth: true, rol: ['superadmin','admin'] }, redirect: { name: 'TestListar' } },
        { path: 'tests-listar', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'evaluaciones' }, name: 'TestListar', component: TestsListar },
        { path: 'tests', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'evaluaciones' }, name: 'Tests', component: Tests },
        { path: 'tests/:id/:step', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'evaluaciones'}, name: 'TestDetalle', component: Tests },
        { path: 'empresas', meta: { requiresAuth: true, rol: ['superadmin'], listName:'empresas'}, name: 'Empresas', component: Empresas },
        { path: 'empresas/:id', meta: { requiresAuth: true, rol: ['superadmin'], listName:'empresas'}, name: 'EmpresaDetalle', component: Empresas },
        { path: 'empresas-listar', meta: { requiresAuth: true, rol: ['superadmin'], listName:'empresas'}, name: 'EmpresasListar', component: EmpresasListar },
        { path: 'subdimensiones', meta: { requiresAuth: true, rol: ['superadmin'], listName:'subdimensiones'}, name: 'Subdimensiones', component: Subdimensiones },
        { path: 'subdimensiones/:id', meta: { requiresAuth: true, rol: ['superadmin'], listName:'subdimensiones'}, name: 'SubdimensionDetalle', component: Subdimensiones },
        { path: 'subdimensiones-listar', meta: { requiresAuth: true, rol: ['superadmin'], listName:'subdimensiones'}, name: 'SubdimensionesListar', component: SubdimensionesListar },

        { path: 'departamentos', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'departamentos'}, name: 'Departamentos', component: Departamentos },
        { path: 'departamentos/:id', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'departamentos'}, name: 'DepartamentoDetalle', component: Departamentos },
        { path: 'departamentos-listar', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'departamentos'}, name: 'DepartamentosListar', component: DepartamentosListar },

        { path: 'cargos', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'cargos'}, name: 'Cargos', component: Cargos },
        { path: 'cargos/:id', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'cargos'}, name: 'CargoDetalle', component: Cargos },
        { path: 'cargos-listar', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'cargos'}, name: 'CargosListar', component: CargosListar },

        { path: 'admins', meta: { requiresAuth: true, rol: ['superadmin'], listName:'admins'}, name: 'Admins', component: Admins },
        { path: 'admins/:id', meta: { requiresAuth: true, rol: ['superadmin'], listName:'admins'}, name: 'AdminDetalle', component: Admins },
        { path: 'admins-listar', meta: { requiresAuth: true, rol: ['superadmin'], listName:'admins'}, name: 'AdminsListar', component: AdminsListar },

        { path: 'reportes/clima', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'reportes' }, name: 'ReporteClima', component: ReporteClima },
        { path: 'reportes/postcovid', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'reportes' }, name: 'ReportePostCovid', component: ReportePostCovid },
        { path: 'reportes/diagnostico', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'reportes' }, name: 'ReporteDiagnostico', component: ReporteDiagnostico },
        { path: 'reportes/desempeno/especifico', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'reportes' }, name: 'ReporteDesempenoEspecifico', component: ReporteDesempenoEspecifico },
        { path: 'reportes/desempeno/general', meta: { requiresAuth: true, rol: ['superadmin','admin'], listName:'reportes' }, name: 'ReporteDesempenoGeneral', component: ReporteDesempenoGeneral }
      ]
    },
    { path: '/backoffice/auth', meta: { requiresAuth: false }, component: HomeSign, children: [
        { path: '/', name: 'LoginSuperAdmin', meta: { requiresAuth: false }, component: LoginSuperAdminCx, props:{rol:'superadmin'} },
      ] 
    },
    { path: '/admin', meta: { requiresAuth: false }, component: HomeSign, children: [
        { path: '/', name: 'LoginAdminHome', meta: { requiresAuth: false }, redirect: { name: 'LoginAdmin' } },
        { path: '/admin/auth', name: 'LoginAdmin', meta: { requiresAuth: false }, component: LoginSuperAdminCx, props:{rol:'admin'} },
      ] 
    },
    { path: '/auth', meta: { requiresAuth: false }, component: HomeSign, children: [
        { path: '/', name: 'LoginUser', meta: { requiresAuth: false }, component: LoginUserCx }
      ]
    },
    { path: '/auth/unauthorized', name: 'Unauthorized', meta: { requiresAuth: false }, component: UnauthorizedCx }
    
    
    /*,
    { path: '/clientes', component: HomeClientes, children: [
      { path: '/',meta: { requiresAuth: true, admin: false }, redirect: { name: 'ClientesEncuesta' } },
      { path: '/clientes/encuesta', meta: { requiresAuth: true, admin: false }, name: 'ClientesEncuesta', component: ClientesEncuesta }
    ]*/
]