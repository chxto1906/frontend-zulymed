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
                            <v-select
                            :items="empresas"
                            v-model="data._id_empresa"
                            label="Empresa"
                            :rules="rules._id_empresa.rule"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="data.nombre"
                                :rules="rules.nombre.rule"
                                :counter="rules.nombre.counter"
                                label="Nombre"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="data.apellido"
                                :rules="rules.apellido.rule"
                                :counter="rules.apellido.counter"
                                label="Apellido"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="data.email"
                                :rules="rules.email.rule"
                                label="Email"
                                type="email"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="data.password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="rules.password.rule"
                                :type="show1 ? 'text' : 'password'"
                                label="Password"
                                @click:append="show1 = !show1"
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
    name: 'Admins',
    data () {
        return {
            show1: false,
            data: {
                nombre: '',
                apellido: '',
                email: '',
                password: '',
                _id_empresa: ''
            },
            rules: {
                nombre: {
                    rule: [
                        v => !!v || 'Nombre es requerido',
                        v => v.length <= this.rules.nombre.counter || `El nombre debe ser igual a ${this.rules.nombre.counter} caracteres`,
                    ],
                    counter: 100
                },
                apellido: {
                    rule: [
                        v => !!v || 'Apellido es requerido',
                        v => v.length <= this.rules.apellido.counter || `El apellido debe ser igual a ${this.rules.apellido.counter} caracteres`,
                    ],
                    counter: 100
                },
                _id_empresa: {
                    rule: [
                        v => !!v || 'Empresa es requerida',
                    ]
                },
                email: {
                    rule: [
                        v => !!v || 'Email es requerido',
                        v => {
                            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            return pattern.test(v) || 'Email inválido.'
                        }
                    ]
                },
                password: {
                    rule: [
                        v => !!v || 'Password es requerido',
                    ],
                    counter: 13
                }
            },
            empresas: []
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
            return this.$route.params.id ? `/admins/${this.$route.params.id}` : '/admins'
        },
        titulo () {
            let titulo = "Crear un Administrador"
            if (this.$route.params.id){
                if (this.$route.params.action == 'ver')
                    titulo = "Ver administrador"
                if (this.$route.params.action == 'editar')
                    titulo = "Editar administrador"
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
        const ID_ADMIN = this.$route.params.id;
        let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
        if (userLogged && ID_ADMIN) {
            let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
            const api = new Api(this.baseurl,'get',headers)
            let response = await api.call_respuesta_directa(`/admins/${ID_ADMIN}`) 
            response = response.data ? response.data.data : this.data;
            delete response._id
            delete response.created_at
            delete response.updated_at
            
            this.data = response
        }

        let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
        const api = new Api(this.baseurl,'get',headers)
        let response = await api.call_respuesta_directa(`/empresas/select/all`) 
        response = response.data ? response.data.data : this.empresas
        this.empresas = response
    },
    methods: {

        success (response) {
            this.$notify(
                {
                    group: "bottom",
                    title: "Datos guardados",
                    text: response.data ? response.data.message : "Aministrador creado correctamente.",
                    type: 'success'
                },
                4000
            );
            this.$router.push("/backoffice/admins-listar");
        },
        error () {
            this.$notify(
                {
                    group: "bottom",
                    title: "Error",
                    text: "Ocurrió un inconveniente. Recuerde que debe ingresar una contraseña.",
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