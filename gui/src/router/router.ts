import {createRouter, createWebHistory} from 'vue-router';
import MainView from '../views/MainView.vue';
import TestView from '../views/TestView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: MainView,
    },
    {
        path: '/test',
        name: 'test',
        component: TestView,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
