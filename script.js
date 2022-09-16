const newToDoForm = document.querySelector(".todo-form");
const list = document.querySelector(".list");

function addTask(done, text) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = done;
  li.append(checkbox, text);
  list.appendChild(li);
}

function handleSubmit(e) {
  const text = newToDoForm.text.value;
  const done = newToDoForm.done.checked;
  addTask(done, text);
  newToDoForm.text.value = "";
  e.preventDefault();
}

newToDoForm.addEventListener("submit", handleSubmit);
