import { onMounted, onUnmounted } from 'vue';

interface NuiMessage<T = unknown> {
    type: string;
    value: T;
}

export const useNui = <T = unknown>(type: string, handler: (value: T) => void) => {
    const eventListener = (event: MessageEvent<NuiMessage<T>>) => {
        const { type: eventType, value } = event.data;

        if (eventType === type) {
            handler(value);
        }
    };

    onMounted(() => window.addEventListener('message', eventListener));
    onUnmounted(() => window.removeEventListener('message', eventListener));
};
