const newToDoForm = document.querySelector(".todo-form");
const list = document.querySelector(".list");
const clearCompletedButton = document.querySelector(".clear-all__button");
const allItemsButton = document.querySelector(".all-items__button");
const activeItemsButton = document.querySelector(".active-items__button");
const completedItemsButton = document.querySelector(".completed-items__button");

function addTask(done, text) {
  const li = document.createElement("li");
  li.setAttribute("draggable", "true");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete__button");
  deleteButton.append("x");
  deleteButton.addEventListener("click", handleClickDelete);

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = done;

  li.append(checkbox, text, deleteButton);
  list.appendChild(li);
}

function handleSubmit(e) {
  const text = newToDoForm.text.value;
  const done = newToDoForm.done.checked;
  addTask(done, text);
  newToDoForm.text.value = "";
  e.preventDefault();
}

function handleClickDelete(e) {
  const li = e.target.parentElement;
  li.remove();
}

newToDoForm.addEventListener("submit", handleSubmit);

function handleClearCompleted() {
  console.log("Clear completed");
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

clearCompletedButton.addEventListener("click", handleClearCompleted);
allItemsButton.addEventListener("click", handleAllItemsButton);
activeItemsButton.addEventListener("click", handleActiveItemsButton);
completedItemsButton.addEventListener("click", handleCompletedItemsButton);
