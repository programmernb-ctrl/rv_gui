export const Configs = {
    Settings: {
        debug: true,
    },
};

export function debugLog(...args): void {
    if (Configs.Settings.debug === true) {
        console.log(...args);
    }
}
