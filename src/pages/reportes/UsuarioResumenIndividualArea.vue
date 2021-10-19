<template>
    <v-row>
        <v-col cols="12" class="p-20">
            <v-card elevation="2" >
                <highcharts class="p-10" :options="chartOptionsPerfilMotivacional"></highcharts>
                <highcharts class="p-10" :options="chartOptionsFactoresHigienicos"></highcharts>
                <highcharts class="p-10" :options="chartOptionsFactoresMotivacionales"></highcharts>
            </v-card>
        </v-col>                 
    </v-row>
</template>

<script>

//import {Chart} from 'highcharts-vue'


export default {
    name: 'UsuarioResumenIndividualArea',
    data () {
        const categories = ['Afiliación', 'Exploración', 'Logro', 'Poder'];
        return {
            chartOptionsPerfilMotivacional:{
                chart: {
                    polar: true,
                    type: 'line'
                },
                
                title: {
                text: this.perfil_motivacional.title,
                x: -80
                },

                xAxis: {
                    categories: categories,
                    tickmarkPlacement: 'on',
                    lineWidth: 0
                },

                yAxis: {
                    gridLineInterpolation: 'polygon',
                    min: 0,
                    max: 100,
                    tickInterval: 20
                },

                series: [{
                    name: "Puntaje final /100%",
                    data: this.perfil_motivacional.data /*[41, 63, 93, 43]*/,
                    pointPlacement: 'on'
                }],
                
                legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
                }
            },

            chartOptionsFactoresMotivacionales: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: this.factores_motivacionales.title
                },
                xAxis: {
                    categories: ['Autorealización / Reconocimiento', 'Tareas', 'Crecimiento']
                },
                yAxis: {
                    min: 0,
                    max: 16
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                    stacking: 'normal'
                    }
                },
                series: this.factores_motivacionales.data
            },

            chartOptionsFactoresHigienicos: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: this.factores_higienicos.title
                },
                xAxis: {
                    categories: ['Estatus', 'Relaciones con superiores', 'Relaciones laborales', 'Políticas de empresa', 'Condiciones de trabajo']
                },
                yAxis: {
                    min: 0,
                    max: 32
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                    stacking: 'normal'
                    }
                },
                series: this.factores_higienicos.data
            },

        }
    },

    props: {
        
        perfil_motivacional: {
            type: Object,
            default: () => {
                return {title: null,data:[]}
            }
        },
        factores_higienicos: {
            type: Object,
            default: () => {
                return {title: null,data:[]}
            }
        },
        factores_motivacionales: {
            type: Object,
            default: () => {
                return {title: null,data:[]}
            }
        }
    },
    components: {
       
    }
    
}
</script>

<style scoped>
   
</style>