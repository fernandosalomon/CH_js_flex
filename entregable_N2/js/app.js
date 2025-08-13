const prices = JSON.parse(localStorage.getItem("priceList"));
const options = JSON.parse(localStorage.getItem("optionsList"));

function setSessionStorage() {
  sessionStorage.setItem("userCH", JSON.stringify(userCH));
  sessionStorage.setItem("sandwitchSize", JSON.stringify(sandwitchSize));
}

function getSessionStorage() {
  if (sessionStorage.getItem(userCH)) {
    userCH = JSON.parse(sessionStorage.getItem(userCH));
    return true;
  }
  if (sessionStorage.getItem(userCH)) {
    sandwitchSize = JSON.parse(sessionStorage.getItem(sandwitchSize));
  }
}

let userCH = [];
let sandwitchSize = 0;
let totalPrice = 0;
let isUserSandwitchReady = false;

getSessionStorage();

function isSandwitchReady() {
  isNotReady = false;
  for (const [key, value] of Object.entries(options)) {
    if (
      remainingChoosings(
        value.options,
        value.maxAmountToChoose[sandwitchSize == 0 ? "normal" : "big"]
      ) != 0
    ) {
      isReady = false;
    } else {
      isReady = true;
    }
  }

  const buyBtn = document.getElementById("btnBuy");

  if (isReady) {
    buyBtn.classList.remove("disabled");
  } else {
    buyBtn.classList = "btn btn-danger btnBuy disabled";
  }

  return isReady;
}

function getTotalPrice() {
  let totalPrice = userCH.reduce((acc, val) => (acc += prices[val].price), 0);

  const totalPriceTextBox = document.getElementById("totalPrice");
  totalPriceTextBox.innerText = `Precio total: $${totalPrice}`;

  const priceWoutIVA = document.getElementById("precioSinIVA");
  const IVA = document.getElementById("IVA");
  const priceWIVA = document.getElementById("precioConIVA");

  priceWoutIVA.innerText = `Precio sin impuestos: $${totalPrice}`;

  IVA.innerText = `IVA(21%): $${totalPrice * 0.21}`;

  priceWIVA.innerText = `Total a pagar: $${totalPrice * 1.21}`;

  return totalPrice;
}

function remainingChoosings(options, max) {
  let nChOptions = userCH
    .map((ing) => options.filter((opt) => opt == ing))
    .flat().length;
  return max - nChOptions;
}

function addItem(ingredient, section) {
  cardElement = document.getElementById(ingredient.id);
  unitMeter = document.getElementById(`um-${ingredient.id}`);

  userCH.push(ingredient.id);

  let ingredientAmount = userCH.filter((ing) => ing == ingredient.id).length;

  unitMeter.classList.add("d-flex");
  unitMeter.innerHTML = `x${ingredientAmount}`;
  cardElement.classList.add("option-card_selected");

  cardElement.querySelector(".btnRemove").classList.remove("disabled");

  if (
    remainingChoosings(
      options[section.id].options,
      options[section.id].maxAmountToChoose[
        sandwitchSize == 0 ? "normal" : "big"
      ]
    ) <= 0
  ) {
    section = document.getElementById(section.id);
    for (btn of section.querySelectorAll(".btnAdd")) {
      btn.classList.add("disabled");
    }
  }

  totalPrice = getTotalPrice();
  isSandwitchReady();
  setSessionStorage();
}

function removeItem(ingredient, section) {
  cardElement = document.getElementById(ingredient.id);
  unitMeter = document.getElementById(`um-${ingredient.id}`);

  index = userCH.findIndex((ing) => ing == ingredient);
  userCH.splice(index, 1);

  let ingredientAmount = userCH.filter((ing) => ing == ingredient.id).length;

  unitMeter.innerHTML = `x${ingredientAmount}`;

  if (ingredientAmount <= 0) {
    unitMeter.classList.remove("d-flex");
    cardElement.classList.remove("option-card_selected");

    cardElement.querySelector(".btnRemove").classList.add("disabled");
  }

  section = document.getElementById(section.id);
  for (btn of section.querySelectorAll(".btnAdd")) {
    btn.classList.remove("disabled");
  }

  totalPrice = getTotalPrice();
  isSandwitchReady();
  setSessionStorage();
}

//Seleccionar el tamaño del sandwitch

const sandwitchSizeBtnGrp = document.getElementById("sandwitchSizeBtnGrp");
sandwitchSizeBtnGrp
  .querySelectorAll(".btn")
  [sandwitchSize].classList.add("sandwitchSizeBtn_active");

function setSandwitchSize(option) {
  sandwitchSize = option;
  setSessionStorage();

  //Esto actualiza los titulos
  const sectionTitles = document.querySelectorAll("#sectionTitle");

  sectionTitles.forEach((title, index) => {
    const entry = Object.entries(options);
    const name = entry[index][0];
    const max =
      entry[index][1].maxAmountToChoose[sandwitchSize == 0 ? "normal" : "big"];
    title.innerText = `
    Elegí tu/s opcion/es de ${name} (Puedes elegir hasta ${max} opcion/es)
  `;
  });
  //-----------------------------

  for (
    let i = 0;
    i < sandwitchSizeBtnGrp.querySelectorAll(".btn").length;
    i++
  ) {
    sandwitchSizeBtnGrp.querySelectorAll(".btn")[i].classList =
      "btn sandwitchSizeBtn";
  }

  sandwitchSizeBtnGrp
    .querySelectorAll(".btn")
    [sandwitchSize].classList.add("sandwitchSizeBtn_active");
}

for (let i = 0; i < sandwitchSizeBtnGrp.querySelectorAll(".btn").length; i++) {
  sandwitchSizeBtnGrp
    .querySelectorAll(".btn")
    [i].addEventListener("click", () => setSandwitchSize(i));
}

//Agregar las cards a cada seccion

for (const [key, value] of Object.entries(options)) {
  const wrapper = document.getElementById(key);

  //Titulo de la opción
  const title = document.createElement("h2");
  title.classList.add("mb-2", "fs-4");
  title.id = "sectionTitle";
  title.innerText = `
    Elegí tu/s opcion/es de ${key} (Puedes elegir hasta ${
    value.maxAmountToChoose[sandwitchSize == 0 ? "normal" : "big"]
  } opcion/es)
  `;
  wrapper.appendChild(title);

  //Sistema Grid para las opciones
  const row = document.createElement("div");
  row.classList.add("row");

  value.options.map((ing) => {
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add(
      "col-12",
      "col-sm-6",
      "col-md-4",
      "col-lg-3",
      "gy-3",
      "gx-3",
      "card",
      "option-card"
    );
    cardWrapper.id = ing;
    cardWrapper.innerHTML = `
      <img src=${prices[ing].image} class="card-img-top" alt="${ing}" style="min-height: 150px;">
      <div class="card-body">
        <h5 class="option-title">${ing}</h5>
        <p class="option-prize">$${prices[ing].price}</p>
        <div class='d-flex justify-content-center'>
            <button class='btn btn-light btnAdd' onClick='addItem(${ing}, ${key})'>+</button>
            <button class='btn btn-light btnRemove disabled' onClick='removeItem(${ing}, ${key})'>-</button>
        </div>
      </div>
    `;

    const unitMeter = document.createElement("div");
    unitMeter.id = `um-${ing}`;
    unitMeter.innerHTML = "x2";
    unitMeter.classList.add("unitMeter");

    cardWrapper.appendChild(unitMeter);

    row.appendChild(cardWrapper);
  });

  wrapper.appendChild(row);
}
