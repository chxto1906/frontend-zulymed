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
                                label="Cargo"
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
    name: 'Cargos',
    data () {
        return {
            data: {
                nombre: '',
                _id_empresa: ''
            },
            rules: {
                nombre: {
                    rule: [
                        v => !!v || 'Nombre es requerido',
                        v => v.length <= this.rules.nombre.counter || `El nombre debe ser igual a ${this.rules.nombre.counter} caracteres`,
                    ],
                    counter: 50
                },
                _id_empresa: {
                    rule: [
                        v => !!v || 'Empresa es requerida',
                    ]
                },
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
            return this.$route.params.id ? `/cargos/${this.$route.params.id}` : '/cargos'
        },
        titulo () {
            let titulo = "Crear un cargo"
            if (this.$route.params.id){
                if (this.$route.params.action == 'ver')
                    titulo = "Ver cargo"
                if (this.$route.params.action == 'editar')
                    titulo = "Editar cargo"
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
        const ID_CARGO = this.$route.params.id;
        let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
        if (userLogged && ID_CARGO) {
            let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
            const api = new Api(this.baseurl,'get',headers)
            let response = await api.call_respuesta_directa(`/cargos/${ID_CARGO}`) 
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
                    text: response.data ? response.data.message : "Departamento creado correctamente.",
                    type: 'success'
                },
                4000
            );
            this.$router.push("/backoffice/cargos-listar");
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