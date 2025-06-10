<script setup lang="ts">
import Tacho from '@/Components/Tacho.vue';
import TestComponent from '@/Components/TestComponent.vue';
import {useNotification} from '@/Composables/useNotification'

const notification = useNotification();
</script>

<template>
   <div class="flex h-screen w-screen overflow-hidden">
      <TestComponent />
      <Tacho :show="notification.isInVehicle.value" :speed="notification.vehicleSpeed.value" />
   </div>
</template>
