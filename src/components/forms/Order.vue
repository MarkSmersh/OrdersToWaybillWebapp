<template>
    <Form title="Order">
            <div class="basket" v-if="basket.length != 0">
            <ul>
                <li class="product" v-for="product in basket">
                    <p class="title">{{product.name}}</p>
                    <p class="units">{{product.packaging + " " + product.unit}}</p>
                    <p class="amount">x{{product.amount}}</p>
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
                            <li :key="product.id" class="unit" v-for="pack in Object.keys(product.packaging)" v-bind:class="{ active: product.isOpened }">
                                <p class="value">{{pack + " " + product.unit}}</p>
                                <button @click="addBasket(product, parseInt(pack));">+</button>
                            </li>
                            <button v-bind:class="{ active: product.isOpened }" @click="product.isOpened = !product.isOpened">{{(product.isOpened) ? "Cancel" : "Add"}}</button>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    <Input placeholder="Price"
           :enter-data="price"
           button-text="₴"
           type="number"
           @update="updatePrice"></Input>    
    </Form>
</template>

<script lang="ts">
import Form from '../Form.vue';
import { defineComponent } from 'vue';
import Input from '../parts/Input.vue';
import type { OrderData } from '@/types';
import { nameToProp } from '@/utils/nameToProp';
import type { PropToName } from '@/types';

export default defineComponent({
    components: {
        Form, Input
    },
    props: {
        products: Array as () => OrderData["data"], // { id: number, name: string, type: string, packaging: { $number: $price }, unit: string, img: string, isOpened: boolean  }
        enterBasket: Array as () => OrderData["basket"], // [ { name: string, packaging: number, amount: number, unit: string } ],
        enterPrice: String
    },
    data() {
        return {
            basket: this.enterBasket || [],
            filtered: this.products || [],
            filters: (() => {
                if (!this.products) return;
                let result = [] as OrderData["data"][number]["type"][];
                this.products.forEach((prod) => {
                    if (!result.includes(prod.type)) result.push(prod.type)
                })
                return result;
            })(),
            price: this.enterPrice,
            isActiveList: false
        }
    },
    methods: {
        changeState() {
            this.isActiveList = !this.isActiveList;
        },
        applyFilter(filter: string) {
            this.changeState();

            let result = [] as OrderData["data"];
            this.products?.forEach((prod) => {
                if (prod.type == filter) result.push(prod)
            })

            this.filtered = result;
        },
        addBasket(prod: typeof this.filtered[number], pack: keyof OrderData["data"][number]["packaging"]) {
            let product = this.basket.find((prd) => prd.name == prod.name && prd.packaging == pack);
            if (!product) {
                this.basket.push({ productId: prod.id, name: prod.name, packaging: pack, unit: prod.unit, amount: 0 });
                product = this.basket.find((prd) => prd.name == prod.name && prd.packaging == pack);
            }
            if (product) {
                product.amount++;
            }
            this.updateComponents("Basket");
        },
        removeBasket(prod: OrderData["basket"][number]) {
            this.basket = this.basket.filter(prd => prd.productId !== prod.productId && prd.packaging !== prod.packaging);
            this.updateComponents("Basket");
        },
        updateComponents(title: typeof PropToName["basket"] | typeof PropToName["price"] = "Price") {
            console.log(title);
            console.log(nameToProp(title));
            if (title === "Basket") {
                this.calculatePrice();
                this.$store.commit("updateData", { key: nameToProp(title), data: this.basket })
                this.$store.commit("updateData", { key: "price", data: this.price })
            }
            if (title === "Price") {
                this.$store.commit("updateData", { key: nameToProp(title), data: this.price })
            }            
        },
        calculatePrice() {
            let price = 0;

            this.basket.forEach((b) => {
                let product = this.filtered.find((p) => p.name === b.name);
                if (product) {
                    price += product.packaging[b.packaging] * b.amount;
                } else {}
            })

            this.price = price.toString();
        },
        updatePrice(newPrice: string) {
            this.price = newPrice;
            this.updateComponents("Price");
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
        color: var(--tg-theme-text-color);
    }

    .basket::-webkit-scrollbar {
        height: 3px;
    }

    .basket::-webkit-scrollbar-track {
        background: transparent;
    }

    .basket::-webkit-scrollbar-thumb {
        background: var(--tg-theme-button-color);
    }

    .basket::-webkit-scrollbar-thumb:hover {
        background: var(--tg-theme-button-color);
    } 

    .basket > ul, .choice > ul {
        display: flex;
        flex-direction: row;
        list-style-type: none;
    }

    .basket .product {
        background-color: var(--tg-theme-bg-color);
        min-width: calc(50vw - calc(var(--default-border-radius) * 2) - 20px);
        min-height: calc(100px - calc(var(--default-border-radius) * 2));
        border-radius: var(--default-border-radius);
        padding: var(--default-border-radius);
        margin-right: 20px;
    }

    @media screen and (min-width: 1200px) {
        .basket .product {
            min-width: calc(10vw - calc(var(--default-border-radius) * 2));
        }
    }

    ul li:last-child {
        margin-right: 0px !important;
    }

    .basket .product .title {
        font-weight: 700;
        font-size: 1em;
        color: var(--tg-theme-text-color);
    }

    .basket .product .units {
        font-weight: 500;
        font-size: 1em;
        color: var(--tg-theme-text-color);
    }

    .basket .product button {
        background-color: var(--tg-theme-button-color);
        border: 0;
        height: 40px;
        width: 40px;
        border-radius: 40px;
        float: right;
        color: var(--tg-theme-button-text-color);
        cursor: pointer;
        display: inline;
    }

    .basket .product .amount {
        display: inline-block;
        margin-top: 10px;
        color: var(--tg-theme-link-color);
        font-weight: 700;
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
        color: var(--tg-theme-text-color);
    }

    .head .sign {
        font-size: 1.25em;
        margin-left: 10px;
        transform: rotate(-90deg);
        transition: 0.2s;
        display: block;
        color: var(--tg-theme-text-color);
    }

    .head .sign.active {
        transform: rotate(90deg);
    }

    .filter .filters {
        background-color: var(--tg-theme-bg-color);
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
        color: var(--tg-theme-link-color);
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
        background: var(--tg-theme-button-color);
    }

    .choice::-webkit-scrollbar-thumb:hover {
        background: var(--tg-theme-button-color);
    } 

    .choice > ul {
        display: flex;
    }

    .choice > ul > .product {
        margin-right: 20px;
    }

    .product .preview {
        background-color: var(--tg-theme-bg-color);
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
        color: var(--tg-theme-text-color);
        text-align: center;
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
        background-color: var(--tg-theme-button-color);
    }

    .product > ul > .unit {
        margin: calc(var(--default-border-radius));
        display: none;
        justify-content: space-between;
        align-items: center;
        color: var(--tg-theme-button-text-color);
        margin-bottom: 10px;
    }

    .product > ul > .unit.active {
        display: flex;
    }

    .product > ul > .unit button {
        height: 40px;
        width: 40px;
        background-color: var(--tg-theme-button-text-color);
        border: 0;
        border-radius: calc(var(--default-border-radius) * 2);
        font-size: 1.25em;
        cursor: pointer;
    }

    .product > ul > button {
        background-color: var(--tg-theme-button-color);
        color: var(--tg-theme-button-text-color);
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
        background-color: var(--tg-theme-button-text-color);
        color: var(--tg-theme-button-color);
    }

</style>