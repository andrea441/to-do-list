import { addProject } from "./storage.js";
import { renderProjects } from "./render.js";

const modalAddProject = document.querySelector("#add-project-modal");

function handleAddProject(event) {
  event.preventDefault();

  const projectNameInput = document.querySelector("#project-name");
  const projectName = projectNameInput.value;

  addProject(projectName);

  renderProjects();

  // Clean inputs
  projectNameInput.value = "";
  modalAddProject.close();
}

export default function initEvents() {
  const buttonInvokeAddProjectModal = document.querySelector(
    "#open-add-project-modal",
  );
  const buttonCancelAddProject = document.querySelector(
    "#add-project-cancel-btn",
  );
  const formAddProject = document.querySelector("#add-project-form");

  // Add Project Modal
  buttonInvokeAddProjectModal.addEventListener("click", () =>
    modalAddProject.showModal(),
  );

  buttonCancelAddProject.addEventListener("click", () =>
    modalAddProject.close(),
  );

  formAddProject.addEventListener("submit", handleAddProject);
}
