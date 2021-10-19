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
                                v-model="data.abreviatura"
                                :rules="rules.abreviatura.rule"
                                :counter="rules.abreviatura.counter"
                                label="Abreviatura"
                                @input="uppercase"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="data.label"
                                :rules="rules.label.rule"
                                :counter="rules.label.counter"
                                label="Label"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <submit-cx>Guardar</submit-cx>
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
import TituloPrincipalCx from '@/components/titulos/TituloPrincipalCx'
import FormCx from '@/components/forms/FormCx'
import SubmitCx from '@/components/forms/SubmitCx'

import { mapGetters } from 'vuex'


export default {
    name: 'Subdimensiones',
    data () {
        return {
            data: {
                abreviatura: '',
                label: ''
            },
            rules: {
                abreviatura: {
                    rule: [
                        v => !!v || 'Abreviatura es requerida',
                        v => v.length <= this.rules.abreviatura.counter || `La abreviatura debe ser menor o igual a ${this.rules.abreviatura.counter} caracteres`,
                    ],
                    counter: 5
                },
                label: {
                    rule: [
                        v => !!v || 'Label es requerido',
                        v => v.length <= this.rules.label.counter || `El label debe ser igual a ${this.rules.label.counter} caracteres`,
                    ],
                    counter: 30
                }
            }
        }
    },
    computed: {
        ...mapGetters(['system','baseurl']),
        method () {
            return this.$route.params.id ? 'put' :'post'
        },
        readonly () {
            let readonly = false
            if (this.$route.params.id){
                if (this.$route.params.action == 'ver')
                    readonly = true
            }
            return readonly
        },
        url () {
            return this.$route.params.id ? `/subdimensiones/${this.$route.params.id}` : '/subdimensiones'
        },
        titulo () {
            let titulo = "Crear una subdimensión"
            if (this.$route.params.id){
                if (this.$route.params.action == 'ver')
                    titulo = "Ver subdimensión"
                if (this.$route.params.action == 'editar')
                    titulo = "Editar subdimensión"
            }
            return titulo
        }
    },
    components: {
        TituloPrincipalCx,
        FormCx,
        SubmitCx
    },
    async created() {
        const ID_SUBDIMENSION = this.$route.params.id;
        let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
        if (userLogged && ID_SUBDIMENSION) {
            let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
            const api = new Api(this.baseurl,'get',headers)
            let response = await api.call_respuesta_directa(`/subdimensiones/${ID_SUBDIMENSION}`) 
            response = response.data ? response.data.data : this.data;
            delete response._id
            delete response.created_at
            delete response.updated_at
            
            this.data = response
        }
    },
    methods: {

        uppercase(val){
            this.data.abreviatura = val.toUpperCase()
        },
        success (response) {
            this.$notify(
                {
                    group: "bottom",
                    title: "Datos guardados",
                    text: response.data ? response.data.message : "Subdimensión creada correctamente.",
                    type: 'success'
                },
                4000
            );
            this.$router.push("/backoffice/subdimensiones-listar");
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
    }
}
</script>

<style scoped>
   
</style>