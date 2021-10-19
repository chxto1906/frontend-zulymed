<template>
    <v-row>
        <v-col cols="12" class="py-0">
            <titulo-principal-cx :titulo="titulo" />
        </v-col>
        <v-col cols="12" class="py-0">
            <form-cx action="#" :method="method" :data="data" :url="url" @success="success" @error="error">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="data.nombre"
                                :rules="rules.nombre.rule"
                                :counter="rules.nombre.counter"
                                label="Nombre de test"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-btn-toggle
                                v-model="data.tipo"
                                tile
                                :color="system.colores.boton_1"
                                group
                                shaped
                                rounded
                            >
                                <v-btn value="ponderada">
                                    Ponderada
                                </v-btn>
                                <v-btn value="cuantitativa">
                                    Cuantitativa
                                </v-btn>
                            </v-btn-toggle>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                label="Descripción"
                                auto-grow
                                outlined
                                rows="2"
                                v-model="data.descripcion"
                                :rules="rules.descripcion.rule"
                                :counter="rules.descripcion.counter"
                                row-height="40"
                                ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="3" offset-md="9">
                            <submit-cx>Guardar y continuar >></submit-cx>
                        </v-col>
                    </v-row>
                </v-container>
            </form-cx>
        </v-col>
    </v-row>
</template>>

<script>

import Api from '@/api';
import Cookies from 'js-cookie'
import FormCx from '@/components/forms/FormCx'
import TituloPrincipalCx from '@/components/titulos/TituloPrincipalCx'
import SubmitCx from '@/components/forms/SubmitCx'
import { mapGetters } from 'vuex'

export default {
    name: 'Tests',
    data () {
        return {
            data: {
                nombre: '',
                tipo: 'cuantitativa',
                descripcion: '',
                /*preguntas: [
                    {
                        descripcion: '',
                        columns: [
                            { text: '1', id='1' },
                            { text: '2', id='2' },
                            { text: '3', id='3' },
                            { text: '4', id='4' },
                            { text: '5', id='5' }
                        ],
                        rowleft: [
                            { text: 'Muy bajo', id='muybajo' }
                        ],
                        rowright: [
                            { text: 'Alto', id='alto' }
                        ],
                        opciones: [
                            { columnId: '1', rowLeftId: 'muybajo', selected: true}
                        ]
                    }
                ]*/
            },
            rules: {
                nombre: {
                    rule: [
                        v => !!v || 'Nombre es requerido',
                        v => v.length <= this.rules.nombre.counter || `El nombre debe ser menor o igual a ${this.rules.nombre.counter} caracteres`,
                    ],
                    counter: 30
                },
                descripcion: {
                    rule: [
                        v => !!v || 'Descripción es requerida',
                        v => v.length <= this.rules.descripcion.counter || `La descripción debe ser menor o igual a ${this.rules.descripcion.counter} caracteres`,
                    ],
                    counter: 200
                },
            }
        }
    },
    async created() {
        const ID_TEST = this.$route.params.id;
        let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
        if (userLogged && ID_TEST) {
            let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
            const api = new Api(this.baseurl,'get',headers)
            let response = await api.call_respuesta_directa(`/tests/${ID_TEST}`) 
            response = response.data ? response.data.data : this.data;
            delete response._id
            delete response.created_at
            delete response.updated_at
            
            this.data = response
        }

        //this.$store.dispatch('setItemSelected','empresas_crear')
    },
    computed: {
        ...mapGetters(['system','baseurl']),
        method () {
            return this.$route.params.id ? 'put' :'post'
        },
        url () {
            return this.$route.params.id ? `/tests/${this.$route.params.id}` : '/tests'
        },
        titulo () {
            let titulo = "Crear un test"
            if (this.$route.params.id){
                if (this.$route.params.action == 'editar')
                    titulo = "Editar test"
            }
            return titulo
        }
    },
    methods: {
        success (response) {
            this.$notify(
                {
                    group: "bottom",
                    title: "Datos guardados",
                    text: response.data ? response.data.message : "Test creado correctamente.",
                    type: 'info'
                },
                4000
            );
            this.$router.push(`/backoffice/tests/${response.data.data}/preguntas`);
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
            
        }
    },
    components: {
        FormCx,
        TituloPrincipalCx,
        SubmitCx
    }
}
</script>

<style scoped>