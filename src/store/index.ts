import { createStore } from "vuex"
import { type DataToSend, PropToName } from "@/types";

export default createStore({
    state: {
        token: null as null | string,
        newData: {} as Record<keyof DataToSend, DataToSend[keyof DataToSend]>,
        dataChanges: {} as Record<keyof DataToSend, { name: string, data: DataToSend[keyof DataToSend] }>
    },
    mutations: {
        updateToken(state, newToken: string) {
            console.log("nt");
            state.token = newToken;
        },
        updateData(state, incData: { key: keyof DataToSend, data: DataToSend[keyof DataToSend] }) {
            state.newData[incData.key] = incData.data
            
            state.dataChanges[incData.key] = {
                name: PropToName[incData.key as keyof typeof PropToName],
                data: incData.data
            };

            if (
                Object.keys(state.newData[incData.key] as Object).length === 0
                || (state.newData[incData.key] as DataToSend["basket"])?.length === 0
                || (state.newData[incData.key] as DataToSend["price"])?.toString() === "0"
                || (state.newData[incData.key] as DataToSend["firstName"] | DataToSend["lastName"] | DataToSend["middleName"] | DataToSend["scanSheet"] === "")
            ) {
                delete state.newData[incData.key];
            }
        },
        setData (state, data: Record<keyof DataToSend, DataToSend[keyof DataToSend]>) {
            state.newData = data;
        }
    }
})