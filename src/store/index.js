import { createStore } from "vuex"

export default createStore({
    state: {
        token: ""
    },
    mutations: {
        updateToken(state, newToken) {
            state.token = newToken;
        }
    }
})