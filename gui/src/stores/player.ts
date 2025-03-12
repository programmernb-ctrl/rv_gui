import { defineStore } from 'pinia';
import { ref } from 'vue';
import { PlayerData } from '../types/PlayerData';

export const usePlayerStore = defineStore('user', () => {
   const player = ref<PlayerData>({
      name: '',
      id: 0,
      coords: [0, 0, 0]
   });

   const setPlayer = (newPlayer: PlayerData) => {
      player.value = newPlayer;
   };

   return {
      player,
      setPlayer,
   }
});