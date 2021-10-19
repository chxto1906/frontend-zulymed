<template>
    <div class="inline-flex flex-1 flex-row flex-initial justify-center rounded-lg shadow-md h-10">
        <div v-for="v in values"
        :key="v.id"
        class="radio h-14" :style="styleRadio">
            <input v-if="v.value == value" :value="v.value" :name="v.name" :id="v.id" type="radio" checked="checked" class="absolute invisible" >
            <input v-else :value="v.value" @change="change"  :name="v.name" :id="v.id" type="radio">
            <label :for="v.id" class="block text-center px-4 py-2 bg-white w-32 h-14">
            <div><strong>{{ v.label }}</strong></div>
            </label>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'RadioButtonGroupCx',
    props: {
        value: {
            type: String
        },
        values: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        ...mapGetters(['system','baseurl']),
        styleRadio() {
            return {
                '--backgroundColorCheck': this.system.colores.boton_1,
                '--borderColorCheck': this.system.colores.boton_1,
                '--colorCheck': this.system.colores.texto_boton_1
            }
        }
    },
    methods: {
        change(e) {
            this.$emit('changedRadio',e.target.value)
        }
    },
    created() {
        //console.dir(this.values)
    }
}
</script>

<style scoped>
    

    

    .radio input{
        visibility: hidden;
        position: absolute;

    }

    .radio label {
        color: var(--backgroundColorCheck);
        border-color: rgba(112, 112, 112, 100%);
        border-width: 1px;
    }

    .radio label:hover{
        cursor: pointer;
    }

    .radio input:checked + label{
        border-color: var(--borderColorCheck);
        background-color: var(--backgroundColorCheck);
        color: var(--colorCheck);
    }
</style>