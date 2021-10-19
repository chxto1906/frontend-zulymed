<template>
    <v-row>
        <v-col cols="12" class="py-0">
            <titulo-principal-cx :titulo="titulo" />
        </v-col>
        <v-col cols="12" class="py-0">
            <form-cx action="#" :multipart="multipart" :method="method" :data="data" :url="url" @success="success" @error="error">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="data.nombre"
                                :rules="rules.nombre.rule"
                                :counter="rules.nombre.counter"
                                label="Nombre de empresa"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="data.ruc"
                                :rules="rules.ruc.rule"
                                :counter="rules.ruc.counter"
                                label="Ruc"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="data.correo"
                                :rules="rules.correo.rule"
                                label="Correo electrónico"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="data.direccion"
                                :rules="rules.direccion.rule"
                                :counter="rules.direccion.counter"
                                label="Dirección"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="data.telefono"
                                :rules="rules.telefono.rule"
                                :counter="rules.telefono.counter"
                                label="Teléfono"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="data.provincia"
                                :counter="rules.provincia.counter"
                                :rules="rules.provincia.rule"
                                label="Provincia"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="data.ciudad"
                                :counter="rules.ciudad.counter"
                                :rules="rules.ciudad.rule"
                                label="Ciudad"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="data.parroquia"
                                :counter="rules.parroquia.counter"
                                :rules="rules.parroquia.rule"
                                label="Parroquia"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-file-input
                                v-if="!exist_logo"
                                :rules="rules.file.rule"
                                accept="image/png, image/jpeg, image/bmp"
                                placeholder="(Recomendado 160 x 100)"
                                prepend-icon="mdi-camera"
                                v-model="data.image"
                                label="Logo"
                                required
                            ></v-file-input>
                            <v-btn v-if="exist_logo" @click="exist_logo = false" depressed color="primary">Cambiar Logo</v-btn>
                            <v-btn v-if="!exist_logo && filepathfull" @click="exist_logo = true" text>Cancelar</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <p>LOGO:</p>
                            <img width="160" height="100" :src="filepathfull" />
                        </v-col>
                        <!--<v-col cols="12" md="8">
                            <label for="map-container" class="block text-md font-medium " :style="{color: system.colores.texto_titulo_2}">Mapa</label>
                            <mapbox-map class="w-full md:h-full h-56"
                                :access-token="scene.accessToken"
                                :map-style="scene.mapStyle"
                                :zoom="scene.zoom"
                                :center="center"
                                @mb-created="(mapboxInstance) => createdMap(mapboxInstance)"
                                @mb-click="clickMap" >
                                    
                            </mapbox-map>
                        </v-col>-->
                        <v-col cols="12" md="4">
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
/*import MapboxMap from '@studiometa/vue-mapbox-gl/dist/components/MapboxMap';
import { Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';*/

import { mapGetters } from 'vuex'

export default {
    name: 'Empresas',
    data () {
        return {
            local: false,
            multipart: true,
            exist_logo: false,
            buttonCambiar: false,
            buttonCancelar: false,
            data: {
                nombre: '',
                ruc: '',
                correo: '',
                direccion: '',
                telefono: '',
                provincia: '',
                ciudad: '',
                parroquia: '',
                latitud: '',
                longitud: '',
                filepath: '',
                image: null
            },
            rules: {
                file : {
                    rule: [
                        value => !value || value.size < 2000000 || 'El tamaño del logo debería ser menos a 2 MB!',
                    ]
                },
                nombre: {
                    rule: [
                        v => !!v || 'Nombre es requerido',
                        v => v.length <= this.rules.nombre.counter || `El nombre debe ser menor o igual a ${this.rules.nombre.counter} caracteres`,
                    ],
                    counter: 30
                },
                ruc: {
                    rule: [
                        v => !!v || 'RUC es requerido',
                        v => v.length == this.rules.ruc.counter || `El RUC debe ser igual a ${this.rules.ruc.counter} caracteres`,
                    ],
                    counter: 13
                },
                correo: {
                    rule: [
                        v => !!v || 'Correo es requerido',
                        v => {
                            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            return pattern.test(v) || 'Email inválido.'
                        }
                    ],
                    counter: 13
                },
                direccion: {
                    rule: [
                        v => !!v || 'Dirección es requerida',
                        v => v.length <= this.rules.direccion.counter || `La dirección debe ser menor o igual a ${this.rules.direccion.counter} caracteres`,
                    ],
                    counter: 50
                },
                telefono: {
                    rule: [
                        v => !!v || 'Teléfono es requerido',
                        v => v.length <= this.rules.telefono.counter || `El teléfono debe ser menor o igual a ${this.rules.telefono.counter} caracteres`,
                    ],
                    counter: 30
                },
                provincia: {
                    rule: [
                        v => !!v || 'Provincia es requerida',
                        v => v.length <= this.rules.provincia.counter || `La provincia debe ser menor o igual a ${this.rules.provincia.counter} caracteres`,
                    ],
                    counter: 30
                },
                ciudad: {
                    rule: [
                        v => !!v || 'Ciudad es requerida',
                        v => v.length <= this.rules.ciudad.counter || `La ciudad debe ser menor o igual a ${this.rules.ciudad.counter} caracteres`,
                    ],
                    counter: 30
                },
                parroquia: {
                    rule: [
                        v => v.length <= this.rules.parroquia.counter || `La parroquia debe ser menor o igual a ${this.rules.parroquia.counter} caracteres`,
                    ],
                    counter: 30
                },
            },
            scene: {
                accessToken: 'pk.eyJ1IjoibGF0YWJlcm5hIiwiYSI6ImNqemJmYTJlNDAwM2czZG8zaWg5ODEydnUifQ.QG97tATPIyf3zOA9Cn8S9w',
                zoom: 13,
                pitch: 20,
                bearing: 0,
                transitionMode:'fly',
                mapStyle: 'mapbox://styles/mapbox/streets-v11'
            },
            map: null,
            marker: null
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
            return this.$route.params.id ? `/empresas/${this.$route.params.id}` : '/empresas'
        },
        titulo () {
            let titulo = "Crear una empresa"
            if (this.$route.params.id){
                if (this.$route.params.action == 'ver')
                    titulo = "Ver empresa"
                if (this.$route.params.action == 'editar')
                    titulo = "Editar empresa"
            }
            return titulo
        },
        filepathfull () {
            let path = this.data.filepath
            if (!this.local && path){
                const url = this.baseurl.substr(0,this.baseurl.length-3)
                path = url+this.data.filepath
            }
            return path
        }
    },
    watch: {
        'data.image':function(val) {
            if (typeof val == 'object'){
                this.local = true
                this.data.filepath = URL.createObjectURL(val)
            }
        }
    },
    components: {
        TituloPrincipalCx,
        FormCx,
        SubmitCx,
        //MapboxMap
    },
    async created() {
        const ID_EMPRESA = this.$route.params.id;
        let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
        if (userLogged && ID_EMPRESA) {
            let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
            const api = new Api(this.baseurl,'get',headers)
            let response = await api.call_respuesta_directa(`/empresas/${ID_EMPRESA}`) 
            response = response.data ? response.data.data : this.data;
            delete response._id
            delete response.created_at
            delete response.updated_at
            
            this.data = response
            this.processImage()
            
            
            
        }

        //this.$store.dispatch('setItemSelected','empresas_crear')
    },
    methods: {
        processImage () {
            if (this.filepathfull){
                this.exist_logo = this.filepathfull ? true : false
            }
        },
        /*createdMap (map) {
            this.map = map
            this.marker = new Marker()
            .setLngLat(this.center)
            .addTo(this.map)
        },
        clickMap (e) {
            if (this.$route.params.action != 'ver') {
                let lngLat = e.lngLat
                this.marker.setLngLat(lngLat)
                this.data.latitud = lngLat.lat
                this.data.longitud = lngLat.lng
            }
        },*/
        success (response) {
            this.$notify(
                {
                    group: "bottom",
                    title: "Datos guardados",
                    text: response.data ? response.data.message : "Empresa creada correctamente.",
                    type: 'success'
                },
                4000
            );
            this.$router.push("/backoffice/empresas-listar");
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