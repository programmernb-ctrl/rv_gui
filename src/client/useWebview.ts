interface Pages {
   [key: string]: string;
}

// Define the valid pages -- you can add more pages here!
// the pages you define here should be registered with the same name as in the gui/src/router.ts
export const validPages: Pages = {
   home: "home",
   test: "test",
   hud: "hud",
   gas: "gas",
}

export const useWebview = () => {
   let list: Pages = validPages;
   let currentPage: keyof Pages | undefined = undefined;
   let isFocused: boolean = false;

   const getPage = () => {
      return currentPage;
   }

   const setPage = (page: keyof Pages) => {
      if (page in list) {
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
