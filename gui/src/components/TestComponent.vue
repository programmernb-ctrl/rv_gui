<template>
    <div class="flex w-screen h-screen justify-center">
        <div class="absolute top-12 left-12 flex flex-col gap-4">
            <!--Outer Div for hud-->
            <div
                class="flex flex-wrap w-full top-0 left-0 bg-slate-500/30 ring-2 ring-blue-500 rounded-sm shadow-lg shadow-blue-500/50">
                <div class="flex px-8 w-full items-center justify-center overflow-hidden">
                    <p class="font-mono tracking-tighter text-white">{{ formattedPlayer }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref, computed} from 'vue';
import {useNui} from '../composables/useNui';
import {fetchNui} from '../lib/fetchNui';
import {usePlayerStore} from '../stores/player';
import type {PlayerData} from '@/Types/PlayerData';

const playerStore = usePlayerStore();
const playerData = ref<PlayerData>();

const formattedPlayer = computed(() => {
    if (!playerData.value) return '';
    const {id, name, coords} = playerData.value ? playerStore.player : playerData.value;
    return `ID: ${id}, ${name}, X: ${coords[0].toFixed(3)}, Y: ${coords[1].toFixed(3)}, Z: ${coords[2].toFixed(3)}`;
});

// Function to update player pinia store
const updatePlayerStore = async (data: PlayerData): Promise<PlayerData> => {
    playerStore.player = data;

    const updatePromise = new Promise<PlayerData>((resolve) => {
        setTimeout(() => {
            // console.log('PlayerStore updating...');
            resolve(playerStore.player);
        }, 1000);
    });

    return updatePromise
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error while trying to update Player Store:', error);
            throw error;
        });
};

async function _init() {
    const data = await fetchNui('playerData', {});

    if (!data) return;

    let pNewData: PlayerData = {
        id: data.value.id,
        name: data.value.name,
        coords: data.value.coords,
    };

    playerData.value = pNewData;
    updatePlayerStore(playerData.value as PlayerData);

    // Example for session storage
    // sessionStorage.setItem('coordinates', playerData.value.coords.toString());
}

useNui<PlayerData>('playerData', (data) => {
    playerStore.$state.player = {
        id: data.id ?? 0,
        name: data.name,
        coords: data.coords,
    };
});

onMounted(() => {
    _init();
});

onUnmounted(() => {
    sessionStorage.clear();
});
</script>

<style scoped>
#playerData {
    justify-content: center;
    text-align: left;
    font: bold;
}
</style>
