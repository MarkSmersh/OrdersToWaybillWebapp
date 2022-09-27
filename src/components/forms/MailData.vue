<template>
    <Form title="Mail data">
        <Select title="Destination" 
                v-bind:enter-selected="enterData.destination.selected"
                v-bind:options="enterData.destination.data"></Select>
        <TextBox title="Scan sheet" v-bind:enter-data="enterData.scanSheet"></TextBox>
    </Form>

</template>
<script>
import { defineComponent } from 'vue';
import Form from '../Form.vue';
import Select from '../parts/Select.vue';
import TextBox from '../parts/TextBox.vue';

export default defineComponent({
    props: {
        enterData: Object // { destination: { data: [{ id: number, name: string, description?: string }], selected: { id: number, name: string, description?: string }}, scanSheet: string }
    },
    components: {
        Form, Select, TextBox
    }
})
</script>
<style scoped>
    
</style>