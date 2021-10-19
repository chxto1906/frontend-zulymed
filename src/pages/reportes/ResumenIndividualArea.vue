<template>
    <v-row>
        <v-col cols="12" class="p-20">
            <v-card elevation="2" >
                <h2>{{area}}</h2>
                <v-col cols="12" v-for="(usuario) in usuarios" :key="usuario.title">
                    <usuario-resumen-individual-area 
                        :factores_higienicos="usuario.factores_higienicos"
                        :factores_motivacionales="usuario.factores_motivacionales"
                        :perfil_motivacional="usuario.perfil_motivacional"
                        >
                    </usuario-resumen-individual-area>
                </v-col>
                
                
            </v-card>
        </v-col>                 
    </v-row>
</template>

<script>

import UsuarioResumenIndividualArea from '@/pages/reportes/UsuarioResumenIndividualArea'

export default {
    name: 'ResumenIndividualArea',
    data () {
        return {}
    },

    props: {
        area: {
            type: String,
            default: ''
        },
        usuarios: {
            type: Array,
            default: () => {
                return [{
                    factores_higienicos: {title: null,data:[]},
                    factores_motivacionales: {title: null,data:[]},
                    perfil_motivacional: {title: null,data:[]}
                }]
            }
        }
    },
    components: {
       UsuarioResumenIndividualArea
    }
    
}
</script>

<style scoped>
   
</style>