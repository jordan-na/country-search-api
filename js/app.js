import { uiController } from "./modules/ui-controller.mjs";
import { eventHandler } from "./modules/event-handler.mjs";

const init = async () => {
   await uiController.loadCountryCards();
   eventHandler.setupEventListeners();
};

window.onload = init;
