const sizeNormal = document.querySelector("#sizeNormal");
sizeNormal.classList.add("size-btn_selected");
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

//THE SANDWITCH SECTION

let userSandwitch = [];

async function getCurrentPrice() {
  const ingredients = await fetchData("./db/ingredients.json");
  let price = 0;
  userSandwitch.forEach((ingID) => {
    const ingredientPrice = ingredients.find((ing) => ing.id == ingID).price;
    price += ingredientPrice;
  });
  return price;
}

async function updatePrice() {
  const priceElement = document.querySelector("#totalPrice");
  const price = await getCurrentPrice();
  priceElement.innerText = `$${price}`;
}

async function isSandwitchReady() {
  const options = await fetchData("./db/options.json");
  const categoryList = Object.keys(options);
  let isReady = false;
  for (category of categoryList) {
    isReady = (await isCategoryFull(category)) ? true : false;
  }
  return isReady;
}

function updateBadge(ingredientID) {
  const ingredientBadge = document.querySelector(`#um-${ingredientID}`);

  let ingredientAmount = userSandwitch.filter(
    (ing) => ing == ingredientID
  ).length;

  if (ingredientAmount <= 0) {
    ingredientBadge.classList.remove("d-flex");
    ingredientBadge.classList.add("d-none");
  } else {
    ingredientBadge.innerText = `x${ingredientAmount}`;
    ingredientBadge.classList.remove("d-none");
    ingredientBadge.classList.add("d-flex");
  }
}

async function addIngredient(ingredientID) {
  const ingredients = await fetchData("./db/ingredients.json");
  const category = ingredients.find((ing) => ing.id == ingredientID).category;
  const isFull = await isCategoryFull(category);

  if (!isFull) {
    userSandwitch.push(ingredientID);
    updateBadge(ingredientID);
    toggleAddBtn(ingredientID);
    toggleRemoveBtn(ingredientID);
    updatePrice();
    isSandwitchReady();
  }

  const buyBtn = document.querySelector("#btnBuy");
  if (await isSandwitchReady()) {
    buyBtn.classList.remove("disabled");
  }
}

async function removeIngredient(ingredientID) {
  const ingredientIndex = userSandwitch.findIndex((id) => id == ingredientID);

  if (ingredientIndex != -1) {
    userSandwitch.splice(ingredientIndex, 1);
    updateBadge(ingredientID);
    toggleAddBtn(ingredientID);
    toggleRemoveBtn(ingredientID);

    const buyBtn = document.querySelector("#btnBuy");
    if (!(await isSandwitchReady())) {
      buyBtn.classList.add("disabled");
    }
  }
}

function toggleRemoveBtn(ingredientID) {
  const ingredientAmount = userSandwitch.filter(
    (id) => id == ingredientID
  ).length;
  const removeBtn = document.querySelector(`#removeIng${ingredientID}Btn`);

  if (ingredientAmount == 0) {
    removeBtn.classList.add("disabled");
  } else {
    removeBtn.classList.remove("disabled");
  }
}

async function toggleAddBtn(ingredientID) {
  const options = await fetchData("./db/options.json");
  const ingredients = await fetchData("./db/ingredients.json");
  const category = ingredients.find((ing) => ing.id == ingredientID).category;

  const isFull = await isCategoryFull(category);

  options[category].optionsID.map((id) => {
    const addBtn = document.querySelector(`#addIng${id}Btn`);
    isFull
      ? addBtn.classList.add("disabled")
      : addBtn.classList.remove("disabled");
  });
}

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

async function isCategoryFull(category) {
  const options = await fetchData("./db/options.json");
  const isValid = category in options;
  try {
    if (!isValid) {
      throw new Error("La categoria no es valida.");
    }

    let nElementsInCategory = 0;
    userSandwitch.map(
      (val) =>
        options[category].optionsID.includes(val) && nElementsInCategory++
    );

    const nMaxElements =
      options[category].maxAmountToChoose[size == 1 ? "big" : "normal"];

    return nElementsInCategory >= nMaxElements;
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function addItemToCart() {
  if (await isSandwitchReady()) {
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    if (!currentCart) {
      const cart = [];
      cart.push(userSandwitch);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      currentCart.push(userSandwitch);
      localStorage.setItem("cart", JSON.stringify(currentCart));
    }

    const myModalEl = document.querySelector("#ingredientsOptionModal");
    const modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();

    userSandwitch = [];
    renderModal();
  }
}

async function renderModal() {
  try {
    const options = await fetchData("./db/options.json");
    if (!options) {
      throw new Error(
        "No se pudo recuperar la información de la base de datos."
      );
    }

    ingredients = await fetchData("./db/ingredients.json");
    if (!ingredients) {
      throw new Error(
        "No se pudo recuperar la información de la base de datos."
      );
    }

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
            <button class='btn btn-light btnAdd' id="addIng${option.id}Btn" onClick='addIngredient(${option.id})'>+</button>
            <button class='btn btn-light btnRemove disabled' id="removeIng${option.id}Btn" onClick='removeIngredient(${option.id})'>-</button>
        </div>
        </div>
      `;

        const ingredientAmount = document.createElement("div");
        ingredientAmount.id = `um-${id}`;
        ingredientAmount.innerHTML = "x2";
        ingredientAmount.classList.add("ingredient-amount", "d-none");

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

renderModal();
