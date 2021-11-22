import { apiHandler } from "./api-handler.mjs";
import { eventHandler } from "./event-handler.mjs";
import { pageLoader } from "./page-loader.mjs";

export const uiController = (() => {
   const grid = document.querySelector("#grid");
   const errorMessage = document.querySelector("#error-message");
   const noResultsMessage = document.querySelector("#no-results-message");
   const countryPageContainer = document.querySelector("#country-page-container");
   let prevScrollPos = window.scrollY;
   let currentScrollPos = window.scrollY;
   let isDark = false;
   window.addEventListener("scroll", () => {
      if (!countryPageContainer.classList.contains("show")) {
         prevScrollPos = currentScrollPos;
         currentScrollPos = window.scrollY;
      }
   });

   const loadCountryCards = async () => {
      const countries = await apiHandler.getAllCountries();
      if (countries) {
         noResultsMessage.classList.remove("show");
         errorMessage.classList.remove("show");
         for (const country of countries) {
            createCountryCard(country);
         }
      } else {
         noResultsMessage.classList.remove("show");
         errorMessage.classList.add("show");
      }
   };

   const filterCountriesByRegion = async (region) => {
      grid.innerHTML = "";
      const countries = await apiHandler.getCountriesByRegion(region);
      if (countries) {
         noResultsMessage.classList.remove("show");
         errorMessage.classList.remove("show");
         for (const country of countries) {
            createCountryCard(country);
         }
      } else {
         noResultsMessage.classList.remove("show");
         errorMessage.classList.add("show");
      }
   };

   const searchCountry = async (query) => {
      grid.innerHTML = "";
      const country = await apiHandler.getCountryByName(query);
      if (country) {
         errorMessage.classList.remove("show");
         noResultsMessage.classList.remove("show");
         createCountryCard(country[0]);
      } else {
         errorMessage.classList.remove("show");
         noResultsMessage.classList.add("show");
      }
   };

   const createCountryCard = (country) => {
      const countryCard = document.createElement("div");
      const cssClasses = ["country-card", "border-radius", "homepage-text", "box-shadow"];
      if (!isDark) cssClasses.push("light-mode");
      else cssClasses.push("dark-mode");
      countryCard.classList.add(...cssClasses);
      const contentHTML =
         '<img class="country-card-flag-img">' +
         '<div class="country-card-info">' +
         '<h2 class="country-name"></h2>' +
         "<div>" +
         '<p><span class="info-label">Population: </span><span class="population"></span></p>' +
         '<p><span class="info-label">Region: </span><span class="region"></span></p>' +
         '<p><span class="info-label">Capital: </span><span class="capital"></span></p>' +
         "</div>" +
         "</div>";
      countryCard.innerHTML = contentHTML;
      countryCard.querySelector(".country-card-flag-img").src = country.flags.svg;
      countryCard.querySelector(".country-name").innerText = `${country.name}`;
      countryCard.querySelector(".population").innerText = `${country.population.toLocaleString()}`;
      countryCard.querySelector(".region").innerText = `${country.region}`;
      countryCard.querySelector(".capital").innerText = country.capital ? `${country.capital}` : "N/A";
      grid.appendChild(countryCard);
      fadeIn(countryCard);
      eventHandler.setupCountryCardAnimationListener(countryCard, fadeIn);
      eventHandler.setupCountryCardClickListener(countryCard, pageLoader.showCountryPage);
   };

   const fadeIn = (countryCard) => {
      if (countryCard.getBoundingClientRect().top - window.innerHeight < -50) {
         countryCard.classList.add("fade-in");
      }
   };

   const scrollBackToPos = () => {
      window.scrollTo(0, prevScrollPos);
   };

   const changeTheme = () => {
      isDark = !isDark;
   };

   return {
      loadCountryCards: loadCountryCards,
      filterCountriesByRegion: filterCountriesByRegion,
      searchCountry: searchCountry,
      changeTheme: changeTheme,
      scrollBackToPos: scrollBackToPos,
   };
})();
