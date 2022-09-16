const newToDoForm = document.querySelector(".todo-form");
const list = document.querySelector(".list");

function addTask(done, text) {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");
  const checkbox = document.createElement("input");

  deleteButton.append("x");
  deleteButton.addEventListener("click", handleClickDelete);

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
