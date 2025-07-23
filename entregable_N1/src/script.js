//GLOBALS

const prices = {
    'Trigo blanco':120, 
    'Semillas':130, 
    'Focaccia':150, 
    'Ciabatta':150,
    'Salvado':130, 
    'Sin Gluten': 140,
    'Hummus': 1008, 
    'Carne vacuna': 965, 
    'Pollo': 297, 
    'Atún': 792, 
    'Pavo': 1240,
    'Cheddar': 210,
    'Mozzarella': 210,
    'Mar del Plata': 240, 
    'Queso crema': 150,
    'Lechuga': 100, 
    'Tomate': 100, 
    'Pimientos': 200, 
    'Avocado': 800, 
    'Bacon': 1500,
    'Mayonesa': 50,
    'Savora': 50,
    'Savora con miel': 70,
    'Salsa picante': 70,
    'Pesto': 80,
};

const ingredients = [
    {
        "name": "Pan",
        "max_amount_to_choose": {
            "big_combo": 1,
            "normal_combo": 1,
        },
        "options": [
            'Trigo blanco', 
            'Semillas', 
            'Focaccia', 
            'Ciabatta',
            'Salvado', 
            'Sin Gluten',
        ],
    },
    {
        "name": "Proteina",
        "max_amount_to_choose": {
            "big_combo": 2,
            "normal_combo": 1,
        },
        "options": [
            'Hummus', 
            'Carne vacuna', 
            'Pollo', 
            'Atún', 
            'Pavo',
        ],
    },
    {
        "name": "Quesos",
        "max_amount_to_choose": {
            "big_combo": 2,
            "normal_combo": 1,
        },
        "options":[
            'Cheddar',
            'Mozzarella',
            'Mar del Plata', 
            'Queso crema',
        ],
    },
    {
        "name": "Agregados",
        "max_amount_to_choose":{
            "big_combo": 3,
            "normal_combo": 2,
        },
        "options":[
            'Lechuga', 
            'Tomate', 
            'Pimientos', 
            'Avocado', 
            'Bacon',
        ],
    },
    {
        "name": "Aderezos",
        "max_amount_to_choose":{
            "big_combo": 3,
            "normal_combo": 2,
        },
        "options":[
            'Mayonesa',
            'Savora',
            'Savora con miel',
            'Salsa picante',
            'Pesto',
        ],
    }
];

// FUNCTIONS

function chooseCombo(){
    const message = "Elije el tamaño de tu combo:\n\n1. Normal\n2. Grande\n\nQ. Salir"
    let chCombo = prompt(message)

    switch(chCombo){
        case '1':
            return 'normal_combo';
            break;
        case '2':
            return 'big_combo';
            break;
        case 'Q':
            return -1;
            break;
        case null:
            return -1;
            break;
        default:
            alert('La opción elejida no es válida. Pruebe de vuelta');
            chCombo = chooseCombo();
    }
    
    return chCombo;
}

function buildSandwitch(chCombo){

    let quitSignal = false;
    const userSandwitch = {
        'Pan': [],
        'Proteina': [],
        'Quesos': [],
        'Agregados': [],
        'Aderezos': [],
    }
    
    for (const ing of ingredients){

        let message = "";
        let maxCH = ing.max_amount_to_choose[chCombo];
        let ingName = ing.name;

        for(let i = 0; i < maxCH; i++){

            let showFoot = false;

            message = `Elegí tu/s opcion/es de ${ingName} (Te quedan ${maxCH - i}):\n`
            
            ing.options.forEach((ing, idx) => {
                message += `${idx+1}. ${ing}`;
                if(userSandwitch[ingName].includes(ing)){
                    message += " (*)"
                    showFoot = true
                }
                message += '\n'
            })

            
            if(ingName === 'Quesos' || ingName === 'Aderezos' || ingName === 'Agregados'){
                message += `0. Sin ${ingName}\n`;
            }

            message += "\nQ. Salir\n"
            
            if(showFoot){
                message += "\n(*) La opción ya se encuentra elegida. Elijela de vuelta si quieres una porción doble."
            }
            
            let isInputOk = false;
            let chOption = "";

            do{
                chOption = prompt(message);
                
                if(!isNaN(chOption) && chOption > 0 && chOption <= ing.options.length){
                    isInputOk = true;
                    userSandwitch[ingName].push(ing.options[chOption-1]);
                }else if(chOption === '0' && (ingName === 'Quesos' || ingName === 'Aderezos' || ingName === 'Agregados')){
                    i = maxCH;
                    isInputOk = true;
                }else if(chOption === 'Q' || chOption === null){
                    quitSignal = true;
                    break;
                }else{
                    alert('La opción elejida no es válida. Pruebe de vuelta');
                }

            }while(!isInputOk);   
        }
        if(quitSignal){break;}
    }
    
    if(quitSignal){
        return -1;
    }else{
        return userSandwitch;
    }
}

function calculatePrice(userSandwitch){
    let price = 0
   
    for(const [section,ing] of Object.entries(userSandwitch)){

        price += ing.reduce((acc, val) => acc += parseFloat(prices[val]),0);
    }
    
    return price;
}

function priceMenu(userSandwitch){
    
    let message = "Detalle de pago:\n\n";
    let price = calculatePrice(userSandwitch);
    
    message += `Precio sin Impuestos: $${price.toFixed(2)}\n`
    message += `IVA(21%): $${(price * 0.21).toFixed(2)}\n`
    message += `Total a pagar: $${(price * 1.21).toFixed(2)}\n`
    
    message += '\nOprima "Aceptar" si esta listo para realizar el pago\nOprima "Cancelar" si desea cancelar su pedido'

    let isPayOk = confirm(message);

    if(isPayOk){
        alert('Por favor acerquece al mostrador para realizar el pago y disfrutar de su sandwitch.')
        return 0;
    }else{
        return -1;
    }
}

function showFinal(chCombo, userSandwitch){

    if(userSandwitch === undefined){
        return -1;
    }

    let message = 'Por favor, controle que su orden es correcta:\n\n'
    if(chCombo === 'normal_combo'){
        message += 'Sandwitch común:\n'
    }else{
        message += 'Sandwitch big:\n'
    }

    for (const [section, ings] of Object.entries(userSandwitch)){
        message += `${section}:\n`
        ings.map(ing => message += `(*)${ing}\n`)
        if(ings.length === 0){
            message += "(*) ---\n";
        }
    }

    message += '\nSi su orden es correcta oprima "Aceptar". Si desea cambiar su orden oprima "Cancelar"'

    let isOrderOk = confirm(message);

    if(isOrderOk){
        return priceMenu(userSandwitch)
    }else{
        return -1;
    }
}

function mainMenu(){

    alert('Bienvenido a SandwitchMania\n\nDonde puedes armar tu sandwitch como tu quieras')
    alert('A continuación te daremos las opciones para que armes tu sandwitch y al final veras el precio a pagar en caja.\n\nCOMIENZA A ARMAR TU SANDWITCH AHORA')

    let end;

    do{

        let chCombo = chooseCombo();

        if(chCombo === -1){
            return 0;
        }

        let userSandwitch = buildSandwitch(chCombo);

        if(userSandwitch === -1){
            return 0;
        }

        end = showFinal(chCombo, userSandwitch);
    }while(end !== 0)
}

const button = document.getElementById("orderBtn");

button.addEventListener('click', mainMenu);
