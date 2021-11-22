import { uiController } from "./ui-controller.mjs";

export const themeController = (() => {
   let isDark = false;
   const moonIcon = document.querySelector("#moon-icon");

   const toggleTheme = () => {
      if (!isDark) {
         changeTheme("dark");
      } else {
         changeTheme("light");
      }
   };

   const changeTheme = (theme) => {
      let cssClass;
      if (theme === "dark") {
         cssClass = "dark-mode";
         moonIcon.src = "./assets/moon-solid.svg";
         replaceAllCssClasses("light-mode", "dark-mode", document.body);
      } else if (theme === "light") {
         cssClass = "light-mode";
         moonIcon.src = "./assets/moon-regular.svg";
         replaceAllCssClasses("dark-mode", "light-mode", document.body);
      } else {
         throw new Error("Unrecognizable theme: " + theme);
      }
      isDark = !isDark;
      uiController.changeTheme();
   };

   const replaceAllCssClasses = (cssClassOld, cssClasNew, elem) => {
      if (elem.classList.contains(cssClassOld)) {
         elem.classList.remove(cssClassOld);
         elem.classList.add(cssClasNew);
      }
      if (elem.children.length === 0) {
         return;
      }
      for (const child of elem.children) {
         replaceAllCssClasses(cssClassOld, cssClasNew, child);
      }
   };

   return {
      toggleTheme: toggleTheme,
   };
})();
