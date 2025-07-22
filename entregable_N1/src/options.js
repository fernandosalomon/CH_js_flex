const ingredients = [
    {
        "name": "Pan",
        "max_amount_to_choose": {
            "big_combo": 1,
            "normal_combo": 1,
        },
        "options": {
            'Trigo blanco':120, 
            'Semillas':130, 
            'Focaccia':150, 
            'Ciabatta':150,
            'Salvado':130, 
            'Sin Gluten': 140
        }
    },
    {
        "name": "Proteina",
        "max_amount_to_choose": {
            "big_combo": 2,
            "normal_combo": 1,
        },
        "options": {
            'Hummus': 1008, 
            'Carne vacuna': 965, 
            'Pollo': 297, 
            'Atún': 792, 
            'Pavo': 1240,
        }
    },
    {
        "name": "Quesos",
        "max_amount_to_choose": {
            "big_combo": 2,
            "normal_combo": 1,
        },
        "options":{
            'Cheddar': 210,
            'Mozzarella': 210,
            'Mar del Plata': 240, 
            'Queso crema': 150,
        },
    },
    {
        "name": "Agregados",
        "max_amount_to_choose":{
            "big_combo": 3,
            "normal_combo": 2,
        },
        "options":{
            'Lechuga': 100, 
            'Tomate': 100, 
            'Pimientos': 200, 
            'Avocado': 800, 
            'Bacon': 1500,
        },
    },
    {
        "name": "Aderezos",
        "max_amount_to_choose":{
            "big_combo": 3,
            "normal_combo": 2,
        },
        "options":{
            'Mayonesa': 50,
            'Savora': 50,
            'Savora con miel': 70,
            'Salsa picante': 70,
            'Pesto': 80,
        },
    }
]

// alert('Bienvenido a SandwitchMania\nDonde puedes armar tu sandwitch como tu quieras')
// alert('A continuación te daremos las opciones para que armes tu sandwitch y al final veras el precio a pagar en caja.\nCOMIENZA A ARMAR TU SANDWITCH AHORA')

const userSandwitch = {
    'Pan': [],
    'Proteina': [],
    'Quesos': [],
    'Agregados': [],
    'Aderezos': [],
}

const userSandwitchPrice = {
    'Pan': [],
    'Proteina': [],
    'Quesos': [],
    'Agregados': [],
    'Aderezos': [],
}

function set_combo(){
    const message = "Elije el tamaño de tu combo:\n\n1. Normal\n2. Grande\n0. Salir"
    let chCombo = prompt(message)

    switch(chCombo){
        case '1':
            return 'normal_combo';
            break;
        case '2':
            return 'big_combo';
            break;
        case '0':
            break;
        default:
            alert('La opción elejida no es válida. Pruebe de vuelta');
            chCombo = set_combo();
    }
    
    return chCombo;
}

let chCombo = set_combo();

function get_ingredients(ingredients, chCombo){
    
    let all_options = [];
    let finalPrice = [];
    
    ingredients.forEach((elem, index) => {
        let ing_name = elem.name;
        let max_n_choices = elem.max_amount_to_choose[chCombo];
        let ing_options = [];
        let ing_price = [];
        let message = "";

        for (const [key, value] of Object.entries(elem.options)){
            ing_options.push(key);
            ing_price.push(value);
        }

        for(let i = 0; i < max_n_choices; i++){
            message = `Elegí hasta tu opción/es para "${ing_name}" (Te quedan ${max_n_choices - i}):\n\n`;
            ing_options.forEach((ing, index) => {
                message += `${index+1}. ${ing}\n`;
            })

            do{
                isInputOk = false;
                chOption = parseInt(prompt(message));

                if(!isNaN(chOption) && chOption > 0 && chOption <= ing_options.length){
                    isInputOk = true;
                }else{
                    alert('La opción elejida no es válida. Pruebe de vuelta');
                }

            }while(!isInputOk)
                
            userSandwitch[ing_name].push(ing_options[chOption-1]);
            userSandwitchPrice[ing_name].push(ing_price[chOption-1]);
        }

        all_options.push(ing_options);
        finalPrice.push(ing_price)

    })

}

get_ingredients(ingredients, chCombo)

function calculate_price(userSandwitchPrice){
    let price = 0.00
    for (const [key, value] of Object.entries(userSandwitchPrice)){
        price += value.reduce((acc, val) => acc += parseFloat(val))
    }
    return price;
}

function show_final_tab(userSandwitch, userSandwitchPrice){
    let message = 'Por favor, controle que su orden es correcta:\n\n'
    if(chCombo === 'normal_combo'){
        message += 'Sandwitch común:\n'
    }else{
        message += 'Sandwitch big:\n'
    }

    for (const [key, val] of Object.entries(userSandwitch)){
        message += `${key}:\n`
        val.map(e => message += `(*)${e}\n`)
    }

    let price = calculate_price(userSandwitchPrice)

    message += `Precio sin Impuestos: $${price.toFixed(2)}\n`
    message += `IVA(21%): $${(price * 0.21).toFixed(2)}\n`
    message += `Total a pagar: $${(price * 1.21).toFixed(2)}\n`
    
    message += '\nSi su orden es correcta ingrese 1, si desea volver a armar su sandwitch ingrese 2, para salir ingrese 0.'

    let chOption = prompt(message);

    switch(chOption){
        
        case '1':
            alert('Por favor acerquece al mostrador para realizar el pago y disfrutar de su sandwitch.')
            break;
        case '2':
            break;
        case '0':
            break;
        default:
            alert('La opción elejida no es válida. Pruebe de vuelta');
            show_final_tab(userSandwitch, userSandwitchPrice);

    }
}

calculate_price(userSandwitchPrice);

show_final_tab(userSandwitch, userSandwitchPrice);
