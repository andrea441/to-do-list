import "./styles.css";
import {
  loadPriorities,
  renderProjects,
  renderTasks,
} from "./modules/render.js";
import initEvents from "./modules/events.js";
import { loadStorage } from "./modules/storage.js";

loadStorage();
renderProjects();
renderTasks();
initEvents();
loadPriorities();
