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
                        Generar PDF
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                <v-stepper-content step="1">
                    <form-cx action="#" :method="method" :data="dataParaPdf" @requeststarted="requeststarted" :url="url" @success="successPdf" @error="error">
                        <v-row>
                            <v-col cols="12" lg="6">
                                <v-select
                                :items="tests"
                                :rules="rules.tests.rule"
                                v-model="id_test"
                                label="Evaluación a generar"
                                required
                                ></v-select>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-select
                                    :items="itemsUsuarios"
                                    v-model="id_usuario"
                                    label="Usuario"
                                    ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Cualitativas
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="semaforo_cualitativas.excelente.color" size="35"></v-avatar></td>
                                                <td class="text-left">EXCELENTE</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cualitativas.excelente.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cualitativas.excelente.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="semaforo_cualitativas.bueno.color" size="35"></v-avatar></td>
                                                <td class="text-left">BUENO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cualitativas.bueno.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cualitativas.bueno.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="semaforo_cualitativas.regular.color" size="35"></v-avatar></td>
                                                <td class="text-left">REGULAR</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cualitativas.regular.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cualitativas.regular.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="semaforo_cualitativas.deficiente.color" size="35"></v-avatar></td>
                                                <td class="text-left">DEFICIENTE</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cualitativas.deficiente.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cualitativas.deficiente.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            

                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Cuantitativas
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="semaforo_cuantitativas.optimo.color" size="35"></v-avatar></td>
                                                <td class="text-left">ÓPTIMO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cuantitativas.optimo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cuantitativas.optimo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="semaforo_cuantitativas.bueno.color" size="35"></v-avatar></td>
                                                <td class="text-left">BUENO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cuantitativas.bueno.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cuantitativas.bueno.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="semaforo_cuantitativas.regular.color" size="35"></v-avatar></td>
                                                <td class="text-left">REGULAR</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cuantitativas.regular.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cuantitativas.regular.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="semaforo_cuantitativas.deficiente.color" size="35"></v-avatar></td>
                                                <td class="text-left">DEFICIENTE</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cuantitativas.deficiente.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="semaforo_cuantitativas.deficiente.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            

                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="8">
                                <submit-cx :disabled="!id_test || !id_usuario">Generar PDF >></submit-cx>
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
import FormCx from '@/components/forms/FormCx'
import SubmitCx from '@/components/forms/SubmitCx'

import { mapGetters } from 'vuex'

export default {
    name: 'ReporteDesempenoEspecifico',
    data () {
        return {
            id_test: null,
            id_usuario: null,
            linkpdf: null,
            step: 1,
            tests: [],
            itemsUsuarios: [],
            dialogProcesando: false,
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
            rules: {
                tests: {
                    rule: [
                        v => !!v || 'Evaluación es requerida',
                    ]
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
            return '/reportes/desempeno/especifico/pdf'
        },
        titulo () {
            return "Reporte de Desempeño Específico"
        },
        dialogMensaje () {
            let mensaje = "Generando PDF. Puede tardar unos minutos, espere por favor ..."
            return mensaje
        },
        dataParaPdf () {
            return {
                _id_test: this.id_test,
                _id_usuario: this.id_usuario,
                semaforo_cualitativas: this.semaforo_cualitativas,
                semaforo_cuantitativas: this.semaforo_cuantitativas
            }
        }
        
    },
    watch : {
        id_test () {
            this.getAllUsuariosByTest()
        }
    },
    components: {
        TituloPrincipalCx,
        FormCx,
        SubmitCx
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
        
        async getAllUsuariosByTest() {
            this.loading = true;
            let params = {
                _id_test: this.id_test
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let usuarios = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/usuarios/select/all') 
                usuarios = response.data ? response.data.data : [];
                this.loading = false;
            }
            this.itemsUsuarios = usuarios
            //this.$emit('onUsuarios',usuarios)
        },

        requeststarted () {
            this.dialogProcesando = true
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