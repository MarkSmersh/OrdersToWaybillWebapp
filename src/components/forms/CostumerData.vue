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
<script>
import Form from '../Form.vue';
import Input from '../parts/Input.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        enterData: Object, // { phoneNumber: string, lastName: string, firstName: string, middleName: string }
        request: Function
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
        updateComponent(newData, title) {
            let whichData;
            switch (title) {
                case "Phone number": whichData = "phoneNumber";
                                     if (this.$store.state.token) this.updateFullNameByNP(newData.trim());
                                     break;
                case "Last name": whichData = "lastName"; break;
                case "First name": whichData = "firstName"; break;
                case "Middle name": whichData = "middleName"; break;
            }
            this.$emit("update", ["costumerData", whichData], newData)
        },
        async updateFullNameByNP(number) {
            console.log(this.$store.state.token);
            try {
                let selfCounterparty = (await this.request(this.$store.state.token, "Counterparty", "getCounterparties", {
                    CounterpartyProperty: "Recipient"
                })).find((c) => c.Description === "Приватна особа");

                console.log(selfCounterparty);

                let contact = (await this.request(this.$store.state.token, "Counterparty", "getCounterpartyContactPersons", {
                    Ref: selfCounterparty.Ref
                })).find((c) => c.Phones == number)

                console.log(contact);

                this.data.lastName = contact.LastName;
                this.data.firstName = contact.FirstName;
                this.data.middleName = contact.MiddleName;
            } catch {}
        },
    },
})
</script>
<style scoped>
    
</style>