<template>
    <form 
    @submit.prevent="submit()">
        <slot></slot>
    </form>
</template>

<script>
import axios from 'axios';
import Cookies from "js-cookie";
import { mapGetters } from 'vuex'

export default {
    name: "FormCx",
    props: {
        method: {
            type: String,
            default: 'post',
            validator: function(value) {
                // The value must match one of the axios methods
                return ['get', 'post', 'put', 'patch', 'delete'].indexOf(value) !== -1
            }
        },
        url: {
            type: String,
            required: true
        },
        multipart: {
            type: Boolean,
            default: false
        },
        headers: {
            type: Object,
            default: () => {
                let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
                let headers = { 'Content-Type': 'application/json' }
                if (userLogged)
                    headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                return headers
            }
        },
        data: {
            type: Object,
            default: () => {
                return {}
            }
        },
        auth: {
            type: Object,
            default: null
        }
    },
    data() {
      return {
        errors: {},
        uploadPercentage: 0,
        isLoading: false
      }
    },
    computed: {
        ...mapGetters(['baseurl']),
    },
    created() {
      this.axios = axios.create()
    },
    methods: {
        prepareData() {
            let rawData = this.data
            let formData = new FormData()

            /* Map incoming data into formData */
            Object.keys(rawData).forEach(e => {
            if (rawData[e] instanceof Array) {
                Object.keys(rawData[e]).forEach(f => {
                if (rawData[e][f] instanceof File) {
                    formData.append(e + '[]', rawData[e][f])
                } else {
                    formData.append(e, this.replaceNullOnMultipart(rawData[e]))
                }
                })
            } else {
                if (rawData[e] instanceof Object && !(rawData[e] instanceof File)) {
                formData.append(e, JSON.stringify(this.replaceNullOnMultipart(rawData[e])))
                } else if (this.multipart && typeof rawData[e] === 'boolean') {
                formData.append(e, rawData[e] ? 1 : 0)
                } else {
                formData.append(e, this.replaceNullOnMultipart(rawData[e]))
                }
            }
            })

            /* Append original method into form data */
            /*if (this.method == 'patch' || this.method == 'put') {
            formData.append('_method', this.method)
            }*/

            return formData
        },
        replaceNullOnMultipart(val) {
            return this.multipart && val === null ? '' : val
        },
        submit() {
            let $this = this
            this.isLoading = true
            this.$emit('requeststarted')
            /* Set method to post if multipart form was send via patch/put */
            let method = /*this.multipart && (this.method == 'patch' || this.method == 'put') ? 'post' :*/ this.method
            this.axios({
                method: method,
                url: `${this.baseurl}${this.url}`,
                data: this.multipart ? this.prepareData() : this.data,
                // only set params if request is get or delete
                params: this.method == 'get' || this.method == 'delete' ? this.data : {},
                headers: this.headers,
                auth: this.auth,

                // Calculate current upload percentage
                onUploadProgress: function(progressEvent) {
                    let percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    $this.uploadPercentage = percentage
                    $this.$emit('uploadProgress', percentage)
                }
            })
            .then(function(response) {
                $this.$emit('success', response)
            })
            .catch(function(error) {
                /* Catch validation errors if status is 422 */
                if (error.response && error.response.status == 401) {
                    $this.$notify(
                        {
                            group: "bottom",
                            title: "No Autorizado",
                            text: "Sesión caducada.",
                            type: "error"
                        },
                        4000
                    );
                    if (Cookies.get("userLogged")) {
                        let userLogged = JSON.parse(Cookies.get("userLogged"))
                        let rol = userLogged.user.rol
                        Cookies.remove("userLogged")
                        if (rol == "admin")
                            $this.$router.push(`/backoffice/auth`);
                        else
                            $this.$router.push(`/auth`);
                    }
                }
                if (error.response && error.response.status >= 400 && error.response.status != 401) {
                    $this.$emit('error', error.response);
                    return
                    //$this.errors = error.response.data.errors
                    /*$this.$nextTick(() => {
                        document.getElementsByClassName("fvl-has-error")[0].scrollIntoView('smooth')
                    });*/
                
                }

                /* Catch CSRF Token Missmatch - 419 */
                /*if (error.response && error.response.status === 419) {
                    
                }

                if (error.response && error.response.status === 401) {
                    $this.$emit('error', { response: { status: 401 } })
                    return
                }

                $this.$emit('error', error.response)*/
                $this.isLoading = false
                $this.uploadPercentage = 0
                $this.$emit('uploadProgress', 0)
                $this.$emit('requestfinished')
            })
            .then(function() {
                $this.isLoading = false
                $this.uploadPercentage = 0
                $this.$emit('uploadProgress', 0)
                $this.$emit('requestfinished')
            })
        },

        dirty(name) {
            this.errors[name] = false
        },

        getErrors(name) {
            return this.errors[name] ? this.errors[name] : []
        },

        hasErrors(name) {
            return this.errors[name] && this.errors[name] !== [] ? true : false
        }
        
    }
    
}
</script>