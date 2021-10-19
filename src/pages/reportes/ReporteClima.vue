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
                                                <td class="text-left">EXCELENTE</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.excelente.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.excelente.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.medio_alto.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO ALTO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.medio_alto.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.medio_alto.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.normal.color" size="35"></v-avatar></td>
                                                <td class="text-left">NORMAL</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.normal.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.normal.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.medio_bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO BAJO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.medio_bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.semaforo.medio_bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.emergencia.color" size="35"></v-avatar></td>
                                                <td class="text-left">EMERGENCIA</td>
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
                                <v-textarea
                                    label="¿Cómo utilizar este reporte?"
                                    auto-grow
                                    outlined
                                    rows="2"
                                    v-model="data.utilizar"
                                    :rules="rules.utilizar.rule"
                                    :counter="rules.utilizar.counter"
                                    row-height="50"
                                    required
                                    ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    label="Composición del reporte"
                                    auto-grow
                                    outlined
                                    rows="2"
                                    v-model="data.composicion"
                                    :rules="rules.composicion.rule"
                                    :counter="rules.composicion.counter"
                                    row-height="50"
                                    required
                                    ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    label="Acciones a seguir"
                                    auto-grow
                                    outlined
                                    rows="2"
                                    v-model="data.acciones"
                                    :rules="rules.acciones.rule"
                                    :counter="rules.acciones.counter"
                                    row-height="50"
                                    required
                                    ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsGenero"></highcharts>
                            </v-col>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsAntiguedad"></highcharts>
                            </v-col>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsAreas"></highcharts>
                            </v-col>
                            <v-col cols="6">
                                <v-card
                                    class="mx-auto"
                                    max-width="400"
                                >
                                    <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline">
                                        Resumen General
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
                                        {{promedioGeneral.porcentaje}} %
                                        </v-col>
                                        <v-col cols="6" class="display-1">
                                            {{promedioGeneral.label}}
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
                                                <td class="text-left">EXCELENTE</td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.excelente.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.excelente.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.medio_alto.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO ALTO</td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.medio_alto.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.medio_alto.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.normal.color" size="35"></v-avatar></td>
                                                <td class="text-left">NORMAL</td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.normal.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.normal.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.medio_bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO BAJO</td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.medio_bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.semaforo.medio_bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.semaforo.emergencia.color" size="35"></v-avatar></td>
                                                <td class="text-left">EMERGENCIA</td>
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
                            <v-col cols="12">
                                <highcharts :options="chartOptionsPromedioPorAreas"></highcharts>
                            </v-col>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsPromedioPorGenero"></highcharts>
                            </v-col>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsPromedioPorAntiguedad"></highcharts>
                            </v-col>
                            <v-col cols="12" v-for="(dimension) in dataPorCadaDimension" :key="dimension.title">
                                <resumen-dimension :title="dimension.title" 
                                :dataDimension="dimension.dataDimension"
                                :dataAreas="dimension.dataAreas.data"
                                :dataGenero="dimension.dataGenero"
                                :dataAntiguedad="dimension.dataAntiguedad" />
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
import ResumenDimension from '@/pages/reportes/ResumenDimension'
import FormCx from '@/components/forms/FormCx'
import SubmitCx from '@/components/forms/SubmitCx'

import { mapGetters } from 'vuex'

export default {
    name: 'ReporteClima',
    data () {
        return {
            linkpdf: null,
            dialogProcesando: false,
            dataPorCadaDimension: [],
            areaMayor: null,
            areaMenor: null,
            data: {
                _id_test: '',
                utilizar: '',
                composicion: '',
                acciones: '',
                semaforo: {
                    excelente: {
                        color: '#98c415',
                        desde: 75.71,
                        hasta: 100,
                        label: "Excelente"
                    },
                    medio_alto: {
                        color: '#99d9ea',
                        desde: 61.24,
                        hasta: 75.70,
                        label: "Medio Alto"
                    },
                    normal: {
                        color: '#ffd93b',
                        desde: 41.42,
                        hasta: 61.23,
                        label: "Normal"
                    },
                    medio_bajo: {
                        color: '#ff7506',
                        desde: 21.42,
                        hasta: 41.41,
                        label: "Medio Bajo"
                    },
                    emergencia: {
                        color: '#ed1c24',
                        desde: 0,
                        hasta: 21.41,
                        label: "Emergencia"
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
            chartOptionsAntiguedad: {
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
                    text: 'ANTIGÜEDAD'
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
                    y: 0,
                    width: 340,
                    itemWidth: 170
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            distance: -30,
                            color: 'white',
                            enabled: true,
                            format: '<b>{point.percentage:.2f} %</b>'
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Antigüedad',
                    colorByPoint: true,
                    data: []
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
            chartOptionsPromedioPorAreas: {
                chart: {
                    type: 'column'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Resumen General por Áreas'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Porcentaje de calificación'
                    },

                    labels: {
                        formatter: function() {
                            return this.value + ' %';
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<b>{point.y:.2f} %</b>'
                },
                plotOptions: {
                    column: {
                        borderRadius: 5,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.y:.2f} %</b>'
                        },
                    }
                },
                series: [{
                    name: 'Porcentaje de calificación',
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        
                    }
                }]
            },
            chartOptionsPromedioPorGenero: {
                chart: {
                    type: 'column'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Resumen General por Género'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Porcentaje de calificación'
                    },

                    labels: {
                        formatter: function() {
                            return this.value + ' %';
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<b>{point.y:.2f} %</b>'
                },
                plotOptions: {
                    column: {
                        borderRadius: 5,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.y:.2f} %</b>'
                        },
                    }
                },
                series: [{
                    name: 'Porcentaje de calificación',
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        
                    }
                }]
            },
            chartOptionsPromedioPorAntiguedad: {
                chart: {
                    type: 'column'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Resumen General por Antigüedad'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Porcentaje de calificación'
                    },

                    labels: {
                        formatter: function() {
                            return this.value + ' %';
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<b>{point.y:.2f} %</b>'
                },
                plotOptions: {
                    column: {
                        borderRadius: 5,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.y:.2f} %</b>'
                        },
                    }
                },
                series: [{
                    name: 'Porcentaje de calificación',
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        
                    }
                }]
            },

            promedioGeneral:{promedio:0,label:""},
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
                utilizar: {
                    rule: [
                        v => !!v || 'Este campo es requerido',
                        v => v.length <= this.rules.utilizar.counter || `Este campo debe ser menor o igual a ${this.rules.utilizar.counter} caracteres`,
                    ],
                    counter: 400
                },
                conclusiones: {
                    rule: [
                        v => !!v || 'Este campo es requerido ',
                        v => v.length <= this.rules.conclusiones.counter || `Este campo debe ser menor o igual a ${this.rules.conclusiones.counter} caracteres`,
                    ],
                    counter: 3000
                },
                composicion: {
                    rule: [
                        v => !!v || 'Este campo es requerido es requerido',
                        v => v.length <= this.rules.composicion.counter || `Este campo debe ser menor o igual a ${this.rules.composicion.counter} caracteres`,
                    ],
                    counter: 1000
                },
                acciones: {
                    rule: [
                        v => !!v || 'Este campo es requerido es requerido',
                        v => v.length <= this.rules.acciones.counter || `Este campo debe ser menor o igual a ${this.rules.acciones.counter} caracteres`,
                    ],
                    counter: 1000
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
            return '/reportes/clima/graficos'
        },
        urlPdf () {
            return '/reportes/clima/pdf'
        },
        titulo () {
            return "Reporte Clima Laboral"
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
                instrucciones_generales:{
                    utilizar: this.data.utilizar,
                    composicion: this.data.composicion,
                    acciones: this.data.acciones
                },
                datos_por_grupos: {
                    genero: this.chartOptionsGenero.series[0].data,
                    antiguedad: this.chartOptionsAntiguedad.series[0].data,
                    areas: this.chartOptionsAreas.series[0].data,
                },
                total_general: {
                    promedio_compania: this.promedioGeneral,
                    semaforo: this.data.semaforo,
                    areas: this.chartOptionsPromedioPorAreas.series[0].data,
                    areaMayor: this.areaMayor,
                    areaMenor: this.areaMenor,
                    generos: this.chartOptionsPromedioPorGenero.series[0].data,
                    antiguedades: this.chartOptionsPromedioPorAntiguedad.series[0].data
                },
                resumen_por_dimension:this.dataPorCadaDimension,
                conclusiones: this.data.conclusiones
            }
        }
        
    },
    watch : {
        'step': function(val) {
            this.data.utilizar = val == 2 ? 'La evaluación de clima organizacional es un insumo muy importante para la empresa, puesto que permite identificar las fortalezas y debilidades del ambiente de trabajo con el fin de tomar las acciones pertinentes para convertirlas en oportunidades de mejora.' : ''
            this.data.composicion = val == 2 ? 'En la parte superior del reporte está el resultado general del clima de la compañía, el semáforo con los valores y el nombre correspondiente a cada color. El reporte permite visualizar los resultados de cada departamento y compararlos con el resultado general de la empresa.\nLas barras de los departamentos tienen un código de color que representa el resultado alcanzado teniendo en cuenta los valores del semáforo.\nEl reporte muestra el detalle de los resultados de cada Dimensión de clima para cada departamento. Debajo de cada tabla, aparecen destacados los aspectos más desarrollados y aquellos que deben desarrollarse.\nAl final, se visualiza la lista de comentarios cualitativos de los participantes de la evaluación.' : ''
            this.data.acciones = val == 2 ? 'La expectativa que se genera al interior de una organización cuando el clima laboral se evalúa es muy grande. Los colaboradores esperan que se tomen acciones con respecto a los resultados. Por tal motivo, recomendamos en primera instancia socializar los resultados para que los empleados entiendan la situación. Al socializar los resultados se debe hacer énfasis en las fortalezas y en las oportunidades de mejora. El clima no pretende señalar responsables, por el contrario, entre todos se deben compartir las buenas prácticas de las sedes que hayan tenido buenos puntajes y analizar con detalle cuáles puedes ser las acciones que se deben tomar para mejorar los resultados bajos. Es muy importante que se haga trazabilidad o seguimiento a las acciones de mejora. Recuerde que lo que no se mide no se puede gerenciar.': ''
            this.data.conclusiones = val == 2 ? 'Tras haber analizado los resultados de la Evaluación de Clima Laboral de la Fundación Faces del año 2021 se pueden mencionar los siguientes puntos importantes:\n En el caso de género, se observa que la mayor parte de actividades son desarrolladas por el género masculino por lo tanto, son quienes tienen mayor participación en los resultados. En cuanto a las áreas en las cuales trabajan las personas, se puede decir que las personas del Área de Riesgos, presentan resultados más bajos que las demás, por lo cual, se recomienda analizar la cantidad y calidad de la información que se le transmite al personal de este departamento; de igual forma, se deben evaluar las condiciones que reciben estas personas debido a que, los resultados reflejan una satisfacción del 34,4% en este aspecto; por otro lado, se recomienda monitorear el estilo de liderazgo que ejerce influencia sobre esta área porque se ha encontrado un nivel de satisfacción del 40%. Finalmente, es necesario mejorar la organización y la distribución de funciones y responsabilidades en esta área debido a que la puntuación en esta escala fue de 45/100.\nCon respecto al análisis de las respuestas de los participantes en función de los años de antigüedad dentro de la empresa, se pudo notar lo siguiente: en primer lugar, un 77% de colaboradores se encuentra laborando en la empresa 5 años o menos; esto refleja cierta rotación del personal, sobre todo en área Comercial.\n Por otra parte, se debe considerar que el personal nuevo se encuentra menos satisfecho con el Clima Laboral de la Empresa en relación a las personas más antiguas; por esto, es importante monitorear el nivel de satisfacción de las personas para motivarlos a través de diferentes programas que busquen aumentar su sentido de pertenencia y el compromiso con la organización.\n Para finalizar, se debe felicitar a la empresa por los resultados encontrados en las escalas de Relaciones, Innovación y Autorrealización debido a que la percepción de todos los colaboradores, demuestra que se sienten satisfechos por las relaciones interpersonales que tienen entre compañeros; también, reconocen que la Organización acepta y adopta rápidamente nuevas metodologías y procesos de trabajo que les permiten mantenerse en el mercado de manera competitiva; además, las personas sienten que están explotando su potencial y están desarrollándose como profesionales dentro de la empresa, lo cual es una cuestión importante porque esto impacta directamente en la motivación intrínseca de los colaboradores.' : ''
        }
    },
    components: {
        TituloPrincipalCx,
        FormCx,
        SubmitCx,
        ResumenDimension
    },
    async created() {
        let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
        let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
        const api = new Api(this.baseurl,'get',headers,{},{tipo:'clima_laboral'})
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
            this.chartOptionsAntiguedad.series[0].data = response.data.data.dataAntiguedad
            this.chartOptionsAreas.series[0].data = response.data.data.dataAreas
            this.promedioGeneral = response.data.data.promedioGeneral
            this.chartOptionsPromedioPorAreas.series[0].data = response.data.data.dataPromedioPorAreas.data
            this.areaMayor = response.data.data.dataPromedioPorAreas.mayor
            this.areaMenor = response.data.data.dataPromedioPorAreas.menor
            this.chartOptionsPromedioPorGenero.series[0].data = response.data.data.dataPromedioPorGenero
            this.chartOptionsPromedioPorAntiguedad.series[0].data = response.data.data.dataPromedioPorAntiguedad
            this.dataPorCadaDimension = response.data.data.dataPorCadaDimension
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
   
</style>