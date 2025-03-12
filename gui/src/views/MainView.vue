<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isVisible = ref<boolean>(false);

const handleMessage = (event: MessageEvent) => {
    const data = event.data;

    if (data.type === 'isVisible') {
        isVisible.value = data.value;

        if (isVisible.value) {
            router.push({ name: "test" });
        }
    }
};

onMounted(() => {
   window.addEventListener('message', handleMessage);
});

onUnmounted(() => {
    window.removeEventListener('message', handleMessage);
})
</script>

<style scoped>
</style>