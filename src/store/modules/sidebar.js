
const state = {
    title: ''
};

const getters = {
    title: state => state.title
};

const actions = {
    setTitle({ commit },title) {
        commit('setTitle',title)
    }
};

const mutations = {
    setTitle: (state,title) => state.title = title
};

export default {
    state, getters, actions, mutations
}