<template>
    <v-row>
        <v-col cols="12" class="py-0">
            <titulo-principal-cx :titulo="titulo" />
        </v-col>
        <v-col cols="12" class="py-0">
            <v-stepper v-model="step" vertical>
                <v-stepper-step :complete="step > 1" step="1">
                    Información principal
                    <small>Ingrese los datos principales de la encuesta</small>
                </v-stepper-step>
                <v-stepper-content step="1">
                    <form-cx action="#" :method="method" :data="data" :url="url" 
                            @success="success" 
                            @error="error">
                        <v-row>
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
                                <v-select
                                :items="tipos"
                                v-model="data.tipo"
                                label="Tipo"
                                :rules="rules.tipo.rule"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-select
                                :items="empresas"
                                v-model="data._id_empresa"
                                label="Empresa"
                                :rules="rules._id_empresa.rule"
                                @change="cargarCargos"
                                ></v-select>
                            </v-col>
                            <v-col v-if="data.tipo == 'desempeno'" cols="12" md="4">
                                <v-text-field
                                    v-model="data.periodo"
                                    :rules="rules.periodo.rule"
                                    :counter="rules.periodo.counter"
                                    label="Periodo de evaluación"
                                    required
                                ></v-text-field>
                            </v-col>
                            <br/>
                        </v-row>
                        <v-divider v-if="data.tipo == 'desempeno'"></v-divider>
                        <v-row>
                          <v-col v-if="data.tipo == 'desempeno'" cols="12">
                            <v-combobox
                              v-if="data.tipo && data._id_empresa"
                              v-model="data.cargos"
                              :items="items_cargos"
                              label="Cargos a utilizar:"
                              multiple
                              chips
                            >
                            </v-combobox>
                          </v-col>
                        </v-row>
                        <v-row>
                            <v-col v-if="data.tipo == 'desempeno'" cols="12" md="4">
                                <v-checkbox
                                    v-model="enabled_kpis"
                                    hide-details
                                    label="KPIS"
                                    @change="changeKpis"
                                    class="shrink mr-2 mt-0"
                                ></v-checkbox>
                                <v-text-field
                                    v-model="data.kpis_peso"
                                    :disabled="!enabled_kpis"
                                    label="Peso %"
                                    required
                                ></v-text-field>
                                <v-checkbox
                                    v-model="enabled_desempeno"
                                    label="Desempeño Social"
                                    @change="changeDesempeno"
                                    hide-details
                                    class="shrink mr-2 mt-0"
                                ></v-checkbox>
                                <v-text-field
                                    v-model="data.desempeno_peso"
                                    :disabled="!enabled_desempeno"
                                    label="Peso"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col v-if="data.tipo == 'desempeno'" cols="12" md="4">
                                <v-checkbox
                                    v-model="enabled_competencias_generales"
                                    label="Competencias Generales"
                                    @change="changeCompetenciasGenerales"
                                    hide-details
                                    class="shrink mr-2 mt-0"
                                ></v-checkbox>
                                <v-text-field
                                    v-model="data.competencias_generales_peso"
                                    :disabled="!enabled_competencias_generales"
                                    label="Peso"
                                    required
                                ></v-text-field>
                                <v-checkbox
                                    v-model="enabled_competencias_especificas"
                                    label="Competencias Específicas"
                                    @change="changeCompetenciasEspecificas"
                                    hide-details
                                    class="shrink mr-2 mt-0"
                                ></v-checkbox>
                                <v-text-field
                                    v-model="data.competencias_especificas_peso"
                                    :disabled="!enabled_competencias_especificas"
                                    label="Peso"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col v-if="data.tipo == 'desempeno'" cols="12" md="4">
                                <v-checkbox
                                    v-model="enabled_competencias_conocimientos"
                                    label="Competencias Conocimientos"
                                    @change="changeCompetenciasConocimientos"
                                    hide-details
                                    class="shrink mr-2 mt-0"
                                ></v-checkbox>
                                <v-text-field
                                    v-model="data.competencias_conocimientos_peso"
                                    :disabled="!enabled_competencias_conocimientos"
                                    label="Peso"
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                    label="Indicaciones generales"
                                    auto-grow
                                    outlined
                                    rows="2"
                                    v-model="data.descripcion"
                                    :rules="rules.descripcion.rule"
                                    :counter="rules.descripcion.counter"
                                    row-height="100"
                                    required
                                    ></v-textarea>
                            </v-col>
                            <v-col cols="12" md="1">
                                <submit-cx :disabled="!stepBoton1">Siguiente</submit-cx>
                            </v-col>
                        </v-row>
                    </form-cx> 
                </v-stepper-content>
                <v-stepper-step v-show="data.tipo != 'desempeno'" :complete="step > 2" step="2">
                    Preguntas
                    <small>Agregue las preguntas correspondientes</small>
                </v-stepper-step>
                <v-stepper-content v-show="data.tipo != 'desempeno'" step="2">
                    <preguntas v-if="step==2 && data.tipo == 'clima_laboral'" @onPreguntas="onPreguntas" v-model="preguntas" :_id_test="this.$route.params.id"></preguntas>
                    <preguntas-post-covid v-if="step==2 && data.tipo == 'postcovid'" @onPreguntas="onPreguntas" v-model="preguntas" :_id_test="this.$route.params.id"></preguntas-post-covid>
                    <preguntas-diagnostico v-if="step==2 && data.tipo == 'diagnostico_motivacional'" @onPreguntas="onPreguntas" v-model="preguntas" :_id_test="this.$route.params.id"></preguntas-diagnostico>
                    <v-btn
                        depressed
                        color="primary"
                        type="button"
                        :disabled="!stepBoton2"
                        @click="continuar"
                        class="mt-4"
                        >
                        Siguiente
                    </v-btn>
                    <v-btn class="mt-4" @click="regresar" text>
                        Anterior
                    </v-btn>
                </v-stepper-content>
                <v-stepper-step v-show="data.tipo != 'desempeno'" :complete="step > 3" step="3">
                    Asignación usuarios
                    <small>Importe los usuarios</small>
                </v-stepper-step>
                <v-stepper-content v-show="data.tipo != 'desempeno'" step="3">
                    <usuarios :asignacion="'no'" :tipo="data.tipo" v-if="step==3" @onUsuarios="onUsuarios" v-model="usuarios" :_id_empresa="data._id_empresa" :_id_test="this.$route.params.id"></usuarios>
                    <v-btn
                        color="primary"
                        class="mt-4"
                        link 
                        :disabled="!stepBoton3"
                        to="/backoffice/tests-listar"
                    >
                        Finalizar
                    </v-btn>
                    <v-btn class="mt-4" @click="regresar" text>
                        Anterior
                    </v-btn>
                </v-stepper-content>

                <!------------------------------->
                <!------- STEPS DESEMPEÑO ------->
                <!------------------------------->

                <v-stepper-step v-show="data.tipo == 'desempeno'" :complete="step > 2" step="2">
                    Asignación usuarios
                    <small>Importe los usuarios</small>
                </v-stepper-step>
                <v-stepper-content v-show="data.tipo == 'desempeno'" step="2">
                    <usuarios :asignacion="'no'" :tipo="data.tipo" v-if="step==2" @onUsuarios="onUsuarios" v-model="usuarios" :_id_empresa="data._id_empresa" :_id_test="this.$route.params.id"></usuarios>
                    <v-btn depressed color="primary" type="button" :disabled="!stepBoton3" @click="continuar" class="mt-4">
                        Siguiente
                    </v-btn>
                    <v-btn class="mt-4" @click="regresar" text>
                        Anterior
                    </v-btn>
                </v-stepper-content>

                <v-stepper-step v-show="data.tipo == 'desempeno'" :complete="step > 3" step="3">
                    Asignación Jefes, pares y subordinados | Quién evalúa a quién
                    <small>Asigne a cada usuario</small>
                </v-stepper-step>
                <v-stepper-content v-show="data.tipo == 'desempeno'" step="3">
                    <!--<asignacion-jefes-pares-subordinados :tipo="data.tipo" @onUsuarios="onUsuarios" v-model="usuarios" :_id_empresa="data._id_empresa" :_id_test="this.$route.params.id"></asignacion-jefes-pares-subordinados>-->
                    <usuarios 
                      :asignacion="'si'" 
                      v-model="usuarios" 
                      @onUsuarios="onUsuarios" 
                      :tipo="data.tipo" 
                      :_id_empresa="data._id_empresa" 
                      :_id_test="this.$route.params.id"
                      :kpis_peso="data.kpis_peso"
                      :desempeno_peso="data.desempeno_peso"
                      :competencias_generales_peso="data.competencias_generales_peso"
                      :competencias_especificas_peso="data.competencias_especificas_peso"
                      :competencias_conocimientos_peso="data.competencias_conocimientos_peso"
                      ></usuarios>
                    <v-btn depressed color="primary" type="button" :disabled="!stepBoton4" @click="continuar" class="mt-4">
                        Siguiente
                    </v-btn>
                    <v-btn class="mt-4" @click="regresar" text>
                        Anterior
                    </v-btn>
                </v-stepper-content>
              
                <v-stepper-step v-show="data.tipo == 'desempeno'" :complete="step > 4" step="4">
                    Evaluaciones
                    <small>Realice todo el proceso</small>
                </v-stepper-step>
                <v-stepper-content v-show="data.tipo == 'desempeno'" step="4">
                    <preguntas-desempeno v-if="data.tipo == 'desempeno'"
                    :enabled_kpis="enabled_kpis" 
                    :enabled_desempeno="enabled_desempeno"
                    :enabled_competencias_generales="enabled_competencias_generales"
                    :enabled_competencias_especificas="enabled_competencias_especificas"
                    :enabled_competencias_conocimientos="enabled_competencias_conocimientos"

                    :kpis_peso="data.kpis_peso"
                    :desempeno_peso="data.desempeno_peso"
                    :competencias_generales_peso="data.competencias_generales_peso"
                    :competencias_especificas_peso="data.competencias_especificas_peso"
                    :competencias_conocimientos_peso="data.competencias_conocimientos_peso"

                    :_id_empresa="data._id_empresa"
                    :cargos="data.cargos"
                    
                    @onPreguntas="onPreguntas" v-model="preguntas" 
                    :_id_test="this.$route.params.id"></preguntas-desempeno>
                    <v-btn
                        color="primary"
                        class="mt-4"
                        link 
                        :disabled="!stepBoton6"
                        to="/backoffice/tests-listar"
                    >
                        Finalizar
                    </v-btn>
                    <v-btn class="mt-4" @click="regresar" text>
                        Anterior
                    </v-btn>
                </v-stepper-content>
            </v-stepper>
        </v-col>
    </v-row>
</template>>

<script>

import Api from '@/api';
import Cookies from 'js-cookie'
import FormCx from '@/components/forms/FormCx'
import TituloPrincipalCx from '@/components/titulos/TituloPrincipalCx'
import Preguntas from '@/pages/evaluaciones/Preguntas'
import PreguntasPostCovid from '@/pages/evaluaciones/PreguntasPostCovid'
import PreguntasDiagnostico from '@/pages/evaluaciones/PreguntasDiagnostico'
import PreguntasDesempeno from '@/pages/evaluaciones/PreguntasDesempeno'
import Usuarios from '@/pages/evaluaciones/Usuarios'
import SubmitCx from '@/components/forms/SubmitCx'
import { mapGetters } from 'vuex'
//import AsignacionJefesParesSubordinados from '@/pages/evaluaciones/AsignacionJefesParesSubordinados';

export default {
    name: 'Tests',
    data () {
        return {
            data: {
                nombre: '',
                tipo: '',
                _id_empresa: '',
                periodo: '',
                descripcion: '',
                kpis_peso: 0,
                desempeno_peso: 0,
                cargos: [],
                competencias_generales_peso: 0,
                competencias_especificas_peso: 0,
                competencias_conocimientos_peso: 0
            },
            enabled_kpis: false,
            enabled_desempeno: false,
            enabled_competencias_generales: false,
            enabled_competencias_especificas: false,
            enabled_competencias_conocimientos: false,
            id_test: null,
            preguntas: [],
            usuarios: [],
            items_cargos: [],
            rules: {
                nombre: {
                    rule: [
                        v => !!v || 'Nombre es requerido',
                        v => v.length <= this.rules.nombre.counter || `El nombre debe ser menor o igual a ${this.rules.nombre.counter} caracteres`,
                    ],
                    counter: 30
                },
                tipo: {
                    rule: [
                        v => !!v || 'Tipo es requerido',
                    ]
                },
                
                _id_empresa: {
                    rule: [
                        v => !!v || 'Empresa es requerida',
                    ]
                },
                periodo: {
                    rule: [
                        v => !!v || 'Periodo de evaluación es requerido',
                        v => v.length <= this.rules.periodo.counter || `El periodo de evaluación debe ser menor o igual a ${this.rules.periodo.counter} caracteres`,
                    ],
                    counter: 50
                },
                descripcion: {
                    rule: [
                        v => !!v || 'Las indicaciones generales son requeridas',
                        v => v.length <= this.rules.descripcion.counter || `Las indicaciones generales deben ser menor o igual a ${this.rules.descripcion.counter} caracteres`,
                    ],
                    counter: 1000
                },
            },
            tipos: [
                {
                    text: 'Clima laboral',
                    value: 'clima_laboral'
                },
                {
                    text: 'Diagnóstico motivacional',
                    value: 'diagnostico_motivacional'
                },
                {
                    text: 'Desempeño',
                    value: 'desempeno'
                },
                {
                    text: 'Post Covid',
                    value: 'postcovid'
                }
            ],
            empresas: []
        }
    },
    
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created() {
        const ID_TEST = this.$route.params.id;
        this.cargarTest(ID_TEST)
    },
    
    computed: {
        ...mapGetters(['system','baseurl']),
        method () {
            return this.$route.params.id ? 'put' :'post'
        },
        url () {
            let url = this.$route.params.id ? `/tests/${this.$route.params.id}` : '/tests'
            return url
        },
        titulo () {
            let titulo = "Crear un test"
            if (this.$route.params.id){
                if (this.$route.params.action == 'editar')
                    titulo = "Editar test"
            }
            return titulo
        },
        step () {
            let step = 1;
            if (this.$route.params.id && this.$route.params.step)
                step = this.$route.params.step
            return step
        },

        check100 () {
            return Number(this.data.kpis_peso) + Number(this.data.desempeno_peso) + Number(this.data.competencias_especificas_peso) + Number(this.data.competencias_generales_peso) + Number(this.data.competencias_conocimientos_peso)
        },

        stepBoton1 () {
            
            if (this.data.nombre && this.data.tipo && this.data._id_empresa && this.data.descripcion){
                if (this.data.tipo == 'desempeno'){
                    if (this.data.periodo && this.check100 == 100){
                        return true
                    }
                }else{
                    return true
                }
            }
            return false
        },
        stepBoton2 () {
            return this.preguntas.length > 0 ? true : false
        },
        stepBoton3 () {
            return this.usuarios.length > 0 ? true : false
        },
        stepBoton4 () {
            let result = this.usuarios.length > 0 ? true : false
            /*for (let i = 0; i < this.usuarios.length; i++) {
                const element = this.usuarios[i]
                if (((Array.isArray(element._ids_jefes) && element._ids_jefes.length > 0) ||
                    (Array.isArray(element._ids_pares) && element._ids_pares.length > 0) ||
                    (Array.isArray(element._ids_subordinados) && element._ids_subordinados.length > 0)) &&
                    (Array.isArray(element._ids_quien_le_califica) && element._ids_quien_le_califica.length > 0))
                    {
                        result = true
                    }else{
                        result = false
                        break
                    }
            }*/
            return result
        },
        stepBoton6 () {
            return true
        }
    },
    methods: {
        changeKpis(value) {
            this.data.kpis_peso = !value ? 0 : this.data.kpis_peso
        },
        changeDesempeno(value) {
            this.data.desempeno_peso = !value ? 0 : this.data.desempeno_peso
        },
        changeCompetenciasGenerales(value) {
            this.data.competencias_generales_peso = !value ? 0 : this.data.competencias_generales_peso
        },
        changeCompetenciasEspecificas(value) {
            this.data.competencias_especificas_peso = !value ? 0 : this.data.competencias_especificas_peso
        },
        changeCompetenciasConocimientos(value) {
            this.data.competencias_conocimientos_peso = !value ? 0 : this.data.competencias_conocimientos_peso
        },
        onPreguntas(preguntas) {
            this.preguntas = preguntas
        },
        onUsuarios(usuarios) {
            this.usuarios = usuarios
        },

        async cargarCargos() {
          await this.readCargos()
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
        handleSuccess({ results, header }) {
            this.usuarios = results
            //this.tableHeader = header
            console.dir(header);
        },
        success (response) {
            this.$notify(
                {
                    group: "bottom",
                    title: "Datos guardados",
                    text: response.data ? response.data.message : "Información principal de Test creado correctamente.",
                    type: 'info'
                },
                4000
            );
            let step = this.step
            step++
            this.$router.push(`/backoffice/tests/${response.data.data}/${step}`);
        },
        error (response) {
            this.$notify(
                {
                    group: "bottom",
                    title: "Error",
                    text: response.data.message,
                    type: "error"
                },
                4000
            );
        },
        regresar() {
            let step = this.step
            step--
            this.$router.push(`/backoffice/tests/${this.$route.params.id}/${step}`);
        },
        continuar() {
            let step = this.step
            step++
            this.$router.push(`/backoffice/tests/${this.$route.params.id}/${step}`);
        },
        async cargarTest(ID_TEST) {
          let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            if (userLogged && ID_TEST) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const api = new Api(this.baseurl,'get',headers)
                let response = await api.call_respuesta_directa(`/tests/${ID_TEST}`) 
                response = response.data ? response.data.data : this.data;
                delete response._id
                delete response.created_at
                delete response.updated_at
                this.data = response
                
                  await this.readCargos()
                  if (this.data.kpis_peso > 0)
                      this.enabled_kpis = true
                  if (this.data.desempeno_peso > 0)
                      this.enabled_desempeno = true
                  if (this.data.competencias_especificas_peso > 0)
                      this.enabled_competencias_especificas = true
                  if (this.data.competencias_generales_peso > 0)
                      this.enabled_competencias_generales = true
                  if (this.data.competencias_conocimientos_peso > 0)
                      this.enabled_competencias_conocimientos = true
                

                this.id_test = ID_TEST
            }

            let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
            const api = new Api(this.baseurl,'get',headers)
            let response = await api.call_respuesta_directa(`/empresas/select/all`) 
            response = response.data ? response.data.data : this.empresas
            this.empresas = response
        },

        async readCargos() {
          let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
          let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
          const params = {_id_empresa:this.data._id_empresa}
          const api = new Api(this.baseurl,'get',headers,{},params)
          let response = await api.call_respuesta_directa(`/cargos/select/all`) 
          
          response = response.data ? response.data.data : this.items_cargos
          this.items_cargos = response
        },
    },
    components: {
        FormCx,
        TituloPrincipalCx,
        SubmitCx,
        Preguntas,
        PreguntasPostCovid,
        PreguntasDiagnostico,
        Usuarios,
        PreguntasDesempeno
    }
}
</script>

<style scoped>