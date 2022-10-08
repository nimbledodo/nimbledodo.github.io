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
searchForm.addEventListener("submit", onSearchSubmit);
