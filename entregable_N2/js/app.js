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

options = [
  {
    name: "Pan",
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

  {
    name: "Proteina",
    maxAmountToChoose: {
      big: 2,
      normal: 1,
    },
    options: ["Hummus", "Carne_vacuna", "Pollo", "Atun", "Pavo"],
  },

  {
    name: "Quesos",
    maxAmountToChoose: {
      big: 2,
      normal: 1,
    },
    options: ["Cheddar", "Mozzarella", "Mar_del_plata", "Queso_crema"],
  },

  {
    name: "Agregados",
    maxAmountToChoose: {
      big: 3,
      normal: 2,
    },
    options: ["Lechuga", "Tomate", "Pimientos", "Avocado", "Bacon"],
  },

  {
    name: "Aderezos",
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
];

let userCH = [];
let sandwitchSize = "";

function setSandwitchSize(option){
  sandwitchSize = option;
  btn_normal = document.getElementById('idSandwitchSizeNormal')
  btn_big = document.getElementById('idSandwitchSizeBig')

  if(option == 'normal'){
    btn_normal.classList.add("btnSandwitchSize_selected")
    btn_big.classList.remove("btnSandwitchSize_selected")
  }else{
    btn_normal.classList.remove("btnSandwitchSize_selected")
    btn_big.classList.add("btnSandwitchSize_selected")
  }
}

function remainingChoosings(options, max){
  let nChOptions = userCH.map(ing => options.filter(opt => opt == ing)).flat().length
  return max - nChOptions
}

function addItem(ingredient){
  cardElement = document.getElementById(ingredient.id);
  unitMeter = document.getElementById(`um-${ingredient.id}`);

  userCH.push(ingredient.id);

  let ingredientAmount = userCH.filter(ing => ing == ingredient.id).length;
    
  unitMeter.classList.add("d-flex");
  unitMeter.innerHTML = `x${ingredientAmount}`;
  cardElement.classList.add("option-card_selected");

  console.log(remainingChoosings([
      "Mayonesa",
      "Savora",
      "Savora_con_miel",
      "Salsa_picante",
      "Pesto",
    ], 3));
}

function removeItem(ingredient){
  cardElement = document.getElementById(ingredient.id);
  unitMeter = document.getElementById(`um-${ingredient.id}`);

  index = userCH.findIndex(ing => ing == ingredient);
  userCH.splice(index, 1);

  let ingredientAmount = userCH.filter(ing => ing == ingredient.id).length;
    
  unitMeter.innerHTML = `x${ingredientAmount}`;
  

  if(ingredientAmount <= 0){
    unitMeter.classList.remove('d-flex');
    cardElement.classList.remove("option-card_selected");
  }
}

const mainWrapper = document.getElementById("optionsWrapper");

options.map((option) => {

  const optionWrapper = document.createElement("div");

  const comboSize = document.createElement("div");
  const comboSizeTitle = document.createElement("h2");
  comboSizeTitle.innerText = "Elige el tamaño de tu sandwitch";
  comboSize.appendChild(comboSizeTitle);
  const comboSizeOptions = document.createElement("div");
  comboSizeOptions.classList.add("d-flex", "justify-content-center", "gap-5")
  comboSizeOptions.id = 'comboSizeOptions';
  comboSizeOptions.innerHTML = `
    <div classname='card option-card' onClick='(() => setSandwitchSize("normal"))()' id='idSandwitchSizeNormal'>
      <img src='../img/normal.png' class="card-img-top" alt="Tamaño normal" style="max-height: 140px;">
      <div class="card-body">
        <h5 class="text-center">Normal</h5>
      </div>
    </div>
    <div classname='card option-card' onClick='(() => setSandwitchSize("big"))()' id='idSandwitchSizeBig'>
      <img src='../img/big.png' class="card-img-top" alt="Tamaño normal" style="max-height: 140px;">
      <div class="card-body">
        <h5 class="text-center">Grande</h5>
      </div>
    </div>
  `
  comboSize.appendChild(comboSizeOptions);
  optionWrapper.appendChild(comboSize);


  //Titulo de la opción
  const title = document.createElement("h2");
  title.classList.add("mb-4")
  title.innerText = `
    Elegí tu/s opcion/es de ${option.name} (Te quedan ${option.maxAmountToChoose["big"]})
  `;
  optionWrapper.appendChild(title);
  
  //Sistema Grid para las opciones
  const row = document.createElement("div");
  row.classList.add("row")
  
  option.options.map((ing) => {
 
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "gy-3", "gx-3", "card", "option-card");
    cardWrapper.id = ing;
    cardWrapper.innerHTML = `
      <img src=${prices[ing].image} class="card-img-top" alt="${ing}" style="min-height: 7rem;">
      <div class="card-body">
        <h5 class="option-title">${ing}</h5>
        <p class="option-prize">$${prices[ing].price}</p>
        <div class='d-flex justify-content-center'>
            <button class='btn btnAddRemove' onClick='(() => addItem(${ing}))()'>+</button>
            <button class='btn btnAddRemove' onClick='(() => removeItem(${ing}))()'>-</button>
        </div>
      </div>
    `;

    const unitMeter = document.createElement("div");
    unitMeter.id = `um-${ing}`;
    unitMeter.innerHTML = 'x2';
    unitMeter.classList.add("unitMeter");

    cardWrapper.appendChild(unitMeter);

    row.appendChild(cardWrapper);
    

  });

  optionWrapper.appendChild(row);
  mainWrapper.appendChild(optionWrapper);

});
