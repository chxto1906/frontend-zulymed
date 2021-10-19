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
                <v-expansion-panel :disabled="!enabled_kpis">
                    <v-expansion-panel-header :disable-icon-rotate="kpis.length > 0">
                        KPIS ({{kpis_peso}}%)
                        <template v-slot:actions>
                            <v-icon v-if="kpis.length > 0" color="teal">
                            mdi-check
                            </v-icon>
                            <v-icon v-if="kpis.length == 0" color="error">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-col cols="12">
                          <v-combobox
                            v-model="id_cargo_kpis"
                            :items="cargos"
                            label="Cargo:"
                            @change="readDataFromAPICuantitativas('kpis')"
                          >
                          </v-combobox>
                        </v-col>
                        <upload-excel-component :on-success="handleSuccessKpis" :before-upload="beforeUpload" />
                        <v-data-table 
                            :headers="headersCuantitativas" 
                            :items="kpis" 
                            no-data-text="Data no disponible"
                            no-results-text="Resultados no encontrados"
                            :loading="loadingKpis"
                            class="elevation-1">
                        </v-data-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel :disabled="!enabled_desempeno">
                    <v-expansion-panel-header :disable-icon-rotate="desempeno.length > 0">
                        Desempeño Social ({{desempeno_peso}}%)
                        <template v-slot:actions>
                            <v-icon v-if="desempeno.length > 0" color="teal">
                            mdi-check
                            </v-icon>
                            <v-icon v-if="desempeno.length == 0" color="error">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-col cols="12">
                          <v-combobox
                            v-model="id_cargo_social"
                            :items="cargos"
                            label="Cargo:"
                            @change="readDataFromAPICuantitativas('desempeno')"
                          >
                          </v-combobox>
                        </v-col>
                        <upload-excel-component :on-success="handleSuccessDesempeno" :before-upload="beforeUpload" />
                        <v-data-table 
                            :headers="headersCuantitativas" 
                            :items="desempeno" 
                            no-data-text="Data no disponible"
                            no-results-text="Resultados no encontrados"
                            :loading="loadingDesempeno"
                            class="elevation-1">
                        </v-data-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel :disabled="!enabled_competencias_generales">
                    <v-expansion-panel-header :disable-icon-rotate="generales.length > 0">
                        Competencias Generales ({{competencias_generales_peso}}%)
                        <template v-slot:actions>
                            <v-icon v-if="generales.length > 0" color="teal">
                            mdi-check
                            </v-icon>
                            <v-icon v-if="generales.length == 0" color="error">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <upload-excel-component :on-success="handleSuccessGenerales" :before-upload="beforeUpload" />
                        <v-data-table 
                            :headers="headersCualitativas" 
                            :items="generales" 
                            no-data-text="Preguntas no disponibles"
                            no-results-text="Resultados no encontrados"
                            :page="page_generales"
                            :pageCount="numberOfPagesGenerales"
                            :options.sync="optionsGenerales"
                            :server-items-length="totalPreguntasGenerales"
                            :loading="loadingGenerales"
                            :search="searchGenerales"
                            class="elevation-1">
                        </v-data-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel :disabled="!enabled_competencias_especificas">
                    <v-expansion-panel-header :disable-icon-rotate="especificas.length > 0">
                        Competencias Específicas ({{competencias_especificas_peso}}%)
                        <template v-slot:actions>
                            <v-icon v-if="especificas.length > 0" color="teal">
                            mdi-check
                            </v-icon>
                            <v-icon v-if="especificas.length == 0" color="error">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-col cols="12">
                          <v-combobox
                            v-model="id_cargo_especificas"
                            :items="cargos"
                            label="Cargo:"
                            @change="readDataFromAPIEspecificas()"
                          >
                          </v-combobox>
                        </v-col>
                        <upload-excel-component :on-success="handleSuccessEspecificas" :before-upload="beforeUpload" />
                        <v-data-table 
                            :headers="headersCualitativas" 
                            :items="especificas" 
                            no-data-text="Preguntas no disponibles"
                            no-results-text="Resultados no encontrados"
                            :page="page_especificas"
                            :pageCount="numberOfPagesEspecificas"
                            :options.sync="optionsEspecificas"
                            :server-items-length="totalPreguntasEspecificas"
                            :loading="loadingEspecificas"
                            :search="searchEspecificas"
                            class="elevation-1">
                        </v-data-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel :disabled="!enabled_competencias_conocimientos">
                    <v-expansion-panel-header :disable-icon-rotate="conocimientos.length > 0">
                        Competencias Conocimientos ({{competencias_conocimientos_peso}}%)
                        <template v-slot:actions>
                            <v-icon v-if="conocimientos.length > 0" color="teal">
                            mdi-check
                            </v-icon>
                            <v-icon v-if="conocimientos.length == 0" color="error">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-col cols="12">
                          <v-combobox
                            v-model="id_cargo_conocimientos"
                            :items="cargos"
                            label="Cargo:"
                            @change="readDataFromAPIConocimientos()"
                          >
                          </v-combobox>
                        </v-col>
                        <upload-excel-component :on-success="handleSuccessConocimientos" :before-upload="beforeUpload" />
                        <v-data-table 
                            :headers="headersCualitativas" 
                            :items="conocimientos" 
                            no-data-text="Preguntas no disponibles"
                            no-results-text="Resultados no encontrados"
                            :page="page_conocimientos"
                            :pageCount="numberOfPagesConocimientos"
                            :options.sync="optionsConocimientos"
                            :server-items-length="totalPreguntasConocimientos"
                            :loading="loadingConocimientos"
                            :search="searchConocimientos"
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
    name: 'PreguntasDesempeno',
    props: {
        _id_test: {
            type: String,
            required: true
        },
        _id_empresa: {
            type: String,
            required: true
        },
        cargos: {
          type: Array,
          required: true
        },
        enabled_kpis: {
            type: Boolean
        },
        enabled_desempeno: {
            type: Boolean
        },
        enabled_competencias_generales: {
            type: Boolean
        },
        enabled_competencias_especificas: {
            type: Boolean
        },
        enabled_competencias_conocimientos: {
            type: Boolean
        },

        kpis_peso: {
            type: Number
        },

        desempeno_peso: {
            type: Number
        },

        competencias_generales_peso: {
            type: Number
        },

        competencias_especificas_peso: {
            type: Number
        },

        competencias_conocimientos_peso: {
            type: Number
        }
    },
    data () {
        return {
            select_cargos: [],
            items_cargos: [],
            id_cargo_kpis: this.cargos[0] || null,
            id_cargo_social: this.cargos[0] || null,
            id_cargo_especificas: this.cargos[0] || null,
            id_cargo_conocimientos: this.cargos[0] || null,
            titulo: "Listado de preguntas",
            dialogProcesando: false,
            search:'',
            searchGenerales: '',
            searchEspecificas: '',
            searchConocimientos: '',
            page_generales: 1,
            page_especificas: 1,
            page_conocimientos: 1,
            totalPreguntasEspecificas: 0,
            totalPreguntasGenerales: 0,
            totalPreguntasConocimientos: 0,
            numberOfPagesGenerales: 0,
            numberOfPagesEspecificas: 0,
            numberOfPagesConocimientos: 0,
            loadingKpis: true,
            loadingDesempeno: true,
            loadingGenerales: true,
            loadingEspecificas: true,
            loadingConocimientos: true,
            optionsGenerales: {page:1, itemsPerPage:5},
            optionsEspecificas: {page:1, itemsPerPage:5},
            optionsConocimientos: {page:1, itemsPerPage:5},
            openedPanel: null,
            headersCuantitativas: [
                { text: 'Indicador de desempeño', value: 'indicador', sortable: false },
                { text: 'Fórmula de cálculo', value: 'forma_calculo', sortable: false },
                { text: 'Peso', value: 'peso', sortable: false },
                { text: 'Meta', value: 'meta', sortable: false },
            ],
            headersCualitativas: [
                { text: 'Orden', value: 'orden', sortable: false },
                { text: 'Descripción', value: 'descripcion', sortable: false },
                { text: 'Competencia', value: 'competencia', sortable: false },
                { text: 'Nivel requerido', value: 'nivel_requerido', sortable: false },
            ],
            kpis: [],
            desempeno: [],
            generales: [],
            especificas: [],
            conocimientos: []
        }
    },
    computed: {
        ...mapGetters(['system','baseurl']),
    },
    watch: {
      
      optionsGenerales: {
        handler() {
            this.readDataFromAPIGenerales();
        },
      },
      optionsEspecificas: {
        handler() {
            this.readDataFromAPIEspecificas();
        },
      },
      optionsConocimientos: {
        handler() {
            this.readDataFromAPIConocimientos();
        },
      },
      
    },
    created() {
      
      if (this._id_empresa){    
        this.readDataFromAPICuantitativas("kpis")
        this.readDataFromAPICuantitativas("desempeno")
        this.readDataFromAPIGenerales()
        this.readDataFromAPIEspecificas()
        this.readDataFromAPIConocimientos()
      }
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
        handleSuccessKpis({ results }) {
            this.processExcelPreguntasCuantitativas(results,"kpis")
        },

        handleSuccessDesempeno({ results }) {
            this.processExcelPreguntasCuantitativas(results,"desempeno")
        },

        handleSuccessGenerales({ results }) {
            
            this.processExcelPreguntasCualitativas(results,"generales")
        },

        handleSuccessEspecificas({ results }) {
            
            this.processExcelPreguntasCualitativas(results,"especificas")
        },

        handleSuccessConocimientos({ results }) {
            
            this.processExcelPreguntasCualitativas(results,"conocimientos")
        },

        


        async readDataFromAPICuantitativas(tipo) {
            if (tipo == "kpis"){
                this.loadingKpis = true;
            }
            if (tipo == "desempeno"){
                this.loadingDesempeno = true;
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let preguntas = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                let id_cargo = null
                if (tipo == "kpis"){
                    id_cargo = this.id_cargo_kpis.value
                }
                if (tipo == "desempeno"){
                    id_cargo = this.id_cargo_social.value
                }

                let params = {
                    _id_test: this._id_test,
                    tipo: tipo,
                    _id_cargo: id_cargo
                }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/preguntas-desempeno/cuantitativas') 
                preguntas = response.data ? response.data.data : [];
                if (tipo == "kpis"){
                    this.loadingKpis = false;
                }
                if (tipo == "desempeno"){
                    this.loadingDesempeno = false;
                }
                
            }
            this[tipo] = preguntas
            
        },

        async readDataFromAPIGenerales() {
            this.loadingGenerales = true;
            const { page, itemsPerPage } = this.optionsGenerales;
            let pageNumber = page - 1;
            let params = {
                size: itemsPerPage,
                page: pageNumber,
                nombre: this.searchGenerales,
                _id_test: this._id_test
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let preguntas = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/preguntas-desempeno/cualitativas/generales') 
                preguntas = response.data ? response.data.data : [];
                this.loadingGenerales = false;
                this.totalPreguntasGenerales = response.data.totalPreguntas;
                this.numberOfPagesGenerales = response.data.totalPages;
            }
            this.generales = preguntas
            //this.$emit('onPreguntas',preguntas)
            
        },

        async readDataFromAPIEspecificas() {
            this.loadingEspecificas = true;
            const { page, itemsPerPage } = this.optionsEspecificas;
            let pageNumber = page - 1;
            const id_cargo = this.id_cargo_especificas.value
            let params = {
                size: itemsPerPage,
                page: pageNumber,
                nombre: this.searchEspecificas,
                _id_test: this._id_test,
                _id_cargo: id_cargo
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let preguntas = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/preguntas-desempeno/cualitativas/especificas') 
                preguntas = response.data ? response.data.data : [];
                this.loadingEspecificas = false;
                this.totalPreguntasEspecificas = response.data.totalPreguntas;
                this.numberOfPagesEspecificas = response.data.totalPages;
            }
            this.especificas = preguntas
            //this.$emit('onPreguntas',preguntas)
            
        },

        async readDataFromAPIConocimientos() {
            this.loadingConocimientos = true;
            const { page, itemsPerPage } = this.optionsConocimientos;
            let pageNumber = page - 1;
            const id_cargo = this.id_cargo_conocimientos.value
            let params = {
                size: itemsPerPage,
                page: pageNumber,
                nombre: this.searchConocimientos,
                _id_test: this._id_test,
                _id_cargo: id_cargo
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let preguntas = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/preguntas-desempeno/cualitativas/conocimientos') 
                preguntas = response.data ? response.data.data : [];
                this.loadingConocimientos = false;
                this.totalPreguntasConocimientos = response.data.totalPreguntas;
                this.numberOfPagesConocimientos = response.data.totalPages;
            }
            this.conocimientos = preguntas
            //this.$emit('onPreguntas',preguntas)
            
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

        async processExcelPreguntasCuantitativas(preguntas,tipo) {
            let response = false;
            let id_cargo = null
            if (tipo == "kpis"){
                id_cargo = this.id_cargo_kpis.value
            }
            if (tipo == "desempeno"){
                id_cargo = this.id_cargo_social.value
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
            if (userLogged) {
                this.dialogProcesando = true
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.$store.getters.baseurl,'post',headers,{preguntas})
                response = await api.call_respuesta_directa(`/preguntas-desempeno/cuantitativas/tipo/${tipo}/procesar/test/${this._id_test}/cargo/${id_cargo}`) 
            }
            if (response && response.status == 201) {
                if (tipo == "kpis")
                    this.kpis = preguntas
                else if(tipo == "desempeno") 
                    this.desempeno = preguntas
                this.readDataFromAPICuantitativas(tipo)
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

        async processExcelPreguntasCualitativas(preguntas,tipo) {
            let response = false;
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
            if (userLogged) {
                this.dialogProcesando = true
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.$store.getters.baseurl,'post',headers,{preguntas})
                if (tipo !== "generales"){
                    let id_cargo = null
                    if (tipo == "especificas")
                        id_cargo = this.id_cargo_especificas.value
                    else if (tipo == "conocimientos")
                        id_cargo = this.id_cargo_conocimientos.value
                    response = await api.call_respuesta_directa(`/preguntas-desempeno/cualitativas/${tipo}/procesar/test/${this._id_test}/cargo/${id_cargo}`) 
                }else
                    response = await api.call_respuesta_directa(`/preguntas-desempeno/cualitativas/${tipo}/procesar/test/${this._id_test}`) 
            }
            if (response && response.status == 201) {
                if (tipo == "generales"){
                    this.generales = preguntas
                    this.readDataFromAPIGenerales()
                }else if(tipo == "especificas"){
                    this.especificas = preguntas
                    this.readDataFromAPIEspecificas()
                }else if(tipo == "conocimientos"){
                    this.conocimientos = preguntas
                    this.readDataFromAPIConocimientos()
                }
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