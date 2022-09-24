<template>
  <Form title="Costumer data:">
    <Input placeholder="First Name" button-text="Edit"></Input>
    <Input placeholder="First Name" button-text="Edit"></Input>
    <Select v-bind:options="options" title="Destination"/>
    <Select v-bind:options="options2" title="Type"/>
  </Form>
</template>

<script>
import Form from "./components/Form.vue"
import Input from "./components/parts/Input.vue";
import Select from "./components/parts/Select.vue";

export default {
  components: {
    Input, Form, Select
  },
  data() {
    return {
      options: [
        ...(() => {
          let result = []

          for (let i = 0; i < 20000; i++) {
            result.push({ id: i, name: `м. Львів ${i}`, description: `вул. Степана Бандерьі і Шухевича, ${i}`})
          }

          return result;
        })()
      ],
      options2: [
        { id: 1, name: "Cash" },
        { id: 2, name: "Non cash" }
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
    --default-border-radius: 16px;
    background-color: var(--secondary-bg-color);
  }

</style>
