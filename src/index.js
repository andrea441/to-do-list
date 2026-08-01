import "./styles.css";

class Task {
  static PRIORITIES = ["low", "medium", "high"];

  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
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
}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}
