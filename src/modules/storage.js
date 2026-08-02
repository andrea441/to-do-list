import Project from "./project.js";
import Task from "./task.js";

let projects = [];

// Obtener datos de localStorage
function loadStorage() {
  projects = JSON.parse(localStorage.getItem("projects")) || [];

  // Convert every item in a Project object

  // Convert every task item in a Task object
}

// Guardar datos en localStorage
function saveStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function getProjects() {
  return projects;
}

function addProject(name) {
  projects.push(new Project(name));

  saveStorage();
}

function removeProject(id) {
  const index = projects.findIndex((project) => project.id === id);

  if (index !== -1) {
    projects.splice(index, 1);
  }

  saveStorage();
}

loadStorage();

export { getProjects, addProject, removeProject };
