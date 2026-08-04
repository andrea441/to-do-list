import { saveStorage } from "./storage.js";
import { renderProjects, renderTasks } from "./render.js";
import Task from "./task.js";
import state from "./state.js";

const modalAddProject = document.querySelector("#add-project-modal");

function handleAddProject(event) {
  event.preventDefault();

  const projectNameInput = document.querySelector("#project-name");
  const projectName = projectNameInput.value;

  state.addProject(projectName);
  saveStorage();

  renderProjects();

  projectNameInput.value = "";
  modalAddProject.close();
}

function handleDeleteProject(event) {
  if (event.target.matches(".delete-project-btn")) {
    const id = event.target.closest("li").dataset.id;

    state.removeProject(id);
    saveStorage();

    renderProjects();
  } else if (
    event.target.matches("li") &&
    !event.target.classList.contains("active")
  ) {
    const activeElements = document.querySelectorAll(".active");
    activeElements.forEach((element) => {
      element.classList.remove("active");
    });

    event.target.classList.add("active");
    const id = event.target.dataset.id;

    state.selectedProjectId = id;
    renderTasks();
  }
}

function handleAddTask(event) {
  event.preventDefault();

  const taskTitleInput = document.querySelector("#task-title");
  const taskTitle = taskTitleInput.value;

  const task = new Task(taskTitle, "test", "test", "medium");
  state.getSelectedProject().addTask(task);
  saveStorage();

  renderTasks();
  taskTitleInput.value = "";
}

export default function initEvents() {
  const buttonInvokeAddProjectModal = document.querySelector(
    "#open-add-project-modal",
  );
  const buttonCancelAddProject = document.querySelector(
    "#add-project-cancel-btn",
  );
  const formAddProject = document.querySelector("#add-project-form");
  const projectsList = document.querySelector("#projects");
  const formAddTask = document.querySelector("#create-task");

  // Add Project Modal
  buttonInvokeAddProjectModal.addEventListener("click", () =>
    modalAddProject.showModal(),
  );

  buttonCancelAddProject.addEventListener("click", () =>
    modalAddProject.close(),
  );

  formAddProject.addEventListener("submit", handleAddProject);

  // Delete project
  projectsList.addEventListener("click", handleDeleteProject);

  // Add task
  formAddTask.addEventListener("submit", handleAddTask);
}
