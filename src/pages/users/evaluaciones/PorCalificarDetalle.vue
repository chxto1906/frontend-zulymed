<template>
    <v-row> 
        <v-skeleton-loader v-if="mostrarSkeleton" type="table"></v-skeleton-loader>
        <v-col cols="12" class="py-0">
            <i>{{this.test}}</i>
            <titulo-principal-cx style="word-break: break-word !important;" :titulo="titulo" />
        </v-col>
        <v-col cols="12" class="py-0">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-card class="mx-auto">
                            <v-card-title>
                            <h2 class="display-1" style="word-break: break-word !important;" :style="{color: system.colores.texto_titulo_1}">{{ data.test.nombre }}</h2>
                                <v-spacer></v-spacer>
                                <span class="title" :style="{color: system.colores.texto_titulo_1}">
                                    {{ data.respondidas + '/' + data.total }}
                                </span>
                                
                            </v-card-title>
                            <v-card-text style="word-break: break-word !important;">
                                {{ data.test.descripcion }}
                            </v-card-text>
                            <v-divider class="mx-4"></v-divider>
                            <v-card-text>
                                <v-data-table
                                dense
                                :headers="headers"
                                :items="preguntas_kpis"
                                :hide-default-footer="true"
                                disable-pagination
                                class="elevation-1"
                                v-show="preguntas_kpis.length > 0"
                                >
                                    <template v-slot:top>
                                        <v-toolbar>
                                            <v-toolbar-title>KPIS</v-toolbar-title>
                                        </v-toolbar>
                                    </template>
                                    <template v-slot:[`item.respuesta.value`]="{ item }">
                                        <v-edit-dialog
                                        :return-value.sync="item.respuesta.value"
                                        large
                                        persistent
                                        save-text="Guardar"
                                        cancel-text="Cerrar"
                                        @save="save_kpis(item.respuesta)"
                                        @cancel="cancel_kpis"
                                        @open="open_kpis"
                                        @close="close_kpis"
                                        >
                                            <v-chip :color="item.respuesta.value !== null ? '' : 'yellow'" label="" text-color="black" class="ma-2">
                                                {{ item.respuesta.value !== null ? item.respuesta.value : 'Click para calificar' }}
                                            </v-chip>
                                            <template v-slot:input>
                                                <div class="mt-4 title">
                                                Ingrese calificación
                                                </div>
                                                <v-text-field
                                                v-model="item.respuesta.value"
                                                label="Calificación"
                                                single-line
                                                counter
                                                autofocus
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                </v-data-table>

                                <v-snackbar
                                    v-model="snack_kpis"
                                    :timeout="3000"
                                    :color="snackColor_kpis"
                                    >
                                    {{ snackText_kpis }}

                                    <template v-slot:action="{ attrs }">
                                        <v-btn v-bind="attrs" text @click="snack_kpis = false">
                                        Cerrar
                                        </v-btn>
                                    </template>
                                </v-snackbar>
                                <v-data-table
                                    :headers="headers"
                                    :items="preguntas_desempeno"
                                    :hide-default-footer="true"
                                    v-show="preguntas_desempeno.length > 0"
                                    disable-pagination>
                                    <template v-slot:top>
                                        <v-toolbar>
                                            <v-toolbar-title>DESEMPEÑO</v-toolbar-title>
                                        </v-toolbar>
                                    </template>
                                    <template v-slot:[`item.respuesta.value`]="{ item }">
                                        <v-edit-dialog
                                        :return-value.sync="item.respuesta.value"
                                        large
                                        persistent
                                        @save="save_desempeno(item.respuesta)"
                                        @cancel="cancel_desempeno"
                                        @open="open_desempeno"
                                        @close="close_desempeno"
                                        >
                                            <v-chip :color="item.respuesta.value !== null ? '' : 'yellow'" label="" text-color="black" class="ma-2">
                                                {{ item.respuesta.value !== null ? item.respuesta.value : 'Click para calificar' }}
                                            </v-chip>
                                            <template v-slot:input>
                                                <div class="mt-4 title">
                                                Ingrese calificación
                                                </div>
                                                <v-text-field
                                                v-model="item.respuesta.value"
                                                label="Calificación"
                                                single-line
                                                counter
                                                autofocus
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                </v-data-table>
                                <v-snackbar
                                    v-model="snack_desempeno"
                                    :timeout="3000"
                                    :color="snackColor_desempeno">
                                        {{ snackText_desempeno }}
                                    <template v-slot:action="{ attrs }">
                                        <v-btn v-bind="attrs" text @click="snack_desempeno = false">Cerrar</v-btn>
                                    </template>
                                </v-snackbar>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
    </v-row>
</template>>

<script>

import Api from '@/api';
import Cookies from 'js-cookie'
import TituloPrincipalCx from '@/components/titulos/TituloPrincipalCx'
//import FormCx from '@/components/forms/FormCx'
//import SubmitCx from '@/components/forms/SubmitCx'

import { mapGetters } from 'vuex'



export default {
    name: 'PorCalificarDetalle',

    props: {
        data: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },

    data() {
        return {
            showTooltip:true,
            ID_USUARIO: null,
            ID_TEST: null,
            mostrarSkeleton: false,
            snack_desempeno: false,
            snackColor_desempeno: '',
            snackText_desempeno: '',
            usuarioAEvaluar: '',
            snack_kpis: false,
            snackColor_kpis: '',
            snackText_kpis: '',
            empresa: '',
            test: '',
            usuario: {},
            headers: [
                { text: 'Indicador', align: 'start', sortable: false, value: 'indicador' },
                { text: 'Forma de cálculo', align: 'start', sortable: false, value: 'forma_calculo' },
//                { text: 'Peso (%)', value: 'peso' },
                { text: 'Meta', align: 'start', sortable: false, value: 'meta' },
                { text: 'CALIFICACIÓN', align: 'start', sortable: false, value: 'respuesta.value' },
            ],
            preguntas_kpis: [],
            preguntas_desempeno: [],
        }
    },
    computed: {
        ...mapGetters(['system','baseurl']),

        urlUser () {
            return `/usuarios/completar/usuariotest/${this.data._id_usuario_test}`
        },
        
        method () {
            return 'post'
        },
        url () {
            return '/respuestas/multiple'
        },
        titulo () {
            let titulo = `Evalúa a ${this.usuarioAEvaluar.toUpperCase()} de la empresa ${this.empresa}`
            return titulo
        },
        
        
    },
    components: {
        TituloPrincipalCx,
        /*FormCx,
        SubmitCx*/
    },
    async created() {
        await this.readPreguntas()   
    },
    methods: {


        async save(body) {
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            if (userLogged) {
                let method = body._id ? 'put' : 'post'
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                let url = method == 'put' ? `/respuestas/desempeno/${body._id}` : `/respuestas/desempeno`
                delete body._id
                const api = new Api(this.baseurl,method,headers,body,{})
                let response = await api.call_respuesta_directa(url) 
                if (response.status == 200 || response.status == 201){
                    return true
                }
            }
            return false
        },
        
        async save_desempeno (element) {
            console.dir(element)
            element.value=Number(element.value)
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let id_user = userLogged.user.id 
            //element._id_user = element._id_user_calificado
            //delete element._id_user_calificado
            delete element.created_at
            if (!element._id_users_calificaron.includes(id_user)){
                element._id_users_calificaron.push(id_user)
            }
            let response = await this.save(element)
            if (response){
                this.snack_desempeno = true
                this.snackColor_desempeno = 'Calificado correctamente'
                this.snackText_desempeno = 'Datos guardados'
                //this.readPreguntas()
                this.$emit('forceUpdate')
            }else{
                this.cancel_desempeno()
            }
        },
        cancel_desempeno () {
            this.snack_desempeno = true
            this.snackColor_desempeno = 'error'
            this.snackText_desempeno = 'No se guardó'
        },
        open_desempeno () {
            /*this.snack_desempeno = true
            this.snackColor_desempeno = 'info'
            this.snackText_desempeno = 'Dialog opened'*/
        },
        close_desempeno () {
            //console.log('Dialog closed Desempeno')
        },

        async save_kpis (element) {
            console.dir(element)
            element.value=Number(element.value)
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let id_user = userLogged.user.id 
            //element._id_user = element._id_user
            //delete element._id_user_calificado
            delete element.created_at
            if (!element._id_users_calificaron.includes(id_user)){
                element._id_users_calificaron.push(id_user)
            }
            let response = await this.save(element)
            if (response){
                this.snack_kpis = true
                this.snackColor_kpis = 'Calificado correctamente'
                this.snackText_kpis = 'Datos guardados'
                this.$emit('forceUpdate')
                //this.readPreguntas()
                //this.$router.push(`/evaluacion/${this.data.test._id}/${this.data.usuarioAEvaluar._id}`);
                
            }else{
                this.cancel_kpis()
            }
            
        },
        cancel_kpis () {
            this.snack_kpis = true
            this.snackColor_kpis = 'error'
            this.snackText_kpis = 'No se guardó'
        },
        open_kpis () {
            /*this.snack_kpis = true
            this.snackColor_kpis = 'info'
            this.snackText_kpis = 'Dialog opened'*/
        },
        close_kpis () {
            //console.log('Dialog closed KPIS')
        },

        async readPreguntas () {
            this.ID_TEST = this.$route.params.id;
            this.ID_USUARIO = this.$route.params.usuario;
            this.mostrarSkeleton = true
            const response = this.data;
            this.preguntas_kpis = response["preguntas"]["kpis"]
            this.preguntas_desempeno = response["preguntas"]["desempeno"]
            this.empresa = response["empresa"]["nombre"]
            this.test = response["test"]["nombre"]
            this.usuarioAEvaluar = response["usuarioAEvaluar"]["nombre"] + " " + response["usuarioAEvaluar"]["apellido"]
            this.usuario = response["usuario"]
            this.mostrarSkeleton = false
        },

        
        
        success () {
           // this.readPregunta()
        },
        successUser () {
            //this.dialogUsuario = false
        },
        error () {
            this.$notify(
                {
                    group: "bottom",
                    title: "Error",
                    text: "Ocurrió un inconveniente",
                    type: "error"
                },
                4000
            );
            //this.readPregunta()
        },
        errorUser () {
            this.$notify(
                {
                    group: "bottom",
                    title: "Error",
                    text: "Ocurrió un inconveniente, inténtalo más tarde.",
                    type: "error"
                },
                4000
            );
        }
    },
    watch: {
      
      async data() {
        //console.log('watch preguntsa desempeno')
        await this.readPreguntas()
      }
    },
}
</script>

<style scoped>
   
</style>