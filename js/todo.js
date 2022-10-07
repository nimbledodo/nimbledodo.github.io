const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "toDos";

let toDos = [];

function onDeletetoDo(e) {
  e.preventDefault();
  const li = e.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos(toDos);
}

function onToDoSubmit(e) {
  e.preventDefault();
  const newToDoObj = {
    text: toDoInput.value,
    id: Date.now(),
  };
  toDoInput.value = "";
  addToDo(newToDoObj);
  toDos.push(newToDoObj);
  saveToDos(toDos);
}

function saveToDos(toDos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function addToDo(newToDoObj) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  span.innerText = newToDoObj.text;
  button.innerText = "Delete";
  button.addEventListener("click", onDeletetoDo);
  li.id = newToDoObj.id;
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  toDos = JSON.parse(savedToDos);
  toDos.forEach(addToDo);
}

toDoForm.addEventListener("submit", onToDoSubmit);
