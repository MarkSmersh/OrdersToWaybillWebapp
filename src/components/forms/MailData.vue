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
<script lang="ts">
import { defineComponent } from 'vue';
import Form from '../Form.vue';
import Select from '../parts/Select.vue';
import TextBox from '../parts/TextBox.vue';
import warehouseTypeToString from '../../utils/warehouseTypeToString';
import type { MailData, PropToName, AddressGetWarehousesResponse, SelectForm, AddressSearchSettlements, SelectData } from '@/types';
import { nameToProp } from '@/utils/nameToProp';

export default defineComponent({
    props: {
        enterData: {
            type: Object as () => MailData,
            required: true
        }, // { destination: { data: [{ id: number, name: string, description?: string }], selected: { id: number, name: string, description?: string }}, scanSheet: string },
        request: {
            type: Function,
            required: true
        }
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
    components: {
        Form, Select, TextBox
    },

    methods: {
        async updateComponent(newData: MailData[keyof MailData], title: typeof PropToName[keyof typeof PropToName]) {
            switch (title) {
                case "Settlement":
                    this.settlement = newData as unknown as SelectForm;
                    await this.updateWarehouses();
                    break;
            }
            this.$store.commit("updateData", { key: nameToProp(title), data: newData })
        },
        async searchSettlement(name: string) {
            console.log(this.settlement);
            let data = [] as SelectForm[]
            
            try {
                let settlements = (await this.request(this.$store.state.token, "Address", "searchSettlements", {
                    CityName: name,
                    Limit: "200"
                })) as AddressSearchSettlements[]
                settlements

                console.log(settlements);


                settlements[0].Addresses.forEach((s) => {
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
            }) as AddressGetWarehousesResponse[]

            console.log(warehouses);

            let data = [] as SelectForm[]

            warehouses.forEach((w) => {
                data.push({
                    id: w.Ref,
                    name: `${warehouseTypeToString(w.TypeOfWarehouse)} №${w.Number}`,
                    description: `${w.ShortAddress}`
                })
            })

            this.destination.data = data;
            this.destination.selected = data[0] || {};

            this.updateComponent(this.destination.selected as SelectData, "Destination");
        },
    }
})
</script>
<style scoped>
    
</style>