<template>
    <v-row>
        <v-col cols="12" class="py-0">
            <titulo-principal-cx :titulo="titulo" />
        </v-col>
        <v-col cols="12" class="py-0">
            <v-data-table
                no-data-text="No tiene ninguna evaluación"
                no-results-text="Resultados no encontrados"
                :page="page"
                :pageCount="numberOfPages"
                :headers="headers"
                :items="evaluaciones"
                :options.sync="options"
                :server-items-length="totalEvaluaciones"
                :loading="loading"
                
                class="elevation-1"
            >
                
                
                <template v-slot:[`item.actions`]="{ item }">
                    <router-link 
                        v-show="item.porcentaje == '100' ? false : true"
                        :to="{ name: 'PorCalificarDetalle', params: { id: item._id_test,usuario: item._id_usuario, action:'continuar'}}" >
                        <v-icon
                            
                            class="mr-2"
                            :color="system.colores.icons_2"
                            title="Realizar la evaluación"
                        >
                            mdi-play
                        </v-icon>
                    </router-link>
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
    name: 'PorCalificarLista',
    components: { TituloPrincipalCx },
    data () {
        return {
            titulo: "Evalúa a los demás",
            page: 1,
            totalEvaluaciones: 0,
            numberOfPages: 0,
            loading: true,
            search: '',
            options: {},
            evaluaciones: [],
            headers: [
                {text: 'Persona a evaluar',align: 'start',sortable: false,value: 'evaluado'},
                {text: 'Test',align: 'start',sortable: false,value: 'nombre'},
                { text: 'Empresa', value: 'empresa' },
                { text: 'Estado', value: 'estado' },
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
            let evaluaciones = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/usuarios/evaluaciones/cualitativas') 
                evaluaciones = response.data ? response.data.data : [];
                this.loading = false;
                this.totalEvaluaciones = response.data.totalEvaluaciones;
                this.numberOfPages = response.data.totalPages;
            }
            this.evaluaciones = evaluaciones
        },

    }
}
</script>

<style scoped>
    tbody tr:nth-child(odd) {
        background-color:rgba(79, 125, 147, 10%);
    }
</style>