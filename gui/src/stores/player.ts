import { defineStore } from 'pinia';
import { ref } from 'vue';

interface P {
   id: number;
   name: string;
   coords: number[];
}

export const usePlayerStore = defineStore('user', () => {
   const player = ref<P>({
      name: '',
      id: 0,
      coords: [0, 0, 0]
   });

   const setPlayer = (newPlayer: P) => {
      player.value = newPlayer;
   };

   return {
      player,
      setPlayer,
   }
});