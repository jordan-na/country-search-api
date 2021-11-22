import { themeController } from "./theme-controller.mjs";
import { searchInputController } from "./search-input-controller.mjs";
import { regionSelectionController } from "./region-selection-controller.mjs";
import { pageLoader } from "./page-loader.mjs";

export const eventHandler = (() => {
   const setupDarkModeBtnListener = () => {
      const toggleDarkBtn = document.querySelector("#toggle-dark-btn");
      toggleDarkBtn.addEventListener("click", themeController.toggleTheme);
   };

   const setupSearchInputListener = () => {
      const searchBtn = document.querySelector("#search-btn");
      const searchInput = document.querySelector("#search-input");
      searchBtn.addEventListener("click", searchInputController.search);
      searchInput.addEventListener("keydown", searchInputController.searchByEnter);
   };

   const setupRegionSelectionListeners = () => {
      const filterBtn = document.querySelector("#filter-btn");
      const regionBtns = document.querySelectorAll(".region-btn");
      filterBtn.addEventListener("click", regionSelectionController.toggleRegionSelection);
      for(const btn of regionBtns) {
         btn.addEventListener("click", regionSelectionController.filterByRegion);
      }
   };

   const setupCountryCardAnimationListener = (countryCard, animation) => {
      window.addEventListener("scroll", () => animation(countryCard));
   };

   const setupCountryCardClickListener = (countryCard, showCountryPage) => {
      countryCard.addEventListener("click", () => {
         const name = countryCard.querySelector(".country-card-info .country-name").innerText;
         showCountryPage(name);
      });
   };

   const setupBorderCountryBtnListener = (borderCountryBtn, showCountryPage) => {
      borderCountryBtn.addEventListener("click", () => {
         const name = borderCountryBtn.firstElementChild.innerText;
         showCountryPage(name)
      });
   };

   const setupBackBtnListener = () => {
      const backBtn = document.querySelector("#back-btn");
      backBtn.addEventListener("click", pageLoader.closeCountryPage);
   }

   const setupErrCloseBtnListener = () => {
      const errBtn = document.querySelector("#close-btn");
      errBtn.addEventListener("click", () => errBtn.parentElement.classList.remove("show"));
   };

   const setupEventListeners = () => {
      setupDarkModeBtnListener();
      setupSearchInputListener();
      setupRegionSelectionListeners();
      setupBackBtnListener();
      setupErrCloseBtnListener();
   };

   return {
      setupEventListeners: setupEventListeners,
      setupCountryCardAnimationListener: setupCountryCardAnimationListener,
      setupCountryCardClickListener: setupCountryCardClickListener,
      setupBorderCountryBtnListener: setupBorderCountryBtnListener,
   };
})();