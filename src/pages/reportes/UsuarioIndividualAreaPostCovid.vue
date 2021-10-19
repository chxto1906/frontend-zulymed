<template>
    <v-row>
        <v-col cols="12" class="p-20">
            <v-card elevation="2" >
                <highcharts class="p-10" :options="chartOptionsBienestar"></highcharts>
            </v-card>
        </v-col>                 
    </v-row>
</template>

<script>

//import {Chart} from 'highcharts-vue'


export default {
    name: 'UsuarioIndividualAreaPostCovid',
    data () {
        return {
            chartOptionsBienestar:{
                chart: {
                    type: 'column'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: this.title
                },
                
                
                xAxis: {
                    type: 'category'
                },
                
                yAxis: {
                    title: ''
                },
                
                legend: {
                    enabled: true
                },
                plotOptions: {
                    series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                    }
                },
                series: this.data
            },

            

        }
    },

    props: {
        
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        title: {
            type: String,
            default: ''
        }
    },
    components: {
       
    }
    
}
</script>

<style scoped>
   
</style>