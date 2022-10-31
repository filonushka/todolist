const newToDoForm = document.querySelector(".todo-form");
const list = document.querySelector(".list");
const allItemsButton = document.querySelector(".all-items__button");
const activeItemsButton = document.querySelector(".active-items__button");
const completedItemsButton = document.querySelector(".completed-items__button");
const clearCompletedButton = document.querySelector(".clear-completed__button");
const clearAllButton = document.querySelector(".clear-all__button");

// 1. рендерится ли в общий лист
// 2. обрабатывается submit
// 3. в ли также есть label, в котором есть checkbox и text, а также deletebutton
// 4. есть функция удаления по нажатию на кнопку
// 5. навесить слушатели событий на кнопки

function renderTask(text, done, id) {
  const li = document.createElement("li");
  li.setAttribute("draggable", "true");
  li.setAttribute("data-id", id);
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = done;
  const deleteButton = document.createElement("button");
  deleteButton.append("x");
  deleteButton.addEventListener("click", handleClickDelete);

  label.append(checkbox, text);
  li.append(label, deleteButton);
  list.append(li);
}

function handleSubmit(e) {
  const text = newToDoForm.text.value;
  const done = newToDoForm.done.checked;
  const id = Date.now();
  newToDoForm.text.value = "";

  renderTask(text, done, id);
  e.preventDefault();
}

newToDoForm.addEventListener("submit", handleSubmit);

function handleClickDelete(e) {
  const li = e.target.parentElement;
  li.remove();
}
