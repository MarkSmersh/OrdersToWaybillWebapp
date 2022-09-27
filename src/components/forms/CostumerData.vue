<template>
    <Form title="Costumer Data">
        <Input placeholder="Phone number"
               button-text="Edit"
               type="tel" 
               v-bind:enter-data="enterData.phoneNumber"></Input>
        <Input placeholder="Last name"
               button-text="Edit"
               type="text"
               v-bind:enter-data="enterData.lastName"></Input>
        <Input placeholder="First name"
               button-text="Edit"
               type="text"
               v-bind:enter-data="enterData.firstName"></Input>
        <Input placeholder="Middle name"
               button-text="Edit"
               type="text"
               v-bind:enter-data="enterData.middleName"></Input>
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
    data() {
        return {
            data: this.enterData
        }
    }
})
</script>
<style scoped>
    
</style>