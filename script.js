const newToDoForm = document.querySelector(".todo-form");
const list = document.querySelector(".list");
const clearCompletedButton = document.querySelector(".clear-completed__button");
const clearAllButton = document.querySelector(".clear-all__button");
const allItemsButton = document.querySelector(".all-items__button");
const activeItemsButton = document.querySelector(".active-items__button");
const completedItemsButton = document.querySelector(".completed-items__button");

let todoArray = [];

clearCompletedButton.addEventListener("click", handleClearCompleted);
clearAllButton.addEventListener("click", handleClearAll);
allItemsButton.addEventListener("click", handleAllItemsButton);
activeItemsButton.addEventListener("click", handleActiveItemsButton);
completedItemsButton.addEventListener("click", handleCompletedItemsButton);

function addTask(done, text) {
  const li = document.createElement("li");
  li.setAttribute("draggable", "true");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete__button");
  deleteButton.append("x");
  deleteButton.addEventListener("click", handleClickDelete);

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "task-done");
  checkbox.checked = done;

  const label = document.createElement("label");
  label.setAttribute("id", "task-done");
  li.append(checkbox, text, deleteButton, label);
  list.appendChild(li);
}

function handleSubmit(e) {
  const text = newToDoForm.text.value;
  const done = newToDoForm.done.checked;
  e.preventDefault();
  if (text === "") {
    return;
  }
  addTask(done, text);
  newToDoForm.text.value = "";

  const createItemObj = (arr) => {
    const itemObj = {};
    itemObj.name = text;
    itemObj.id = Date.now();
    itemObj.done = false;

    arr.push(itemObj);
  };
  createItemObj(todoArray);
  localStorage.setItem("key", JSON.stringify(todoArray));
}

function handleClickDelete(e) {
  const li = e.target.parentElement;

  li.remove();
}

newToDoForm.addEventListener("submit", handleSubmit);

function handleClearCompleted() {
  console.log("Clear completed");
}

function handleClearAll() {
  list.innerHTML = "";
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
