<template>
    <!--<div class="pt-2 relative lg:w-4/12 w-full">-->
    <div :class="{'fvl-has-error' : $parent.hasErrors(name)}" class="pt-2 relative lg:w-4/12 w-full" >
        <label v-if="label" :for="name" :class="labelClass" class="block text-md font-medium " v-html="label" :style="{color: system.colores.texto_titulo_2}" />
        <div >
            <input 
                :id="id"
                :value="value"
                :name="name"
                :type="type"
                :placeholder="placeholder"
                :autocomplete="autocomplete"
                :class="fieldClass"
                :min="min"
                :max="max"
                :size="size"
                :step="step"
                :maxlength="maxlength"
                :required="required"
                :readonly="readonly"
                :disabled="disabled"
                :pattern="pattern"
                class="text-sm w-full border-solid focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-gray-400 border-b-2"
                @change="$parent.dirty(name); $emit('changed');"
                @input="$emit('update:value', $event.target.value)"
            />
            <span v-if="type!='hidden'" class="absolute bottom-0 right-0 flex items-center pr-1 text-xs opacity-25" :style="{color: system.colores.texto_normal_2}">{{ `${use}/${maxlength}` }}</span>
        </div>
        <slot :errors="$parent.getErrors(name)" name="errors">
            <validation-errors :errors="$parent.getErrors(name)" />
        </slot>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex'
import ValidationErrors from '@/components/forms/ErrorsCx'
export default {
    name: 'InputBasicCx',
    components: { ValidationErrors },
    props: {
        label: {
            type: String,
            required: false,
            default: null
        },
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            default: null
        },
        value: {
            type: String
        },
        type: {
            type: String,
            default: 'text'
        },
        min: {
            type: String,
            required: false,
            default: null
        },
        max: {
            type: String,
            required: false,
            default: "10"
        },
        maxlength: {
            type: String,
            required: false,
            default: "10"
        },
        size: {
            type: Number,
            required: false,
            default: null
        },
        step: {
            type: Number,
            required: false,
            default: null
        },
        pattern: {
            type: String,
            required: false,
            default: null
        },
        placeholder: {
            type: String,
            required: false,
            default: null
        },
        autocomplete: {
            type: String,
            required: false,
            default: null
        },
        fieldClass: {
            type: String,
            required: false,
            default: null
        },
        labelClass: {
            type: String,
            required: false,
            default: null
        },
        readonly: {
            type: Boolean,
            required: false,
            default: false
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        ...mapGetters(['system']),
        use() {
            if (!this.value){
                return 0
            }
            return this.value.length;
        }
    }
}
</script>

<style scoped>

</style>