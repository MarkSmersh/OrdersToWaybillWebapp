<template>
    <Form title="Order">
        <div class="basket" v-if="basket.length != 0">
            <ul>
                <li class="product" v-for="product in basket">
                    <p class="title">{{product.name}}</p>
                    <p class="units">{{product.packaging + " " + product.unit}}</p>
                    <button @click="removeBasket(product)">—</button>
                </li>
            </ul>
        </div>
        <div v-else class="no-basket">List is currently empty</div>
        <div class="constructor">
            <div class="filter">
                <div class="head" v-bind:class="{ active: isActiveList }" @click="changeState">
                    <p class="selected">Types</p>
                    <p class="sign" v-bind:class="{ active: isActiveList }">></p>
                </div>
                <ul class="filters" v-bind:class="{ active: isActiveList }">
                    <li v-for="filter in filters" @click="applyFilter(filter)">{{filter}}</li>
                </ul>
            </div>
            <div class="choice">
                <ul>
                    <li class="product" v-for="product in filtered">
                        <div class="preview">
                            <p class="title">{{product.name}}</p>
                            <img v-bind:src="product.img" alt="Icon">
                            <svg width="100" height="15" viewBox="0 0 100 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="50" cy="7.5" rx="50" ry="7.5" fill="#F3F2F8"/>
                            </svg>
                        </div>
                        <ul v-bind:class="{ active: product.isOpened }">
                            <li :key="product.id" class="unit" v-for="pack in product.packaging" v-bind:class="{ active: product.isOpened }">
                                <p class="value">{{pack + " " + product.unit}}</p>
                                <button @click="addBasket(product, pack)">+</button>
                            </li>
                            <button v-bind:class="{ active: product.isOpened }" @click="product.isOpened = !product.isOpened">{{(product.isOpened) ? "Cancel" : "Add"}}</button>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </Form>
</template>

<script>
import Form from '../Form.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        Form
    },
    props: {
        products: Array // { id: number, name: string, type: string, packaging: number[], unit: string, img: string, isOpened: boolean  }
    },
    data() {
        return {
            basket: [], // [ { name: string, packaging: number, unit: string } ]
            filtered: this.products,
            filters: (() => {
                let result = [];
                this.products.forEach((prod) => {
                    if (!result.includes(prod.type)) result.push(prod.type)
                })
                return result;
            })(),
            isActiveList: false
        }
    },
    methods: {
        changeState() {
            this.isActiveList = !this.isActiveList;
        },
        applyFilter(filter) {
            this.changeState();

            let result = [];
            this.products.forEach((prod) => {
                if (prod.type == filter) result.push(prod)
            })

            this.filtered = result;
        },
        addBasket(prod, pack) {
            let product = this.basket.find((prd) => prd.name == prod.name);
            if(product == undefined) {
                this.basket.push({ name: prod.name, packaging: 0, unit: prod.unit });
                product = this.basket.find((prd) => prd.name == prod.name);
            }
            product.packaging += pack;
        },
        removeBasket(prod) {
            this.basket = this.basket.filter(prd => prd.name !== prod.name);
        }
    }
})
</script>

<style scoped>
    .basket {
        overflow-y: auto;
        padding-bottom: 20px;
    }

    .no-basket {
        font-size: 1em;
        width: 100%;
        text-align: center;
    }

    .basket::-webkit-scrollbar {
        height: 3px;
    }

    .basket::-webkit-scrollbar-track {
        background: transparent;
    }

    .basket::-webkit-scrollbar-thumb {
        background: var(--button-color);
    }

    .basket::-webkit-scrollbar-thumb:hover {
        background: var(--button-color);
    } 

    .basket > ul, .choice > ul {
        display: flex;
        list-style-type: none;
    }

    .basket .product {
        background-color: var(--bg-color);
        min-width: calc(50vw - calc(var(--default-border-radius) * 2) - 20px);
        min-height: calc(100px - calc(var(--default-border-radius) * 2));
        border-radius: var(--default-border-radius);
        padding: var(--default-border-radius);
        margin-right: 20px;
    }

    @media screen and (min-width: 1200px) {
        .basket .product {
            width: calc(10vw - calc(var(--default-border-radius) * 2));
        }
    }

    ul li:last-child {
        margin-right: 0px !important;
    }

    .basket .product .title {
        font-weight: 700;
        font-size: 1em;
    }

    .basket .product .units {
        font-weight: 500;
        font-size: 1em;
    }

    .basket .product button {
        background-color: var(--button-color);
        border: 0;
        height: 40px;
        width: 40px;
        border-radius: 40px;
        float: right;
        color: var(--button-text-color);
        cursor: pointer;
    }

    /*filter*/

    .constructor .filter {
        margin-bottom: 10px;
    }

    .filter .head {
        display: flex;
        cursor: pointer;
    }

    .head .selected {
        font-size: 1.5em;
        margin-bottom: 5px;
        font-weight: 700;
    }

    .head .sign {
        font-size: 1.25em;
        margin-left: 10px;
        transform: rotate(-90deg);
        transition: 0.2s;
        display: block;
    }

    .head .sign.active {
        transform: rotate(90deg);
    }

    .filter .filters {
        background-color: var(--bg-color);
        display: flex;
        flex-direction: column;
        width: 100%;
        border-radius: var(--default-border-radius);
        align-items: center;
        list-style-type: none;
        display: none;
    }

    .filter .filters li {
        padding: calc(var(--default-border-radius) / 2);
        color: var(--link-color);
    }

    .filter .filters li:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .filter .filters.active {
        display: flex;
    }

    .choice {
        overflow-y: auto;
        padding-bottom: 20px;
        box-shadow: 1px;
    }

    .choice::-webkit-scrollbar {
        height: 3px;
    }

    .choice::-webkit-scrollbar-track {
        background: transparent;
    }

    .choice::-webkit-scrollbar-thumb {
        background: var(--button-color);
    }

    .choice::-webkit-scrollbar-thumb:hover {
        background: var(--button-color);
    } 

    .choice > ul {
        display: flex;
    }

    .choice > ul > .product {
        margin-right: 20px;
    }

    .product .preview {
        background-color: var(--bg-color);
        border-radius: var(--default-border-radius);
        padding: var(--default-border-radius);
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: calc(50vw - calc(var(--default-border-radius) * 2) - 20px);
    }

    @media screen and (min-width: 1200px) {
        .product .preview {
            width: calc(10vw - calc(var(--default-border-radius) * 2));
        }
    }

    .product .preview .title {
        justify-self: start;
        margin-bottom: auto;
    }

    .product .preview img {
        height: 125px;
        margin-bottom: auto;
        z-index: 2;
    }

    .product .preview svg {
        position: relative;
        transform: translateY(-30px);
        z-index: 1;
    }

    .product .preview .title {
        font-weight: 700;
        font-size: 1em;
    }

    .product > ul {
        display: flex;
        flex-direction: column;
        border-radius: var(--default-border-radius);
        width: 100%;
        background-color: transparent;
        transition: 0.5s;
    }

    .product > ul.active {
        width: 100%;
        background-color: var(--button-color);
    }

    .product > ul > .unit {
        margin: calc(var(--default-border-radius));
        display: none;
        justify-content: space-between;
        align-items: center;
        color: var(--button-text-color);
        margin-bottom: 10px;
    }

    .product > ul > .unit.active {
        display: flex;
    }

    .product > ul > .unit button {
        height: 40px;
        width: 40px;
        background-color: var(--button-text-color);
        border: 0;
        border-radius: calc(var(--default-border-radius) * 2);
        font-size: 1.25em;
        cursor: pointer;
    }

    .product > ul > button {
        background-color: var(--button-color);
        color: var(--button-text-color);
        font-size: 1em;
        font-weight: 700;
        border: 0;
        height: 40px;
        width: calc(40px * 2);
        border-radius: var(--default-border-radius);
        align-self: center;
        cursor: pointer;
        transition: 0.5s;
        transform: translateY(-50%);
    }

    .product > ul > button.active {
        width: 100%;
        transform: translateY(0%);
        background-color: var(--button-text-color);
        color: var(--button-color);
    }

</style>