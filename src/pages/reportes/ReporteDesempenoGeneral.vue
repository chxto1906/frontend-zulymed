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
                            <v-col cols="3" class="text-center"></v-col>
                            <v-col cols="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Semáforo general
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo_cualitativas.excelente.color" size="35"></v-avatar></td>
                                                <td class="text-left">EXCELENTE</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo_cualitativas.excelente.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo_cualitativas.excelente.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo_cualitativas.bueno.color" size="35"></v-avatar></td>
                                                <td class="text-left">BUENO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo_cualitativas.bueno.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo_cualitativas.bueno.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo_cualitativas.regular.color" size="35"></v-avatar></td>
                                                <td class="text-left">REGULAR</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo_cualitativas.regular.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo_cualitativas.regular.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo_cualitativas.deficiente.color" size="35"></v-avatar></td>
                                                <td class="text-left">DEFICIENTE</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo_cualitativas.deficiente.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo_cualitativas.deficiente.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            

                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="3" class="text-center"></v-col>
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
                                <v-card elevation="2" >
                                    <!-- GENERALES -->
                                    
                                    <p>1. Resultado por Competencias Generales:</p>
                                    <highcharts :options="chartOptionsCompetenciasGenerales"></highcharts>
                                    <table class="table-zebra" style="width: 100%;">
                                        <thead>
                                            <tr class="head-desempeno table-zebra">
                                                <th class="title-head table-zebra">Competencia</th>
                                                <th class="title-head table-zebra">Promedio de resultados</th>
                                                <th class="title-head table-zebra"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item) in items_competencias_generales" :key="item.competencia" class="p-0 rows-zebra">
                                                <td class="rows-body table-zebra" style="width: 25%;">
                                                    {{ item.competencia }}
                                                </td>
                                                <td class="rows-body table-zebra" style="position: relative !important; width: 70%;">
                                                    <v-progress-linear
                                                        v-model="item.semaforo.valor"
                                                        :color="item.semaforo.color"
                                                        height="18"
                                                        >
                                                        <template v-slot:default="{ value }">
                                                            <strong>{{ Math.ceil(value) }}%</strong>
                                                        </template>
                                                    </v-progress-linear>
                                                </td>
                                                <td class="rows-body table-zebra" style="width: 5%;">
                                                    {{ item.semaforo.valor }} %
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr class="head-desempeno table-zebra">
                                                <td class="title-head table-zebra">TOTAL</td>
                                                <td class="title-head table-zebra"></td>
                                                <td class="title-head table-zebra">{{ competencias_generales }} %</td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <br>
                                    <!-- ESPECIFICAS -->
                                    
                                    <p>2. Resultado Global Competencias Específicas:</p>
                                    <highcharts :options="chartOptionsCompetenciasEspecificas"></highcharts>
                                    <table class="table-zebra" style="width: 100%;">
                                        <thead>
                                            <tr class="head-desempeno table-zebra">
                                                <th class="title-head table-zebra">Competencia</th>
                                                <th class="title-head table-zebra">Promedio de resultados</th>
                                                <th class="title-head table-zebra"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item) in items_competencias_especificas" :key="item.competencia" class="p-0 rows-zebra">
                                                <td class="rows-body table-zebra" style="width: 25%;">
                                                    {{ item.competencia }}
                                                </td>
                                                <td class="rows-body table-zebra" style="position: relative !important; width: 70%;">
                                                    <v-progress-linear
                                                        v-model="item.semaforo.valor"
                                                        :color="item.semaforo.color"
                                                        height="18"
                                                        >
                                                        <template v-slot:default="{ value }">
                                                            <strong>{{ Math.ceil(value) }}%</strong>
                                                        </template>
                                                    </v-progress-linear>
                                                </td>
                                                <td class="rows-body table-zebra" style="width: 5%;">
                                                    {{ item.semaforo.valor }} %
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr class="head-desempeno table-zebra">
                                                <td class="title-head table-zebra">TOTAL</td>
                                                <td class="title-head table-zebra"></td>
                                                <td class="title-head table-zebra">{{ competencias_especificas }} %</td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <br>
                                    <!-- KPIS CATEGORIAS -->
                                    
                                    <p>3. Resultados por Departamento KPIS:</p>
                                    <table class="table-zebra" style="width: 100%;">
                                        <thead>
                                            <tr class="head-desempeno table-zebra">
                                                <th class="title-head table-zebra">Departamento</th>
                                                <th class="title-head table-zebra">Promedio de resultados</th>
                                                <th class="title-head table-zebra"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item) in areasKpis" :key="item.area" class="p-0 rows-zebra">
                                                <td class="rows-body table-zebra" style="width: 25%;">
                                                    {{ item.area }}
                                                </td>
                                                <td class="rows-body table-zebra" style="position: relative !important; width: 70%;">
                                                    <v-progress-linear
                                                        v-model="item.semaforo.valor"
                                                        :color="item.semaforo.color"
                                                        height="18"
                                                        >
                                                        <template v-slot:default="{ value }">
                                                            <strong>{{ Math.ceil(value) }}%</strong>
                                                        </template>
                                                    </v-progress-linear>
                                                </td>
                                                <td class="rows-body table-zebra" style="width: 5%;">
                                                    {{ item.semaforo.valor }} %
                                                </td>
                                            </tr>
                                        </tbody>
                                        
                                    </table>

                                    <br>
                                    <!-- DESEMPENO CATEGORIAS -->
                                    
                                    <p>4. Resultados por Departamento Indicadores Sociales:</p>
                                    <table class="table-zebra" style="width: 100%;">
                                        <thead>
                                            <tr class="head-desempeno table-zebra">
                                                <th class="title-head table-zebra">Departamento</th>
                                                <th class="title-head table-zebra">Promedio de resultados</th>
                                                <th class="title-head table-zebra"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item) in areasDesempeno" :key="item.area" class="p-0 rows-zebra">
                                                <td class="rows-body table-zebra" style="width: 25%;">
                                                    {{ item.area }}
                                                </td>
                                                <td class="rows-body table-zebra" style="position: relative !important; width: 70%;">
                                                    <v-progress-linear
                                                        v-model="item.semaforo.valor"
                                                        :color="item.semaforo.color"
                                                        height="18"
                                                        >
                                                        <template v-slot:default="{ value }">
                                                            <strong>{{ Math.ceil(value) }}%</strong>
                                                        </template>
                                                    </v-progress-linear>
                                                </td>
                                                <td class="rows-body table-zebra" style="width: 5%;">
                                                    {{ item.semaforo.valor }} %
                                                </td>
                                            </tr>
                                        </tbody>
                                        
                                    </table>

                                    <br>
                                    <!-- GENERALES Y ESPECIFICAS CATEGORIAS -->
                                    <p>5. Resultados por Departamento Competencias Generales y Específicas Sociales:</p>
                                    <div v-for="(item,index) in generalesEspecificasItems" :key="`${index}`">
                                        <desempeno-generales-especificas-areas :area="item"></desempeno-generales-especificas-areas>
                                    </div>
                                </v-card>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    label="Conclusiones"
                                    auto-grow
                                    outlined
                                    rows="5"
                                    v-model="data.conclusiones"
                                    :counter="rules.conclusiones.counter"
                                    row-height="100"
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
import DesempenoGeneralesEspecificasAreas from '@/pages/reportes/DesempenoGeneralesEspecificasAreas'

import FormCx from '@/components/forms/FormCx'
import SubmitCx from '@/components/forms/SubmitCx'

import { mapGetters } from 'vuex'

export default {
    name: 'ReporteDesempenoGeneral',
    data () {
        return {
            linkpdf: null,
            linkpdf_general: null,
            dialogProcesando: false,
            dataPorCadaDimension: [],
            areaMayor: null,
            areaMenor: null,
            competencias_generales: 0,
            competencias_especificas: 0,
            items_competencias_generales: [],
            items_competencias_especificas: [],
            generalesEspecificasItems: [],
            areasKpis: [],
            areasDesempeno: [],
            data: {
                _id_test: '',
                semaforo_cualitativas: {
                    excelente: {
                        color: '#35bcc1',
                        desde: 90.01,
                        hasta: 100.00,
                        label: "Excelente"
                    },
                    bueno: {
                        color: '#bbd263',
                        desde: 80.01,
                        hasta: 90.00,
                        label: "Bueno"
                    },
                    regular: {
                        color: '#fdd837',
                        desde: 60.01,
                        hasta: 80.00,
                        label: "Regular"
                    },
                    deficiente: {
                        color: '#e25f53',
                        desde: 0,
                        hasta: 60.00,
                        label: "Deficiente"
                    }
                },
                semaforo_cuantitativas: {
                    optimo: {
                        color: '#35bcc1',
                        desde: 100.01,
                        hasta: 120.00,
                        label: "Óptimo"
                    },
                    bueno: {
                        color: '#bbd263',
                        desde: 85.01,
                        hasta: 100.00,
                        label: "Bueno"
                    },
                    regular: {
                        color: '#fdd837',
                        desde: 70.01,
                        hasta: 85.00,
                        label: "Regular"
                    },
                    deficiente: {
                        color: '#e25f53',
                        desde: 0,
                        hasta: 70.00,
                        label: "Deficiente"
                    }
                },
                conclusiones: ''
            },
            chartOptionsCompetenciasGenerales: {
                chart: {
                    type: 'solidgauge',
                    height: 166,
                    margin: 0
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: '',
                    y: -1,
                    style: {
                    fontSize:"1em",
                    color: "#000000"
                    },
                },
                subtitle: {
                    text: '',
                    style: {
                    fontSize:"1em",
                    color: "#000000"
                    },
                    y:130
                },
                tooltip: {
                    enabled: false
                },
                
                pane: {
                    center: ['50%', '40%'],
                    size: '110px',
                    startAngle: 0,
                    endAngle: 360,
                    background: {
                    backgroundColor: '#eaeaea',
                    innerRadius: '70%',
                    outerRadius: '100%',
                    borderWidth: 0
                    }
                },
                
                yAxis: {
                    min: 0,
                    max: 100,
                    labels: {
                    enabled: false
                    },
                
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: 400,
                    tickWidth: 0
                },
                
                plotOptions: {
                    solidgauge: {
                    innerRadius: '70%',
                    dataLabels: {
                        enabled: true,
                        format: '{y} %',
                        borderColor: "transparent",
                        style: {
                        fontSize: '1.5em'
                        },
                        y:-16
                    }
                    }
                },
                
                series: [{
                    name: '',
                    data: [{
                    color:'',
                    y:0
                    }]
                }]
            },
            chartOptionsCompetenciasEspecificas: {
                chart: {
                    type: 'solidgauge',
                    height: 166,
                    margin: 0
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: '',
                    y: -1,
                    style: {
                    fontSize:"1em",
                    color: "#000000"
                    },
                },
                subtitle: {
                    text: '',
                    style: {
                    fontSize:"1em",
                    color: "#000000"
                    },
                    y:130
                },
                tooltip: {
                    enabled: false
                },
                
                pane: {
                    center: ['50%', '40%'],
                    size: '110px',
                    startAngle: 0,
                    endAngle: 360,
                    background: {
                    backgroundColor: '#eaeaea',
                    innerRadius: '70%',
                    outerRadius: '100%',
                    borderWidth: 0
                    }
                },
                
                yAxis: {
                    min: 0,
                    max: 100,
                    labels: {
                    enabled: false
                    },
                
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: 400,
                    tickWidth: 0
                },
                
                plotOptions: {
                    solidgauge: {
                    innerRadius: '70%',
                    dataLabels: {
                        enabled: true,
                        format: '{y} %',
                        borderColor: "transparent",
                        style: {
                        fontSize: '1.5em'
                        },
                        y:-16
                    }
                    }
                },
                
                series: [{
                    name: '',
                    data: [{
                    color:'',
                    y:0
                    }]
                }]
            },
            
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
                }
            }
        }
    },
    computed: {
        ...mapGetters(['system','baseurl']),
        method () {
            return 'post'
        },
        url () {
            return '/reportes/desempeno/general/graficos'
        },
        urlPdf () {
            return '/reportes/desempeno/general/pdf'
        },
        titulo () {
            return "Reporte de Desempeño General"
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
            this.data.conclusiones = val == 2 ? 'Tras haber analizado los resultados de la Evaluación de Clima Laboral de la Fundación Faces del año 2021 se pueden mencionar los siguientes puntos importantes:\n En el caso de género, se observa que la mayor parte de actividades son desarrolladas por el género masculino por lo tanto, son quienes tienen mayor participación en los resultados. En cuanto a las áreas en las cuales trabajan las personas, se puede decir que las personas del Área de Riesgos, presentan resultados más bajos que las demás, por lo cual, se recomienda analizar la cantidad y calidad de la información que se le transmite al personal de este departamento; de igual forma, se deben evaluar las condiciones que reciben estas personas debido a que, los resultados reflejan una satisfacción del 34,4% en este aspecto; por otro lado, se recomienda monitorear el estilo de liderazgo que ejerce influencia sobre esta área porque se ha encontrado un nivel de satisfacción del 40%. Finalmente, es necesario mejorar la organización y la distribución de funciones y responsabilidades en esta área debido a que la puntuación en esta escala fue de 45/100.\nCon respecto al análisis de las respuestas de los participantes en función de los años de antigüedad dentro de la empresa, se pudo notar lo siguiente: en primer lugar, un 77% de colaboradores se encuentra laborando en la empresa 5 años o menos; esto refleja cierta rotación del personal, sobre todo en área Comercial.\n Por otra parte, se debe considerar que el personal nuevo se encuentra menos satisfecho con el Clima Laboral de la Empresa en relación a las personas más antiguas; por esto, es importante monitorear el nivel de satisfacción de las personas para motivarlos a través de diferentes programas que busquen aumentar su sentido de pertenencia y el compromiso con la organización.\n Para finalizar, se debe felicitar a la empresa por los resultados encontrados en las escalas de Relaciones, Innovación y Autorrealización debido a que la percepción de todos los colaboradores, demuestra que se sienten satisfechos por las relaciones interpersonales que tienen entre compañeros; también, reconocen que la Organización acepta y adopta rápidamente nuevas metodologías y procesos de trabajo que les permiten mantenerse en el mercado de manera competitiva; además, las personas sienten que están explotando su potencial y están desarrollándose como profesionales dentro de la empresa, lo cual es una cuestión importante porque esto impacta directamente en la motivación intrínseca de los colaboradores.' : ''
        }
    },
    components: {
        TituloPrincipalCx,
        FormCx,
        SubmitCx,
        DesempenoGeneralesEspecificasAreas
    },
    async created() {
        let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
        let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
        const api = new Api(this.baseurl,'get',headers,{},{tipo:'desempeno'})
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
            this.chartOptionsCompetenciasGenerales.series[0].data[0].color = response.data.data.cualitativas.generales.semaforo.color
            this.chartOptionsCompetenciasGenerales.series[0].data[0].y = response.data.data.cualitativas.generales.semaforo.valor
            this.chartOptionsCompetenciasGenerales.subtitle.text = 'Promedio de la compañía'
            this.items_competencias_generales = response.data.data.cualitativas.generales.items
            this.competencias_generales = response.data.data.cualitativas.generales.sumPromedio

            this.chartOptionsCompetenciasEspecificas.series[0].data[0].color = response.data.data.cualitativas.especificas.semaforo.color
            this.chartOptionsCompetenciasEspecificas.series[0].data[0].y = response.data.data.cualitativas.especificas.semaforo.valor
            this.items_competencias_especificas = response.data.data.cualitativas.especificas.items
            this.competencias_especificas = response.data.data.cualitativas.especificas.sumPromedio
            

            this.areasKpis = response.data.data.cuantitativas.kpis
            this.areasDesempeno = response.data.data.cuantitativas.desempeno

            this.generalesEspecificasItems = response.data.data.cuantitativas.generalesEspecificas

            this.dialogProcesando = false
            this.step = 2
            //this.$router.push("/backoffice/empresas-listar");
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
   .title-head {
            color: #FFFFFF;
            background-color: #265b86;
            height: 10px;
            font-size: 9px;
            font-weight: bold;
            text-align: center;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .rows-body {
            text-align: center; 
            font-size: 9px;
            margin-top: -11px;
            padding: 2px;
            height: 20px;
            margin-right: 1px;;
        }
        .table-zebra {
            border: 1px solid #373737;
            border-collapse: collapse;
        }




    .progress-bar {
        border-radius: 0px;
        overflow: hidden;
        width: 99%;
    }

    span {
            display: block;
        }

    .bar {
        background: #eef1f3;
    }

    .progress {
        color: #fff;
        padding: 7px;
    }

    .progress-bar {
        top: 3px;
        
        max-width: 100%;
        
        transform: translate3d(-50%,-50%,0);
    }
</style>