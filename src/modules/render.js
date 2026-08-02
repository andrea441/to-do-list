import { getProjects } from "./storage.js";

function renderProjects() {
  const projectsElement = document.getElementById("projects");
  projectsElement.replaceChildren();

  const projects = getProjects();

  for (const project of projects) {
    const projectItem = document.createElement("li");
    projectItem.dataset.id = project.id;
    projectItem.textContent = project.name;

    const projectDelete = document.createElement("button");
    projectDelete.textContent = "✕";
    projectDelete.classList.add("delete-project-btn");
    projectItem.append(projectDelete);

    projectsElement.append(projectItem);
  }
}

// Render task when you click a project
function renderTasks() {}

export { renderProjects };
