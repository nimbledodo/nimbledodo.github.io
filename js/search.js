const searchForm = document.querySelector("#search");
const searchInput = searchForm.querySelector("input");
const searchItag = document.querySelector("#icon");
const mouseOn = false;
const ICON_CLASS_NAME = "fa-google";

function onSearchSubmit(e) {
  e.preventDefault();
  const keyword = searchInput.value;
  const url = `https://www.google.com/search?q=${keyword}`;
  const win = window.open(url, "_blank");
  searchInput.value = "";
  win.focus();
}

function onSearchMouseOver(e) {
  e.preventDefault();
  searchInput.classList.remove("hidden");
  searchItag.classList.add(ICON_CLASS_NAME);
  mouseOn = true;
}
function onSearchMouseOut(e) {
  e.preventDefault();
  mouseOn = false;
}

function onBodyClick(e) {
  e.preventDefault();
  if (mouseOn == false && searchInput.value === "") {
    searchInput.classList.add("hidden");
    searchItag.classList.remove(ICON_CLASS_NAME);
  }
}
searchForm.addEventListener("submit", onSearchSubmit);
searchForm.addEventListener("mouseover", onSearchMouseOver);
searchForm.addEventListener("mouseout", onSearchMouseOut);
body.addEventListener("click", onBodyClick);
