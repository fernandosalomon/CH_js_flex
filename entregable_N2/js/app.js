const prices = {
  Trigo_blanco: {
    price: 120,
    image: "../img/ingredientes/pan_trigo.png",
  },
  Semillas: {
    price: 130,
    image: "../img/ingredientes/pan_cereales.png",
  },
  Focaccia: {
    price: 150,
    image: "../img/ingredientes/focaccia.png",
  },
  Ciabatta: {
    price: 150,
    image: "../img/ingredientes/ciabatta.png",
  },
  Salvado: {
    price: 130,
    image: "../img/ingredientes/salvado.png",
  },
  Sin_gluten: {
    price: 140,
    image: "../img/ingredientes/sin_gluten.png",
  },
  Hummus: {
    price: 1008,
    image: "../img/ingredientes/hummus.png",
  },
  Carne_vacuna: {
    price: 965,
    image: "../img/ingredientes/carne_vacuna.png",
  },
  Pollo: {
    price: 297,
    image: "../img/ingredientes/pollo.png",
  },
  Atun: {
    price: 792,
    image: "../img/ingredientes/atun.png",
  },
  Pavo: {
    price: 1240,
    image: "../img/ingredientes/pavo.png",
  },
  Cheddar: {
    price: 210,
    image: "../img/ingredientes/cheddar.png",
  },
  Mozzarella: {
    price: 210,
    image: "../img/ingredientes/mozzarella.png",
  },
  Mar_del_plata: {
    price: 240,
    image: "../img/ingredientes/mar_del_plata.png",
  },
  Queso_crema: {
    price: 150,
    image: "../img/ingredientes/queso_crema.png",
  },
  Lechuga: {
    price: 100,
    image: "../img/ingredientes/lechuga.png",
  },
  Tomate: {
    price: 100,
    image: "../img/ingredientes/tomate.png",
  },
  Pimientos: {
    price: 200,
    image: "../img/ingredientes/pimientos.png",
  },
  Avocado: {
    price: 800,
    image: "../img/ingredientes/avocado.png",
  },
  Bacon: {
    price: 1500,
    image: "../img/ingredientes/bacon.png",
  },
  Mayonesa: {
    price: 50,
    image: "../img/ingredientes/mayonesa.png",
  },
  Savora: {
    price: 50,
    image: "../img/ingredientes/savora.png",
  },
  Savora_con_miel: {
    price: 70,
    image: "../img/ingredientes/savora_miel.png",
  },
  Salsa_picante: {
    price: 70,
    image: "../img/ingredientes/salsa_picante.png",
  },
  Pesto: {
    price: 80,
    image: "../img/ingredientes/pesto.png",
  },
};

options = {
  pan: {
    maxAmountToChoose: {
      big: 1,
      normal: 1,
    },
    options: [
      "Trigo_blanco",
      "Semillas",
      "Focaccia",
      "Ciabatta",
      "Salvado",
      "Sin_gluten",
    ],
  },

  proteina: {
    maxAmountToChoose: {
      big: 2,
      normal: 1,
    },
    options: ["Hummus", "Carne_vacuna", "Pollo", "Atun", "Pavo"],
  },

  queso: {
    maxAmountToChoose: {
      big: 2,
      normal: 1,
    },
    options: ["Cheddar", "Mozzarella", "Mar_del_plata", "Queso_crema"],
  },

  agregado: {
    maxAmountToChoose: {
      big: 3,
      normal: 2,
    },
    options: ["Lechuga", "Tomate", "Pimientos", "Avocado", "Bacon"],
  },

  aderezo: {
    maxAmountToChoose: {
      big: 3,
      normal: 2,
    },
    options: [
      "Mayonesa",
      "Savora",
      "Savora_con_miel",
      "Salsa_picante",
      "Pesto",
    ],
  },
};

let userCH = [];
let sandwitchSize = 0;
let totalPrice = 0;
let isUserSandwitchReady = false;

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
}

//Seleccionar el tamaño del sandwitch

const sandwitchSizeBtnGrp = document.getElementById("sandwitchSizeBtnGrp");
sandwitchSizeBtnGrp
  .querySelectorAll(".btn")
  [sandwitchSize].classList.add("sandwitchSizeBtn_active");

function setSandwitchSize(option) {
  sandwitchSize = option;

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
