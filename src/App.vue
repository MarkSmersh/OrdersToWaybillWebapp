<template>
  <Link name="order">
    <Order v-bind:products="option3"></Order>
  </Link>
  <Link name="costumer-data">
    <CostumerData v-bind:enter-data="option4"></CostumerData>
  </Link>
  <Link>
    <MailData v-bind:enter-data="options"></MailData>
  </Link>
  <Link>
    <BillingData v-bind:enter-data="options2"></BillingData>
  </Link>
</template>

<script>
import Order from "./components/forms/Order.vue";
import CostumerData from "./components/forms/CostumerData.vue";
import Link from "./components/Link.vue";
import MailData from "./components/forms/MailData.vue";
import BillingData from "./components/forms/BillingData.vue";
import TextBox from "./components/parts/TextBox.vue";


export default {
  components: {
    Order, CostumerData, Link, MailData, BillingData, TextBox
  },
  data() {
    return {
      options: { destination: 
        (() => {
          let result = { data: [], selected: { id: 0, name: `м. Львів 0`, description: `вул. Степана Бандерьі і Шухевича, 0`} }

          for (let i = 1; i < 200; i++) {
            result.data.push({ id: i, name: `м. Львів ${i}`, description: `вул. Степана Бандерьі і Шухевича, ${i}`})
          }

          console.log(result);

          return result;
        })(),
        scanSheet: "0000-0000-0000-0000"
      },
      options2: {
        price: "300",
        type: { data: [{ id: 1, name: "Cash" }, { id: 2, name: "Non cash" }], selected: { id: 2, name: "Non cash" }},
        whoPays: { data: [{ id: 1, name: "Sender" }, { id: 2, name: "Recipient" }], selected: { id: 2, name: "Recipient" }}
      },
      option3: [
        { id: 0, name: "Amylosubtilin", type: "Ferments", packaging: [100, 250, 500, 1000], unit: "ml", img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png", isOpened: false },
        { id: 1, name: "Glucavamorin", type: "Ferments", packaging: [100, 250, 500, 1000, 1500, 2000], unit: "ml", img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png", isOpened: false },
        { id: 2, name: "Yeast", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: false },
        { id: 3, name: "Yeast1", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: false },
        { id: 4, name: "Yeast2", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: false },
        { id: 5, name: "Yeast3", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: false },
        { id: 6, name: "Yeast4", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: false },
        { id: 7, name: "Yeast5", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: false },
        { id: 8, name: "Yeast6", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: false },
      ],
      option4: {
        phoneNumber: "+38123456789", lastName: "", firstName: "Ivan", middleName: "Ivanovich" 
      },
      func: () => {}
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
    --bg-color: #FFFFFF;
    --secondary-bg-color: #F3F2F8;
    --text-color: #000000;
    --hint-color: #909090;
    --link-color: #3196E5;
    --button-color: #5AC8FB;
    --button-text-color: #FFFFFF;
    --default-border-radius: 20px;
    background-color: var(--secondary-bg-color);
    padding: 10px;
  }

  @media screen and (min-width: 1500px) {
    body {
      padding: 10px 500px;
    }
  }

</style>