import { addProject, removeProject } from "./storage.js";
import { renderProjects, renderTasks } from "./render.js";

const modalAddProject = document.querySelector("#add-project-modal");

function handleAddProject(event) {
  event.preventDefault();

  const projectNameInput = document.querySelector("#project-name");
  const projectName = projectNameInput.value;

  addProject(projectName);

  renderProjects();

  projectNameInput.value = "";
  modalAddProject.close();
}

function handleDeleteProject(event) {
  if (event.target.matches(".delete-project-btn")) {
    const id = event.target.closest("li").dataset.id;

    removeProject(id);

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

    renderTasks(id);
  }
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
}
