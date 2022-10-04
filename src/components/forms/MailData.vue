<template>
    <Form title="Mail data">
        <Select title="Settlement" 
                :enter-selected="enterData.settlement.selected"
                :options="enterData.settlement.data"
                :onInput="searchSettlement"></Select>
        <Select title="Destination" 
                :enter-selected="enterData.destination.selected"
                :options="enterData.destination.data"></Select>
        <TextBox title="Scan sheet"
                 :enter-data="enterData.scanSheet"></TextBox>
    </Form>

</template>
<script>
import { defineComponent } from 'vue';
import Form from '../Form.vue';
import Select from '../parts/Select.vue';
import TextBox from '../parts/TextBox.vue';

export default defineComponent({
    props: {
        enterData: Object, // { destination: { data: [{ id: number, name: string, description?: string }], selected: { id: number, name: string, description?: string }}, scanSheet: string },
        request: Function
    },
    data () {
        return {
            settlement: this.enterData.settlement.selected || ""
        }
    },
    components: {
        Form, Select, TextBox
    },
    methods: {
        updateComponent(newData, title) {
            let whichData;
            switch (title) {
                case "Settlement": whichData = "settlement";
                    this.settlement = newData.name;
                    break;
                case "Destination": whichData = "destination"; break;
                case "Scan sheet": whichData = "scanSheet"; break;
            }
            this.$emit("update", "mailData", whichData, newData)
        },
        searchSettlement(name) {
            console.log(this.settlement);
            let settlements = this.request(this.$store.state.token, "Address", "searchSettlements", {
                CityName: name,
                Limit: "200"
            }).Addresses

            let data = []

            settlements.forEach((s) => {
                data.push({
                    id: s.Ref,
                    name: `${s.SettlementTypeCode} ${s.MainDescription}`,
                    description: `${s.ParentRegionCode} ${s.Area}, ${s.RegionTypesCode} ${s.Region}`
                })
            })

            return data;
        },
        updateWarehouses() {
            console.log(this.settlement);
            let settlements = this.request(this.$store.state.token, "Address", "getWarehouses", {
                CityName: name,
                Limit: "200"
            }).Addresses
        }
    }
})
</script>
<style scoped>
    
</style>