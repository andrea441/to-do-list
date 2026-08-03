import Project from "./project.js";
import Task from "./task.js";

let projects = [];

function loadStorage() {
  const rawData = JSON.parse(localStorage.getItem("projects")) || [];

  projects = rawData.map((project) => {
    const tasks = project.tasks.map(
      (task) =>
        new Task(task.title, task.description, task.dueDate, task.priority),
    );
    const newProject = new Project(project.name);
    newProject.tasks = tasks;

    return newProject;
  });
}

function saveStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function getProjects() {
  return projects;
}

function addProject(name) {
  projects.push(new Project(name));

  saveStorage();
}

function removeProject(id) {
  const index = projects.findIndex((project) => project.id === id);

  if (index !== -1) {
    projects.splice(index, 1);
  }

  saveStorage();
}

loadStorage();

export { getProjects, addProject, removeProject };
