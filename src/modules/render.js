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

    const checkSection = document.createElement("div");
    checkSection.classList.add("check-section");

    const checkElement = document.createElement("input");
    checkElement.type = "checkbox";

    const labelELement = document.createElement("label");
    labelELement.textContent = task.title;

    // Add delete control
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task");

    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24"
     width="20"
     height="20"
     fill="currentColor">
  <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
</svg>`;

    if (task.completed) {
      taskElement.classList.add("completed");
      checkElement.checked = true;
    }

    checkSection.append(checkElement, labelELement);

    taskElement.append(checkSection, deleteButton);
    tasksElement.append(taskElement);
  }
}

export { renderProjects, renderTasks };
