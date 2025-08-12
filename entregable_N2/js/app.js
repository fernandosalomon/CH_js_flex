const prices = {
  "Trigo blanco": {
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
  "Sin Gluten": {
    price: 140,
    image: "../img/ingredientes/sin_gluten.png",
  },
  Hummus: {
    price: 1008,
    image: "../img/ingredientes/hummus.png",
  },
  "Carne vacuna": {
    price: 965,
    image: "../img/ingredientes/carne_vacuna.png",
  },
  Pollo: {
    price: 297,
    image: "../img/ingredientes/pollo.png",
  },
  Atún: {
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
  "Mar del Plata": {
    price: 240,
    image: "../img/ingredientes/mar_del_plata.png",
  },
  "Queso crema": {
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
  "Savora con miel": {
    price: 70,
    image: "../img/ingredientes/savora_miel.png",
  },
  "Salsa picante": {
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
      "Trigo blanco",
      "Semillas",
      "Focaccia",
      "Ciabatta",
      "Salvado",
      "Sin Gluten",
    ],
  },

  {
    name: "Proteina",
    maxAmountToChoose: {
      big: 2,
      normal: 1,
    },
    options: ["Hummus", "Carne vacuna", "Pollo", "Atún", "Pavo"],
  },

  {
    name: "Quesos",
    maxAmountToChoose: {
      big: 2,
      normal: 1,
    },
    options: ["Cheddar", "Mozzarella", "Mar del Plata", "Queso crema"],
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
      "Savora con miel",
      "Salsa picante",
      "Pesto",
    ],
  },
];

let userCH = [];

function addRemoveElementToSandwitch(ingrediente, cardElement){
  
  cardElement = document.getElementById(ingrediente);
  unitMeter = document.getElementById(`um-${ingrediente}`);

  if(userCH.findIndex(ing => ing == ingrediente) != -1){
    userCH = userCH.filter(ing => ing != ingrediente)
    cardElement.classList.remove("option-card_selected");
  }else{
    userCH.push(ingrediente);
    
    let ingredientAmount = userCH.filter(ing => ing == ingrediente).length;
    
    unitMeter.classList.add("d-flex");
    unitMeter.innerHTML = `x${ingredientAmount}`;
    cardElement.classList.add("option-card_selected");
  }
}

const mainWrapper = document.getElementById("optionsWrapper");

options.map((option) => {

  const optionWrapper = document.createElement("div");

  //Titulo de la opción
  const title = document.createElement("h2");
  title.classList.add("mb-4")
  title.innerText = `
    ${option.name} (Puedes elegir ${option.maxAmountToChoose["big"]})
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
      </div>
    `;

    const unitMeter = document.createElement("div");
    unitMeter.id = `um-${ing}`;
    unitMeter.innerHTML = 'x2';
    unitMeter.classList.add("unitMeter");

    cardWrapper.appendChild(unitMeter);

    row.appendChild(cardWrapper);
    
    cardWrapper.addEventListener('click', () => {addRemoveElementToSandwitch(ing)})

  });

  optionWrapper.appendChild(row);
  mainWrapper.appendChild(optionWrapper);

});
