<template>
   <div class="flex w-screen h-screen justify-center items-center">
      <div class="relative">
         <!--Outer Div for hud-->
         <div class="fixed flex flex-nowrap space-x-4 max-w-[25%] w-[25%] h-[5%] max-h-[10%] top-12 left-5 bg-slate-600 rounded-sm ring-red-500 ring-2 ring-offset-2">
            <div class="flex items-center mx-auto justify-center">
               {{ formattedPlayer }}
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { PlayerData } from '../types/PlayerData';
import { DResponse } from '../types/DResponse';
import { cache } from '@communityox/ox_lib';
import { usePlayerStore } from '../stores/player'

const playerStore = usePlayerStore();
const playerData = ref<PlayerData>();

const formattedPlayer = computed(() => {
   if (!playerData.value) return '';
   const { id, name, coords } = playerData.value;
   return `ID: ${id}, ${name}, X: ${coords[0]}, Y: ${coords[1]}, Z: ${coords[2]}`;
})

// Function to update player pinia store
const updatePlayerStore = (data: PlayerData) => {
   playerStore.player = data;

   const UpdatePromise = new Promise((resolve) => {
      setTimeout(() => {
         console.log('PlayerStore updated with data:', playerStore.player);
         resolve(true);
      }, 1000);
   });

   UpdatePromise.then(() => {
      console.log('PlayerStore updated successfully!');
      return true;
   }).catch((error) => {
      console.error('Error while updating PlayerStore:', error);
      return false;
   });
}

function _init() {
   fetch(`https://${cache.resource}/playerData`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
         id: 0,
         name: '',
         coords: [0, 0, 0]
      })
   })
   .then(resp => {
      if (!resp.ok) {
         throw new Error(`HTTP error! status: ${resp.status}`);
      }
      return resp.json();
   })
   .then(resp => {
      console.log('Got Response with coords: ', resp?.coords);

      let pNewData: DResponse = {
         data: {
            id: resp.id,
            name: resp.name,
            coords: resp.coords,
         },
         isError: false
      };

      playerData.value = pNewData.data;
      playerStore.player = playerData.value;

      // Example for session storage
      // sessionStorage.setItem('coordinates', playerData.value.coords.toString());
   })
   .catch((err) => {
      console.error('Error while fetching player data:', err.message);
   });
}

const PData = (event: MessageEvent) => {
   const data = event.data;

   if (data) {
      switch (data.type) {
         case 'playerData':
            const fullData = typeof data.id === 'number' && typeof data.name === 'string' && typeof data.coords === 'object';
         
            if (fullData) {
               let response: DResponse = {
                  data: {
                     id: data.id,
                     name: data.name,
                     coords: data.coords
                  },
                  isError: false,
               };
               updatePlayerStore(response.data);
               console.log('PlayerData: ', response.data);
               return
            } else {
               console.log('Error! Invalid Structure', data);
               return;
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

<style scoped>
#playerData {
   justify-content: center;
   text-align: left;
   font: bold;
}
</style>