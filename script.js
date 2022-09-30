const newToDoForm = document.querySelector(".todo-form");
const list = document.querySelector(".list");
const clearCompletedButton = document.querySelector(".clear-completed__button");
const clearAllButton = document.querySelector(".clear-all__button");
const allItemsButton = document.querySelector(".all-items__button");
const activeItemsButton = document.querySelector(".active-items__button");
const completedItemsButton = document.querySelector(".completed-items__button");

const todoArray = JSON.parse(localStorage.getItem("tasks")) ?? [];
//рендеринг сохраненных данных при обновлении страницы
todoArray.forEach((task) => addTask(task.done, task.name, task.id));

clearCompletedButton.addEventListener("click", handleClearCompleted);
clearAllButton.addEventListener("click", handleClearAll);
allItemsButton.addEventListener("click", handleAllItemsButton);
activeItemsButton.addEventListener("click", handleActiveItemsButton);
completedItemsButton.addEventListener("click", handleCompletedItemsButton);

function addTask(done, text, id) {
  const li = document.createElement("li");
  li.setAttribute("draggable", "true");
  li.setAttribute("data-id", id);

  const label = document.createElement("label");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = done;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete__button");
  deleteButton.append("x");
  deleteButton.addEventListener("click", handleClickDelete);

  label.append(checkbox, text);
  li.append(deleteButton, label);
  list.appendChild(li);
}

function handleSubmit(e) {
  const text = newToDoForm.text.value;
  const done = newToDoForm.done.checked;
  e.preventDefault();
  if (text === "") {
    return;
  }
  newToDoForm.text.value = "";

  const task = {
    name: text,
    id: Date.now(),
    done: done,
  };

  todoArray.push(task);

  addTask(done, text, task.id);

  localStorage.setItem("tasks", JSON.stringify(todoArray));
}

function handleClickDelete(e) {
  const li = e.target.parentElement;
  li.remove();
  const i = todoArray.findIndex((task) => task.id == li.dataset.id);
  todoArray.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(todoArray));
}

newToDoForm.addEventListener("submit", handleSubmit);

function handleClearCompleted() {
  console.log("Clear completed");
}

function handleClearAll() {
  list.innerHTML = "";
  todoArray.length = 0;
  localStorage.setItem("tasks", JSON.stringify(todoArray));
}

function handleAllItemsButton() {
  console.log("All");
}

function handleActiveItemsButton() {
  console.log("Active");
}

function handleCompletedItemsButton() {
  console.log("Completed");
}
