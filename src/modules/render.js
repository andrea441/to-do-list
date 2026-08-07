import state from "./state.js";
import Task from "./task.js";

function loadPriorities() {
  const priorityDropdown = document.querySelector("#task-priority");

  Task.PRIORITIES.forEach((priority) => {
    const newOption = document.createElement("option");
    newOption.text = priority.charAt(0).toUpperCase() + priority.slice(1);
    newOption.value = priority;

    priorityDropdown.append(newOption);
  });
}
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

    const buttonSection = document.createElement("div");
    buttonSection.classList.add("task-buttons");

    // Add edit button
    const editButton = document.createElement("button");
    editButton.classList.add("edit-task");
    editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor">
    <title>pencil</title>
    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
</svg>`;

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

    buttonSection.append(editButton, deleteButton);

    if (task.completed) {
      taskElement.classList.add("completed");
      checkElement.checked = true;
    }

    checkSection.append(checkElement, labelELement);

    taskElement.append(checkSection, buttonSection);
    tasksElement.append(taskElement);
  }
}

export { loadPriorities, renderProjects, renderTasks };
