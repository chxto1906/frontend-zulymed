<template>
<v-app>
  <v-app-bar
      app
      elevation="0"
      height="56"
      :color="system.colores.fondo_principal"
    >
    <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>

    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on }">
        <v-btn
          
          v-on="on"
        >
          <label class="text-xs">{{ nombreSesion }}</label>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title class="cursor-pointer" @click="logout">Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  <v-navigation-drawer
    v-model="sidebarMenu" 
    app
    floating
    :permanent="sidebarMenu"
    :mini-variant="mini"
    :color="system.colores.fondo_menu_principal"
    width="230"
  >
    <v-list-item  class="pt-4 pb-4 pr-0 w-full ">
      <v-img
        :src="system.logo"
        max-height="202"
        max-width="138"
        v-if="!mini"
        class="ml-8"
      >
      </v-img>
      <v-list-item-avatar v-if="mini" @click="toggleMini = !toggleMini">
        <v-img :src="system.logo_min"></v-img>
      </v-list-item-avatar>
      
      <v-list-item-title class="hidden">{{system.nombre}}</v-list-item-title>

      <v-btn
        icon
        @click="toggleMini = !toggleMini"
        class="pr-0"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      
      <div v-if="!mini" class="px-3 py-2 pb-2 text-sm">Evaluaciones</div>

      <v-list-item link to="/evaluaciones-lista" >
        <v-list-item-icon>
          <v-icon :color="system.colores.icons_2">mdi-account-star</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Asignadas a ti</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!--<v-list-item link to="/evaluaciones-por-calificar" >
        <v-list-item-icon>
          <v-icon :color="system.colores.icons_2">mdi-account-switch</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Evalúa a los demás</v-list-item-title>
        </v-list-item-content>
      </v-list-item>-->
    </v-list>
  </v-navigation-drawer>
  
  <v-main>
    <!-- Provides the application the proper gutter -->
    <v-container 
     class="px-4 py-0 fill-height" fluid
    :style="{background: system.colores.fondo_principal}"
    
    >
      <v-row class="fill-height">
          <v-col>
              <transition name="fade">
                  <!-- If using vue-router -->
                <router-view :key="$route.path"></router-view>
              </transition>
          </v-col>
      </v-row>
    </v-container>
  </v-main>
</v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'

export default {
  name: 'HomeUser',
  data () {
    return {
      sidebarMenu: true,
      toggleMini: false,
      clipped: false
    }
  },
  computed: {
    ...mapGetters(['system']),
    mini() {
        return (this.$vuetify.breakpoint.smAndDown) || this.toggleMini
    },
    nombreSesion() {
      const userLogged = JSON.parse(Cookies.get("userLogged"))
      return `${userLogged.user.nombre} ${userLogged.user.apellido}`
    }
  },

methods: {
  logout () {
    Cookies.remove("userLogged")
    this.$router.push("/auth");
  }
}
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .theme--light.v-application ::-webkit-scrollbar {
    width: 13px;
  }

  .theme--light.v-application ::-webkit-scrollbar-track {
    background: #e6e6e6;
    border-left: 1px solid #dadada;
  }

  .theme--light.v-application ::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border: solid 3px #e6e6e6;
    border-radius: 7px;
  }

  .theme--light.v-application ::-webkit-scrollbar-thumb:hover {
    background: black;
  }

  .theme--dark.v-application ::-webkit-scrollbar {
    width: 13px;
  }

  .theme--dark.v-application ::-webkit-scrollbar-track {
    background: #202020;
    border-left: 1px solid #2c2c2c;
  }

  .theme--dark.v-application ::-webkit-scrollbar-thumb {
    background: #3e3e3e;
    border: solid 3px #202020;
    border-radius: 7px;
  }

  .theme--dark.v-application ::-webkit-scrollbar-thumb:hover {
    background: white;
  }
</style>

