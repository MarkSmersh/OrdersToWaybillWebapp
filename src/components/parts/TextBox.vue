<template>
    <div class="text-box-container">
        <label class="title">{{title}}</label>
        <div class="text-box">
            <p class="text">{{data}}</p>
            <button v-if="func">Revoke</button>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent ({
    props: {
        title: String,
        enterData: String,
        func: Function
    },
    data () {
        return {
            data: this.enterData
        }
    }
})
</script>
<style scoped>

    .title {
        margin-left: var(--default-border-radius);
        font-size: 1em;
        font-weight: 700;
        margin-bottom: 5px;
    }

    .text-box {
        padding-left: var(--default-border-radius);
        padding-right: var(--default-border-radius);
        background-color: var(--tg-theme-bg-color);
        border: 0;
        border-radius: var(--default-border-radius);
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
    }

    button {
        background-color: var(--tg-theme-button-color);
        border: 0;
        border-radius: var(--default-border-radius);
        color: var(--tg-theme-button-text-color);
        padding: 0px 30px;
        font-size: 1em;
        font-weight: 600;
        transition: 0.5s;
        height: 100%;
        cursor: pointer;
    }
</style>