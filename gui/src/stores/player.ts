import {defineStore} from 'pinia';
import {ref} from 'vue';
import type {PlayerData} from '@/Types/PlayerData';

export const usePlayerStore = defineStore('user', {
    state: () => ({
        player: ref<PlayerData>({
            name: '',
            id: 0,
            coords: [0, 0, 0],
        }),
    }),

    getters: {
        getAll: (state) => {
            return state.player
        }
    },

    actions: {
        $setPlayer(player: PlayerData): void {
            this.player = player;
        },
        $reset(): void {
            this.player = {
                id: 0,
                name: '',
                coords: [0, 0, 0],
            };
        },
    },
});
