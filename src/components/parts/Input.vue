<template>
    <div class="formContainer">
        <label>{{placeholder}}</label>
        <form>
            <input v-bind:type="type" v-bind:value="data" @input="syncInput">
            <button v-bind:color="buttonColor">{{buttonText}}</button>
        </form>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        placeholder: String,
        buttonText: String,
        type: String
    },
    data() {
        return {
            data: "",
            buttonColor: ""
        }
    },
    methods: {
        syncInput(event: any) {
            this.data = event.target.value as string
        },
    }
})

</script>

<style scoped>
    form {
        background-color: var(--bg-color);
        border: 0;
        border-radius: var(--default-border-radius);
        height: 50px;
        width: 400px;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    label {
        margin-left: var(--default-border-radius);
    }

    input {
        border: 0;
        background-color: transparent;
        padding-left: var(--default-border-radius);
        padding-right: var(--default-border-radius);
        width: 100%;
    }

    button {
        border: 0;
        border-radius: var(--default-border-radius);
        cursor: pointer;
        background-color: var(--button_color);
        color: var(--button_text_color);
        padding: 0px 20px;
        font-size: 16px;
        font-weight: 600;
    }

    input:focus{
        outline: none;
    }
</style>