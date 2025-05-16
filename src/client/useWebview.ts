export type PageIndex = "home" | "test" | "hud" | "gas";

type PageList = {
   [key in PageIndex]: {
      url: string;
   }
}

const pageList: PageList = {
   home: {
      url: "home",
   },
   test: {
      url: "test",
   },
   hud: {
      url: "hud",
   },
   gas: {
      url: "gas",
   },
};

interface PageType {
   url?: string
}
interface Page {
   [key: string]: PageType
}

export const useWebview = () => {
   let list: Page = pageList;
   let currentPage: PageIndex | undefined = undefined;
   let isFocused: boolean = false;

   const getPage = () => {
      return currentPage;
   }

   const setPage = (page: PageIndex) => {
      if (list[page]) {
         currentPage = page;

         Citizen.trace(`^3[rv_gui] Boilerplate^0 :: page is beeing set to: ^5'${currentPage}'^0`);

         SendNUIMessage({
            type: 'page',
            value: currentPage
         });
      } else {
         Citizen.trace(`^3[rv_gui] Boilerplate^0 :: tried to set invalid page: ^1'${page}'^0`);
         return
      }
   };

   const focus = () => {
      isFocused = true

      if (!IsNuiFocused()) {
         SetNuiFocus(true, true);
      }
   }

   const stateFocused = () => {
      return isFocused ?? IsNuiFocused();
   }

   const unfocus = () => {
      isFocused = false

      if (IsNuiFocused()) {
         SetNuiFocus(false, false)
      }
   }

   

   return {
      list,
      isFocused,
      getPage,
      setPage,
      focus,
      stateFocused,
      unfocus,
   }
}
