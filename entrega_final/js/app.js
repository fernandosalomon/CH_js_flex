const sizeNormal = document.querySelector("#sizeNormal");
const sizeBig = document.querySelector("#sizeBig");
let size = 0;

sizeNormal.addEventListener("click", () => {
  size = 0;
  sizeNormal.classList.add("size-btn_selected");
  sizeBig.classList.remove("size-btn_selected");
});

sizeBig.addEventListener("click", () => {
  size = 1;
  sizeNormal.classList.remove("size-btn_selected");
  sizeBig.classList.add("size-btn_selected");
});

