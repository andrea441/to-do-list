export default class Task {
  static PRIORITIES = ["low", "medium", "high"];

  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }

  set priority(value) {
    if (!Task.PRIORITIES.includes(value)) {
      throw new Error(
        `Priority has to be one of these: ${PRIORITIES.join(", ")}`,
      );
    }
    this._priority = value;
  }

  get priority() {
    return this._priority;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}
