<template>
    <v-row>
        <v-col cols="12" class="py-0">
            <titulo-principal-cx :titulo="titulo" />
        </v-col>
        <v-col cols="12" class="py-0">
            <v-data-table
                no-data-text="Subdimensiones no disponibles"
                no-results-text="Resultados no encontrados"
                :page="page"
                :pageCount="numberOfPages"
                :headers="headers"
                :items="subdimensiones"
                :options.sync="options"
                :server-items-length="totalSubdimensiones"
                :loading="loading"
                :search="search"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-text-field
                    v-model="search"
                    label="Buscar por label"
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
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <router-link :to="{ name: 'SubdimensionDetalle', params: { id: item._id, action:'editar'}}" >
                        <v-icon
                            small
                            class="mr-2"
                            :color="system.colores.icons_2"
                        >
                            mdi-pencil
                        </v-icon>
                    </router-link>
                    <v-icon
                        small
                        @click="deleteItem(item)"
                        :color="system.colores.icons_2"
                    >
                        mdi-delete
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
    name: 'SubdimensionesListar',
    components: { TituloPrincipalCx },
    data () {
        return {
            titulo: "Listado de subdimensiones",
            page: 1,
            totalSubdimensiones: 0,
            numberOfPages: 0,
            loading: true,
            search: '',
            options: {},
            subdimensiones: [],
            dialogDelete: false,
            headers: [
                {
                    text: 'Abreviatura',
                    align: 'start',
                    sortable: false,
                    value: 'abreviatura',
                },
                { text: 'Label', value: 'label' },
                { text: 'Acciones', value: 'actions', sortable: false },
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
      search: {
          handler() {
            this.readDataFromAPI();
        },
      }
    },
    created() {
        this.readDataFromAPI()
        //this.$store.dispatch('setItemSelected','empresas_listar')
    },
    methods: {

        async readDataFromAPI() {
            this.loading = true;
            const { page, itemsPerPage } = this.options;
            let pageNumber = page - 1;
            let params = {
                size: itemsPerPage,
                page: pageNumber,
                label: this.search
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let subdimensiones = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/subdimensiones') 
                subdimensiones = response.data ? response.data.data : [];
                this.loading = false;
                this.totalSubdimensiones = response.data.totalSubdimensiones;
                this.numberOfPages = response.data.totalPages;
            }
            this.subdimensiones = subdimensiones
        },

        deleteItem (item) {
            this.editedIndex = this.subdimensiones.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.deleteApi()
        },

        async deleteApi() {
            let response = false;
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.$store.getters.baseurl,'delete',headers)
                response = await api.call_respuesta_directa(`/subdimensiones/${this.editedItem._id}`) 
            }
            if (response && response.status == 200) {
                this.subdimensiones.splice(this.editedIndex, 1)
                this.closeDelete()
                this.readDataFromAPI()
            }else{
                this.$notify(
                    {
                        group: "bottom",
                        title: "Error",
                        text: "No se pudo eliminar subdimensión",
                        type: "error"
                    },
                    4000
                );
                this.closeDelete()
            }

        },


        closeDelete () {
            this.dialogDelete = false
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