<template>
    <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
    <!-- you will need to add a little "X" button next to the logo in order to close it though -->
    <div class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block  border-r z-30" :class="sideBarOpen ? '' : 'hidden'" :style="{background: system.colores.fondo_menu_principal}" id="main-nav">

          <div class="w-full h-24 flex px-6 items-center mb-8" >
            <p class="font-semibold text-3xl text-blue-400 pl-4 ">
              <img :src="system.logo" />
            </p>
          </div>

          <div class="mb-4 px-4">
            <p class="pl-4" :style="{color: system.colores.texto_menu_1}">Evaluaciones</p>
            <router-link to="/backoffice/tests-listar" class="w-full flex items-center h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20.943" height="20.01" viewBox="0 0 20.943 20.01">
                <g id="Grupo_19" data-name="Grupo 19" transform="translate(-27.994 -389.989)">
                  <path id="Icon_awesome-star-half-alt" data-name="Icon awesome-star-half-alt" d="M19.865,6.7l-5.718-.832L11.592.7A1.76,1.76,0,0,0,10.467,0c.033.073.028,17.154,0,17.171l5.115,2.684A1.25,1.25,0,0,0,17.4,18.538l-.978-5.683,4.137-4.023A1.25,1.25,0,0,0,19.865,6.7ZM15.11,11.512,14.4,12.2l.167.972.762,4.432-3.989-2.093-.874-.459V2.662L12.462,6.7l.437.884.977.142,4.462.65-3.229,3.14Z" transform="translate(28 390)" :fill="system.colores.logos_1"/>
                  <path id="Icon_awesome-star-half-alt-2" data-name="Icon awesome-star-half-alt" d="M11.538,6.7l5.718-.832L19.811.7A1.76,1.76,0,0,1,20.937,0c-.033.073-.028,17.154,0,17.171l-5.115,2.684A1.25,1.25,0,0,1,14,18.538l.978-5.683L10.846,8.832A1.25,1.25,0,0,1,11.538,6.7Zm4.755,4.813L17,12.2l-.167.972L16.072,17.6l3.989-2.093.874-.459V2.662L18.941,6.7,18.5,7.58l-.977.142-4.462.65,3.229,3.14Z" transform="translate(17.529 390)" :fill="system.colores.logos_1"/>
                </g>
              </svg>
              <span class="p-5" :style="{color: system.colores.texto_menu_1}">Listar Test</span>
            </router-link>
            <router-link to="/backoffice/tests" class="w-full flex items-center h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20.938" height="20" viewBox="0 0 20.938 20">
                <path id="Icon_awesome-star-half-alt" data-name="Icon awesome-star-half-alt" d="M19.865,6.7l-5.718-.832L11.592.7A1.255,1.255,0,0,0,9.346.7L6.79,5.867,1.072,6.7A1.25,1.25,0,0,0,.379,8.831l4.136,4.023-.979,5.683A1.253,1.253,0,0,0,4.771,20a1.234,1.234,0,0,0,.581-.146l5.115-2.683,5.115,2.684A1.25,1.25,0,0,0,17.4,18.538l-.978-5.683,4.137-4.023A1.25,1.25,0,0,0,19.865,6.7ZM15.11,11.512,14.4,12.2l.167.972.762,4.432-3.989-2.093-.874-.459V2.662L12.462,6.7l.437.884.977.142,4.462.65-3.229,3.14Z" transform="translate(0)" :fill="system.colores.logos_1"/>
              </svg>
              <span class="p-5" :style="{color: system.colores.texto_menu_1}">Crear Test</span>
            </router-link>
          </div>

          <div class="mb-4 px-4">
            <p class="pl-4" :style="{color: system.colores.texto_menu_1}">Empresas</p>
            <router-link to="/backoffice/empresas" class="w-full flex items-center h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="17.087" height="17.528" viewBox="0 0 17.087 17.528">
                <g id="Grupo_19" data-name="Grupo 19" transform="translate(-32 -503.972)">
                  <path id="Icon_awesome-plus" data-name="Icon awesome-plus" d="M15.867,9.136H10.374V3.5A1.237,1.237,0,0,0,9.154,2.25H7.933A1.237,1.237,0,0,0,6.713,3.5V9.136H1.221A1.237,1.237,0,0,0,0,10.388V11.64a1.237,1.237,0,0,0,1.221,1.252H6.713v5.634a1.237,1.237,0,0,0,1.221,1.252H9.154a1.237,1.237,0,0,0,1.221-1.252V12.892h5.492a1.237,1.237,0,0,0,1.221-1.252V10.388A1.237,1.237,0,0,0,15.867,9.136Z" transform="translate(32 501.722)" :fill="system.colores.logos_1"/>
                  <g id="Icon_ionic-ios-business" data-name="Icon ionic-ios-business" transform="translate(37.25 512.247)">
                    <path id="Trazado_10" data-name="Trazado 10" d="M9.263,3.619h3.212a.264.264,0,0,0,.263-.263h0a.264.264,0,0,0-.263-.263H9.263A.264.264,0,0,0,9,3.357H9A.264.264,0,0,0,9.263,3.619Z" transform="translate(-1.783)" :fill="system.colores.logos_1"/>
                    <path id="Trazado_11" data-name="Trazado 11" d="M11.159,7.031H7.013a.264.264,0,0,0-.029.526v4.38a.351.351,0,0,0,.35.35H8.619a.117.117,0,0,0,.117-.117v-.584a.117.117,0,0,1,.117-.117h.467a.117.117,0,0,1,.117.117v.584a.117.117,0,0,0,.117.117h1.285a.351.351,0,0,0,.35-.35V7.557a.264.264,0,0,0-.029-.526ZM8.151,10.885A.117.117,0,0,1,8.035,11H7.8a.117.117,0,0,1-.117-.117v-.234a.117.117,0,0,1,.117-.117h.234a.117.117,0,0,1,.117.117Zm0-.934a.117.117,0,0,1-.117.117H7.8a.117.117,0,0,1-.117-.117V9.717A.117.117,0,0,1,7.8,9.6h.234a.117.117,0,0,1,.117.117Zm0-.934a.117.117,0,0,1-.117.117H7.8a.117.117,0,0,1-.117-.117V8.783A.117.117,0,0,1,7.8,8.666h.234a.117.117,0,0,1,.117.117Zm0-.934a.117.117,0,0,1-.117.117H7.8a.117.117,0,0,1-.117-.117V7.849A.117.117,0,0,1,7.8,7.732h.234a.117.117,0,0,1,.117.117Zm1.168,2.8A.117.117,0,0,1,9.2,11H8.969a.117.117,0,0,1-.117-.117v-.234a.117.117,0,0,1,.117-.117H9.2a.117.117,0,0,1,.117.117Zm0-.934a.117.117,0,0,1-.117.117H8.969a.117.117,0,0,1-.117-.117V9.717A.117.117,0,0,1,8.969,9.6H9.2a.117.117,0,0,1,.117.117Zm0-.934a.117.117,0,0,1-.117.117H8.969a.117.117,0,0,1-.117-.117V8.783a.117.117,0,0,1,.117-.117H9.2a.117.117,0,0,1,.117.117Zm0-.934A.117.117,0,0,1,9.2,8.2H8.969a.117.117,0,0,1-.117-.117V7.849a.117.117,0,0,1,.117-.117H9.2a.117.117,0,0,1,.117.117Zm1.168,2.8A.117.117,0,0,1,10.37,11h-.234a.117.117,0,0,1-.117-.117v-.234a.117.117,0,0,1,.117-.117h.234a.117.117,0,0,1,.117.117Zm0-.934a.117.117,0,0,1-.117.117h-.234a.117.117,0,0,1-.117-.117V9.717a.117.117,0,0,1,.117-.117h.234a.117.117,0,0,1,.117.117Zm0-.934a.117.117,0,0,1-.117.117h-.234a.117.117,0,0,1-.117-.117V8.783a.117.117,0,0,1,.117-.117h.234a.117.117,0,0,1,.117.117Zm0-.934a.117.117,0,0,1-.117.117h-.234a.117.117,0,0,1-.117-.117V7.849a.117.117,0,0,1,.117-.117h.234a.117.117,0,0,1,.117.117Z" transform="translate(0 -3.12)" :fill="system.colores.logos_1"/>
                  </g>
                </g>
              </svg>
              <span class="p-5" :style="{color: system.colores.texto_menu_1}">Crear</span>
            </router-link>
            <router-link to="/backoffice/empresas-listar" class="w-full flex items-center  h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18">
                <path id="Icon_material-business-center" data-name="Icon material-business-center" d="M11,17.5v-1H4.01L4,20.5a1.993,1.993,0,0,0,2,2H20a1.993,1.993,0,0,0,2-2v-4H15v1Zm10-9H16.99v-2l-2-2h-4l-2,2v2H5a2.006,2.006,0,0,0-2,2v3a1.993,1.993,0,0,0,2,2h6v-2h4v2h6a2.006,2.006,0,0,0,2-2v-3A2.006,2.006,0,0,0,21,8.5Zm-6,0H11v-2h4Z" transform="translate(-3 -4.5)" :fill="system.colores.logos_1"/>
              </svg>
              <span class="p-5" :style="{color: system.colores.texto_menu_1}">Listar</span>
            </router-link>
          </div>

          <div class="mb-4 px-4">
            <p class="pl-4" :style="{color: system.colores.texto_menu_1}">Informes</p>
            <router-link to="/backoffice/informes/generar" class="w-full flex items-center  h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
                <path id="Icon_awesome-chart-line" data-name="Icon awesome-chart-line" d="M19.375,17H2.5V5.125A.625.625,0,0,0,1.875,4.5H.625A.625.625,0,0,0,0,5.125V18.25A1.25,1.25,0,0,0,1.25,19.5H19.375A.625.625,0,0,0,20,18.875v-1.25A.625.625,0,0,0,19.375,17ZM18.125,5.75H13.513a.937.937,0,0,0-.663,1.6l1.266,1.266L11.25,11.482,8.384,8.616a1.25,1.25,0,0,0-1.768,0L3.933,11.3a.625.625,0,0,0,0,.884l.884.884a.625.625,0,0,0,.884,0l1.8-1.8,2.866,2.866a1.25,1.25,0,0,0,1.768,0l3.75-3.75,1.266,1.266a.937.937,0,0,0,1.6-.663V6.375A.624.624,0,0,0,18.125,5.75Z" transform="translate(0 -4.5)" :fill="system.colores.logos_1"/>
              </svg>
              <span class="p-5" :style="{color: system.colores.texto_menu_1}">Generar</span>
            </router-link>
            <router-link to="/backoffice/informes/historico" class="w-full flex items-center h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="19.497" height="22.284" viewBox="0 0 19.497 22.284">
                <path id="Icon_simple-clockify" data-name="Icon simple-clockify" d="M14.48,7.658l5.049-5.12L20.975,4l-5.049,5.12L14.479,7.658Zm-2.046,5.232a1.774,1.774,0,0,1-1.266-.536,1.845,1.845,0,0,1-.522-1.286,1.789,1.789,0,1,1,3.578,0,1.845,1.845,0,0,1-.523,1.286,1.776,1.776,0,0,1-1.266.536ZM21,18.179l-1.445,1.466L14.5,14.524,15.95,13.06Zm-8.509.766a7.54,7.54,0,0,0,2.876-.571l2.466,2.5a10.811,10.811,0,0,1-5.342,1.409A11.066,11.066,0,0,1,1.5,11.142,11.067,11.067,0,0,1,12.488,0a10.812,10.812,0,0,1,5.3,1.38L15.359,3.84a7.546,7.546,0,0,0-2.871-.569,7.767,7.767,0,0,0-7.695,7.837A7.767,7.767,0,0,0,12.488,18.945Z" transform="translate(-1.5)" :fill="system.colores.logos_1"/>
              </svg>
              <span class="p-5" :style="{color: system.colores.texto_menu_1}">Histórico</span>
            </router-link>
            
          </div>

        </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Sidebar',
    computed: {
      ...mapGetters(['system','sideBarOpen'])
    }
}
</script>