<template>
    <div class="border-solid border-gray-500 border-b-2 pb-2 ">
        <h3 class="text-2xl" :style="{color: system.colores.texto_titulo_1}"> {{ titulo }} </h3>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "TituloPrincipalCx",
    props: {
        titulo: String
    },
    computed: {
        ...mapGetters(['system']),
    }
}
</script>

<style scoped>
    

</style>




