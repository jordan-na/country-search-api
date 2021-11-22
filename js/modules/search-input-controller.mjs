import { uiController } from "./ui-controller.mjs";

export const searchInputController = (() => {
   const search = function (evt) {
      const query = this.nextElementSibling.value.toLowerCase();
      if(query.length != 0) uiController.searchCountry(query);
   };

   const searchByEnter = function (evt) {
      if(evt.keyCode === 13) {
         evt.preventDefault();
         const query = this.value.toLowerCase();
         uiController.searchCountry(query);
      }
   };

   return {
      search: search,
      searchByEnter: searchByEnter,
   };
})();
