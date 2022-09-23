<template>
  <Form title="Costumer data:">
    <Input placeholder="First Name" button-text="Edit"></Input>
  </Form>

</template>

<script lang="ts">
  import Form from "./components/Form.vue"
  import Input from "./components/parts/Input.vue";

  export default {
    components: {
      Input, Form
  }
}

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500;700;900&display=swap');  

  * {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
  }

  body {
    background-color: var(--secondary-bg-color);
  }

  :root {
    --bg-color: #FFFFFF;
    --secondary-bg-color: #F3F2F8;
    --text-color: #000000;
    --hint-color: #909090;
    --link-color: #3196E5;
    --button_color: #5AC8FB;
    --button_text_color: #FFFFFF;
    --default-border-radius: 16px;
  }

</style>
