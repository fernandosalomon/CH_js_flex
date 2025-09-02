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

async function fetchData(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error("No se pudo recuperar las opciones.");
    }
    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function addSandwitchOptions() {
  try {
    const options = await fetchData("./db/options.json");
    console.log(options);

    ingredients = await fetchData("./db/ingredients.json");
    console.log(ingredients);

    const optionContainer = document.querySelector("#optionsContainer");

    for (const [key, value] of Object.entries(options)) {
      const section = document.createElement("div");

      const title = document.createElement("h2");
      title.classList.add("mb-2", "fs-4");
      title.id = "sectionTitle";
      title.innerText = `
      Elegí tu/s opcion/es de ${key} (Puedes elegir hasta ${
        value.maxAmountToChoose[sandwitchSize == 0 ? "normal" : "big"]
      } opcion/es)
      `;
      section.appendChild(title);

      const options = document.createElement("div");
      options.classList.add("row", "mx-auto");

      value.optionsID.map((id) => {
        const option = ingredients.find((ing) => ing.id == id);

        const card = document.createElement("div");
        card.classList.add(
          "col-12",
          "col-sm-6",
          "col-md-4",
          "col-lg-3",
          "gy-3",
          "gx-3",
          "mx-2",
          "card",
          "option-card"
        );
        card.id = id;

        card.innerHTML = `
        <img src=${option.image} class="card-img-top" alt=${option.name} style="min-height: 120px;">
        <div class="card-body">
          <h5 class="option-title">${option.name}</h5>
          <p class="option-prize">$${option.price}</p>
          <div class='d-flex justify-content-center'>
            <button class='btn btn-light btnAdd'>+</button>
            <button class='btn btn-light btnRemove disabled'>-</button>
        </div>
        </div>
      `;

        const ingredientAmount = document.createElement("div");
        ingredientAmount.id = `um-${id}`;
        ingredientAmount.innerHTML = "x2";
        ingredientAmount.classList.add("ingredient-amount");

        card.appendChild(ingredientAmount);

        options.appendChild(card);
      });
      section.appendChild(options);
      optionContainer.appendChild(section);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

addSandwitchOptions();
