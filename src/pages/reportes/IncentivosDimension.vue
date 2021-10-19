<template>
    <v-row>
        <v-col cols="12">
            <h3>{{area}}</h3>
        </v-col>
        <v-col cols="6" class="p-4">
            <v-card elevation="2" >
                <highcharts class="p-2" :options="chartOptionsIncentivosMasValora"></highcharts>
            </v-card>
        </v-col>
        <v-col cols="6" class="p-4">
            <v-card elevation="2" >
                <highcharts class="p-2" :options="chartOptionsLoQueMasMotiva"></highcharts>
            </v-card>
        </v-col>
        <v-col cols="6" class="p-4">
            <v-card elevation="2" >
                <highcharts class="p-2" :options="chartOptionsLoQueMasDesmotiva"></highcharts>
            </v-card>
        </v-col>
        <v-col cols="6" class="p-4">
            <v-card elevation="2" >
                <highcharts class="p-2" :options="chartOptionsIncentivosEspera"></highcharts>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

//import {Chart} from 'highcharts-vue'


export default {
    name: 'IncentivosDimension',
    data () {
        return {
            chartOptionsIncentivosMasValora:{
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
                    text: 'INCENTIVOS QUE MÁS VALORAN'
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
                    name: 'INCENTIVOS QUE MÁS VALORAN',
                    colorByPoint: true,
                    data: this.data.incentivosMasValora
                }]
            },
            chartOptionsLoQueMasMotiva: {
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
                    text: 'LO QUE MÁS LES MOTIVA A LOS COLABORADORES'
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
                    name: 'LO QUE MÁS LES MOTIVA A LOS COLABORADORES',
                    colorByPoint: true,
                    data: this.data.loQueMasMotiva
                }]
            },
            chartOptionsLoQueMasDesmotiva: {
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
                    text: 'LO QUE MÁS LES DESMOTIVA A LOS COLABORADORES'
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
                    name: 'LO QUE MÁS LES DESMOTIVA A LOS COLABORADORES',
                    colorByPoint: true,
                    data: this.data.loQueMasDesmotiva
                }]
            },
            chartOptionsIncentivosEspera: {
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
                    text: 'INCENTIVOS QUE ESPERAN POR PARTE DE LA EMPRESA'
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
                    name: 'INCENTIVOS QUE ESPERAN POR PARTE DE LA EMPRESA',
                    colorByPoint: true,
                    data: this.data.incentivosEspera
                }]
            }
        }
    },

    props: {
        
         area: {
            type: String,
            default: ''
        },
        data: {
            type: Object,
            default: () => {
                return {
                    incentivosMasValora: [],
                    loQueMasMotiva: [],
                    loQueMasDesmotiva: [],
                    incentivosEspera: []
                }
            }
        }
    },
    components: {
       
    }
    
}
</script>

<style scoped>
   
</style>