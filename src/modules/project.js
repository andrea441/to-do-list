export default class Project {
  constructor(name, tasks) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  findTask(id) {
    return this.tasks.find((task) => task.id === id);
  }
}
