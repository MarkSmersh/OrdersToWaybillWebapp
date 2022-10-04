<template>
    <div v-if="status === 200">
      <Link v-if="data.orderData" name="order">
        <Order :products="data.orderData.data" :enter-basket="data.orderData.basket"></Order>
      </Link>
      <Link v-if="data.costumerData" name="costumer-data">
        <CostumerData :enter-data="data.costumerData"></CostumerData>
      </Link>
      <Link v-if="data.mailData" name="mail-data">
        <MailData :enter-data="data.mailData"></MailData>
      </Link>
      <Link v-if="data.billingData" name="billing-data">
        <BillingData :enter-data="data.billingData"></BillingData>
      </Link>
    </div>
    <div v-else>
      <p>Status code: {{status}}</p>
      <p>Description: {{response}}</p>
    </div>
  </template>
  
  <script>
  import Order from "@/components/forms/Order.vue";
  import CostumerData from "@/components/forms/CostumerData.vue";
  import Link from "@/components/Link.vue";
  import MailData from "@/components/forms/MailData.vue";
  import BillingData from "@/components/forms/BillingData.vue";
  import TextBox from "@/components/parts/TextBox.vue";
  import axios from "axios";
  import warehouseTypeToString from "../utils/warehouseTypeToString";
  
  export default {
    components: {
      Order, CostumerData, Link, MailData, BillingData, TextBox
    },
    async mounted() {
      if (this.$route.path === "/create") {
        if (!token) {
          this.emitError(400, "Option token is missing, but required");
          return;
        }
      }

      if (this.$route.path === "/edit") {
        let { token, orderData, costumerData, mailData, billingData } = this.$route.query;
        console.log(token);
        if (!token) {
          this.emitError(400, "Option token is missing, but required");
          return;
        }

        this.$store.commit("updateToken", token);

        if (orderData) {
          orderData = JSON.parse(orderData);
          let data = []
          console.log(orderData);
          orderData.data.forEach((prd, i) => {
            data.push({
              id: i,
              name: prd.name,
              type: prd.type,
              packaging: prd.packaging,
              unit: prd.unit,
              img: prd.img,
              isOpened: false
            })
          })

          let basket = []
          orderData.basket.forEach((prd) => {
            let product = data.find((product) => product.id == prd.id);
            basket.push({
              name: product.name,
              packaging: prd.packaging,
              unit: product.unit
            })
          })

          this.data.orderData = {
            data: data,
            basket: basket
          }
        }

        if (costumerData) {
          costumerData = JSON.parse(costumerData);
          this.data.costumerData = costumerData;
        }

        if (mailData) {
          mailData = JSON.parse(mailData);

          let responseSettlement = (await this.requestToNP(
            token, "Address", "getSettlements", {
              "Ref": mailData.settlement.selected
          }))[0]
          console.log(responseSettlement.AreaDescription);
          let settlement = { data: [], selected: {
            id: responseSettlement.Ref,
            name: `${responseSettlement.SettlementTypeDescription} ${responseSettlement.Description}`,
            description:
              `${responseSettlement.AreaDescription}, ${responseSettlement.RegionsDescription}`
          }};

          let responseWarehouse = (await this.requestToNP(
            token, "Address", "getWarehouses", {
              "Ref": mailData.destination.selected
          }))[0]
          console.log(responseWarehouse);
          let destination = { data: [], selected: {
            id: responseWarehouse.Ref,
            name: `${warehouseTypeToString(responseWarehouse.TypeOfWarehouse)} №${responseWarehouse.Number}`,
            description: responseWarehouse.ShortAddress
          }};

          this.data.mailData = {
            settlement: settlement,
            destination: destination
          }
        }

        if (billingData) {
          billingData = JSON.parse(billingData);

          function fromRawData (raw) {
            let data = [];
            raw.data.forEach((d, i) => {
              data.push({
                id: i,
                name: d
              })
            })

            let selectData = data.find((v) => v.id == raw.selected);
            
            console.log(selectData);
            let selected = {
              id: selectData.id,
              name: selectData.name
            }

            return {
              data: data,
              selected: selected
            }
          }
          
          this.data.billingData = {
            type: fromRawData(billingData.type),
            whoPays: fromRawData(billingData.whoPays),
            price: billingData.price
          }

          console.log(this.data.billingData);
        }
      }      
    },
    data() {
      return {
        data: {},
        async requestToNP(token, modelName, calledMethod, data) {
          return (await axios.request({
            url: "https://api.novaposhta.ua/v2.0/json/",
            method: "post",
            data: {
              apiKey: token,
              modelName: modelName,
              calledMethod: calledMethod,
              methodProperties: data
            }
          })).data.data
        },
        emitError(code, err) {
          this.status = code;
          this.response = err;
        },
        status: 200,
        response: ""
      }
    }
  }
  
  </script>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700;900&display=swap');                                                 
  
    * {
      margin: 0;
      padding: 0;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
    }
  
    body {
      background-color: var(--tg-theme-secondary-bg-color);
      padding: 10px;
    }
  
    @media screen and (min-width: 1500px) {
      body {
        padding: 10px 500px;
      }
    }
  
  </style>