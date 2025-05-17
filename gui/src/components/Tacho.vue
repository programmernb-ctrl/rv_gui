<template>
    <div v-if="show" class="gauge-container bg-gradient-to-br from-slate-900 to-gray-800 transition-colors duration-200">
        <div class="gauge">
            <div class="ticks">
                <div v-for="tick in ticks" :key="tick" class="tick"
                     :style="{ transform: `rotate(${startAngle + (tick / maxSpeed) * arcRange}deg)` }">
                    <div class="tick-line"></div>
                    <span class="tick-label tracking-wide" :style="{ transform: `rotate(${-(startAngle + (tick / maxSpeed) * arcRange)}deg)` }">
                        {{ tick }}
                    </span>
                </div>
            </div>
            <div class="needle rounded-t-2xl" :style="{ transform: `rotate(${needleRot}deg)` }"></div>
            <div class="center-circle"></div>

            <div class="speed-display-box">
                <div class="speed-display wallpoet-regular">{{ Math.round(speed * 3.6) }} km/h</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

const props = defineProps({
   speed: {
      type: Number,
      required: true
   },
   show: {
    type: Boolean,
    required: true
   }
})

const maxSpeed = 240;
const arcRange = 270;
const startAngle = -135;

const needleRot = computed(() => startAngle + (props.speed * 3.6 / maxSpeed) * arcRange);

const ticks = Array.from({ length: maxSpeed / 20 + 1}, (_, i) => i * 20);

onMounted(() => {
   //document.documentElement.style.setProperty('--hud-color', HudConfig.Color);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Wallpoet&display=swap');
.wallpoet-regular {
    font-family: "Wallpoet", serif;
    font-weight: 400;
    font-style: oblique;
    font-size: 14px
}

.gauge-container {
    position: absolute;
    bottom: 105px;
    right: 100px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    box-shadow: 0 5px 15px 5px rgba(0, 0, 0, 0.3);
    border: 4px double rgba(255, 0, 0, 0.7);
    overflow: hidden;
}

.gauge {
    position: relative;
    width: 100%;
    height: 100%;
}

.ticks {
    position: absolute;
    width: 100%;
    height: 100%;
}

.tick {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.tick-line {
    width: 2px;
    height: 10px;
    background-color: red;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
    margin-top: 10px;
}

.tick-label {
    position: absolute;
    top: 25px;
    font-size: 12px;
    font-style: oblique;
    font-weight: 600;
    color: white;
    text-shadow: 2px -2px 2px rgba(255, 255, 255, 0.4);
}

.needle {
    position: absolute;
    bottom: 50%;
    left: 50%;
    width: 4px;
    height: 44%;
    background-color: red;
    transform-origin: bottom center;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
    transition: transform 0.2s ease-out;
}

.center-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.speed-display-box {
    position: absolute;
    bottom: 40px;
    left: 50%;
    height: 10%;
    width: 30%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
    text-align: center;
    justify-items: center;
}

.speed-display {
    display: inline-block;
    color: white;
    transition: opacity 0.2s ease-in-out;
    font-size: 14px;
    animation: fadeIn 0.3 ease-out;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>