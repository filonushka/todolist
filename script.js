const newToDoForm = document.querySelector(".todo-form");
const list = document.querySelector(".list");

function addTask(text) {
  const li = document.createElement("li");
  li.append(text);
  list.appendChild(li);
}

function handleSubmit(e) {
  const text = newToDoForm.text.value;
  addTask(text);
  newToDoForm.text.value = "";
  e.preventDefault();
}

newToDoForm.addEventListener("submit", handleSubmit);
