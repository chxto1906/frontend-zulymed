<template>
    <por-calificar-detalle v-if="data.origen == 'cuantitativas' && !dialogUsuario" @forceUpdate="forceUpdate" :data="data"></por-calificar-detalle>
    <div v-else> 
        <v-skeleton-loader v-if="mostrarSkeleton" type="table"></v-skeleton-loader>
        <div v-show="!mostrarSkeleton">
        <v-dialog v-model="dialogUsuario" persistent max-width="600px" overlay-opacity="1" :overlay-color="system.colores.texto_titulo_1">
            <form-cx action="#" method="put" :data="dataUserUpdate" :url="urlUser" @success="successUser" @error="errorUser">
                <v-card>
                    <v-card-title>
                        <div class="flex">
                            <div class="px-2"><v-img :src="system.logo" max-height="180" max-width="116"></v-img></div>
                            <div :style="{color: system.colores.texto_titulo_1}" style="word-break: break-word !important;" 
                            class="px-4 p-1 text-center text-lg md:text-xl lg:text-2xl">
                                Completa tus datos para iniciar con la evaluación
                            </div>
                        </div>
                    </v-card-title>
                    <v-divider light></v-divider>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" class="py-0">
                                    <v-text-field
                                        v-model="data.empresa.nombre"
                                        label="Empresa"
                                        readonly
                                        disabled
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-text-field
                                        v-model="data.usuario.cedula"
                                        :rules="rules.cedula.rule"
                                        :counter="rules.cedula.counter"
                                        label="Cédula"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-text-field
                                        v-model="data.usuario.nombre"
                                        label="Nombre"
                                        required
                                        readonly
                                        disabled
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-text-field
                                        v-model="data.usuario.apellido"
                                        label="Apellido"
                                        readonly
                                        disabled
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-text-field
                                        v-model="data.usuario.email"
                                        label="Email"
                                        readonly
                                        disabled
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-text-field
                                        v-model="data.usuario.telefono"
                                        :rules="rules.telefono.rule"
                                        :counter="rules.telefono.counter"
                                        label="Teléfono"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-select
                                    :items="sexos"
                                    v-model="data.usuario.sexo"
                                    label="Sexo"
                                    :rules="rules.sexo.rule"
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
                                                v-model="data.usuario.fecha_nacimiento"
                                                label="Fecha de Nacimiento"
                                                
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            ref="picker"
                                            v-model="data.usuario.fecha_nacimiento"
                                            :max="new Date().toISOString().substr(0, 10)"
                                            min="1950-01-01"
                                            @change="save"
                                            ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-select
                                    :items="departamentos"
                                    v-model="data.usuarioTest._id_departamento"
                                    label="Departamento"
                                    :rules="rules._id_departamento.rule"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-select
                                    :items="cargos"
                                    v-model="data.usuarioTest._id_cargo"
                                    label="Cargo"
                                    :rules="rules._id_cargo.rule"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-text-field
                                    v-model="data.usuarioTest.antiguedad"
                                    type="number"
                                    label="Antigüedad (meses)"
                                    :rules="rules.numeros.rule"
                                    required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <submit-cx>Continuar</submit-cx>
                    </v-card-actions>
                </v-card>
            </form-cx>
        </v-dialog>
        
        <v-row v-show="!dialogComplete" v-if="!dialogUsuario">
            <v-col cols="12" class="py-0">
                <titulo-principal-cx style="word-break: break-word !important;" :titulo="titulo" />
            </v-col>
            <v-col cols="12" class="py-0">
                <form-cx action="#" :method="method" :data="dataSubmit" :url="url" @success="success" @error="error">
                    <v-container>
                        <v-dialog v-model="dialogComplete" max-width="500px" transition="dialog-top-transition">
                            <v-card>
                                <v-toolbar :style="{background: system.colores.fondo_menu_principal}">Evaluación</v-toolbar>
                                <v-card-text>
                                    <div class="text-h2 pa-12"><strong>GRACIAS</strong> por completar la evaluación.</div>
                                </v-card-text>
                                
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1"  @click="closeComplete">Aceptar</v-btn>
                                <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-row>
                            <v-col cols="12">
                                <v-expand-transition>
                                <v-card class="mx-auto" v-show="expand">
                                    <v-card-title>
                                        <h2 class="display-1" style="word-break: break-word !important;" :style="{color: system.colores.texto_titulo_1}">{{ data.test.nombre }}</h2>
                                        <v-spacer></v-spacer>
                                        <span class="title" :style="{color: system.colores.texto_titulo_1}">
                                            {{ data.respondidas + '/' + data.total }}
                                        </span>
                                        
                                    </v-card-title>
                                    <v-card-text style="word-break: break-word !important;">
                                        {{ data.test.descripcion }}
                                    </v-card-text>
                                    <v-divider class="mx-4"></v-divider>
                                    <v-card-text>
                                        <v-row v-if="data.test.tipo=='desempeno'">
                                            <v-col cols="12" v-if="data.origen=='especificas' || data.origen=='conocimientos'">
                                                <small>A continuación, usted encontrará otras afirmaciones a las cuales debe otorgarles una puntuación del 1 al 4; la clave para la calificación se encuentra a continuación:<br/>
                                                </small>
                                                <v-row>
                                                <v-col cols="4"></v-col>
                                                <v-col cols="4">
                                                <v-simple-table dense>
                                                    <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <th colspan="2" class="text-center">
                                                                Clave de respuestas
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><strong>4</strong></td>
                                                            <td><small>Muy Satisfactorio</small></td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>3</strong></td>
                                                            <td><small>Satisfactorio</small></td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>2</strong></td>
                                                            <td><small>Medianamente Satisfactorio</small></td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>1</strong></td>
                                                            <td><small>Poco Satisfactorio</small></td>
                                                        </tr>
                                                    </tbody>
                                                    </template>
                                                </v-simple-table>
                                                </v-col>
                                                <v-col cols="4"></v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12" v-else>
                                                <small>A continuación, usted encontrará otras afirmaciones a las cuales debe otorgarles una puntuación del 1 al 3; la clave para la calificación se encuentra a continuación:<br/>
                                                </small>
                                                <v-row>
                                                <v-col cols="4"></v-col>
                                                <v-col cols="4">
                                                <v-simple-table dense>
                                                    <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <th colspan="2" class="text-center">
                                                                Clave de respuestas
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><strong>3</strong></td>
                                                            <td><small>Muy Satisfactorio</small></td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>2</strong></td>
                                                            <td><small>Satisfactorio</small></td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>1</strong></td>
                                                            <td><small>Poco Satisfactorio</small></td>
                                                        </tr>
                                                    </tbody>
                                                    </template>
                                                </v-simple-table>
                                                </v-col>
                                                <v-col cols="4"></v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12" md="6"
                                                v-for="(pregunta,index) in data.preguntas" :key="pregunta._id">
                                                <v-card class="h-30 lg:h-30">
                                                    <v-card-title class="h-22 lg:h-10">
                                                        <div class="flex">
                                                            <p>
                                                                <v-chip x-small class="ma-2" dark :color="system.colores.texto_titulo_1" >
                                                                    {{pregunta.numero}}
                                                                </v-chip>
                                                            </p>
                                                            <p style="word-break: break-word !important;" :style="{background: system.colores.fondo_menu_principal}" 
                                                            class="text-xs lg:text-sm py-2 px-2 w-full leading-none break-words">
                                                                {{pregunta.descripcion}}
                                                            </p>
                                                        </div>
                                                    </v-card-title>
                                                    <v-card-actions v-if="data.origen=='especificas' || data.origen=='conocimientos'" class="justify-center">
                                                        
                                                        <label >4</label>
                                                        <v-checkbox  on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_4" ></v-checkbox>
                                                        <label>3</label>
                                                        <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_3"  ></v-checkbox>
                                                        <label>2</label>
                                                        <v-checkbox  on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_2"  ></v-checkbox>
                                                        <label>1</label>
                                                        <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_1" ></v-checkbox>
                                                        
                                                    </v-card-actions>
                                                    <v-card-actions v-else class="justify-center">
                                                        
                                                        <label>3</label>
                                                        <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_3"  ></v-checkbox>
                                                        <label>2</label>
                                                        <v-checkbox  on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_2"  ></v-checkbox>
                                                        <label>1</label>
                                                        <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_1" ></v-checkbox>
                                                        
                                                    </v-card-actions>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                        <submit-cx color="orange" @submit="submit" v-show="showButtonDisabled" :disabled="!buttonDisabled">Siguiente</submit-cx>
                                    </v-card-actions>
                                </v-card>
                                </v-expand-transition>
                            </v-col>
                        </v-row>
                    </v-container>
                </form-cx>
            </v-col>
        </v-row>
        </div>
    </div>
</template>>

<script>

import Api from '@/api';
import Cookies from 'js-cookie'
import TituloPrincipalCx from '@/components/titulos/TituloPrincipalCx'
import FormCx from '@/components/forms/FormCx'
import SubmitCx from '@/components/forms/SubmitCx'
import PorCalificarDetalle from '@/pages/users/evaluaciones/PorCalificarDetalle'

import { mapGetters } from 'vuex'

function getDefaultData() {
    return {
        respuestas_seccion_1: [],
        opcion1: null,
        opcion2: null,
        opcion3: null,
        opcion4: null,
        opcionUltima: null,
        usuarioAEvaluar: '',
        empresa: '',
        indexs: {
            '0': [],
            '1': [],
            '2': [],
            '3': []
        },
        valorFalse: 0,
        data: {
            origen: null,
            preguntas: [],
            respondidas: 0,
            total: 0,
            test: {
                descripcion: '',
                nombre: '',
                tipo: ''
            },
            empresa: {
                _id: '',
                nombre: ''
            },
            usuario: {
                cedula: '',
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                fecha_nacimiento: null,
                sexo: '',
            },
            usuarioTest: {
                _id_test: '',
                _id_usuario: '',
                _id_empresa: '',
                _id_departamento: '',
                _id_cargo: '',
                antiguedad: '',
            },
            _id_usuario_test: ''
        },
        rules: {
            opcion() {
                return false
            },
            cedula: {
                rule: [
                    v => !!v || 'Cédula es requerida',
                    v => v.length == this.rules.cedula.counter || `La cédula debe ser igual a ${this.rules.cedula.counter} caracteres`,
                ],
                counter: 10
            },
            telefono: {
                rule: [
                    v => !!v || 'Teléfono es requerido',
                    v => v.length <= this.rules.telefono.counter || `El teléfono debe ser menor o igual a ${this.rules.telefono.counter} caracteres`,
                ],
                counter: 30
            },
            _id_departamento: {
                rule: [
                    v => !!v || 'Departamento es requerido'
                ]
            },
            sexo: {
                rule: [
                    v => !!v || 'Sexo es requerido'
                ]
            },
            _id_cargo: {
                rule: [
                    v => !!v || 'Cargo es requerido'
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
            }
        },
        seccion: 1,
        seccionMaxima: 5,
        opciones: ['si','no','otro'],
        index0: [],
        index1: [],
        index2: [],
        index3: [],
        dataSubmit: {
            respuestas:[]
        },
        expand: true,
        dialogComplete: false,
        dialogUsuario: false,
        id_test: null,
        id_usuario: null,
        departamentos: [],
        cargos: [],
        menu: false,
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
        showButtonDisabled: false,
        mostrarSkeleton: true,
    }
}

export default {
    name: 'EvaluacionDetalleDesempeno',
    data: getDefaultData,
    computed: {
        ...mapGetters(['system','baseurl']),

        urlUser () {
            return `/usuarios/completar/usuariotest/${this.data._id_usuario_test}`
        },
        dataUserUpdate () {
            delete this.data.usuario._id
            let data = {
                usuario: this.data.usuario,
                usuarioTest: this.data.usuarioTest
            }

            return data
        },
        method () {
            return 'post'
        },
        url () {
            return '/respuestas/desempeno/multiple'
        },
        titulo () {
            let titulo = `Evalúa a ${this.usuarioAEvaluar.toUpperCase()} de la empresa ${this.empresa}`
            return titulo
        },
        buttonDisabled () {
            for (var i = 0, l = this.dataSubmit.respuestas.length; i < l; i++) {
                const item = this.dataSubmit.respuestas[i]
                if (!item._id_pregunta
                    || !item._id_test
                    || !item._id_user
                    || !item.value) {
                        return false        
                    }
            }
            return true
        },
        
    },
    components: {
        TituloPrincipalCx,
        FormCx,
        SubmitCx,
        PorCalificarDetalle
    },
    async created() {
        await this.readPregunta()   
    },
    methods: {
        
        forceUpdate: async function(){
            
            //this.$router.go()
            await this.readPregunta() 
        },

        quitarIndex: function(index){
            if (this.opcion1 == index)
                this.opcion1 = null
            if (this.opcion2 == index)
                this.opcion2 = null
            if (this.opcion3 == index)
                this.opcion3 = null
            if (this.opcion4 == index)
                this.opcion4 = null
        },

        clickOptionGeneral: function(index,valor) {
            if (this["opcion"+valor] == null){
                this.quitarIndex(index)
                this["opcion"+valor] = index
            }else{
                if (this["opcion"+valor] != index){
                    this.quitarIndex(index)
                    this["opcion"+valor] = index
                }else{
                    this["opcion"+valor] = null
                }
            }
                
        },

        clickOptionUltima:function(index, num_opcion, valor, opcion) {
            const i = this.indexs[index].indexOf(num_opcion)
            if (i != -1){
                //const j = this.dataSubmit.respuestas[index].opciones.indexOf(opcion)
                this.indexs[index].splice(i,1)
                delete this.dataSubmit.respuestas[index].opciones[opcion]
            }else{
                this.indexs[index].push(num_opcion)
                this.dataSubmit.respuestas[index].opciones[opcion] = parseInt(valor)
            }
            
            const sumValor = this.indexs[index].length * valor
            this.dataSubmit.respuestas[index].value = sumValor == 0 ? null : String(sumValor)
            
        },

        resetData: function () {
            this.$data = getDefaultData();
        },

        closeComplete () {
            this.dialogComplete = false
            this.$router.push("/evaluaciones-lista");
        },
        submit () {
            this.expand = false;
        },

        async readDepartamentos () {
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
            const params = {_id_empresa: this.data.empresa._id}
            const api = new Api(this.baseurl,'get',headers,{},params)
            let response = await api.call_respuesta_directa(`/departamentos/select/all`) 
            response = response.data ? response.data.data : this.departamentos
            this.departamentos = response
        },

        async readCargos () {
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
            const params = {_id_empresa: this.data.empresa._id}
            const api = new Api(this.baseurl,'get',headers,{},params)
            let response = await api.call_respuesta_directa(`/cargos/select/all`) 
            response = response.data ? response.data.data : this.cargos
            this.cargos = response
        },

        async readPregunta () {
          console.log('leyendo nueva pregunta')
            const ID_TEST = this.$route.params.id;
            const ID_USUARIO = this.$route.params._id_usuario;
            this.mostrarSkeleton = true
            this.data.preguntas = []
            this.dataSubmit.respuestas = []
            this.opcion1=null
            this.opcion2=null
            this.opcion3=null
            this.opcion4=null
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            if (userLogged && ID_TEST) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const query = {seccion:this.seccion}
                const api = new Api(this.baseurl,'get',headers,{},query)
                let response = await api.call_respuesta_directa(`/usuarios/preguntas-pendientes/test/${ID_TEST}/usuario/${ID_USUARIO}`) 
                response = response.data ? response.data.data : this.data;
                this.data = response

                console.dir(this.data.usuario)

                this.usuarioAEvaluar = response["usuarioAEvaluar"]["nombre"] + " " + response["usuarioAEvaluar"]["apellido"]
                this.empresa = response["empresa"]["nombre"]
                this.checkCompleteUser()
                if (this.dialogUsuario){
                    this.readDepartamentos()
                    this.readCargos()
                }

                if (this.data.respondidas == this.data.total && this.data.total != 0){
                    this.dialogComplete = true
                }

                if (this.data.preguntas.length > 0){
                    this.expand = true;
                    this.id_usuario = ID_USUARIO
                    this.id_test = ID_TEST
                    this.processRespuestas()
                    this.showButtonDisabled = true
                    this.mostrarSkeleton = false
                }

            }
        },

        checkCompleteUser() {
            const usuario = this.data.usuario;
            const usuarioTest = this.data.usuarioTest;
            if ((usuario.apellido 
                && usuario.cedula
                && usuario.email
                && usuario.fecha_nacimiento
                && usuario.nombre
                && usuario.sexo
                && usuario.telefono
                ) && ( usuarioTest._id_cargo
                    && usuarioTest._id_departamento
                    && usuarioTest._id_empresa
                    && usuarioTest._id_test
                    && usuarioTest._id_usuario
                    && usuarioTest.antiguedad
                    )){
                        this.dialogUsuario = false
            }else{
                this.dialogUsuario = true
            }

        },

        processRespuestas() {
            const that = this
            that.dataSubmit.respuestas = []
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            this.data.preguntas.forEach(function(item){
                const dataAdd = {
                    _id_pregunta: item._id,
                    _id_user: that.id_usuario,
                    _id_users_calificaron: [userLogged.user.id],
                    _id_test: that.id_test,
                    value: null
                }
                that.dataSubmit.respuestas.push(dataAdd)
            })
        },
        
        success () {
            this.readPregunta()
        },
        successUser () {
            this.dialogUsuario = false
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
            this.readPregunta()
        },
        errorUser () {
            this.$notify(
                {
                    group: "bottom",
                    title: "Error",
                    text: "Ocurrió un inconveniente, inténtalo más tarde.",
                    type: "error"
                },
                4000
            );
        },
        save (date) {
            this.$refs.menu.save(date)
        },
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      dataSubmit: function(val){
          console.dir(val)
      }
    },
}
</script>

<style scoped>
   
</style>