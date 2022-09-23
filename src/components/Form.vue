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
        font-size: 20px;
    }

    .form > * {
        margin-top: 20px;
    }
</style>