<template>
    <a v-bind:name="name">
        <slot></slot>
    </a>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        name: String
    }
})
</script>
<style>
    
</style>