import state from "./state.js";

function renderProjects() {
  const projects = state.projects;

  const projectsElement = document.getElementById("projects");
  projectsElement.replaceChildren();

  for (const project of projects) {
    const projectItem = document.createElement("li");
    projectItem.dataset.id = project.id;
    projectItem.textContent = project.name;

    if (project.id === state.selectedProjectId) {
      projectItem.classList.add("active");
    }

    const projectDelete = document.createElement("button");
    projectDelete.textContent = "✕";
    projectDelete.classList.add("delete-project-btn");
    projectItem.append(projectDelete);

    projectsElement.append(projectItem);
  }
}

// Render tasks when you click a project
function renderTasks() {
  const tasksElement = document.getElementById("tasks");
  tasksElement.replaceChildren();

  const selectedProject = state.getSelectedProject();

  if (!selectedProject) {
    return;
  }

  const tasks = [...selectedProject.tasks].sort((a, b) => {
    return a.completed - b.completed;
  });

  const titleElement = document.getElementById("main-title");
  titleElement.textContent = selectedProject.name;

  for (const task of tasks) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.dataset.id = task.id;

    const checkElement = document.createElement("input");
    checkElement.type = "checkbox";

    const labelELement = document.createElement("label");
    labelELement.textContent = task.title;

    if (task.completed) {
      taskElement.classList.add("completed");
      checkElement.checked = true;
    }

    taskElement.append(checkElement, labelELement);
    tasksElement.append(taskElement);
  }
}

export { renderProjects, renderTasks };
