
const state = {
    apiKeyTokens: {
        superadmin: '3f74ccfe73c36d3f307a035b64e99843073a390e5ffdcff4bf3291a5d8476422',
        admin: '96550f6ab15cbd58289d2571e3a28f37ba6eb2daed8ddfd825251d526be3680c',
        user: 'b7911ed0032d0da78aa3e2107c692dbdcf0ac2077910a00edc89d5d4aa43c965'
    }
};

const getters = {
    apiKeySuperAdmin: state => state.apiKeyTokens.superadmin,
    apiKeyAdmin: state => state.apiKeyTokens.admin,
    apiKeyUser: state => state.apiKeyTokens.user
};

const actions = {
};

const mutations = {
};

export default {
    state, getters, actions, mutations
}