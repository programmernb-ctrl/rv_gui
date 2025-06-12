import {debugLog} from '@/common/Config';

type AllowedPages = 'home' | 'test' | 'hud'

// Define the valid pages -- you can add more pages here!
// the pages you define here should be registered with the same name as in the gui/src/router.ts
export const validPages: Record<AllowedPages, AllowedPages> = {
    home: 'home',
    test: 'test',
    hud: 'hud',
};

export const useWebview = () => {
    const list = validPages;
    let currentPage: AllowedPages | undefined = undefined;
    let isFocused = false;

    const getPage = () => currentPage;
    
    const setPage = (page: AllowedPages) => {
        if (page in list) {
            currentPage = page;

            debugLog(`^3[rv_gui] Boilerplate^0 :: page is beeing set to: ^5'${currentPage}'^0`);

            SendNUIMessage({
                type: 'page',
                value: currentPage,
            });
        } else {
            debugLog(`^3[rv_gui] Boilerplate^0 :: tried to set invalid page: ^1'${page}'^0`);
        }
    };

    const focus = () => {
        isFocused = true;
        if (!IsNuiFocused()) SetNuiFocus(true, true);
    };

    const stateFocused = () => isFocused ?? IsNuiFocused();

    const unfocus = () => {
        isFocused = false;

        if (IsNuiFocused()) SetNuiFocus(false, false);
    };

    return {
        list,
        isFocused,
        getPage,
        setPage,
        focus,
        stateFocused,
        unfocus,
    };
};
