<template>
    <v-row>
        <v-col cols="12" class="p-20">
            <v-card elevation="2" >
                <highcharts class="p-10" :options="chartOptionsDimension"></highcharts>
                <highcharts class="p-10" :options="chartOptionsAreas"></highcharts>
                <highcharts class="p-10" :options="chartOptionsGenero"></highcharts>
                <highcharts class="p-10" :options="chartOptionsAntiguedad"></highcharts>
            </v-card>
        </v-col>                 
    </v-row>
</template>

<script>

//import {Chart} from 'highcharts-vue'


export default {
    name: 'ResumenDimension',
    data () {
        return {
            chartOptionsDimension:{
                'chart': {
                    'type': 'solidgauge'
                },
                credits: {
                    enabled: false
                },
                'title': {
                    text: this.title,
                    style: {
                        fontSize:"3em",
                        color: "#000000"
                    },
                    y:50
                },
                'tooltip': {
                    'enabled': false
                },
                
                'pane': {
                    'center': ['50%', '50%'],
                    'size': '300px',
                    'startAngle': 0,
                    'endAngle': 360,
                    'background': {
                        'backgroundColor': '#eaeaea',
                        'innerRadius': '80%',
                        'outerRadius': '100%',
                        'borderWidth': 0
                    }
                },

                'yAxis': {
                    'min': 0,
                    'max': 100,
                    'labels': {
                        'enabled': false
                    },
                
                    'lineWidth': 0,
                    'minorTickInterval': null,
                    'tickPixelInterval': 400,
                    'tickWidth': 0
                },

                'plotOptions': {
                    'solidgauge': {
                        'innerRadius': '80%',
                        'dataLabels': {
                        'enabled': true,
                        'format': '{y} %',
                        'borderColor': "#FFFFFF",
                        style: {
                            fontSize: '4em'
                        },
                        y:-35
                        }
                    }
                },
                
                'series': [{
                    'name': this.title,
                    'data': this.dataDimension
                }]
            },

            chartOptionsAreas:{
                chart: {
                    type: 'bar'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Resumen por Áreas de '+this.title
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
                    bar: {
                        borderRadius: 5,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.y:.2f} %</b>'
                        },
                    }
                },
                series: [{
                    name: 'Porcentaje de calificación',
                    data: this.dataAreas,
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        
                    }
                }]
            },

            chartOptionsGenero:{
                chart: {
                    type: 'bar'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Resumen por Género de '+this.title
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
                    bar: {
                        borderRadius: 5,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.y:.2f} %</b>'
                        },
                    }
                },
                series: [{
                    name: 'Porcentaje de calificación',
                    data: this.dataGenero,
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        
                    }
                }]
            },

            chartOptionsAntiguedad:{
                chart: {
                    type: 'bar'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Resumen por Antigüedad de '+this.title
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
                    bar: {
                        borderRadius: 5,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.y:.2f} %</b>'
                        },
                    }
                },
                series: [{
                    name: 'Porcentaje de calificación',
                    data: this.dataAntiguedad,
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        
                    }
                }]
            },

        }
    },

    props: {
        title: {
            type: String,
            default: ''
        },
        dataDimension: {
            type: Array,
            default: () => {
                return []
            }
        },
        dataAreas: {
            type: Array,
            default: () => {
                return []
            }
        },
        dataGenero: {
            type: Array,
            default: () => {
                return []
            }
        },
        dataAntiguedad: {
            type: Array,
            default: () => {
                return []
            }
        },
    },
    components: {
       
    }
    
}
</script>

<style scoped>
   
</style>