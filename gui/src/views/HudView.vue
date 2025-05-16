<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Tacho from '../components/Tacho.vue';
import TestComponent from '../components/TestComponent.vue';

const vehicleSpeed = ref<number>(0)
const isInVehicle = ref<boolean>(false)

const PData = (event: MessageEvent) => {
   const data = event.data;

   if (data) {
      switch(data.type) {
         case 'speed':
            if (typeof data.value === 'number') {
               let response = {
                  data: {
                     speed: data.value
                  },
               }
               vehicleSpeed.value = response.data.speed;
            } else {
               console.log('Error! Invalid Structure', data);
            }
            break;

         case 'isInVehicle':
            if (typeof data.value === 'boolean') {
               let response = {
                  data: {
                     inVehicle: data.value
                  },
               }
               isInVehicle.value = response.data.inVehicle;
            } else {
               console.log('Error! Invalid Structure', data);
            }
            break
         
            default:
               break;
      }
   }
}

onMounted(() => {
   window.addEventListener('message', PData);
});

onUnmounted(() => {
   window.removeEventListener('message', PData);
});

</script>

<template>
   <div class="flex h-screen w-screen">
      <TestComponent />
      <Tacho :show="isInVehicle" :speed="vehicleSpeed" />
   </div>
</template>

<style scoped>
</style>