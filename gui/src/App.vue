<script setup lang="ts">
import {RouterView} from 'vue-router';
</script>

<template>
    <div id="app">
        <router-view v-slot="{Component}">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>
