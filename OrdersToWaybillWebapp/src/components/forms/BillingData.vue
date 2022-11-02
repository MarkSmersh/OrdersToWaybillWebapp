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
<script lang="ts">
import Form from '../Form.vue';
import { defineComponent } from 'vue';
import Input from '../parts/Input.vue';
import Select from '../parts/Select.vue';
import type { PropToName, BillingData } from '@/types';
import { nameToProp } from '@/utils/nameToProp';

export default defineComponent({
    components: {
        Form, Input, Select
    },
    // props: {
    //     enterData: Object
    // },
    props: {
        enterData: {
            type: Object as () => BillingData,
            required: true
        }
    },
    emits: ["update"],
    methods: {
        updateComponent(newData: BillingData[keyof BillingData], title: typeof PropToName[keyof typeof PropToName]) {
            // this.$emit("update", ["billingData"], nameToProp(title), newData)
            this.$store.commit("updateData", { key: nameToProp(title), data: newData })
        },
    }
    
})
</script>
<style scoped>
    
</style>