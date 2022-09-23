<template>
        <div class="selectContainer">
            <label>{{title}}</label>
            <div class="selectedContainer" v-bind:class="{ active: isActived }" @click="changeState">
                <div class="selectedOption">
                    <p class="name">{{selected.name}}</p>
                    <p class="description">{{selected.description}}</p>
                </div>
                <p class="sign" v-bind:class="{ active: isActived }">></p>
            </div>
            <ul class="options" v-bind:class="{ active: isActived }" >
                <li class="option" v-for="option in options" :key="option.id" @click="selected = option">
                    <p class="name">{{option.name}}</p>
                    <p class="description">{{option.description}} </p>
                </li>
            </ul>
        </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: String,
        options: Array // {id: number, name: string, description?: string}
    },
    data() {
        return {
            selected: this.options[0],
            isActived: false
        }
    },
    methods: {
        changeState () {
            this.isActived = !this.isActived;
        }
    }
})

</script>

<style>
    .selectContainer {
        display: flex;
        flex-direction: column;
    }

    .selectContainer p {
        font-size: 16px;
        font-weight: 500;
    }

    label {
        margin-left: var(--default-border-radius);
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 5px;
    }

    .selectedContainer, .options {
        width: calc(400px - calc(var(--default-border-radius) * 2));
        background-color: var(--bg-color);
        border-radius: var(--default-border-radius);
        min-height: 50px;
        padding: var(--default-border-radius);
        display: flex;
        align-items: center;
    }

    .selectedContainer {
        margin-bottom: 10px;
        cursor: pointer;
        user-select: none;
    }

    .selectedOption {
        display: flex;
        flex-direction: column;
    }
    
    .options {
        list-style-type: none;
        display: none;
    }

    .options > li {
        margin-bottom: 20px;
    }

    .options > li:last-child {
        margin-bottom: 0;
    }

    .name {
        color: var(--link-color);
    }

    .description {
        color: var(--hint-color);
    }

    .options.active {
        display: block;
    }

    .selectedContainer.active {
        box-shadow: var(--link-color) 0px 0px 0px 1px;
    }

    .sign {
        transform: rotate(-90deg);
        transition: 0.2s;
    }

    .sign.active {
        transform: rotate(90deg);
    }

    .option:hover > p{
        text-decoration: underline;
        cursor: pointer;
    }
</style>