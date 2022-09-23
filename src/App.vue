<template>
  <Form title="Costumer data:">
    <Input placeholder="First Name" button-text="Edit"></Input>
    <Input placeholder="First Name" button-text="Edit"></Input>
    <Select v-bind:options="options" title="Destination"/>
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
        {
          id: 0,
          name: "м. Львів, №13",
          description: "обл. Львівська, вул. Степана Бандерьі і Шухевича 13"
        },
        {
          id: 1,
          name: "м. Львів, №1",
          description: "обл. Львівська, вул. Степана Бандерьі і Шухевича 1"
        }
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
    --button_color: #5AC8FB;
    --button_text_color: #FFFFFF;
    --default-border-radius: 16px;
    background-color: var(--secondary-bg-color);
  }

</style>
