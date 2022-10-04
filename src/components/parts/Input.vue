<template>
    <div class="formContainer">
        <label>{{placeholder}}</label>
        <form @submit.prevent>
            <input v-bind:type="type" v-bind:value="inputData" @input="isEdit($event)">
            <button v-bind:class="{ edited: isEdited }" @click="applyInput()">{{buttonText}}</button>
        </form>
    </div>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        placeholder: String,
        buttonText: String,
        type: String,
        enterData: String,
    },
    data() {
        return {
            data: this.enterData,
            inputData: this.enterData,
            isEdited: false,
        }
    },
    methods: {
        applyInput() {
            if (this.isEdited) {
                this.data = this.inputData;
                this.$emit("update", this.data, this.placeholder);
                this.isEdited = false;
            }
        },
        isEdit(e) {
            this.inputData = e.target.value;

            if (e.target.value.trimStart() == "") { 
                this.isEdited = false;
                return;
            }
            if (e.target.value == this.data) {
                this.isEdited = false;
                return;
            }
            if (!this.isEdited) this.isEdited = true;
        }
    }
})

</script>

<style scoped>
    form {
        background-color: var(--tg-theme-bg-color);
        border: 0;
        border-radius: var(--default-border-radius);
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
    }

    label {
        margin-left: var(--default-border-radius);
        font-weight: 700;
    }

    input {
        border: 0;
        background-color: transparent;
        padding-left: var(--default-border-radius);
        padding-right: var(--default-border-radius);
        width: 100%;
        font-size: 1em;
        font-weight: 500;
    }

    button {
        border: 0;
        border-radius: var(--default-border-radius);
        background-color: var(--tg-theme-hint-color);
        color: var(--tg-theme-button-text-color);
        padding: 0px 30px;
        font-size: 1em;
        font-weight: 600;
        transition: 0.5s;
    }

    input:focus{
        outline: none;
    }

    button.edited {
        background-color: var(--tg-theme-button-color);
        color: var(--tg-theme-button-text-color);
        cursor: pointer;
    }
</style>