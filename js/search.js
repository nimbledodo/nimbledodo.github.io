const searchForm = document.querySelector("#search");
const searchInput = searchForm.querySelector("input");

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
}
function onSearchMouseOut(e) {
  e.preventDefault();
  if (searchInput.value === "") {
    searchInput.classList.add("hidden");
  }
}
searchForm.addEventListener("submit", onSearchSubmit);
searchForm.addEventListener("mouseover", onSearchMouseOver);
searchForm.addEventListener("mouseout", onSearchMouseOut);
