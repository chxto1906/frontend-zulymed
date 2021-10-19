<template>
    <v-row>
        <v-dialog v-model="dialogProcesando" persistent width="300">
            <v-card color="primary" dark>
                <v-card-text>
                    Enviando, por favor espere ...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-col cols="12" class="py-0">
            <titulo-principal-cx :titulo="titulo" />
        </v-col>
        <v-col cols="12" class="py-0">
            <v-data-table
                no-data-text="Evaluaciones no disponibles"
                no-results-text="Resultados no encontrados"
                :page="page"
                :pageCount="numberOfPages"
                :headers="headers"
                :items="tests"
                :options.sync="options"
                :server-items-length="totalTests"
                :loading="loading"
                :search="search"
                sort-by="nombre"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-text-field
                    v-model="search"
                    label="Buscar por nombre"
                    class="mx-4"
                    ></v-text-field>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="headline">¿Está seguro que desea eliminar?</v-card-title>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Si</v-btn>
                            <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogEnviarTest" max-width="500px">
                        <v-card>
                            <v-card-title class="headline">¿Está seguro que desea enviar Evaluación a los usuarios asignados?</v-card-title>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeEnviarTest">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="enviarTestConfirm">Si</v-btn>
                            <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </template>
                <template v-slot:[`item.descripcion`]="{ item }">
                    <span v-if="item.descripcion.length >= 50">
                        {{item.descripcion.slice(0,50)}} ...
                    </span>
                    <span v-else>
                        {{item.descripcion}}
                    </span>
                </template>
                <template v-slot:[`item.created_at`]="{ item }">
                    <span>{{new Date(item.created_at).toLocaleString()}}</span>
                </template>
                <template v-slot:[`item.tipo`]="{ item }">
                    <span>{{item.tipo.toUpperCase()}}</span>
                </template>
                <template v-slot:[`item.estado`]="{ item }">
                    <span>{{item.estado.toUpperCase()}}</span>
                </template>
                <template v-slot:[`item.porcentaje`]="{ item }">
                    <v-progress-linear
                        :value="item.porcentaje"
                        :color="system.colores.icons_2"
                        
                        dark
                        height="15">
                        <template v-slot:default="{ value }">
                            <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                    </v-progress-linear>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <router-link :to="{ name: 'TestDetalle', params: { id: item._id, action:'editar', step:1 }}" >
                        <v-icon
                            small
                            
                            :color="system.colores.icons_2"
                            title="Modificar evaluación"
                        >
                            mdi-pencil
                        </v-icon>
                    </router-link>
                    <v-icon
                        
                        small
                        @click="deleteItem(item)"
                        :color="system.colores.icons_2"
                        title="Eliminar evaluación"
                    >
                        mdi-delete
                    </v-icon>
                    <v-icon
                        
                        small
                        @click="enviarTest(item)"
                        :color="system.colores.icons_2"
                        title="Enviar a usuarios"
                    >
                        mdi-send
                    </v-icon>
                    
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
import Api from '@/api';
import Cookies from 'js-cookie'
import TituloPrincipalCx from '@/components/titulos/TituloPrincipalCx'
import { mapGetters } from 'vuex'


export default {
    name: 'TestsListar',
    components: { TituloPrincipalCx },
    data () {
        return {
            titulo: "Listado de evaluaciones",
            dialogProcesando: false,
            page: 1,
            totalTests: 0,
            numberOfPages: 0,
            loading: true,
            search: '',
            options: {},
            tests: [],
            dialogDelete: false,
            dialogEnviarTest: false,
            headers: [
                {
                    text: 'Nombre',
                    align: 'start',
                    sortable: false,
                    value: 'nombre',
                },
                { text: 'Empresa asignada', value: 'empresa', sortable: false },
                { text: 'Descripción', value: 'descripcion', sortable: false },
                { text: 'Fecha creación', value: 'created_at', sortable: false },
                { text: 'Tipo', value: 'tipo', sortable: false },
                { text: 'Estado', value: 'estado', sortable: false },
                { text: '% Completado', value: 'porcentaje', sortable: false},
                { text: 'Acciones', value: 'actions', sortable: false }
            ]
        }
    },
    computed: {
        ...mapGetters(['system','baseurl'])
    },
    watch: {
      options: {
        handler() {
            this.readDataFromAPI();
        },
      },  
      dialogDelete (val) {
        val || this.closeDelete()
      },
      dialogEnviarTest (val) {
        val || this.closeEnviarTest()
      },
      search: {
          handler() {
            this.readDataFromAPI();
        },
      }
    },
    created() {
        this.readDataFromAPI()
    },
    methods: {

        async readDataFromAPI() {
            this.loading = true;
            const { page, itemsPerPage } = this.options;
            let pageNumber = page - 1;
            let params = {
                size: itemsPerPage,
                page: pageNumber,
                nombre: this.search
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let tests = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/tests') 
                tests = response.data ? response.data.data : [];
                this.loading = false;
                this.totalTests = response.data.totalTests;
                this.numberOfPages = response.data.totalPages;
            }
            this.tests = tests
        },

        deleteItem (item) {
            this.editedIndex = this.tests.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        enviarTest (item) {
            this.editedIndex = this.tests.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogEnviarTest = true
        },

        deleteItemConfirm () {
            this.deleteApi()
        },

        enviarTestConfirm () {
            this.enviarTestApi()
        },

        async deleteApi() {
            let response = false;
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.$store.getters.baseurl,'delete',headers)
                response = await api.call_respuesta_directa(`/tests/${this.editedItem._id}`) 
            }
            if (response && response.status == 200) {
                this.tests.splice(this.editedIndex, 1)
                this.closeDelete()
                this.readDataFromAPI()
            }else{
                this.$notify(
                    {
                        group: "bottom",
                        title: "Error",
                        text: "No se pudo eliminar evaluación",
                        type: "error"
                    },
                    4000
                );
                this.closeDelete()
            }

        },

        async enviarTestApi() {
            let response = false;
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
            if (userLogged) {
                this.dialogProcesando = true
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.$store.getters.baseurl,'post',headers)
                response = await api.call_respuesta_directa(`/tests/${this.editedItem._id}/enviar`) 
            }
            if (response && response.status == 201) {
                this.tests.splice(this.editedIndex, 1)

                this.$notify(
                    {
                        group: "bottom",
                        title: "Emails",
                        text: "Se ha enviado email a todos los usuarios correctamente",
                        type: "info"
                    },
                    4000
                );
                this.dialogProcesando = false
                this.closeEnviarTest()
                this.readDataFromAPI()
            }else{
                this.$notify(
                    {
                        group: "bottom",
                        title: "Error",
                        text: "No se pudo enviar emails. Reintente de nuevo más tarde.",
                        type: "error"
                    },
                    4000
                );
                this.closeEnviarTest()
                this.dialogProcesando = false
            }

        },


        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        closeEnviarTest () {
            this.dialogEnviarTest = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        }
    }
}
</script>

<style scoped>
    tbody tr:nth-child(odd) {
        background-color:rgba(79, 125, 147, 10%);
    }
</style>