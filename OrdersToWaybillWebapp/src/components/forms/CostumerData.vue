<template>
    <Form title="Costumer Data">
        <Input placeholder="Phone number"
               button-text="Edit"
               type="tel" 
               :enter-data="data.phoneNumber"
               @update="updateComponent"></Input>
        <Input placeholder="Last name"
               button-text="Edit"
               type="text"
               :enter-data="data.lastName"
               @update="updateComponent"></Input>
        <Input placeholder="First name"
               button-text="Edit"
               type="text"
               :enter-data="data.firstName"
               @update="updateComponent"></Input>
        <Input placeholder="Middle name"
               button-text="Edit"
               type="text"
               :enter-data="data.middleName"
               @update="updateComponent"></Input>
    </Form>
</template>
<script lang="ts">
import Form from '../Form.vue';
import Input from '../parts/Input.vue';
import { defineComponent } from 'vue';
import type { CostumerData,
              CounterpartyGetCounterpartyContactPersonsResponse,
              CounterpartyGetCounterpartiesResponse,
              PropToName } from '@/types';
import { nameToProp } from '@/utils/nameToProp';

export default defineComponent({
    props: {
        enterData: {
            type: Object as () => CostumerData,
            required: true
        }, // { phoneNumber: string, lastName: string, firstName: string, middleName: string }
        request: {
            type: Function,
            required: true
        }
    },
    components: {
        Form, Input
    },
    data() {
        return {
            data: this.enterData
        }
    },
    watch: {
        enterData(newData) {
            this.data = newData;
        }
    },
    emits: ["update"],
    methods: {
        updateComponent(newData: CostumerData[keyof CostumerData], title: typeof PropToName[keyof typeof PropToName]) {
            console.log(title);
            switch (title) {
                case "Phone number":
                    if (this.$store.state.token) this.updateFullNameByNP(newData.trim());
                    break;
            }
            this.$store.commit("updateData", { key: nameToProp(title), data: newData })
        },
        async updateFullNameByNP(number: CostumerData["phoneNumber"]) {
            console.log(this.$store.state.token);
            try {
                let selfCounterparty = ((await this.request(this.$store.state.token, "Counterparty", "getCounterparties", {
                    CounterpartyProperty: "Recipient"
                })) as CounterpartyGetCounterpartiesResponse[]).find((c) => c.Description === "Приватна особа");

                console.log(selfCounterparty);

                if (selfCounterparty) {
                    let contact = ((await this.request(this.$store.state.token, "Counterparty", "getCounterpartyContactPersons", {
                    Ref: selfCounterparty.Ref
                    })) as CounterpartyGetCounterpartyContactPersonsResponse[]).find((c) => c.Phones == number)

                    console.log(contact);

                    if (contact) {
                        this.data.lastName = contact.LastName;
                        this.data.firstName = contact.FirstName;
                        this.data.middleName = contact.MiddleName;
                    }
                }
            } catch {}
        },
    },
})
</script>
<style scoped>
    
</style>