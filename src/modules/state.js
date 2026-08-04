import Project from "./project.js";

const state = {
  projects: [],
  selectedProjectId: null,

  addProject(name) {
    this.projects.push(new Project(name));
  },

  removeProject(id) {
    const index = this.projects.findIndex((project) => project.id === id);

    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  },

  getSelectedProject() {
    return this.projects.find(
      (project) => project.id === this.selectedProjectId,
    );
  },
};

export default state;
