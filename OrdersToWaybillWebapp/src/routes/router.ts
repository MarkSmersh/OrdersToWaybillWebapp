import { createRouter, createWebHistory } from "vue-router"
import Main from "../pages/Main.vue"

const routes = [
    {
        path: "/create",
        component: Main,
    },
    {
        path: "/edit",
        component: Main,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router;