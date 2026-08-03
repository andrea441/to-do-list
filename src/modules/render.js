import { getProjects } from "./storage.js";

projects = getProjects();

function renderProjects() {
  const projectsElement = document.getElementById("projects");
  projectsElement.replaceChildren();

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

// Render tasks when you click a project
function renderTasks(projectId) {
  const tasksElement = document.getElementById("tasks");
  tasksElement.replaceChildren();

  const selectedProject = projects.find((project) => project.id === projectId);
  const tasks = selectedProject.tasks;

  for (const task of tasks) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const checkElement = document.createElement("input");
    checkElement.type = "checkbox";
    checkElement.id = check;
  }
}

export { renderProjects, renderTasks };
