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
          <label class="text-xs">({{ rol }}) - {{ nombreSesion }}</label>
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
    :color="system.colores.fondo_menu_principal"
    width="230"
  >
    <v-list-item  class="pt-4 pb-4 pr-0 w-full ">
      <router-link exact to="/backoffice">
        <v-img
          :src="system.logo"
          max-height="202"
          max-width="138"
          class="ml-8"
        >
        </v-img>
      </router-link>
      
      <v-list-item-title class="hidden">{{system.nombre}}</v-list-item-title>

      <!--<v-btn
        icon
        @click="toggleMini = !toggleMini"
        class="pr-0"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>-->
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>


      <v-list-group
           no-action
           :value="$route.meta.listName == 'evaluaciones'"
            >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Evaluaciones</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-clipboard-check-outline</v-icon>
          </v-list-item-icon>
        </template>
        <v-list-item link to="/backoffice/tests-listar" >
          <v-list-item-content>
            <v-list-item-title>Listado</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/backoffice/tests" >
          <v-list-item-content>
            <v-list-item-title>Crear</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>


      <v-list-group
          v-if="rol == 'superadmin'"
           no-action 
           :value="$route.meta.listName == 'empresas'">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Empresas</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-bank-outline</v-icon>
          </v-list-item-icon>
        </template>
        <v-list-item link to="/backoffice/empresas-listar" >
          <v-list-item-content>
            <v-list-item-title>Listado</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/backoffice/empresas" >
          <v-list-item-content>
            <v-list-item-title>Crear</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-group
          v-if="rol == 'superadmin'"
           no-action
           :value="$route.meta.listName == 'admins'"
            >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Administradores</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-account-star</v-icon>
          </v-list-item-icon>
        </template>
        <v-list-item link to="/backoffice/admins-listar" >
          <v-list-item-content>
            <v-list-item-title>Listado</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/backoffice/admins" >
          <v-list-item-content>
            <v-list-item-title>Crear</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>


      <v-list-group
          v-if="rol == 'superadmin'"
           no-action
           :value="$route.meta.listName == 'subdimensiones'"
            >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Subdimensiones</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-database-outline</v-icon>
          </v-list-item-icon>
        </template>
        <v-list-item link to="/backoffice/subdimensiones-listar" >
          <v-list-item-content>
            <v-list-item-title>Listado</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/backoffice/subdimensiones" >
          <v-list-item-content>
            <v-list-item-title>Crear</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>


      <v-list-group
           no-action
           :value="$route.meta.listName == 'departamentos'"
            >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Departamentos</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-home-city-outline</v-icon>
          </v-list-item-icon>
        </template>
        <v-list-item link to="/backoffice/departamentos-listar" >
          <v-list-item-content>
            <v-list-item-title>Listado</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/backoffice/departamentos" >
          <v-list-item-content>
            <v-list-item-title>Crear</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      

      <v-list-group
           no-action
           :value="$route.meta.listName == 'cargos'"
            >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Cargos</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-briefcase-outline</v-icon>
          </v-list-item-icon>
        </template>
        <v-list-item link to="/backoffice/cargos-listar" >
          <v-list-item-content>
            <v-list-item-title>Listado</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/backoffice/cargos" >
          <v-list-item-content>
            <v-list-item-title>Crear</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>


      <v-list-group
           no-action
           :value="$route.meta.listName == 'reportes'"
            >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Reportes</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-chart-areaspline</v-icon>
          </v-list-item-icon>
        </template>
        <v-list-item link to="/backoffice/reportes/clima" >
          <v-list-item-content>
            <v-list-item-title>Clima Laboral</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/backoffice/reportes/diagnostico" >
          <v-list-item-content>
            <v-list-item-title>Diagnóstico Motivacional</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/backoffice/reportes/postcovid" >
          <v-list-item-content>
            <v-list-item-title>Post Covid</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          :value="true"
          no-action
          sub-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Desempeño</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link to="/backoffice/reportes/desempeno/especifico" >
            <v-list-item-content>
              <v-list-item-title>Específico</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/backoffice/reportes/desempeno/general" >
            <v-list-item-content>
              <v-list-item-title>General</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>


        <!--<v-list-item link to="/backoffice/reportes/desempeno" >
          <v-list-item-content>
            <v-list-item-title>Desempeño</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
      </v-list-group>
      
      
      
      


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
  name: 'Home',
  data () {
    return {
      sidebarMenu: true,
      toggleMini: false,
      clipped: false
    }
  },
  computed: {
    ...mapGetters(['system']),
    
    nombreSesion() {
      const userLogged = JSON.parse(Cookies.get("userLogged"))
      return `${userLogged.user.nombre} ${userLogged.user.apellido}`
    },
    rol() {
      const userLogged = JSON.parse(Cookies.get("userLogged"))
      return `${userLogged.user.rol}`
    }
  },

methods: {
  logout () {
    Cookies.remove("userLogged")
    if (this.rol == 'superadmin')
      this.$router.push("/backoffice/auth");
    if (this.rol == 'admin')
      this.$router.push("/admin/auth")
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

