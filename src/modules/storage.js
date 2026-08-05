import Project from "./project.js";
import Task from "./task.js";
import state from "./state.js";

function loadStorage() {
  const rawData = JSON.parse(localStorage.getItem("projects")) || [];

  state.projects = rawData.map((project) => {
    const tasks = project.tasks.map(
      (task) =>
        new Task(
          task.title,
          task.description,
          task.dueDate,
          task._priority,
          task.completed,
        ),
    );
    const newProject = new Project(project.name);
    newProject.tasks = tasks;

    return newProject;
  });

  if (state.projects.length === 0) {
    state.addProject("Default");
    saveStorage();
  }

  state.selectedProjectId = state.projects[0].id;
}

function saveStorage() {
  localStorage.setItem("projects", JSON.stringify(state.projects));
}

export { loadStorage, saveStorage };
