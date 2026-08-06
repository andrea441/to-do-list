export default class Project {
  constructor(name, tasks) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  findTask(id) {
    return this.tasks.find((task) => task.id === id);
  }
}
