<template>
    <v-row>
        <v-col cols="12">
            <v-dialog v-model="dialogProcesando" persistent width="300">
                <v-card color="primary" dark>
                    <v-card-text>
                        Procesando, por favor espere ...
                        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-expansion-panels v-model="openedPanel" focusable>
                <v-expansion-panel>
                    <v-expansion-panel-header :disable-icon-rotate="preguntas_seccion_1.length > 0">
                        Sección 1: Perfil Motivacional
                        <template v-slot:actions>
                            <v-icon v-if="preguntas_seccion_1.length > 0" color="teal">
                            mdi-check
                            </v-icon>
                            <v-icon v-if="preguntas_seccion_1.length == 0" color="error">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <upload-excel-component :on-success="handleSuccessSeccion1" :before-upload="beforeUpload" />
                        <v-data-table 
                            :headers="headers" 
                            :items="preguntas_seccion_1" 
                            no-data-text="Preguntas no disponibles"
                            no-results-text="Resultados no encontrados"
                            :page="page_seccion_1"
                            :pageCount="numberOfPagesSeccion1"
                            :options.sync="optionsSeccion1"
                            :server-items-length="totalPreguntasSeccion1"
                            :loading="loadingSeccion1"
                            class="elevation-1">
                        </v-data-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header :disable-icon-rotate="preguntas_seccion_2.length > 0">
                        Sección 2.1: Factores Higiénicos
                        <template v-slot:actions>
                            <v-icon v-if="preguntas_seccion_2.length > 0" color="teal">
                            mdi-check
                            </v-icon>
                            <v-icon v-if="preguntas_seccion_2.length == 0" color="error">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <upload-excel-component :on-success="handleSuccessSeccion2" :before-upload="beforeUpload" />
                        <v-data-table 
                            :headers="headers" 
                            :items="preguntas_seccion_2" 
                            no-data-text="Preguntas no disponibles"
                            no-results-text="Resultados no encontrados"
                            :page="page_seccion_2"
                            :pageCount="numberOfPagesSeccion2"
                            :options.sync="optionsSeccion2"
                            :server-items-length="totalPreguntasSeccion2"
                            :loading="loadingSeccion2"
                            class="elevation-1">
                        </v-data-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header :disable-icon-rotate="preguntas_seccion_3.length > 0">
                        Sección 2.2: Factores Motivacionales
                        <template v-slot:actions>
                            <v-icon v-if="preguntas_seccion_3.length > 0" color="teal">
                            mdi-check
                            </v-icon>
                            <v-icon v-if="preguntas_seccion_3.length == 0" color="error">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <upload-excel-component :on-success="handleSuccessSeccion3" :before-upload="beforeUpload" />
                        <v-data-table 
                            :headers="headers" 
                            :items="preguntas_seccion_3" 
                            no-data-text="Preguntas no disponibles"
                            no-results-text="Resultados no encontrados"
                            :page="page_seccion_3"
                            :pageCount="numberOfPagesSeccion3"
                            :options.sync="optionsSeccion3"
                            :server-items-length="totalPreguntasSeccion3"
                            :loading="loadingSeccion3"
                            class="elevation-1">
                        </v-data-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header :disable-icon-rotate="preguntas_seccion_4.length > 0">
                        Sección 3: Nivel de Motivación
                        <template v-slot:actions>
                            <v-icon v-if="preguntas_seccion_4.length > 0" color="teal">
                            mdi-check
                            </v-icon>
                            <v-icon v-if="preguntas_seccion_4.length == 0" color="error">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <upload-excel-component :on-success="handleSuccessSeccion4" :before-upload="beforeUpload" />
                        <v-data-table 
                            :headers="headers" 
                            :items="preguntas_seccion_4" 
                            no-data-text="Preguntas no disponibles"
                            no-results-text="Resultados no encontrados"
                            :page="page_seccion_4"
                            :pageCount="numberOfPagesSeccion4"
                            :options.sync="optionsSeccion4"
                            :server-items-length="totalPreguntasSeccion4"
                            :loading="loadingSeccion4"
                            class="elevation-1">
                        </v-data-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header :disable-icon-rotate="preguntas_seccion_5.length > 0">
                        Sección 4: Incentivos
                        <template v-slot:actions>
                            <v-icon v-if="preguntas_seccion_5.length > 0" color="teal">
                            mdi-check
                            </v-icon>
                            <v-icon v-if="preguntas_seccion_5.length == 0" color="error">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <upload-excel-component :on-success="handleSuccessSeccion5" :before-upload="beforeUpload" />
                        <v-data-table 
                            :headers="headers" 
                            :items="preguntas_seccion_5" 
                            no-data-text="Preguntas no disponibles"
                            no-results-text="Resultados no encontrados"
                            :page="page_seccion_5"
                            :pageCount="numberOfPagesSeccion5"
                            :options.sync="optionsSeccion5"
                            :server-items-length="totalPreguntasSeccion5"
                            :loading="loadingSeccion5"
                            class="elevation-1">
                        </v-data-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
    </v-row>
</template>

<script>
import Api from '@/api';
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
//import FormCx from '@/components/forms/FormCx'
//import SubmitCx from '@/components/forms/SubmitCx'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
    name: 'PreguntasDiagnostico',
    props: {
        _id_test: {
            type: String,
            required: true
        },
    },
    data () {
        return {
            titulo: "Listado de preguntas",
            dialogProcesando: false,
            page_seccion_1: 1,
            page_seccion_2: 1,
            page_seccion_3: 1,
            page_seccion_4: 1,
            page_seccion_5: 1,
            totalPreguntasSeccion1: 0,
            totalPreguntasSeccion2: 0,
            totalPreguntasSeccion3: 0,
            totalPreguntasSeccion4: 0,
            totalPreguntasSeccion5: 0,
            numberOfPagesSeccion1: 0,
            numberOfPagesSeccion2: 0,
            numberOfPagesSeccion3: 0,
            numberOfPagesSeccion4: 0,
            numberOfPagesSeccion5: 0,
            loadingSeccion1: true,
            loadingSeccion2: true,
            loadingSeccion3: true,
            loadingSeccion4: true,
            loadingSeccion5: true,
            optionsSeccion1: {page:1, itemsPerPage:5},
            optionsSeccion2: {page:1, itemsPerPage:5},
            optionsSeccion3: {page:1, itemsPerPage:5},
            optionsSeccion4: {page:1, itemsPerPage:5},
            optionsSeccion5: {page:1, itemsPerPage:5},
            openedPanel: null,
            headers: [
                { text: 'Orden', value: 'orden', sortable: false },
                { text: 'Número', value: 'numero', sortable: false },
                { text: 'Descripción', value: 'descripcion', sortable: false },
                { text: 'Tipo sección', value: 'tipo_seccion', sortable: false },
                { text: 'Opción 4', value: 'opcion_4', sortable: false },
                { text: 'Opción 3', value: 'opcion_3', sortable: false },
                { text: 'Opción 2', value: 'opcion_2', sortable: false },
                { text: 'Opción 1', value: 'opcion_1', sortable: false }
            ],
            preguntas_seccion_1: [],
            preguntas_seccion_2: [],
            preguntas_seccion_3: [],
            preguntas_seccion_4: [],
            preguntas_seccion_5: [],
        }
    },
    computed: {
        ...mapGetters(['system','baseurl']),
    },
    watch: {
      optionsSeccion1: {
        handler() {
            this.readDataFromAPISeccion1();
        },
      },
      optionsSeccion2: {
        handler() {
            this.readDataFromAPISeccion2();
        },
      },
      optionsSeccion3: {
        handler() {
            this.readDataFromAPISeccion3();
        },
      },
      optionsSeccion4: {
        handler() {
            this.readDataFromAPISeccion4();
        },
      },
      optionsSeccion5: {
        handler() {
            this.readDataFromAPISeccion5();
        },
      }
    },
    created() {
        this.readDataFromAPISeccion1()
        this.readDataFromAPISeccion2()
        this.readDataFromAPISeccion3()
        this.readDataFromAPISeccion4()
        this.readDataFromAPISeccion5()
        
    },
    methods: {

        beforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1
            if (isLt1M) {
                return true
            }
            
            this.$notify(
                {
                    group: "bottom",
                    title: "Límite de tamaño",
                    text: "Por favor no subir archivos mas grandes de 1 MB",
                    type: 'warning'
                },
                4000
            );
            return false
        },
        handleSuccessSeccion1({ results }) {
            this.preguntas_seccion_1 = results
            console.dir(results)
            this.processExcelPreguntas(results,"1")
        },

        handleSuccessSeccion2({ results }) {
            this.preguntas_seccion_2 = results
            console.dir(results)
            this.processExcelPreguntas(results,"2")
        },

        handleSuccessSeccion3({ results }) {
            this.preguntas_seccion_3 = results
            console.dir(results)
            this.processExcelPreguntas(results,"3")
        },

        handleSuccessSeccion4({ results }) {
            this.preguntas_seccion_4 = results
            console.dir(results)
            this.processExcelPreguntas(results,"4")
        },

        handleSuccessSeccion5({ results }) {
            this.preguntas_seccion_5 = results
            console.dir(results)
            this.processExcelPreguntas(results,"5")
        },

        async readDataFromAPISeccion1() {
            this.loadingSeccion1 = true;
            const { page, itemsPerPage } = this.optionsSeccion1;
            let pageNumber = page - 1;
            let params = {
                size: itemsPerPage,
                page: pageNumber,
                _id_test: this._id_test,
                seccion: "1"
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let preguntas = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/preguntas/diagnostico') 
                preguntas = response.data ? response.data.data : [];
                this.loadingSeccion1 = false;
                this.totalPreguntasSeccion1 = response.data.totalPreguntas;
                this.numberOfPagesSeccion1 = response.data.totalPages;
            }
            this.preguntas_seccion_1 = preguntas
            
        },

        checkSiguienteHabilitar() {
            let preguntas = []
            if (this.preguntas_seccion_1.length > 0 && this.preguntas_seccion_2.length > 0 && 
                this.preguntas_seccion_3.length > 0 && this.preguntas_seccion_4.length > 0 && 
                this.preguntas_seccion_5.length > 0){
                preguntas = [
                    {"1" : this.preguntas_seccion_1},
                    {"2" : this.preguntas_seccion_2},
                    {"3" : this.preguntas_seccion_3},
                    {"4" : this.preguntas_seccion_4},
                    {"5" : this.preguntas_seccion_5}
                ]
                this.$emit('onPreguntas',preguntas)    
            }
        },

        async readDataFromAPISeccion2() {
            this.loadingSeccion2 = true;
            const { page, itemsPerPage } = this.optionsSeccion2;
            let pageNumber = page - 1;
            let params = {
                size: itemsPerPage,
                page: pageNumber,
                _id_test: this._id_test,
                seccion: "2"
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let preguntas = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/preguntas/diagnostico') 
                preguntas = response.data ? response.data.data : [];
                this.loadingSeccion2 = false;
                this.totalPreguntasSeccion2 = response.data.totalPreguntas;
                this.numberOfPagesSeccion2 = response.data.totalPages;
            }
            this.preguntas_seccion_2 = preguntas

        },

        async readDataFromAPISeccion3() {
            this.loadingSeccion3 = true;
            const { page, itemsPerPage } = this.optionsSeccion3;
            let pageNumber = page - 1;
            let params = {
                size: itemsPerPage,
                page: pageNumber,
                _id_test: this._id_test,
                seccion: "3"
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let preguntas = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/preguntas/diagnostico') 
                preguntas = response.data ? response.data.data : [];
                this.loadingSeccion3 = false;
                this.totalPreguntasSeccion3 = response.data.totalPreguntas;
                this.numberOfPagesSeccion3 = response.data.totalPages;
            }
            this.preguntas_seccion_3 = preguntas

        },

        async readDataFromAPISeccion4() {
            this.loadingSeccion4 = true;
            const { page, itemsPerPage } = this.optionsSeccion4;
            let pageNumber = page - 1;
            let params = {
                size: itemsPerPage,
                page: pageNumber,
                _id_test: this._id_test,
                seccion: "4"
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let preguntas = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/preguntas/diagnostico') 
                preguntas = response.data ? response.data.data : [];
                this.loadingSeccion4 = false;
                this.totalPreguntasSeccion4 = response.data.totalPreguntas;
                this.numberOfPagesSeccion4 = response.data.totalPages;
            }
            this.preguntas_seccion_4 = preguntas

        },

        async readDataFromAPISeccion5() {
            this.loadingSeccion5 = true;
            const { page, itemsPerPage } = this.optionsSeccion5;
            let pageNumber = page - 1;
            let params = {
                size: itemsPerPage,
                page: pageNumber,
                _id_test: this._id_test,
                seccion: "5"
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let preguntas = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/preguntas/diagnostico') 
                preguntas = response.data ? response.data.data : [];
                this.loadingSeccion5 = false;
                this.totalPreguntasSeccion5 = response.data.totalPreguntas;
                this.numberOfPagesSeccion5 = response.data.totalPages;
            }
            this.preguntas_seccion_5 = preguntas
            this.checkSiguienteHabilitar()
        },

        async processExcelPreguntas(preguntas,seccion) {
            let response = false;
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
            if (userLogged) {
                this.dialogProcesando = true
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.$store.getters.baseurl,'post',headers,{preguntas})
                response = await api.call_respuesta_directa(`/preguntas/diagnostico/seccion/${seccion}/procesar/test/${this._id_test}`) 
            }
            if (response && response.status == 201) {
                if (seccion == "1")
                    this.readDataFromAPISeccion1()
                if (seccion == "2")
                    this.readDataFromAPISeccion2()
                if (seccion == "3")
                    this.readDataFromAPISeccion3()
                if (seccion == "4")
                    this.readDataFromAPISeccion4()
                if (seccion == "5")
                    this.readDataFromAPISeccion5()
                this.$notify(
                    {
                        group: "bottom",
                        title: "Procesado Excel",
                        text: "Se procesó correctamente el archivo de excel.",
                        type: "info"
                    },
                    4000
                )
                this.dialogProcesando = false
                this.openedPanel=null
            }else{
                this.$notify(
                    {
                        group: "bottom",
                        title: "Error",
                        text: "No se pudo procesar archivo de Preguntas.",
                        type: "error"
                    },
                    4000
                )
                this.dialogProcesando = false
            }
        },

        
    },
    components: {
        /*SubmitCx,
        FormCx,*/
        UploadExcelComponent
    }
}
</script>

<style scoped>
    tbody tr:nth-child(odd) {
        background-color:rgba(79, 125, 147, 10%);
    }
</style>