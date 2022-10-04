<template>
    <Form title="Mail data">
        <Select title="Settlement" 
                :enter-selected="enterData.settlement.selected"
                :options="enterData.settlement.data"
                :onInput="searchSettlement"
                @update="updateComponent"></Select>
        <Select title="Destination" 
                :enter-selected="destination.selected"
                :options="destination.data"
                @update="updateComponent"></Select>
        <TextBox title="Scan sheet"
                 :enter-data="enterData.scanSheet"></TextBox>
    </Form>

</template>
<script>
import { defineComponent } from 'vue';
import Form from '../Form.vue';
import Select from '../parts/Select.vue';
import TextBox from '../parts/TextBox.vue';
import warehouseTypeToString from '../../utils/warehouseTypeToString';

export default defineComponent({
    props: {
        enterData: Object, // { destination: { data: [{ id: number, name: string, description?: string }], selected: { id: number, name: string, description?: string }}, scanSheet: string },
        request: Function
    },
    data () {
        return {
            settlement: this.enterData.settlement.selected || "",
            destination: this.enterData.destination
        }
    },
    watch: {
        enterData(newData) {
            this.destination = newData.destination;
        }
    },
    emits: ["update"],
    components: {
        Form, Select, TextBox
    },

    methods: {
        async updateComponent(newData, title) {
            let whichData;
            switch (title) {
                case "Settlement": whichData = "settlement";
                    this.settlement = newData;
                    await this.updateWarehouses();
                    break;
                case "Destination": whichData = "destination"; break;
            }
            this.$emit("update", ["mailData", whichData], newData)
        },
        async searchSettlement(name) {
            console.log(this.settlement);
            let data = []
            
            try {
                let settlements = (await this.request(this.$store.state.token, "Address", "searchSettlements", {
                CityName: name,
                Limit: "200"
                }))[0].Addresses

                console.log(settlements);


                settlements.forEach((s) => {
                    data.push({
                        id: s.Ref,
                        name: `${s.SettlementTypeCode} ${s.MainDescription}`,
                        description: `${s.ParentRegionCode} ${s.Area}, ${s.RegionTypesCode} ${s.Region}`
                    })
                })
            } catch {}

            return data;
        },
        async updateWarehouses() {
            console.log(this.settlement.id);
            let warehouses = await this.request(this.$store.state.token, "Address", "getWarehouses", {
                SettlementRef: this.settlement.id
            })

            console.log(warehouses);

            let data = []

            warehouses.forEach((w) => {
                data.push({
                    id: w.Ref,
                    name: `${warehouseTypeToString(w.TypeOfWarehouse)} №${w.Number}`,
                    description: `${w.ShortAddress}`
                })
            })

            this.destination.data = data;
            this.destination.selected = data[0] || {id:0,name:"No warehouses in this settlement",description:""};
        },
    }
})
</script>
<style scoped>
    
</style>