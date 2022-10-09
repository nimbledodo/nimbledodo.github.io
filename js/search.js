const searchForm = document.querySelector("#search");
const searchInput = searchForm.querySelector("input");
const searchItag = document.querySelector("#icon");
let mouseOn = false;
let clicked = false;
const ICON_CLASS_NAME = "fa-google";
const FOCUS_CLASSNAME = "focused";
const CLICK_CLASSNAME = "click";
const DEFAULT_CLASSNAME = "default";

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
  searchForm.classList.remove(DEFAULT_CLASSNAME);
  searchItag.classList.add(ICON_CLASS_NAME);
  if (!clicked) {
    searchForm.classList.add(FOCUS_CLASSNAME);
  }
  mouseOn = true;
}
function onSearchMouseOut(e) {
  e.preventDefault();
  mouseOn = false;
  if (clicked == false) {
    if (searchInput.value === "") {
      searchForm.classList.add(DEFAULT_CLASSNAME);
      searchItag.classList.remove(ICON_CLASS_NAME);
    }
    searchForm.classList.remove(FOCUS_CLASSNAME);
    searchForm.classList.remove(CLICK_CLASSNAME);
  }
}

function onSearchClick(e) {
  e.preventDefault();
  searchForm.classList.add(CLICK_CLASSNAME);
  searchForm.classList.remove(FOCUS_CLASSNAME);
  clicked = true;
}

function onBodyClick(e) {
  e.preventDefault();
  if (mouseOn == false) {
    if (searchInput.value === "") {
      searchForm.classList.add(DEFAULT_CLASSNAME);
      searchItag.classList.remove(ICON_CLASS_NAME);
    }
    searchForm.classList.remove(FOCUS_CLASSNAME);
    searchForm.classList.remove(CLICK_CLASSNAME);
    clicked = false;
  }
}
searchForm.addEventListener("submit", onSearchSubmit);
searchForm.addEventListener("mouseover", onSearchMouseOver);
searchForm.addEventListener("mouseout", onSearchMouseOut);
searchForm.addEventListener("click", onSearchClick);
body.addEventListener("click", onBodyClick);
