import { createStore } from "vuex"

export default createStore({
    state: {
        token: undefined
    },
    mutations: {
        updateToken(state, newToken) {
            state.token = newToken;
        }
    }
})