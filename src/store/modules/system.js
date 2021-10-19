import Api from '@/api'

const state = {
    system: {
        nombre: "Empresa",
        logo: "No definido",
        logo_min: "No definido",
        logo_max: "No definido",
        colores: {
            fondo_principal: "rgba(255, 255, 255, 100%)",
            fondo_menu_principal: "rgba(242, 246, 247, 100%)",
            fondo_menu_secundario: "rgba(255, 255, 255, 100%)",
            texto_titulo_1: "rgba(0, 94, 138, 100%)",
            texto_titulo_2: "rgba(0, 94, 138, 100%)",
            texto_titulo_3: "rgba(0, 94, 138, 100%)",
            texto_normal_1: "rgba(93, 93, 93, 100%)",
            texto_normal_2: "rgba(93, 93, 93, 100%)",
            texto_menu_1: "rgba(93, 93, 93, 100%)",
            texto_menu_2: "rgba(93, 93, 93, 100%)",
            boton_1: "rgba(0, 94, 138, 100%)",
            boton_2: "rgba(255, 255, 255, 15%)",
            texto_boton_1: "rgba(255, 255, 255, 100%)",
            texto_boton_2: "rgba(0, 94, 138, 100%)",
            icons_1: "rgba(93, 93, 93, 100%)",
            icons_2: "rgba(0, 94, 138, 100%)"
        }
    },
    //baseurl: "https://api.externaevaluaciones.com/api"
    baseurl: "http://localhost:8000/api"
};

const getters = {
    system: state => state.system,
    baseurl: state => state.baseurl
};

const actions = {
    async getSystem({ commit }) {
        const api = new Api(this.getters.baseurl,'get')
        const response = await api.call('/system') 
        commit('setSystem',response)
    }
};

const mutations = {
    setSystem: (state, system) => state.system = system
};

export default {
    state, getters, actions, mutations
}