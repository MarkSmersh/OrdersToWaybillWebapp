<template>
    <Form title="Billing data">
        <Select title="Type"
                :options="enterData.type.data"
                :enter-selected="enterData.type.selected"
                @update="updateComponent"></Select>
        <Select title="Who pays"
                :options="enterData.whoPays.data"
                :enter-selected="enterData.whoPays.selected"
                @update="updateComponent"></Select>
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
    },
    emits: ["update"],
    methods: {
        updateComponent(newData, title) {
            let whichData;
            switch (title) {
                case "Price": whichData = "price"; break
                case "Type": whichData = "type"; break;
                case "Who pays": whichData = "whoPays"; break;
            }
            this.$emit("update", ["billingData", whichData], newData)
        },
    }
    
})
</script>
<style scoped>
    
</style>