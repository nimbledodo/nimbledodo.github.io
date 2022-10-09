const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

const STYLE = "fa-regular";
const DONE = "fa-square-check";
const DELETE = "fa-trash-can";
const UNDONE = "fa-square";

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
    done: false,
  };
  toDoInput.value = "";
  addToDo(newToDoObj);
  toDos.push(newToDoObj);
  saveToDos(toDos);
}

function saveToDos(toDos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// Todo에서 지웠다가 다시 넣으면 순서가 바뀌기 때문에 지우지 않고 값을 변경할 방법을 찾아야 함!
function onCheckClick(e) {
  e.preventDefault();
  const i = e.target;
  const li = e.target.parentElement;
  const index = toDos.findIndex((toDo) => toDo.id === parseInt(li.id));

  if (i.classList[1] == UNDONE) {
    // currently undone.need to change to done
    i.classList.remove(UNDONE);
    i.classList.add(DONE);
    li.classList.add("done");
    toDos[index].done = true;
  } else {
    // currently done.need to change to undone
    i.classList.add(UNDONE);
    i.classList.remove(DONE);
    li.classList.remove("done");
    toDos[index].done = false;
  }

  saveToDos(toDos);
}
function addToDo(newToDoObj) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const check = document.createElement("i");
  const del = document.createElement("i");
  span.innerText = newToDoObj.text;
  check.classList.add(STYLE);
  del.classList.add(STYLE);
  del.classList.add(DELETE);
  if (newToDoObj.done) {
    check.classList.add(DONE);
    li.classList.add("done");
  } else {
    check.classList.add(UNDONE);
  }
  check.addEventListener("click", onCheckClick);
  del.addEventListener("click", onDeletetoDo);
  li.id = newToDoObj.id;
  li.appendChild(check);
  li.appendChild(span);
  li.appendChild(del);
  toDoList.appendChild(li);
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  toDos = JSON.parse(savedToDos);
  toDos.forEach(addToDo);
}

toDoForm.addEventListener("submit", onToDoSubmit);

// 추가할 기능
// 1. 체크해서 취소선
// 2. 순서 변경
