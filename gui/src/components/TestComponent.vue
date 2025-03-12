<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { PlayerData } from '../types/PlayerData';
import { DResponse } from '../types/DResponse';

const playerData = ref<PlayerData>();

const formattedPlayer = computed(() => {
   if (!playerData.value) return '';
   const { id, name, coords } = playerData.value;
   return `ID: ${id}, ${name}, X: ${coords[0]}, Y: ${coords[1]}, Z: ${coords[2]}`;
})


function _init() {
   fetch(`https://rv_gui/playerData`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
         id: 0,
         name: '',
         coords: [0, 0, 0]
      })
   }).then(resp => resp.json()).then(resp => {
      console.log('Got Response with coords: ', resp?.coords);

      let pNewData: DResponse = {
         data: {
            id: resp.id,
            name: resp.name,
            coords: resp.coords,
         },

         isError: false
      }

      playerData.value = pNewData.data;

      // Will work later on this, either i'll use pinia for handling that or web api session storage. Maybe i choose session storage idk :)
      // here some example sessionStorage.setItem('coordinates', playerData.value.coords.toString());
   })
}

const PData = (event: MessageEvent) => {
   const data = event.data;

   if (data) {
      switch(data.type) {
         case 'playerData':
            if (typeof data.id === 'number' && typeof data.name === 'string' && typeof data.coords === 'object') {
               let response: DResponse = {
                  data: {
                     id: data.id,
                     name: data.name,
                     coords: data.coords
                  },
                  isError: false,
               }
               playerData.value = response.data;
            } else {
               console.log('Error! Invalid Structure', data);
            }
            break;

            default:
               break;
      }
   }
}

onMounted(() => {
   _init();
   window.addEventListener('message', PData);
});

onUnmounted(() => {
   window.removeEventListener('message', PData);
   sessionStorage.clear();
});

</script>

<template>
   <div class="flex justify-center items-center overflow-hidden">
      <div class="w-[30%] h-8 bg-emerald-800/30 border-2 border-solid border-emerald-400 overflow-hidden shadow-lg shadow-emerald-400/50">
         <div class="flex flex-row flex-wrap flex-shrink-1 items-center overflow-hidden w-full">
             <span id="playerData" class="py-1 text-center text-slate-500 text-ellipsis font-bold tracking-widest w-full">
                 {{ formattedPlayer }}
             </span>
         </div>
      </div>
   </div>
</template>

<style scoped>
#playerData {
   justify-content: center;
}
</style>