import { apiHandler } from "./api-handler.mjs";
import { eventHandler } from "./event-handler.mjs";
import { uiController } from "./ui-controller.mjs";

export const pageLoader = (() => {
   const inputsContainer = document.querySelector("#inputs-container");
   const grid = document.querySelector("#grid");
   const countryPage = document.querySelector("#country-page-container");
   const main = document.querySelector("main");
   const flagImgElem = document.querySelector("#country-flag-img");
   const countryNameElem = document.querySelector("#country-name");
   const nativeNameElem = document.querySelector("#native-name");
   const populationElem = document.querySelector("#population");
   const regionElem = document.querySelector("#region");
   const subRegionElem = document.querySelector("#sub-region");
   const capitalElem = document.querySelector("#capital");
   const topLevelDomainElem = document.querySelector("#top-level-domain");
   const currenciesElem = document.querySelector("#currencies");
   const languagesElem = document.querySelector("#languages");
   const borderCountries = document.querySelector("#border-countries");
   const errBtn = document.querySelector("#error-message-page-loader");
   const nonApplicable = "N/A";
   let isDark = false;

   const showCountryPage = async (countryName) => {
      const countryData = await apiHandler.getCountryByName(countryName.replace(/\s+/g, "%20").toLowerCase());
      if(countryData) {
         borderCountries.innerHTML = "";
         populateCountryPage(countryData);
         inputsContainer.classList.remove("show");
         grid.classList.remove("show");
         countryPage.classList.add("show");
         window.scrollTo(0, 0);
         main.classList.add("remove-padding");
      } else {
         errBtn.classList.add("show");
      }
   };

   const populateCountryPage = async (countryData) => {
      const { flags, name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders } = countryData[0];
      flagImgElem.src = flags.svg;
      countryNameElem.innerText = name;
      nativeNameElem.innerText = nativeName ? nativeName : nonApplicable;
      populationElem.innerText = population ? population.toLocaleString() : nonApplicable;
      regionElem.innerText = region ? region : nonApplicable;
      subRegionElem.innerText = subregion ? subregion : nonApplicable;
      capitalElem.innerText = capital ? capital : nonApplicable;
      topLevelDomainElem.innerText = topLevelDomain ? topLevelDomain : nonApplicable;
      let currenciesString = "";
      if(currencies) {
         for(let i = 0; i < currencies.length; i++) {
            currenciesString += currencies[i].name;
            if(i != currencies.length - 1 && currencies.length > 1) currenciesString += ", ";
         }
      } else {
         currenciesString = nonApplicable;
      }
      currenciesElem.innerText = currenciesString;
      let languagesString = "";
      if(languages) {
         for (let i = 0; i < languages.length; i++) {
            languagesString += languages[i].name;
            if (i != languages.length - 1 && languages.length > 1) languagesString += ", ";
         }
      } else {
         languagesString = nonApplicable;
      }
      languagesElem.innerText = languagesString;
      if(borders) {
         for (let i = 0; i < borders.length; i++) {
            const country = await apiHandler.getCountryByCode(borders[i]);
            const li = document.createElement("li");
            li.innerHTML = '<button class="border-country-btn light-mode border-radius">' + country.name + '</button>';
            eventHandler.setupBorderCountryBtnListener(li, showCountryPage);
            borderCountries.appendChild(li);
         }
      } else {
         const li = document.createElement("li");
         li.innerText = "None";
         borderCountries.appendChild(li);
      }
   };

   const closeCountryPage = () => {
      countryPage.classList.remove("show");
      inputsContainer.classList.add("show");
      grid.classList.add("show");
      main.classList.remove("remove-padding");
      uiController.scrollBackToPos();
   };

   return {
      showCountryPage: showCountryPage,
      closeCountryPage: closeCountryPage,
   };
})();
