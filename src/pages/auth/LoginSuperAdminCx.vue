<template>
    <v-row class="py-4 bg-gray-400">
        <!--<v-col cols="12" class="py-0">
            <titulo-principal-cx titulo="Login" />
        </v-col>-->
        <v-col cols="12" class="py-16">
            <form-cx action="#" :data="data" :auth='auth' url="/auth/sign-in" @success="success" @error="error">
                <v-container>
                    <v-row>
                        <v-col cols="12"  class="md:border-b md:p-6">
                            <v-img
                            lazy-src="https://picsum.photos/id/11/10/6"
                            max-height="77"
                            max-width="435"
                            :src="system.logo_max"
                            class="m-auto w-full"
                            ></v-img>
                        </v-col>
                        <v-col cols="12" offset-md="4"  md="4" class="md:p-6">

                            <h2 class="text-lg">Bienvenido <v-chip>{{ nombrerol }}</v-chip></h2>
                            <h3 class="text-sm">Ingresa tus credenciales</h3>
                            <br>
                            <v-text-field
                                v-model="data.email"
                                :rules="rules.email.rule"
                                label="Email"
                                type="email"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="data.password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="rules.password.rule"
                                :type="show1 ? 'text' : 'password'"
                                label="Password"
                                @click:append="show1 = !show1"
                            ></v-text-field>
                            <br>
                            <submit-cx>Iniciar sesión</submit-cx>
                        </v-col>
                    </v-row>
                </v-container>
                
            </form-cx>
        </v-col>
    </v-row>
</template>

<script>

//import TituloPrincipalCx from '@/components/titulos/TituloPrincipalCx'
import FormCx from '@/components/forms/FormCx'
import SubmitCx from '@/components/forms/SubmitCx'
import { mapGetters } from 'vuex'
import Cookies from "js-cookie";

export default {
    name: 'LoginSuperAdminCx',
    props: {
        rol: {
            type: String
        },
    },
    data () {
        return {
            data: {
                email: '',
                password: '',
                apiKeyToken: this.rol == 'superadmin' ? this.$store.getters.apiKeySuperAdmin : this.$store.getters.apiKeyAdmin
            },
            rules: {
                email: {
                    rule: [
                        v => !!v || 'Email es requerido',
                        v => {
                            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            return pattern.test(v) || 'Email inválido.'
                        }
                    ]
                },
                password: {
                    rule: [
                        v => !!v || 'Password es requerido',
                    ],
                    counter: 13
                }
            },
            show1: false,
        }
    },
    computed: {
        ...mapGetters(['system','apiKeySuperAdmin','apiKeyAdmin']),
        auth() {
            return {
                username: this.data.email,
                password: this.data.password
            }
        },
        nombrerol () {
          const rol = this.rol == 'superadmin' ? 'SuperAdmin' : 'Admin'
          return rol
        },
    },
    components: {
        //TituloPrincipalCx,
        FormCx,
        SubmitCx
    },
    watch: {
       
        'data.email'(val) {
            this.data.username = val.trim()
        },
        'data.password'(val) {
            this.data.password = val.trim()
        }
    },

    methods: {
        success (response) {
            Cookies.set("userLogged", response.data)
            this.$router.push(this.$route.query.urlredirect ? this.$route.query.urlredirect : "/backoffice");
        },
        error () {
            this.$notify(
                {
                    group: "bottom",
                    title: "Error",
                    text: "Datos incorrectos.",
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