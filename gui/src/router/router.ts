import {createRouter, createWebHashHistory } from 'vue-router';
import MainView from '../views/MainView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: MainView,
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/TestView.vue'), // Dynamic Import
    },
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;

