<template>
    <v-row>
        <v-col cols="12">
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
                    <tr v-for="(item,index) in area.items" :key="`${index}`" class="p-0 rows-zebra">
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
                
            </table>
        </v-col>                 
    </v-row>
</template>

<script>

//import {Chart} from 'highcharts-vue'


export default {
    name: 'DesempenoGeneralesEspecificasAreas',
    data () {
        return {
            chartOptionsCompetenciasGenerales: {
                chart: {
                    type: 'solidgauge',
                    height: 266,
                    margin: 0
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: this.area.name,
                    y: 20,
                    style: {
                        fontSize:"2em",
                        color: "#000000"
                    },
                },
                subtitle: {
                    text: 'Promedio del departamento',
                    style: {
                    fontSize:"1em",
                    color: "#000000"
                    },
                    y:170
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
                    color:this.area.semaforo.color,
                    y:this.area.semaforo.valor
                    }]
                }]
            },


        }
    },

    props: {
        
        area: {
            type: Object,
            default: () => {
                return {name: null,items:[],semaforo:{}}
            }
        }
    },
    components: {
       
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