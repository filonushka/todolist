const newToDoForm = document.querySelector(".todo-form");
const list = document.querySelector(".list");
const clearCompletedButton = document.querySelector(".clear-completed__button");
const clearAllButton = document.querySelector(".clear-all__button");
const [allTasksLeft, activeTasksLeft, completedTasksLeft] =
  document.querySelectorAll(".task-counter");

let counter = 0;

let todoArray = JSON.parse(localStorage.getItem("tasks")) ?? [];
//рендеринг сохраненных данных при обновлении страницы
list.replaceChildren();
todoArray.forEach((task) => renderTask(task.done, task.text, task.id));
//- todoArray.forEach(({ done, text, id }) => renderTask(done, text, id));

newToDoForm.addEventListener("submit", handleSubmit);
clearCompletedButton.addEventListener("click", () => clearTasks(true));
clearAllButton.addEventListener("click", () => clearTasks());

function renderTask(done, text, id) {
  const li = document.createElement("li");
  li.setAttribute("draggable", "true");
  li.setAttribute("data-id", id);

  const label = document.createElement("label");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = done;
  checkbox.addEventListener("change", handleChangeStatus);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete__button");
  deleteButton.append("x");
  deleteButton.addEventListener("click", handleClickDelete);

  label.append(checkbox, text);
  li.append(label, deleteButton);
  list.appendChild(li);
  updateTaskCounters();
}

function handleSubmit(e) {
  const text = newToDoForm.text.value;
  const done = newToDoForm.done.checked;
  const id = Date.now();
  if (text === "") {
    return;
  }
  newToDoForm.text.value = "";

  const task = { text, id, done };
  todoArray.push(task);

  renderTask(done, text, id);
  localStorage.setItem("tasks", JSON.stringify(todoArray));
  updateTaskCounters();
  e.preventDefault();
}

function handleClickDelete(e) {
  const li = e.target.parentElement;
  li.remove();
  const i = todoArray.findIndex((task) => task.id == li.dataset.id);
  todoArray.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(todoArray));
  updateTaskCounters();
}

function handleChangeStatus(e) {
  const id = e.target.closest("li").dataset.id;
  const task = todoArray.find((task) => task.id == id);
  task.done = e.target.checked;
  localStorage.setItem("tasks", JSON.stringify(todoArray));
  updateTaskCounters();
}

function clearTasks(removeOnlyCompleted) {
  if (removeOnlyCompleted) {
    todoArray = todoArray.filter((task) => !task.done);
    localStorage.setItem("tasks", JSON.stringify(todoArray));
    list.replaceChildren(
      ...[...list.children].filter((li) => !li.querySelector(":checked"))
    );
  } else {
    todoArray = [];
    localStorage.setItem("tasks", "[]");
    list.replaceChildren();
  }
  updateTaskCounters();
}

function updateTaskCounters() {
  allTasksLeft.textContent = `${todoArray.length} task${
    todoArray.length == 1 ? "" : "s"
  }`;
  const activeCount = todoArray.filter((task) => !task.done).length;
  activeTasksLeft.textContent = `${activeCount} task${
    activeCount == 1 ? "" : "s"
  } left`;
  const completedCount = todoArray.filter((task) => task.done).length;
  completedTasksLeft.textContent = `${completedCount} task${
    completedCount == 1 ? "" : "s"
  } completed`;
}

updateTaskCounters();
