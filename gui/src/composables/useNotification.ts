import {ref, onMounted, onUnmounted} from 'vue';

export const useNotification = () => {
    const vehicleSpeed = ref<number>(0);
    const isInVehicle = ref<boolean>(false);

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const methods = {
        speed: (value: number) => {
            vehicleSpeed.value = value;
        },
        isInVehicle: (value) => {
            isInVehicle.value = value;
        },
    };

    function invoke(call: keyof typeof methods, value) {
        return methods[call](value);
    }

    const NData = (event: MessageEvent) => {
        const data = event.data;

        switch (data.type) {
            case 'speed':
                invoke('speed', data.value);
                break;
            case 'isInVehicle':
                invoke('isInVehicle', data.value);
                break;

            default:
                break;
        }
    };

    onMounted(() => {
        window.addEventListener('message', NData);
    });

    onUnmounted(() => {
        window.removeEventListener('message', NData);
    });

    return {
        vehicleSpeed,
        isInVehicle,
    };
};
