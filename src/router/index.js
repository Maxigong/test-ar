import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Puzzle from "../views/Puzzle.vue";
import CardPage from "../views/CardPage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/puzzle",
        name: "Puzzle",
        component: Puzzle,
    },
    {
        path: "/card",
        name: "CardPage",
        component: CardPage,
    },
];

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(),
    routes,
});

export default router;
