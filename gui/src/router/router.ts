import {createRouter, createWebHashHistory} from 'vue-router';
import MainView from '../views/MainView.vue';
import {defineAsyncComponent} from 'vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: MainView,
    },
    {
        path: '/test',
        name: 'test',
        component: defineAsyncComponent(() => import('../views/TestView.vue')), // Dynamic Import
    },
    {
        path: '/hud',
        name: 'hud',
        component: defineAsyncComponent(() => import('../views/HudView.vue')),
    },
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;

