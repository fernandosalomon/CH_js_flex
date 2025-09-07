//THE SANDWITCH SECTION
let size = 0;
let userSandwitch = [];

async function getPrice(sandwitch) {
  const ingredients = await fetchData("./db/ingredients.json");
  let price = 0;
  sandwitch.forEach((ingID) => {
    const ingredientPrice = ingredients.find((ing) => ing.id == ingID).price;
    price += ingredientPrice;
  });
  return price;
}

async function updatePrice() {
  const priceElement = document.querySelector("#totalPrice");
  const price = await getPrice(userSandwitch);
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

function updateNavbarCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const navbarCartBadge = document.querySelector("#navbarCartBadge");

  if (cart && cart.length > 0) {
    navbarCartBadge.innerText = cart.length;
    navbarCartBadge.classList.remove("d-none");
    navbarCartBadge.classList.add("d-flex");
  } else {
    navbarCartBadge.innerText = "";
    navbarCartBadge.classList.add("d-none");
    navbarCartBadge.classList.remove("d-flex");
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
    updatePrice();
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
    const mainWrapper = document.querySelector("#mainWrapper");
    mainWrapper.innerHTML = "";
    renderCart();
    updateNavbarCartBadge();
  }
}

function openModal() {
  const modal = new bootstrap.Modal("#ingredientsOptionModal");
  renderModal();
  modal.show();
}

function closeModal() {
  const myModalEl = document.querySelector("#ingredientsOptionModal");
  const modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();

  userSandwitch = [];

  const optionsContainer = document.querySelector("#optionsContainer");
  optionsContainer.innerHTML = "";
}

function renderSandwitchSize() {
  const optionContainer = document.querySelector("#optionsContainer");

  const sandwitchSizeWrapper = document.createElement("div");
  sandwitchSizeWrapper.id = "sandwitchSize";
  sandwitchSizeWrapper.classList.add("container");
  sandwitchSizeWrapper.innerHTML = `
    <h4 class="fs-4 my-3">Elige el tamaño de tu sandwitch:</h4>
    <div class="d-flex align-items-center justify-content-center gap-3">
      <div id="sizeNormal" class="d-flex flex-column align-items-center size-btn">
        <img src="./img/ingredients/normal.png" alt="Tamaño Normal" style="height: 140px"/>
        <h4>Normal</h4>
      </div>

      <div id="sizeBig" class="d-flex flex-column align-items-center size-btn">
        <img src="./img/ingredients/big.png" alt="Tamaño Grande" style="height: 140px"/>
        <h4>Grande</h4>  
      </div>
    </div>
    `;
  optionContainer.appendChild(sandwitchSizeWrapper);

  const sizeNormal = document.querySelector("#sizeNormal");
  sizeNormal.classList.add("size-btn_selected");
  const sizeBig = document.querySelector("#sizeBig");

  sizeNormal.addEventListener("click", () => {
    size = 0;
    sizeNormal.classList.add("size-btn_selected");
    sizeBig.classList.remove("size-btn_selected");

    const ingredientOptionsDivId = document.querySelectorAll(
      "#ingredientOptionsDivId"
    );
    ingredientOptionsDivId.forEach((ingOpt) => ingOpt.remove());
    renderOptions();
  });

  sizeBig.addEventListener("click", () => {
    size = 1;
    sizeNormal.classList.remove("size-btn_selected");
    sizeBig.classList.add("size-btn_selected");

    const ingredientOptionsDivId = document.querySelectorAll(
      "#ingredientOptionsDivId"
    );
    ingredientOptionsDivId.forEach((ingOpt) => ingOpt.remove());
    renderOptions();
  });
}

async function renderOptions() {
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
      section.id = "ingredientOptionsDivId";

      const title = document.createElement("h2");
      title.classList.add("mb-2", "fs-4");
      title.id = "sectionTitle";
      title.innerText = `
      Elegí tu/s opcion/es de ${key} (Puedes elegir hasta ${
        value.maxAmountToChoose[size == 0 ? "normal" : "big"]
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

      const modalFooter = document.querySelector("#modalFooter");
      modalFooter.innerHTML = `
      <p class="text" id="totalPrice">Precio total: $0</p>
      <div class="btn-group">
        <button
          class="btn btn-danger btnBuy disabled"
          id="btnBuy"
          onclick="addItemToCart()"
        >
          Comprar
        </button>
        <button
          class="btn btn-light btnCancel"
          id="closeModalBtn"
          onclick="closeModal()"
        >
          Cancelar
        </button>
      </div>
      `;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

function renderModal() {
  renderSandwitchSize();
  renderOptions();
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart"));
}

function removeItemCart(id) {
  Swal.fire({
    title: "Eliminar sandwitch",
    text: "¿Seguro que quieres quitar este sandwitch de la orden?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      cart.splice(id, 1);
      localStorage.setItem("cart", JSON.stringify(cart));

      mainWrapper.innerHTML = "";
      renderCart();
      updateNavbarCartBadge();

      Swal.fire({
        title: "Sandwitch eliminado",
        text: "El sandwitch fue eliminado de tu orden",
        icon: "success",
      });
    }
  });
}

async function renderCart() {
  const mainWrapper = document.querySelector("#mainWrapper");
  const ingredients = await fetchData("./db/ingredients.json");
  const cart = getCart();

  if (!cart || cart.length == 0) {
    mainWrapper.classList.add("flex-column", "align-items-center", "gap-3");
    mainWrapper.classList.remove("flex-md-row");
    mainWrapper.innerHTML = `
     <img src="./img/ingredients/big.png" style="width: 350px" />
      <h1 class="fs-1">SandwitchMania</h1>
      <p class="m-0 text-center fs-5">
        En SandwichMania sabemos que tú eres un experto en sándwiches, así que
        te dejamos que los armes como más te guste. Nuestro simulador te guiará
        paso a paso para que elijas todos los ingredientes de tu sándwich
        perfecto
      </p>
      <button
        type="button"
        class="btn btn-danger btn-lg fw-bold mt-3"
        onClick="openModal()"
      >
        Realizar un pedido
      </button>
    `;
  } else {
    mainWrapper.classList.add("flex-md-row");
    mainWrapper.classList.remove("align-items-center", "gap-3");
    const leftPanel = document.createElement("div");
    leftPanel.id = "leftPanel";
    leftPanel.classList.add(
      "d-flex",
      "left-panel",
      "flex-wrap",
      "justify-content-center",
      "gap-2",
      "flex-md-row"
    );

    const rightPanel = document.createElement("div");
    rightPanel.id = "rightPanel";
    rightPanel.classList.add("d-flex", "flex-column", "gap-3", "right-panel");

    cart.map(async (sandwitch, index) => {
      const price = await getPrice(sandwitch);

      const sandwitchCard = document.createElement("div");
      sandwitchCard.classList.add("card", "mb-3");
      sandwitchCard.style = "max-width: 540px";
      sandwitchCard.id = index;

      sandwitchCard.innerHTML = `
       <div class="row g-0 h-100">
          <div
            class="col-md-4 d-flex align-items-center justify-content-center bg-light"
          >
            <img
              src="./img/ingredients/big.png"
              class="img-fluid rounded-start"
              style="width: 200px"
              alt="Sandwitch image"
            />
          </div>
          <div class="col-md-8 d-flex flex-column">
            <div class="card-body flex-grow-1">
              <h4 class="card-title">Sandwitch ${index + 1}</h4>
              <h5 class="fs-5">Ingredientes:</h5>
              <p class="card-text" id="ingredientList">
              ${sandwitch
                .map((ingID) => {
                  const ingredient = ingredients.find((e) => e.id == ingID);
                  return `<small>${ingredient.name}(${ingredient.category})</small><br />`;
                })
                .join("")}
              </p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <p class="m-0"><span class="me-3 fw-bold">Precio del item:</span>$${price}</p>
              <button class="btn" onClick="removeItemCart(${index})"><i class="bi bi-trash3"></i>Borrar</button>
            </div>
          </div>
        </div>
      `;
      leftPanel.appendChild(sandwitchCard);
    });

    rightPanel.innerHTML = `
     <table class="table table-bordered">
      <tbody>
          <tr>
            <th scope="row">Precio sin impuestos</th>
            <td id="precioSinIVA"></td>
          </tr>
        <tr>
          <th scope="row">IVA(21%)</th>
          <td id="IVA"></td>
        </tr>
        <tr>
          <th scope="row">Total a pagar</th>
          <td id="precioConIVA"></td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-danger w-100" onClick="confirmOrder()">Completar Pedido</button>
    `;

    mainWrapper.appendChild(leftPanel);
    mainWrapper.appendChild(rightPanel);
    await renderCartFinalPrice();
  }
}

async function getPriceCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  let price = 0;
  for (const sandwitch of cart) {
    const sandwitchPrice = await getPrice(sandwitch);
    price += sandwitchPrice;
  }

  return price;
}

async function renderCartFinalPrice() {
  const priceWoIVA = document.querySelector("#precioSinIVA");
  const IVA = document.querySelector("#IVA");
  const priceWIVA = document.querySelector("#precioConIVA");

  priceWoIVA.innerHTML = `$${(await getPriceCart()).toFixed(2)}`;
  IVA.innerHTML = `$${((await getPriceCart()) * 0.21).toFixed(2)}`;
  priceWIVA.innerHTML = `$${((await getPriceCart()) * 1.21).toFixed(2)}`;
}

function confirmOrder() {
  Swal.fire({
    title: "¿Deseas confirmar tu orden?",
    text: "¿Estas seguro que deseas cerrar esta orden?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, completar pedido",
    cancelButtonText: "Volver",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("cart");
      Swal.fire({
        title: "Confirmaste tu orden",
        text: `El pedido #${(Math.random() * 100000).toFixed(
          0
        )} esta en proceso. Acercate al mostrador para pagar y disfrutar de tu sandwitch. Muchas Gracias.`,
        icon: "success",
      });
      location.reload();
    }
  });
}

const openModalBtnGrp = document.querySelectorAll("#openModalBtn");
openModalBtnGrp.forEach((openModalBtn) =>
  openModalBtn.addEventListener("click", openModal)
);

const closeModalBtn = document.querySelector("#closeModalBtn");
closeModalBtn.addEventListener("click", closeModal);

const closeModalBtnGrp = document.querySelectorAll("#closeModalBtn");
closeModalBtnGrp.forEach((closeModalBtn) =>
  closeModalBtn.addEventListener("click", closeModal)
);

renderCart();
updateNavbarCartBadge();
