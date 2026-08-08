import { saveStorage } from "./storage.js";
import { renderProjects, renderTasks } from "./render.js";
import Task from "./task.js";
import state from "./state.js";
import { format } from "date-fns";

const modalAddProject = document.querySelector("#add-project-modal");
const modalEditTask = document.querySelector("#edit-task-modal");

function handleAddProject(event) {
  event.preventDefault();

  const projectNameInput = document.querySelector("#project-name");
  const projectName = projectNameInput.value;

  state.addProject(projectName);
  saveStorage();

  renderProjects();
  renderTasks();

  projectNameInput.value = "";
  modalAddProject.close();
}

function handleDeleteProject(event) {
  if (event.target.matches(".delete-project-btn")) {
    const id = event.target.closest("li").dataset.id;

    state.removeProject(id);

    saveStorage();
    renderProjects();
    renderTasks();
  } else if (event.target.matches("li")) {
    const id = event.target.dataset.id;
    state.selectedProjectId = id;

    renderProjects();
    renderTasks();
  }
}

function handleAddTask(event) {
  event.preventDefault();

  const taskTitleInput = document.querySelector("#task-title");
  const taskTitle = taskTitleInput.value;
  const taskDateInput = document.querySelector("#task-due-date");
  const [year, month, day] = taskDateInput.value.split("-");

  const task = new Task(
    taskTitle,
    "",
    format(new Date(year, month - 1, day), "yyyy-MM-dd"),
    "low",
    false,
  );

  state.getSelectedProject().addTask(task);
  saveStorage();

  renderTasks();
  taskTitleInput.value = "";
}

function handleCheckTask(event) {
  if (event.target.type === "checkbox") {
    const taskElement = event.target.closest(".task");
    const taskId = taskElement.dataset.id;
    const selectedProject = state.getSelectedProject();
    const selectedTask = selectedProject.findTask(taskId);
    selectedTask.toggleCompleted();

    saveStorage();
    renderTasks();
  }
}

function handleTaskClick(event) {
  const taskElement = event.target.closest(".task");
  if (!taskElement) return;

  const taskId = taskElement.dataset.id;
  const selectedProject = state.getSelectedProject();

  if (event.target.closest(".delete-task")) {
    selectedProject.removeTask(taskId);
    saveStorage();
    renderTasks();
  }

  if (event.target.closest(".edit-task")) {
    const editModal = document.querySelector("#edit-task-modal");

    const selectedTask = selectedProject.findTask(taskId);

    document.querySelector("#task-name").value = selectedTask.title;
    document.querySelector("#task-description").value =
      selectedTask.description;
    document.querySelector("#task-date").value = selectedTask.dueDate;
    document.querySelector("#task-priority").value = selectedTask.priority;

    state.editingTaskId = taskId;
    editModal.showModal();
  }
}

function handleEditTask(event) {
  event.preventDefault();
  const selectedProject = state.getSelectedProject();
  const currentTask = selectedProject.findTask(state.editingTaskId);

  currentTask.title = document.querySelector("#task-name").value;
  currentTask.description = document.querySelector("#task-description").value;
  currentTask.date = document.querySelector("#task-date").value;
  currentTask.priority = document.querySelector("#task-priority").value;

  // TODO: Show an alert of correct saving
  saveStorage();
  renderTasks();

  modalEditTask.close();
}

export default function initEvents() {
  const buttonInvokeAddProjectModal = document.querySelector(
    "#open-add-project-modal",
  );
  const buttonCancelAddProject = document.querySelector(
    "#add-project-cancel-btn",
  );

  const buttonCancelEditTask = document.querySelector("#edit-task-cancel-btn");

  const formAddProject = document.querySelector("#add-project-form");
  const formAddTask = document.querySelector("#create-task");
  const projectsList = document.querySelector("#projects");
  const formEditTask = document.querySelector("#edit-task-form");
  const tasksElement = document.querySelector("#tasks");

  // Add Project Modal
  buttonInvokeAddProjectModal.addEventListener("click", () =>
    modalAddProject.showModal(),
  );
  buttonCancelAddProject.addEventListener("click", () =>
    modalAddProject.close(),
  );
  formAddProject.addEventListener("submit", handleAddProject);

  // Edit Task Modal
  buttonCancelEditTask.addEventListener("click", () => modalEditTask.close());
  formEditTask.addEventListener("submit", handleEditTask);

  // Delete project
  projectsList.addEventListener("click", handleDeleteProject);

  // Add task
  formAddTask.addEventListener("submit", handleAddTask);

  // Check task as completed
  tasksElement.addEventListener("change", handleCheckTask);
  tasksElement.addEventListener("click", handleTaskClick);
}
