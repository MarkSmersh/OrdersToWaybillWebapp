<template>
    <div v-if="status === 200">
        <Order v-if="data.orderData" :products="data.orderData.data"
               :enter-basket="data.orderData.basket"
               :enter-price="data.orderData.price.toString()"></Order>
        <CostumerData v-if="data.costumerData" :enter-data="data.costumerData"
                      :request="requestToNP"></CostumerData>
        <MailData v-if="data.mailData" :enter-data="data.mailData"
                  :request="requestToNP"></MailData>
        <BillingData v-if="data.billingData"
                     :enter-data="data.billingData"></BillingData>
    </div>
    <div v-else>
      <p>Status code: {{status}}</p>
      <p>Description: {{response}}</p>
    </div>
  </template>
  
  <script lang="ts">
  import Order from "@/components/forms/Order.vue";
  import CostumerData from "@/components/forms/CostumerData.vue";
  import Link from "@/components/Link.vue";
  import MailData from "@/components/forms/MailData.vue";
  import BillingData from "@/components/forms/BillingData.vue";
  import TextBox from "@/components/parts/TextBox.vue";
  import axios from "axios";
  import warehouseTypeToString from "../utils/warehouseTypeToString";
  import type { DataToSend, MainData, Query, OrderData } from "@/types";
  const WebApp = window.Telegram.WebApp;
  
  export default {
    components: {
      Order, CostumerData, Link, MailData, BillingData, TextBox
    },
    async mounted() {
      if (this.$route.path === "/create") {
        console.log(this.$route);
        const { token, orderData } = this.$route.query as { token: string, orderData: string };
        if (token) {
          console.log(token);
          // this.emitError(400, "Option token is missing, but required");
          this.$store.commit("updateToken", token);
        }

        console.log("ok");

        if (!orderData) {
          this.emitError(400, "Option orderData is missing, but required");
          return;
        }

        if (orderData) {
          let OrderData = JSON.parse(orderData) as Query["orderData"];
          let data = [] as OrderData["data"]
          OrderData.data.forEach((prd, i) => {
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

          this.data.orderData = {
            data: data,
            basket: [],
            price: "0"
          }
        }

        this.data.costumerData = {
          phoneNumber: "",
          lastName: "",
          middleName: "",
          firstName: ""
        }

        this.data.mailData = {
          settlement: {
            data: [],
            selected: {}
          },
          destination: {
            data: [],
            selected: {}
          },
          scanSheet: ""
        }

        this.data.billingData = {
          type: {
            data: [
              {
                id: 0,
                name: "Cash"
              },
              {
                id: 1,
                name: "Noncash"
              }
            ],
            selected: {}
          },
          whoPays: {
            data: [
              {
                id: 0,
                name: "Sender"
              },
              {
                id: 1,
                name: "Recipient"
              }
            ],
            selected: {}
          }
        }

        WebApp.MainButton.setText("Create");
      }

      if (this.$route.path === "/edit") {
        const { token, orderData, costumerData, mailData, billingData } = this.$route.query as { token: string, orderData: string, costumerData: string, mailData: string, billingData: string }
        console.log(token);
        if (!token) {
          this.emitError(400, "Option token is missing, but required");
          return;
        }

        this.$store.commit("updateToken", token);

        if (orderData) {
          let OrderData = JSON.parse(orderData) as Query["orderData"];
          let data = [] as OrderData["data"]
          console.log(orderData);
          OrderData.data.forEach((prd, i) => {
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

          let basket = [] as OrderData["basket"]
          OrderData.basket.forEach((prd) => {
            let product = data.find((product) => product.id == prd.id); //prd.id
            if (product) {
              basket.push({
                productId: product.id,
                name: product.name,
                packaging: prd.packaging,
                unit: product.unit,
                amount: prd.amount
              })
            }
          })

          this.data.orderData = {
            data: data,
            basket: basket,
            price: OrderData.price
          }
        }

        if (costumerData) {
          let CostumerData = JSON.parse(costumerData) as Query["costumerData"];
          this.data.costumerData = CostumerData;
        }

        if (mailData) {
          let MailData = JSON.parse(mailData) as Query["mailData"];

          let responseSettlement = (await this.requestToNP(
            token, "Address", "getSettlements", {
              "Ref": MailData.settlement.selected
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
              "Ref": MailData.destination.selected
          }))[0]
          console.log(responseWarehouse);
          let destination = { data: [], selected: {
            id: responseWarehouse.Ref,
            name: `${warehouseTypeToString(responseWarehouse.TypeOfWarehouse)} №${responseWarehouse.Number}`,
            description: responseWarehouse.ShortAddress
          }};

          this.data.mailData = {
            settlement: settlement,
            destination: destination,
            scanSheet: MailData.scanSheet
          }
        }

        if (billingData) {
          let BillingData = JSON.parse(billingData) as Query["billingData"];

          function fromRawData (raw: Query["billingData"][keyof Query["billingData"]]) {
            let data = [] as { id: number | string, name: string }[];
            raw.data.forEach((d, i) => {
              data.push({
                id: i,
                name: d
              })
            })

            let selectData = data.find((v) => v.id == raw.selected) as { id: number | string, name: string };
            
            console.log(selectData);

            return {
              data: data,
              selected: {
                id: selectData.id,
                name: selectData.name
              }
            } 
          }
          
          this.data.billingData = {
            type: fromRawData(BillingData.type),
            whoPays: fromRawData(BillingData.whoPays),
          }
        }

        this.$store.commit("setData", {
          basket: this.data.orderData?.basket,
          price: this.data.orderData?.price,
          phoneNumber: this.data.costumerData?.phoneNumber,
          lastName: this.data.costumerData?.lastName,
          firstName: this.data.costumerData?.firstName,
          middleName: this.data.costumerData?.middleName,
          settlement: this.data.mailData?.settlement,
          destination: this.data.mailData?.destination,
          scanSheet: this.data.mailData?.scanSheet,
          type: this.data.billingData?.type,
          whoPays: this.data.billingData?.whoPays
        })

        WebApp.MainButton.setText("Apply");
      }

      // this.newData = this.data;

      WebApp.ready();
      WebApp.MainButton.show();
      console.log(this.data);
      WebApp.onEvent('mainButtonClicked', this.sendData)
    },
    data() {
      return {
        data: {} as MainData,
        // newData: {},
        async requestToNP(token: string, modelName: string, calledMethod: string, data: Object) {
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
        emitError(code: number, err: string) {
          this.status = code;
          this.response = err;
        },
        status: 200,
        response: ""
      }
    },
    methods: {
      async sendData() {

        async function showAlertArg(arg: string) {
          await WebApp.showAlert(`Seems you haven\`t fill "${arg}" block`);
        }

        try {
          let data = this.$store.state.newData as DataToSend;
          
          if (!data.basket) return await showAlertArg("Basket");
          if (!data.price) return await showAlertArg("Price")
          if (!data.phoneNumber) return await showAlertArg("Phone number")
          if (!data.lastName) return await showAlertArg("Last name")
          if (!data.firstName) return await showAlertArg("First name")
          if (!data.middleName) return await showAlertArg("Middle name")
          if (!data.settlement) return await showAlertArg("Settlement")
          if (!data.destination) return await showAlertArg("Destination")
          if (!data.type) return await showAlertArg("Type")
          if (!data.whoPays) return await showAlertArg("Who pays")
          
          // if (!data.scanSheet) showAlertArg("Scan sheet")

          WebApp.sendData(JSON.stringify(data));

        } catch (e) {
          console.log(e);
        }
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