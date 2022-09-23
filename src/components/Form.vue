<template>
    <p class="formTitle">{{title}}</p>
    <div class="form">
        <slot></slot>
    </div>
</template>

<script lang="ts">

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
        margin-bottom: 20px;
    }
</style>