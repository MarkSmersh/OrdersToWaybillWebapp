<template>
  <Form title="Costumer data">
    <Input placeholder="First Name" button-text="Edit"></Input>
    <Input placeholder="First Name" button-text="Edit"></Input>
    <Select v-bind:options="options" title="Destination"/>
    <Select v-bind:options="options2" title="Type"/>
  </Form>
  <Order title="Order" v-bind:products="option3">

  </Order>
</template>

<script>
import Form from "./components/Form.vue"
import Input from "./components/parts/Input.vue";
import Select from "./components/parts/Select.vue";
import Order from "./components/forms/Order.vue";

export default {
  components: {
    Input, Form, Select, Order
  },
  data() {
    return {
      options: [
        ...(() => {
          let result = []

          for (let i = 0; i < 100; i++) {
            result.push({ id: i, name: `м. Львів ${i}`, description: `вул. Степана Бандерьі і Шухевича, ${i}`})
          }

          return result;
        })()
      ],
      options2: [
        { id: 1, name: "Cash" },
        { id: 2, name: "Non cash" }
      ],
      option3: [
        { id: 0, name: "Amylosubtilin", type: "Ferments", packaging: [100, 250, 500, 1000], unit: "ml", img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png", isOpened: false },
        { id: 1, name: "Glucavamorin", type: "Ferments", packaging: [100, 250, 500, 1000, 1500, 2000], unit: "ml", img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png", isOpened: false },
        { id: 2, name: "Yeast", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: true },
        { id: 3, name: "Yeast1", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: true },
        { id: 4, name: "Yeast2", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: true },
        { id: 5, name: "Yeast3", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: true },
        { id: 6, name: "Yeast4", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: true },
        { id: 7, name: "Yeast5", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: true },
        { id: 8, name: "Yeast6", type: "Yeasts", packaging: [100, 250, 500, 1000], unit: "g", img: "https://cdn-icons-png.flaticon.com/512/6411/6411176.png", isOpened: true },

      ]
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
