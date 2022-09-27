<template>
    <Form title="Billing data">
        <Input placeholder="Price" v-bind:enter-data="enterData.string" button-text="₴" type="number"></Input>
        <Select title="Type" v-bind:options="enterData.type.data" v-bind:enter-selected="enterData.type.selected"></Select>
        <Select title="Who pays" v-bind:options="enterData.whoPays.data" v-bind:enter-selected="enterData.whoPays.selected"></Select>
    </Form>
</template>
<script>
import Form from '../Form.vue';
import { defineComponent } from 'vue';
import Input from '../parts/Input.vue';
import Select from '../parts/Select.vue';

export default defineComponent({
    components: {
        Form, Input, Select
    },
    props: {
        enterData: Object // { price: string, type: { data: [{ id: number, name: string, description?: string }], selected: { id: number, name: string, description?: string }, whoPays: { data: [{ id: number, name: string, description?: string }], selected: { id: number, name: string, description?: string }} }
    }
})
</script>
<style scoped>
    
</style>