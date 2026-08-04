import "./styles.css";
import { renderProjects } from "./modules/render.js";
import initEvents from "./modules/events.js";
import { loadStorage } from "./modules/storage.js";

loadStorage();
renderProjects();
initEvents();
