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
            <upload-excel-component  :on-success="handleSuccess" :before-upload="beforeUpload" />
            <v-data-table 
            :headers="asignacion == 'si' ? headers_asignacion : headers"
            :items="usuarios" 
            no-data-text="Usuarios no disponibles"
            no-results-text="Resultados no encontrados"
            :page="page"
            :pageCount="numberOfPages"
            :options.sync="options"
            :server-items-length="totalUsuarios"
            :loading="loading"
            :search="search"
            class="elevation-1">
                <template v-slot:top>
                  <v-dialog v-model="dialog" >
                    
                    <v-tabs v-model="tab" :background-color="system.colores.icons_2" color="white" grow>
                        
                        <v-tab>
                            Información usuario
                        </v-tab>
                        <v-tab>
                            Respuestas
                        </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <form-cx action="#" :method="method" :data="dataUserUpdate" :url="url" 
                                        @success="success" 
                                        @error="error">
                                <v-card>
                                    <v-card-title>Información de: {{editedItem.nombre}} {{editedItem.apellido}}</v-card-title>
                                    <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" md="6" class="py-0">
                                                <v-text-field
                                                    v-model="editedItem.cedula"
                                                    label="Cédula"
                                                    required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6" class="py-0">
                                                <v-text-field
                                                    v-model="editedItem.nombre"
                                                    label="Nombre"
                                                    required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6" class="py-0">
                                                <v-text-field
                                                    v-model="editedItem.apellido"
                                                    label="Apellido"
                                                    required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6" class="py-0">
                                                <v-text-field
                                                    v-model="editedItem.email"
                                                    label="Email"
                                                    required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6" class="py-0">
                                                <v-text-field
                                                    v-model="editedItem.telefono"
                                                    label="Teléfono"
                                                    required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6" class="py-0">
                                                <v-select
                                                :items="sexos"
                                                v-model="editedItem.sexo"
                                                label="Sexo"
                                                ></v-select>
                                            </v-col>
                                            <v-col cols="12" md="6" class="py-0">
                                                <v-menu
                                                    ref="menu"
                                                    v-model="menu"
                                                    :close-on-content-click="false"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="auto"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            v-model="editedItem.fecha_nacimiento"
                                                            label="Fecha de Nacimiento"
                                                            
                                                            readonly
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        ref="picker"
                                                        v-model="editedItem.fecha_nacimiento"
                                                        :max="new Date().toISOString().substr(0, 10)"
                                                        min="1950-01-01"
                                                        @change="save"
                                                        ></v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="12" md="6" class="py-0">
                                                <v-select
                                                :items="departamentos"
                                                v-model="editedItem._id_departamento"
                                                label="Departamento"
                                                ></v-select>
                                            </v-col>
                                            <v-col cols="12" md="6" class="py-0">
                                                <v-select
                                                :items="cargos"
                                                v-model="editedItem._id_cargo"
                                                label="Cargo"
                                                ></v-select>
                                            </v-col>
                                            <v-col cols="12" md="6" class="py-0">
                                                <v-text-field
                                                v-model="editedItem.antiguedad"
                                                type="number"
                                                label="Antigüedad (meses)"
                                                required
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
                        </v-tab-item>
                        <v-tab-item>
                            <form-cx action="#" method="put" :data="dataRespuestaUpdate" :url="urlRespuesta" 
                                @success="successRespuesta" 
                                @error="error">
                                <v-card>
                                    <v-card-title>Respuestas de: {{editedItem.nombre}} {{editedItem.apellido}}</v-card-title>
                                    <v-card-text>
                                        <div class="text-center">
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12" md="12" class="py-0">
                                                        <v-data-table
                                                          :headers="headersRespuestas"
                                                          :items="respuestas"
                                                          :hide-default-footer="true"
                                                        >
                                                          <template v-slot:[`item.value`]="{ item }">
                                                            <v-edit-dialog
                                                              :return-value.sync="item.value"
                                                              large
                                                              persistent
                                                              @save="saveRespuesta(item)"
                                                              @cancel="cancelRespuesta"
                                                              @open="openRespuesta"
                                                              @close="closeRespuesta"
                                                            >
                                                              <div>{{ item.value == 'otro' ? '?' : item.value }}</div>
                                                              <template v-slot:input>
                                                                <div class="mt-4 text-h6">
                                                                  Actualizar respuesta
                                                                </div>
                                                                <v-select
                                                                  v-if="item.test.tipo == 'clima_laboral'"
                                                                  v-model="item.value"
                                                                  :items="valores_clima"
                                                                  label="Respuesta"
                                                                  dense
                                                                ></v-select>
                                                                <v-select
                                                                  v-if="item.test.tipo == 'postcovid'"
                                                                  v-model="item.value"
                                                                  :items="valores_postcovid(item)"
                                                                  label="Respuesta"
                                                                  dense
                                                                ></v-select>
                                                                <v-select
                                                                  v-if="item.test.tipo == 'diagnostico_motivacional'"
                                                                  v-model="item.value"
                                                                  :items="valores_diagnostico"
                                                                  label="Respuesta"
                                                                  dense
                                                                ></v-select>
                                                                <v-text-field
                                                                  v-if="item.test.tipo == 'desempeno' && (item.pregunta.tipo == 'kpis' || item.pregunta.tipo == 'desempeno')"
                                                                  v-model="item.value"
                                                                  label="Calificación"
                                                                  single-line
                                                                  autofocus
                                                                ></v-text-field>
                                                                <v-select
                                                                  v-if="item.test.tipo == 'desempeno' && item.pregunta.tipo == 'cualitativas_generales'"
                                                                  v-model="item.value"
                                                                  :items="valores_cualitativas_generales(item.pregunta)"
                                                                  label="Respuesta"
                                                                  dense
                                                                ></v-select>
                                                                <v-select
                                                                  v-if="item.test.tipo == 'desempeno' && item.pregunta.tipo == 'cualitativas_especificas'"
                                                                  v-model="item.value"
                                                                  :items="valores_cualitativas_especificas(item.pregunta)"
                                                                  label="Respuesta"
                                                                  dense
                                                                ></v-select>

                                                              </template>
                                                            </v-edit-dialog>
                                                          </template>
                                                        </v-data-table>

                                                        <v-snackbar
                                                          v-model="snack"
                                                          :timeout="3000"
                                                          :color="snackColor"
                                                        >
                                                          {{ snackText }}

                                                          <template v-slot:action="{ attrs }">
                                                            <v-btn
                                                              v-bind="attrs"
                                                              text
                                                              @click="snack = false"
                                                            >
                                                              Close
                                                            </v-btn>
                                                          </template>
                                                        </v-snackbar>
                                                    </v-col>
                                                </v-row>

                                                <v-pagination
                                                v-model="pageRespuestas"
                                                :length="totalPagesRespuestas"
                                                @input="changePageRespuestas"
                                                ></v-pagination>
                                            </v-container>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </form-cx>
                        </v-tab-item>
                    </v-tabs-items>
                  </v-dialog>
                    

                    <v-dialog v-model="dialogAsignar">
                    
                        <form-cx action="#" :method="method" :data="editedItem" :url="url" 
                                        @success="success" 
                                        @error="error">
                        <v-card>
                            <span class=" absolute right-0">
                                <v-btn icon right @click="closeAsignar">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </span>
                            <v-card-text>
                            <v-container>
                                <v-row>
                                    <strong>Cualitativas:</strong> 
                                    <v-col cols="12">
                                        <v-combobox
                                        v-model="editedItem._ids_jefes"
                                        :items="itemsUsuarios"
                                        label="Jefe/s"
                                        multiple
                                        chips
                                        :disabled="competencias_conocimientos_peso == 0 && competencias_especificas_peso == 0 && competencias_generales_peso == 0"
                                        ></v-combobox>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-combobox
                                        v-model="editedItem._ids_pares"
                                        :items="itemsUsuarios"
                                        label="Pares"
                                        :disabled="competencias_conocimientos_peso == 0 && competencias_especificas_peso == 0 && competencias_generales_peso == 0"
                                        multiple
                                        chips
                                        ></v-combobox>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-combobox
                                        v-model="editedItem._ids_subordinados"
                                        :items="itemsUsuarios"
                                        :disabled="competencias_conocimientos_peso == 0 && competencias_especificas_peso == 0 && competencias_generales_peso == 0"
                                        label="Subordinado/s"
                                        multiple
                                        chips
                                        ></v-combobox>
                                    </v-col>
                                    <strong>Cuantitativas:</strong> 
                                    <v-col cols="12">
                                        <v-combobox
                                        v-model="editedItem._ids_quien_le_califica"
                                        :items="itemsUsuarios"
                                        :disabled="kpis_peso == 0 && desempeno_peso == 0"
                                        label="¿Quién le evalúa las Cuantitativas?"
                                        multiple
                                        chips
                                        ></v-combobox>
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
                        <v-card-title style="word-break: break-word !important;" class="headline">¿Está seguro que desea eliminar este usuario?</v-card-title>
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
                            <v-card-title style="word-break: break-word !important;" class="headline">¿Está seguro que desea enviar Test a usuario?</v-card-title>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeEnviarTest">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="enviarTestConfirm">Si</v-btn>
                            <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                
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
                <template v-slot:[`item.acciones`]="{ item }">
                    
                    <div v-if="asignacion != 'si'">
                        <v-icon v-if="rol == 'superadmin'" small title="Editar usuario" @click="editItem(item)" :color="system.colores.icons_2">
                            mdi-pencil
                        </v-icon>
                        <v-icon v-if="rol == 'superadmin'"
                            small
                            @click="deleteItem(item)"
                            :color="system.colores.icons_2"
                        >
                            mdi-delete
                        </v-icon>
                        <v-icon small @click="enviarTest(item)" :color="system.colores.icons_2" title="Enviar a usuario">
                            mdi-send
                        </v-icon>
                    </div>
                    <div v-else>
                        <!--<v-icon v-if="((Array.isArray(item._ids_jefes) && item._ids_jefes.length > 0) || 
                            (Array.isArray(item._ids_pares) && item._ids_pares.length > 0) || 
                            (Array.isArray(item._ids_subordinados) && item._ids_subordinados.length > 0)) &&
                            (Array.isArray(item._ids_quien_le_califica) && item._ids_quien_le_califica.length > 0)"  class="mr-2" title="Asignado" @click="editItem(item)" :color="system.colores.icons_2">
                            mdi-account-check
                        </v-icon>-->
                        <v-icon class="mr-2" title="Asignar" @click="editItem(item)" :color="system.colores.icons_2">
                            mdi-account-question-outline
                        </v-icon>
                    </div>
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
    name: 'Usuarios',
    props: {
        _id_test: {
            type: String,
            required: true
        },
        _id_empresa: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
        },
        asignacion: {
            type: String,
        },
        value: {
          type: Array
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
            pageRespuestas: 1,
            sizeRespuestas: 7,
            totalPagesRespuestas: 0,
            snack: false,
            snackColor: '',
            snackText: '',
            urlRespuesta : `/usuarios/usuariotest/`,
            titulo: "Listado de usuarios",
            dialogProcesando: false,
            itemUsuario: null,
            page: 1,
            totalUsuarios: 0,
            numberOfPages: 0,
            loading: true,
            search: '',
            options: {},
            id_usuario: null,
            id_usuario_test: null,
            dialogDelete: false,
            dialog: false,
            dialogAsignar: false,
            dialogEnviarTest: false,
            departamentos: [],
            menu: false,
            tab: 0,
            cargos: [],
            respuestas: [],
            valor_respuesta: null,
            valores_diagnostico : ["1","2","3","4"],
            valores_clima: [
              { text: 'Si', value: 'si'},
              { text: 'No', value: 'no'},
              { text: '?', value: 'otro'}
            ],
            headersRespuestas:[
              { text: 'Descripción', value: 'pregunta.descripcion', sortable: false },
              { text: 'Categoría', value: 'categoria', sortable: false },
              { text: 'Subcategoría', value: 'subcategoria', sortable: false },
              { text: 'Valor', value: 'value', sortable: false },
            ],
            sexos: [
                {
                    text: 'Masculino',
                    value: 'M'
                },
                {
                    text: 'Femenino',
                    value: 'F'
                },
            ],
            usuarioTest: {
                _id_test: '',
                _id_usuario: '',
                _id_empresa: '',
                _id_departamento: '',
                _id_cargo: '',
                antiguedad: '',
            },
            headers: [
                //{ text: 'Cédula', value: 'cedula', sortable: false },
                { text: 'Nombre', value: 'nombre', sortable: false },
                { text: 'Apellido', value: 'apellido', sortable: false },
                { text: 'Email', value: 'email', sortable: false },
                //{ text: 'Teléfono', value: 'telefono', sortable: false },
                { text: 'Departamento', value: 'departamento', sortable: false },
                { text: 'Cargo', value: 'cargo', sortable: false },
                { text: 'Antigüedad', value: 'antiguedad', sortable: false },
                { text: 'Edad', value: 'edad', sortable: false },
                { text: 'Sexo', value: 'sexo', sortable: false },
                { text: '% Completado', value: 'porcentaje', sortable: false },
                { text: 'Acciones', value: 'acciones', sortable: false },
            ],

            headers_asignacion: [
                { text: 'Nombre', value: 'nombre', sortable: false },
                { text: 'Apellido', value: 'apellido', sortable: false },
                { text: 'Email', value: 'email', sortable: false },
                { text: 'Asignación', value: 'acciones', sortable: false },
            ],
            usuarios: [],
            itemsUsuarios: [],
            editedIndex: -1,
            editedItem: this.defaultItemInicial(),
            defaultItem: this.defaultItemInicial(),
            /*editedItem: {
                nombre: '',
                apellido: '',
                email: ''
            },
            defaultItem: {
                nombre: '',
                apellido: '',
                email: ''
            },*/
            rules: {
                nombre: {
                    rule: [
                        v => !!v || 'Nombre es requerido',
                        v => v.length == this.rules.nombre.counter || `El nombre debe ser igual a ${this.rules.nombre.counter} caracteres`,
                    ],
                    counter: 100
                },
                apellido: {
                    rule: [
                        v => !!v || 'Apellido es requerido',
                        v => v.length == this.rules.apellido.counter || `El apellido debe ser igual a ${this.rules.apellido.counter} caracteres`,
                    ],
                    counter: 100
                },
                email: {
                    rule: [
                        v => !!v || 'Email es requerido',
                        v => {
                            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            return pattern.test(v) || 'Email inválido.'
                        }
                    ]
                }
            },
        }
    },
    computed: {
        ...mapGetters(['system','baseurl']),
        method () {
            return this.editedIndex === -1 ? 'post' :'put'
        },
        url () {
            let url = this.editedIndex === -1 ? '/usuarios' : `/usuarios/completar/usuariotest/${this.id_usuario_test}`
            if (this.asignacion == "si")
                url = `/usuarios/usuariotest/${this.id_usuario_test}`
            return url
        },
        rol() {
          const userLogged = JSON.parse(Cookies.get("userLogged"))
          return `${userLogged.user.rol}`
        },
        dataUserUpdate () {
            let data = {
                usuario:{
                    cedula: this.editedItem.cedula || '',
                    nombre: this.editedItem.nombre || '',
                    apellido: this.editedItem.apellido || '',
                    email: this.editedItem.email || '',
                    telefono: this.editedItem.telefono || '',
                    fecha_nacimiento: this.editedItem.fecha_nacimiento || '',
                    sexo: this.editedItem.sexo || ''
                },
                usuarioTest: {
                    _id_test: this._id_test || '',
                    _id_usuario: this.id_usuario || '',
                    _id_empresa: this._id_empresa || '',
                    _id_departamento: this.editedItem._id_departamento || '',
                    _id_cargo: this.editedItem._id_cargo || '',
                    antiguedad: this.editedItem.antiguedad || '',
                }
            }

            return data
        },
        dataRespuestaUpdate() {
            return {}
        }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      dialogEnviarTest (val) {
        val || this.closeEnviarTest()
      },
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

        valores_postcovid (item) {
          let valores = []
          if (item.pregunta.si >= 0){
            valores.push({text:"Si", value: 'si'})
          }
          if (item.pregunta.no >= 0){
            valores.push({text:"No", value: 'no'})
          }
          if (item.pregunta.otro >= 0){
            valores.push({text:"?", value: 'otro'})
          }
          return valores
        },
        valores_cualitativas_generales (item) {
          return [
            {text: item.descripcion_nivel_1+" (valor = "+item.opcion_1+")", value: Number(item.opcion_1)},
            {text: item.descripcion_nivel_2+" (valor = "+item.opcion_2+")", value: Number(item.opcion_2)},
            {text: item.descripcion_nivel_3+" (valor = "+item.opcion_3+")", value: Number(item.opcion_3)},
          ]
        },
        valores_cualitativas_especificas (item) {
          return [
            {text: item.descripcion_nivel_1+" (valor = "+item.opcion_1+")", value: Number(item.opcion_1)},
            {text: item.descripcion_nivel_2+" (valor = "+item.opcion_2+")", value: Number(item.opcion_2)},
            {text: item.descripcion_nivel_3+" (valor = "+item.opcion_3+")", value: Number(item.opcion_3)},
            {text: item.descripcion_nivel_4+" (valor = "+item.opcion_4+")", value: Number(item.opcion_4)},
          ]
        },
        async readDepartamentos () {
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
            const params = {_id_empresa: this._id_empresa}
            const api = new Api(this.baseurl,'get',headers,{},params)
            let response = await api.call_respuesta_directa(`/departamentos/select/all`) 
            response = response.data ? response.data.data : this.departamentos
            this.departamentos = response
        },
        async readCargos () {
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
            const params = {_id_empresa: this._id_empresa}
            const api = new Api(this.baseurl,'get',headers,{},params)
            let response = await api.call_respuesta_directa(`/cargos/select/all`) 
            response = response.data ? response.data.data : this.cargos
            this.cargos = response
        },
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
        save (date) {
            this.$refs.menu.save(date)
        },
        handleSuccess({ results/*, header*/ }) {
            //this.preguntas = results
            //this.tableHeader = header
            this.processExcelUsuarios(results)
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
            let usuarios = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/usuarios') 
                usuarios = response.data ? response.data.data : [];
                this.loading = false;
                this.totalUsuarios = response.data.totalUsuarios;
                this.numberOfPages = response.data.totalPages;
                this.readDepartamentos()
                this.readCargos()
            }
            this.usuarios = usuarios
            this.$emit('onUsuarios',usuarios)
        },

        async getAllUsuariosByTest(id_user) {
            this.loading = true;
            let params = {
                _id_test: this._id_test,
                _id_usuario: { $not: { $eq: id_user } }
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let usuarios = []
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa('/usuarios/select/all') 
                usuarios = response.data ? response.data.data : [];
                this.loading = false;
            }
            this.itemsUsuarios = usuarios
            //this.$emit('onUsuarios',usuarios)
        },

        deleteItem (item) {
            this.editedIndex = this.usuarios.indexOf(item)
            this.editedItem = this.assignItem(item)
            this.dialogDelete = true
            this.id_usuario = item._id_usuario
            this.id_usuario_test = item._id
        },

        assignItem (item) {
            if (this.asignacion != 'si') {
                return {
                    nombre: item.nombre,
                    cedula: item.cedula,
                    apellido: item.apellido,
                    email: item.email,
                    telefono: item.telefono,
                    sexo: item.sexo,
                    fecha_nacimiento: item.fecha_nacimiento,
                    _id_departamento: item._id_departamento,
                    _id_cargo: item._id_cargo,
                    antiguedad: item.antiguedad
                }
            }else{
                return {
                    _ids_jefes:         item._ids_jefes,
                    _ids_pares:         item._ids_pares,
                    _ids_subordinados:  item._ids_subordinados,
                    _ids_quien_le_califica:    item._ids_quien_le_califica
                }
            }
        },

        defaultItemInicial () {
            if (this.asignacion != 'si') {
                return {
                    nombre: '',
                    cedula: '',
                    apellido: '',
                    email: '',
                    telefono: '',
                    sexo: '',
                    fecha_nacimiento: '',
                    _id_departamento: '',
                    _id_cargo: '',
                    antiguedad: ''
                }
            }else{
                return {
                    _ids_jefes:         [],
                    _ids_pares:         [],
                    _ids_subordinados:  [],
                    _ids_quien_le_califica:    []
                }
            }
        },

        deleteItemConfirm () {
            this.deleteApi()
        },

        enviarTest (item) {
            this.editedIndex = this.usuarios.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogEnviarTest = true
            this.id_usuario = item._id_usuario
        },

        enviarTestConfirm () {
            this.enviarTestApi()
        },

        async enviarTestApi() {
            let response = false;
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
            if (userLogged) {
                this.dialogProcesando = true
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.$store.getters.baseurl,'post',headers)
                response = await api.call_respuesta_directa(`/tests/${this._id_test}/usuario/${this.id_usuario}/enviar`) 
            }
            if (response && response.status == 201) {

                this.$notify(
                    {
                        group: "bottom",
                        title: "Emails",
                        text: "Se ha enviado email correctamente",
                        type: "info"
                    },
                    4000
                );
                this.dialogProcesando = false
                this.closeEnviarTest()
            }else{
                this.$notify(
                    {
                        group: "bottom",
                        title: "Error",
                        text: "No se pudo enviar email. Reintente de nuevo más tarde.",
                        type: "error"
                    },
                    4000
                );
                this.closeEnviarTest()
                this.dialogProcesando = false
            }

        },

        closeEnviarTest () {
            this.dialogEnviarTest = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        async processExcelUsuarios(usuarios) {
            let response = false;
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
            if (userLogged) {
                this.dialogProcesando = true
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.$store.getters.baseurl,'post',headers,{usuarios})
                response = await api.call_respuesta_directa(`/usuarios/procesar/test/${this._id_test}`) 
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
                );
                this.dialogProcesando = false
            }else{
                this.$notify(
                    {
                        group: "bottom",
                        title: "Error",
                        text: "No se pudo procesar archivo de Usuarios.",
                        type: "error"
                    },
                    4000
                );
                this.dialogProcesando = false
            }
        },


        async deleteApi() {
            let response = false;
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.$store.getters.baseurl,'delete',headers)
                response = await api.call_respuesta_directa(`/usuarios/usuariotest/${this.id_usuario_test}/test/${this._id_test}`) 
            }
            if (response && response.status == 200) {
                this.usuarios.splice(this.editedIndex, 1)
                this.closeDelete()
                this.readDataFromAPI()
            }else{
                this.$notify(
                    {
                        group: "bottom",
                        title: "Error",
                        text: "No se pudo eliminar usuario",
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
            this.editedIndex = this.usuarios.indexOf(item)
            this.editedItem = this.assignItem(item)
            if (this.asignacion != 'si'){
                this.dialog = true
                this.itemUsuario = item;
                this.cargarRespuestas()
            }else{
                this.getAllUsuariosByTest(item._id_usuario)
                this.dialogAsignar = true
            }
            this.id_usuario = item._id_usuario
            this.id_usuario_test = item._id
            
        },

        async cargarRespuestas() {
            this.loading = true;
            this.pageRespuestas
            let params = {
                size: this.sizeRespuestas,
                page: this.pageRespuestas
            }
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            if (userLogged) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers,{},params)
                let response = await api.call_respuesta_directa(`/respuestas/test/${this._id_test}/usuario/${this.itemUsuario._id_usuario}`) 
                this.respuestas = response.data ? response.data.data : [];
                this.totalPagesRespuestas = response.data.totalPages;
                this.loading = false;
            }
        },

        changePageRespuestas() {
            this.cargarRespuestas()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeAsignar () {
            this.dialogAsignar = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        successRespuesta (response) {
            this.$notify(
                    {
                        group: "bottom",
                        title: "Respuesta",
                        text: response.data ? response.data.message : "Respuesta modificado correctamente.",
                        type: 'info'
                    },
                    4000
                );
        },

        success (response) {
            if (this.asignacion != 'si') {
                this.$notify(
                    {
                        group: "bottom",
                        title: "Datos guardados",
                        text: response.data ? response.data.message : "Usuario creado correctamente.",
                        type: 'info'
                    },
                    4000
                );
                
                this.close()
            }else{
                this.$notify(
                    {
                        group: "bottom",
                        title: "Usuarios asignados",
                        text: response.data ? response.data.message : "Usuarios asignados correctamente.",
                        type: 'info'
                    },
                    4000
                );
                this.closeAsignar()
            }
            this.readDataFromAPI()
        },

        successAsignado (response) {
            this.$notify(
                {
                    group: "bottom",
                    title: "Usuarios asignados",
                    text: response.data ? response.data.message : "Usuarios asignados correctamente.",
                    type: 'info'
                },
                4000
            );
            this.closeAsignar()
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
            
        },

        async saveRespuesta (item) {
          let actualizado = await this.saveAPIRespuesta(item)
          if (actualizado){
            this.snack = true
            this.snackColor = 'success'
            this.snackText = 'Respuesta actualizada'
          } else {
            this.error()
          }
        },

        async saveAPIRespuesta(item) {
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            if (userLogged) {
                let method = 'put'
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                let url = `/respuestas/valor/${item._id}`
                const body = {
                  value: item.test.tipo == 'desempeno' ? Number(item.value) : item.value
                }
                const api = new Api(this.baseurl,method,headers,body,{})
                let response = await api.call_respuesta_directa(url) 
                if (response.status == 200 || response.status == 201){
                    return true
                }
            }
            return false
        },
        cancelRespuesta () {
          this.snack = true
          this.snackColor = 'error'
          this.snackText = 'Cancelado'
        },
        openRespuesta () {
          this.snack = true
          this.snackColor = 'info'
          this.snackText = 'Diálogo abierto'
        },
        closeRespuesta () {
          console.log('Diálogo cerrado')
        },

        

        
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