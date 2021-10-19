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
            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
            <v-data-table 
            :headers="headers" 
            :items="preguntas" 
            no-data-text="Preguntas no disponibles"
            no-results-text="Resultados no encontrados"
            :page="page"
            :pageCount="numberOfPages"
            :options.sync="options"
            :server-items-length="totalPreguntas"
            :loading="loading"
            :search="search"
            class="elevation-1">
                <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                    <!--<template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                        Nueva pregunta
                        </v-btn>
                    </template>-->
                    <form-cx action="#" :method="method" :data="editedItem" :url="url" 
                                    @success="success" 
                                    @error="error">
                    <v-card>
                        <span class=" absolute right-0">
                            <v-btn
                                icon
                                right
                                @click="close"
                                >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </span>
                        <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                    v-model="editedItem.orden"
                                    type="number"
                                    label="Orden"
                                    :rules="rules.numeros.rule"
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12"  sm="6" md="6">
                                    <v-text-field
                                    v-model="editedItem.dimension"
                                    label="Dimensión"
                                    :rules="rules.dimension.rule"
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12"  sm="6" md="6">
                                    <v-text-field
                                    v-model="editedItem.subdimension"
                                    label="Subdimensión"
                                    :rules="rules.subdimension.rule"
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Descripción"
                                        auto-grow
                                        outlined
                                        rows="2"
                                        v-model="editedItem.descripcion"
                                        :rules="rules.descripcion.rule"
                                        :counter="rules.descripcion.counter"
                                        row-height="20"
                                        required
                                        ></v-textarea>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    v-model="editedItem.si"
                                    type="number"
                                    label="Si"
                                    :rules="rules.numeros.rule"
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    v-model="editedItem.no"
                                    type="number"
                                    label="No"
                                    :rules="rules.numeros.rule"
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    v-model="editedItem.otro"
                                    type="number"
                                    min=0
                                    max=99
                                    label="?"
                                    :rules="rules.numeros_no.rule"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            
                        </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-row>
                                
                                <v-col cols="12">
                                    <submit-cx>Guardar</submit-cx>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                    </form-cx>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="headline">¿Está seguro que desea eliminar esta pregunta?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Si</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-toolbar>
                </template>
                <template v-slot:[`item.acciones`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
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
import { mapGetters } from 'vuex'
import FormCx from '@/components/forms/FormCx'
import SubmitCx from '@/components/forms/SubmitCx'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
    name: 'PreguntasPostCovid',
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
            page: 1,
            totalPreguntas: 0,
            numberOfPages: 0,
            loading: true,
            search: '',
            options: {},
            id_pregunta: null,
            dialogDelete: false,
            dialog: false,
            headers: [
                { text: 'Orden', value: 'orden', sortable: false },
                { text: 'Descripción', value: 'descripcion', sortable: false },
                { text: 'Dimensión', value: 'dimension', sortable: false },
                { text: 'Subdimensión', value: 'subdimension', sortable: false },
                { text: 'Si', value: 'si', sortable: false },
                { text: 'No', value: 'no', sortable: false },
                { text: '?', value: 'otro', sortable: false },
                { text: 'Acciones', value: 'acciones', sortable: false },
            ],
            preguntas: [],
            subdimensiones: [],
            editedIndex: -1,
            editedItem: {
                tipo: 'simple',
                orden: '',
                dimension: '',
                subimension: '',
                descripcion: '',
                si: 0,
                no: 0,
                otro: 0,
                _id_test: this._id_test
            },
            defaultItem: {
                tipo: 'simple',
                orden: '',
                dimension: '',
                subdimension: '',
                descripcion: '',
                si: 0,
                no: 0,
                otro: 0,
                _id_test: this._id_test
            },
            rules: {
                dimension: {
                    rule: [
                        v => !!v || 'Dimensión es requerida',
                    ]
                },
                subdimension: {
                    rule: [
                        v => !!v || 'Subdimensión es requerida',
                    ]
                },
                descripcion: {
                    rule: [
                        v => !!v || 'Descripción es requerida',
                        v => v.length <= this.rules.descripcion.counter || `La descripción debe ser menor o igual a ${this.rules.descripcion.counter} caracteres`,
                    ],
                    counter: 200
                },
                tiposPreguntas: {
                    rule: [
                        v => !!v || 'Tipo de pregunta es requerido',
                    ]
                },
                numeros: {
                    rule: [
                        v  => {
                            if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) 
                                return true
                            else
                                return 'Se aceptan solo números desde 0 hasta 999'
                        }
                    ]
                },
                numeros_no: {
                    rule: [
                        v  => {
                            if (!v){
                              return true
                            }else{
                              if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) 
                                  return true
                              else
                                  return 'Se aceptan solo números desde 0 hasta 999'
                            }
                        }
                    ]
                }
            },
            tiposPreguntas: [
                {
                    text: 'Simple',
                    value: 'simple'
                },
                {
                    text: 'Múltiple',
                    value: 'multiple',
                    disabled: true
                },
                {
                    text: 'Abierta',
                    value: 'abierta',
                    disabled: true
                },
                {
                    text: 'Escala',
                    value: 'escala',
                    disabled: true
                },
            ]
        }
    },
    computed: {
        ...mapGetters(['system','baseurl']),
        method () {
            return this.editedIndex === -1 ? 'post' :'put'
        },
        url () {
            let url = this.editedIndex === -1 ? '/preguntas-postcovid' : `/preguntas-postcovid/${this.id_pregunta}`
            return url
        },
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
        handleSuccess({ results/*, header*/ }) {
            //this.preguntas = results
            //this.tableHeader = header
            this.processExcelPreguntas(results)
            //console.dir(header);
        },

        async readDataFromAPI() {
            this.loading = true;
            const { page, itemsPerPage } = this.options;
            let pageNumber = page - 1;
            let params = {
                size: itemsPerPage,
                page: pageNumber,
                nombre: this.search,
                _id_test: this._id_test
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let preguntas = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/preguntas-postcovid') 
                preguntas = response.data ? response.data.data : [];
                this.loading = false;
                this.totalPreguntas = response.data.totalPreguntas;
                this.numberOfPages = response.data.totalPages;
            }
            this.preguntas = preguntas

            
            this.$emit('onPreguntas',preguntas)
        },

        deleteItem (item) {
            this.editedIndex = this.preguntas.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
            this.id_pregunta = item._id
        },

        deleteItemConfirm () {
            this.deleteApi()
        },

        async processExcelPreguntas(preguntas) {
            let response = false;
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
            if (userLogged) {
                this.dialogProcesando = true
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.$store.getters.baseurl,'post',headers,{preguntas})
                response = await api.call_respuesta_directa(`/preguntas-postcovid/procesar/test/${this._id_test}`) 
            }
            if (response && response.status == 201) {
                this.readDataFromAPI()
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


        async deleteApi() {
            let response = false;
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.$store.getters.baseurl,'delete',headers)
                response = await api.call_respuesta_directa(`/preguntas-postcovid/${this.id_pregunta}`) 
            }
            if (response && response.status == 200) {
                this.preguntas.splice(this.editedIndex, 1)
                this.closeDelete()
                this.readDataFromAPI()
            }else{
                this.$notify(
                    {
                        group: "bottom",
                        title: "Error",
                        text: "No se pudo eliminar pregunta",
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
        },

        editItem (item) {
            this.editedIndex = this.preguntas.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            this.id_pregunta = item._id
            delete this.editedItem._id
            delete this.editedItem.created_at
            delete this.editedItem.updated_at
        },

        

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        

        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.preguntas[this.editedIndex], this.editedItem)
            } else {
                this.preguntas.push(this.editedItem)
            }
            this.close()
        },


        success (response) {
            this.$notify(
                {
                    group: "bottom",
                    title: "Datos guardados",
                    text: response.data ? response.data.message : "Pregunta creada correctamente.",
                    type: 'info'
                },
                4000
            );
            this.readDataFromAPI()
            this.close()
            //this.$router.push(`/backoffice/tests/${response.data.data}/${step}`);
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
        SubmitCx,
        FormCx,
        UploadExcelComponent
    }
}
</script>

<style scoped>
    tbody tr:nth-child(odd) {
        background-color:rgba(79, 125, 147, 10%);
    }
</style>