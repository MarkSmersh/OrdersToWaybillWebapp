<template>
    <Form title="Costumer Data">
        <Input placeholder="Phone number"
               button-text="Edit"
               type="tel" 
               v-bind:enter-data="enterData.phoneNumber"
               @update="updateComponent"></Input>
        <Input placeholder="Last name"
               button-text="Edit"
               type="text"
               v-bind:enter-data="enterData.lastName"
               @update="updateComponent"></Input>
        <Input placeholder="First name"
               button-text="Edit"
               type="text"
               v-bind:enter-data="enterData.firstName"
               @update="updateComponent"></Input>
        <Input placeholder="Middle name"
               button-text="Edit"
               type="text"
               v-bind:enter-data="enterData.middleName"
               @update="updateComponent"></Input>
    </Form>
</template>
<script>
import Form from '../Form.vue';
import Input from '../parts/Input.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        enterData: Object // { phoneNumber: string, lastName: string, firstName: string, middleName: string }
    },
    components: {
        Form, Input
    },
    emits: ["update"],
    methods: {
        updateComponent(newData, title) {
            let whichData;
            switch (title) {
                case "Phone number": whichData = "phoneNumber"; break
                case "Last name": whichData = "lastName"; break;
                case "First name": whichData = "firstName"; break;
                case "Middle name": whichData = "middleName"; break;
            }
            this.$emit("update", ["costumerData", whichData], newData)
        },
    },
    data() {
        return {
            data: this.enterData
        }
    }
})
</script>
<style scoped>
    
</style>