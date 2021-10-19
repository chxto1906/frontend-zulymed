<template>
    <v-row>
        <v-dialog v-model="dialogProcesando" persistent width="500">
            <v-card color="primary" dark>
                <v-card-text>
                    <br/> 
                    {{dialogMensaje}}
                    <br/><br/>
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-col cols="12" class="py-0">
            <titulo-principal-cx :titulo="titulo" />
        </v-col>
        <v-col cols="12" class="py-0">

            <v-stepper v-model="step">
                <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">
                    Generar Datos
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 2" step="2">
                    Generar PDF
                </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                <v-stepper-content step="1">
                    <form-cx action="#" :method="method" :data="data" @requeststarted="requeststarted" :url="url" @success="success" @error="error">
                        <v-row>
                            <v-col cols="12" lg="4"></v-col>
                            <v-col cols="12" lg="4">
                                <v-select
                                :items="tests"
                                :rules="rules.tests.rule"
                                v-model="data._id_test"
                                label="Evaluación a generar"
                                required
                                ></v-select>
                            </v-col>
                            <v-col cols="12" lg="4"></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" lg="3"></v-col>
                            <v-col cols="12" lg="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Semáforo
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.excelente.color" size="35"></v-avatar></td>
                                                <td class="text-left">Muy Satisfactorio</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.excelente.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.excelente.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.medio_alto.color" size="35"></v-avatar></td>
                                                <td class="text-left">Satisfactorio</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.medio_alto.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.medio_alto.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.normal.color" size="35"></v-avatar></td>
                                                <td class="text-left">Promedio</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.normal.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.normal.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.medio_bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">Debajo del promedio</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.medio_bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.medio_bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.emergencia.color" size="35"></v-avatar></td>
                                                <td class="text-left">Poco satisfactorio</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.emergencia.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.emergencia.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12" lg="3"></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <submit-cx :disabled="!data._id_test">Generar</submit-cx>
                            </v-col>
                        </v-row>
                    </form-cx>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <form-cx action="#" :method="method" :data="dataParaPdf" @requeststarted="requeststarted" :url="urlPdf" @success="successPdf" @error="error">
                        <v-row>
                            
                            <v-col cols="12">
                                <highcharts :options="chartOptionsGenero"></highcharts>
                            </v-col>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsAreas"></highcharts>
                            </v-col>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsEdad"></highcharts>
                            </v-col>
                            <v-col cols="6">
                                <v-card
                                    class="mx-auto"
                                    max-width="400"
                                >
                                    <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline">
                                        Resumen General Satisfacción
                                        </v-list-item-title>
                                        <v-list-item-subtitle>Promedio de la Compañía</v-list-item-subtitle>
                                    </v-list-item-content>
                                    </v-list-item>

                                    <v-card-text>
                                    <v-row align="center">
                                        <v-col
                                        class="display-2"
                                        cols="6"
                                        >
                                        {{satisfaccion.promedio.porcentaje}} %
                                        </v-col>
                                        <v-col cols="6" class="display-1">
                                            {{satisfaccion.promedio.label}}
                                        </v-col>
                                    </v-row>
                                    </v-card-text>    
                                </v-card>
                                <v-card
                                    class="mx-auto"
                                    max-width="400"
                                >
                                    <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline">
                                        Resumen General Bienestar Psicológico
                                        </v-list-item-title>
                                        <v-list-item-subtitle>Promedio de la Compañía</v-list-item-subtitle>
                                    </v-list-item-content>
                                    </v-list-item>

                                    <v-card-text>
                                    <v-row align="center">
                                        <v-col
                                        class="display-2"
                                        cols="6"
                                        >
                                        {{bienestar.promedio.porcentaje}} %
                                        </v-col>
                                        <v-col cols="6" class="display-1">
                                            {{bienestar.promedio.label}}
                                        </v-col>
                                    </v-row>
                                    </v-card-text>    
                                </v-card>
                                <v-card
                                    class="mx-auto"
                                    max-width="400"
                                >
                                    <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline">
                                        Resumen General Compromiso
                                        </v-list-item-title>
                                        <v-list-item-subtitle>Promedio de la Compañía</v-list-item-subtitle>
                                    </v-list-item-content>
                                    </v-list-item>

                                    <v-card-text>
                                    <v-row align="center">
                                        <v-col
                                        class="display-2"
                                        cols="6"
                                        >
                                        {{compromiso.promedio.porcentaje}} %
                                        </v-col>
                                        <v-col cols="6" class="display-1">
                                            {{compromiso.promedio.label}}
                                        </v-col>
                                    </v-row>
                                    </v-card-text>    
                                </v-card>
                            </v-col>
                            <v-col cols="6">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Semáforo
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.excelente.color" size="35"></v-avatar></td>
                                                <td class="text-left">Muy Satisfactorio</td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.excelente.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.excelente.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.medio_alto.color" size="35"></v-avatar></td>
                                                <td class="text-left">Satisfactorio</td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.medio_alto.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.medio_alto.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.normal.color" size="35"></v-avatar></td>
                                                <td class="text-left">Promedio</td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.normal.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.normal.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.medio_bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">Debajo del promedio</td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.medio_bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.medio_bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.emergencia.color" size="35"></v-avatar></td>
                                                <td class="text-left">Poco Satisfactorio</td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.emergencia.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.emergencia.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <h1 style="padding-left: 12px;">Subdimensiones de Satisfacción:</h1>
                            <v-col cols="12" v-for="(subdimension) in satisfaccion.subdimensiones" :key="subdimension.label">
                                
                                <resumen-dimension-post-covid :title="subdimension.label" 
                                :dataDimension="subdimension.promedio"
                                :dataAreas="subdimension.areas.data"
                                :dataGenero="subdimension.generos"
                                :dataEdad="subdimension.edades" />
                            </v-col>
                            <h1 style="padding-left: 12px;">Subdimensiones de Compromiso:</h1>
                            <v-col cols="12" v-for="(subdimension) in compromiso.subdimensiones" :key="subdimension.label">
                                <resumen-dimension-post-covid :title="subdimension.label" 
                                :dataDimension="subdimension.promedio"
                                :dataAreas="subdimension.areas.data"
                                :dataGenero="subdimension.generos"
                                :dataEdad="subdimension.edades" />
                            </v-col>
                            <v-col cols="12">
                                <div v-for="(individual) in individual_bienestar" :key="individual">
                                    <h1>{{individual.area}}</h1>
                                    <div v-for="(usuario) in individual.usuarios" :key="usuario">
                                        <usuario-individual-area-post-covid :data="usuario.data" :title="usuario.title" />
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    label="Conclusiones"
                                    auto-grow
                                    outlined
                                    rows="5"
                                    v-model="data.conclusiones"
                                    :rules="rules.conclusiones.rule"
                                    :counter="rules.conclusiones.counter"
                                    row-height="100"
                                    required
                                    ></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4" class="pt-7">
                                <v-btn width="100%" @click="step=1"> Regresar </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <submit-cx>Generar PDF></submit-cx>
                            </v-col>
                            <v-col cols="4" v-show="linkpdf">
                                <br/>
                                <a :href="linkpdf" target="_blank">Ver Archivo >> </a>
                            </v-col>
                        </v-row>
                    </form-cx>
                </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-col>
    </v-row>
</template>

<script>

import Api from '@/api';
import Cookies from 'js-cookie'
import TituloPrincipalCx from '@/components/titulos/TituloPrincipalCx'
import ResumenDimensionPostCovid from '@/pages/reportes/ResumenDimensionPostCovid'
import UsuarioIndividualAreaPostCovid from '@/pages/reportes/UsuarioIndividualAreaPostCovid'
import FormCx from '@/components/forms/FormCx'
import SubmitCx from '@/components/forms/SubmitCx'

import { mapGetters } from 'vuex'

export default {
    name: 'ReportePostCovid',
    data () {
        return {
            linkpdf: null,
            dialogProcesando: false,
            dataPorCadaDimension: [],
            areaMayor: null,
            areaMenor: null,
            data: {
                _id_test: '',
                semaforo: {
                    excelente: {
                        color: '#237a00',
                        desde: 80.1,
                        hasta: 100,
                        label: "Muy satisfactorio"
                    },
                    medio_alto: {
                        color: '#4c90ca',
                        desde: 60.1,
                        hasta: 80,
                        label: "Satisfactorio"
                    },
                    normal: {
                        color: '#515200',
                        desde: 40.1,
                        hasta: 60,
                        label: "Promedio"
                    },
                    medio_bajo: {
                        color: '#d76600',
                        desde: 20.1,
                        hasta: 40,
                        label: "Debajo del promedio"
                    },
                    emergencia: {
                        color: '#fc4b4b',
                        desde: 0,
                        hasta: 20,
                        label: "Poco satisfactorio"
                    }
                },
                conclusiones: ''
            },
            chartOptionsGenero: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'GÉNERO'
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.2f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'top',
                    x: 0,
                    y: 0
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            distance: -30,
                            color: 'white',
                            enabled: true,
                            format: '<b>{point.percentage:.2f} %'
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Género',
                    colorByPoint: true,
                    data: []
                }]
            },
            chartOptionsEdad: {
                chart: {
                    type: 'bar'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Rango de edad'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    //tickInterval: 2,
                    title: {
                        text: 'Número de personas'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<b>{point.y:.0f} personas</b>'
                },
                plotOptions: {
                    column: {
                        borderRadius: 5
                    }
                },
                series: [{
                    name: 'Número de personas',
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        
                    }
                }]
            },
            chartOptionsAreas: {
                chart: {
                    type: 'bar'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'ÁREAS'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Cantidad de personas'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<b>{point.y:.0f} personas</b>'
                },
                plotOptions: {
                    column: {
                        borderRadius: 5
                    }
                },
                series: [{
                    name: 'Cantidad de personas',
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        
                    }
                }]
            },

            satisfaccion:{promedio:{porcentaje:0,label:"",color:""},subdimensiones:[]},
            bienestar:{promedio:{porcentaje:0,label:"",color:""},subdimensiones:[]},
            compromiso:{promedio:{porcentaje:0,label:"",color:""},subdimensiones:[]},
            individual_bienestar: [],
            step: 1,
            min: 0,
            max: 100,
            tests: [],
            rules: {
                tests: {
                    rule: [
                        v => !!v || 'Evaluación es requerida',
                    ]
                },
                
                conclusiones: {
                    rule: [
                        v => !!v || 'Este campo es requerido ',
                        v => v.length <= this.rules.conclusiones.counter || `Este campo debe ser menor o igual a ${this.rules.conclusiones.counter} caracteres`,
                    ],
                    counter: 3000
                },
                
            }
        }
    },
    computed: {
        ...mapGetters(['system','baseurl']),
        method () {
            return 'post'
        },
        url () {
            return '/reportes/postcovid/graficos'
        },
        urlPdf () {
            return '/reportes/postcovid/pdf'
        },
        titulo () {
            return "Reporte Post Covid"
        },
        dialogMensaje () {
            let mensaje = "Generando datos. Puede tardar unos minutos, espere por favor ..."
            if (this.step == 2)
                mensaje = "Generando PDF. Puede tardar unos minutos, espere por favor ..."
            return mensaje
        },
        dataParaPdf () {
            return {
                _id_test: this.data._id_test,
                conclusiones: this.data.conclusiones
            }
        }
        
    },
    watch : {
        'step': function(val) {
            this.data.conclusiones = val == 2 ? 'Esta nueva normalidad requiere que las Organizaciones, y su gente, se transformen a través del desarrollo de procesos, competencias y metodologías innovadoras. Por esto, es indispensable explorar los diferentes aspectos organizacionales que pueden afectar a la satisfacción, al bienestar de los colaboradores y, por ende, a su capacidad de adaptación a las demandas actuales. \n\r De esta manera, al tener un panorama claro de la situación dentro de la Empresa, se puedan implementar planes de mejora que permitan mantener a las personas motivadas y alineadas a los objetivos de la Organización. \n\r Así, con los resultados obtenidos a través de la herramienta SBC-19, el departamento de Talento Humano cuenta con un punto de partida para gestionar las acciones requeridas en beneficio de las personas y de la Empresa. \n\r  Finalmente, es importante considerar los siguientes puntos una vez que ya se analicen los resultados del informe presentado: \n\r  •	En caso de ser necesario, puede complementar estos resultados con otra herramienta de recolección de datos (Entrevistas, Grupos Focales, etc.). \n\r •	Socialice los resultados con los líderes de cada Área. \n\r •	Capacite a los líderes de cada área para que socialicen los resultados con su equipo. \n\r •	En casos más complejos, intervenga conjuntamente con el líder para retroalimentar los resultados a determinado colaborador. \n\r •	Planifique y ejecute las acciones recomendadas en este informe y compleméntelas con otras que considere necesarias. \n\r •	Realice un seguimiento a los planes ejecutados y evalúe nuevamente el impacto generado en los colaboradores. \n\r ' : ''
        }
    },
    components: {
        TituloPrincipalCx,
        FormCx,
        SubmitCx,
        ResumenDimensionPostCovid,
        UsuarioIndividualAreaPostCovid
    },
    async created() {
        let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
        let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
        const api = new Api(this.baseurl,'get',headers,{},{tipo:'postcovid'})
        let response = await api.call_respuesta_directa(`/tests/select/all`) 
        response = response.data ? response.data.data : this.tests
        this.tests = response
    },
    methods: {
        

        requeststarted () {
            this.dialogProcesando = true
        },

        success (response) {
            this.$notify(
                {
                    group: "bottom",
                    title: "Datos generados",
                    text: "Datos generados correctamente.",
                    type: 'success'
                },
                4000
            );
            this.chartOptionsGenero.series[0].data = response.data.data.dataGenero
            this.chartOptionsEdad.series[0].data = response.data.data.dataEdad
            this.chartOptionsAreas.series[0].data = response.data.data.dataAreas
            this.satisfaccion = response.data.data.satisfaccion
            this.bienestar = response.data.data.bienestar
            this.compromiso = response.data.data.compromiso
            this.individual_bienestar = response.data.data.individual_bienestar
            
            this.dialogProcesando = false
            this.step = 2
        },
        error () {
            this.dialogProcesando = false
            this.$notify(
                {
                    group: "bottom",
                    title: "Error",
                    text: "Ocurrió un inconveniente",
                    type: "error"
                },
                4000
            );
            
        },

        successPdf (response) {
            this.dialogProcesando = false
            this.$notify(
                {
                    group: "bottom",
                    title: "Datos generados",
                    text: "PDF Generado correctamente.",
                    type: 'success'
                },
                4000
            );

            this.linkpdf = response.data.data
            
        }
    }
}
</script>

<style scoped>
   
</style>