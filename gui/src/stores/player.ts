import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface P {
   id: number;
   name: string;
   coords: number[];
}

export const usePlayerStore = defineStore('user', () => {
   const player = ref({
      name: '',
      id: 0,
      coords: [0, 0, 0]
   });

   const getPlayerId = computed(() =>
      player.value.id
   );

   const getPlayerCoords = computed(() =>
      player.value.coords
   );

   const setPlayer = (newPlayer: P) => {
      player.value = newPlayer;
   };

   return {
      player,
      getPlayerId,
      getPlayerCoords,
      setPlayer,
   }
});