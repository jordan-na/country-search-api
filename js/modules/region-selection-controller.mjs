import { uiController } from "./ui-controller.mjs";

export const regionSelectionController = (() => {
   const regionSelection = document.querySelector("#region-selection");
   const arrow = document.querySelector("#arrow");

   const toggleRegionSelection = () => {
      regionSelection.classList.toggle("appear");
      arrow.classList.toggle("flip");
   };

   const filterByRegion = function () {
      toggleRegionSelection();
      const region = (this.innerText === "America") ? "Americas" : this.innerText;
      uiController.filterCountriesByRegion(region);
   };

   return {
      toggleRegionSelection: toggleRegionSelection,
      filterByRegion: filterByRegion,
   };
})();
