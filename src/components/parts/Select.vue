<template>
        <div class="selectContainer">
            <label>{{title}}</label>
            <div class="selectedContainer" v-bind:class="{ active: isActived }">
                <input class="nameInput"
                       :value="value"
                       @focusin="changeState(); (onInput != undefined) ? Input($event.target.value) : filterByName($event.target.value)"
                       @input="(onInput != undefined) ? Input($event.target.value) : filterByName($event.target.value)">
                <p class="sign" v-bind:class="{ active: isActived }">></p>
            </div>
            <ul class="options" v-bind:class="{ active: isActived }" >
                <li class="option" v-if="filtered.length != 0" v-for="option in filtered" :key="option.id" @click="applyOption(option)">
                    <p class="name">{{option.name}}</p>
                    <p class="description">{{option.description}} </p>
                </li>
                <p v-else class="nothing">Nothing found</p>
            </ul>
        </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: String,
        options: Array, // { id: number, name: string, description?: string }
        enterSelected: Object,
        onInput: Function || undefined,
    },
    data() {
        return {
            selected: this.enterSelected,
            value: this.enterSelected.name,
            filtered: this.options,
            isActived: false
        }
    },
    watch: {
        options(newOptions) {
            this.filtered = newOptions;
        },
        enterSelected(newSelected) {
            this.selected = newSelected;
            this.value = newSelected.name;
        }
    },
    methods: {
        changeState () {
            this.isActived = !this.isActived;
        },
        applyOption (e) {
            this.selected = e;
            this.value = e.name;
            this.$emit("update", this.selected, this.title);
            this.changeState();
        },
        filterByName (val) {
            this.value = val;
            let filtered = []; // {i: string, o: string}

            this.options.forEach((opt) => {
                if (opt.name.length < val.length) return
                if (opt.name.toLowerCase().includes(val.toLowerCase())) filtered.push(opt)
            })
        
            this.filtered = [...filtered]
        },
        async Input(e) {
            this.value = e;
            this.filtered = await this.onInput(e);
        },
    }
})

</script>

<style scoped>
    .selectContainer {
        display: flex;
        flex-direction: column;
    }

    .selectContainer p {
        font-size: 1em;
        font-weight: 500;
    }

    label {
        margin-left: var(--default-border-radius);
        font-size: 1em;
        font-weight: 700;
        margin-bottom: 5px;
        color: var(--tg-theme-text-color);
    }

    .selectedContainer, .options {
        background-color: var(--tg-theme-bg-color);
        border-radius: var(--default-border-radius);
        min-height: 50px;
        /* padding: var(--default-border-radius); */
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .selectedContainer {
        margin-bottom: 10px;
        cursor: pointer;
        user-select: none;
    }
    
    .options {
        list-style-type: none;
        display: none;
        overflow-y: auto;
        min-height: calc(50px - calc(var(--default-border-radius) * 2));;
        max-height: 400px;
        padding: var(--default-border-radius);
        width: calc(100% - calc(var(--default-border-radius) * 2));
    }

    .options::-webkit-scrollbar {
        width: 2px;
        border-radius: var(--default-border-radius);
    }

    .options::-webkit-scrollbar-track {
        background: transparent;
    }

    .options::-webkit-scrollbar-thumb {
        background: var(--tg-theme-button-color);
    }

    .options::-webkit-scrollbar-thumb:hover {
        background: var(--tg-theme-button-color);
    }   

    .options > li {
        margin-bottom: 20px;
    }

    .options > li:last-child {
        margin-bottom: 0;
    }

    .name {
        color: var(--tg-theme-link-color);
    }

    .nameInput {
        background-color: transparent;
        width: 100%;
        min-height: calc(50px - 4px);
        border-radius: var(--default-border-radius);
        border: 0;
        padding-left: var(--default-border-radius);
        font-size: 1em;
        font-weight: 500;
        color: var(--tg-theme-text-color);
    }

    .nameInput:focus {
        outline: none;
    }

    .description {
        color: var(--tg-theme-hint-color);
    }

    .options.active {
        display: block;
    }

    .selectedContainer.active {
        box-shadow: var(--tg-theme-button-color) 0px 0px 0px 2px;
    }

    .sign {
        transform: rotate(-90deg);
        transition: 0.2s;
        margin-right: var(--default-border-radius);
        margin-left: var(--default-border-radius);
        color: var(--tg-theme-text-color);
    }

    .sign.active {
        transform: rotate(90deg);
    }

    .option:hover > p{
        text-decoration: underline;
        cursor: pointer;
    }

    .options .nothing {
        color: var(--tg-theme-text-color);
    }

</style>