<template>
    <p class="formTitle">{{title}}</p>
    <div class="form">
        <slot></slot>
    </div>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: String
    }
})
</script>

<style>
    .formTitle {
        font-weight: 900;
        font-size: 2em;
        text-align: center;
        margin-bottom: 30px;
        color: var(--tg-theme-text-color);
    }

    .form > * {
        margin-bottom: 20px;
    }

    .form > *:last-child {
        margin-bottom: 0;
    }

    .form {
        margin-bottom: 50px;
    }
</style>