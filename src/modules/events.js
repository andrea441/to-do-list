import { saveStorage } from "./storage.js";
import { renderProjects, renderTasks } from "./render.js";
import Task from "./task.js";
import state from "./state.js";

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

  const task = new Task(taskTitle, "test", "test", "medium", false);
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
    document.querySelector("#task-date").value = selectedTask.date;
    document.querySelector("#task-priority").value = selectedTask.priority;
    editModal.showModal();
  }
}

function handleEditTask() {}

export default function initEvents() {
  const buttonInvokeAddProjectModal = document.querySelector(
    "#open-add-project-modal",
  );
  const buttonCancelAddProject = document.querySelector(
    "#add-project-cancel-btn",
  );

  const buttonCancelEditTask = document.querySelector("#edit-task-cancel-btn");

  const formAddProject = document.querySelector("#add-project-form");
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
