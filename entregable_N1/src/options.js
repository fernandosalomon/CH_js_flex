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
    
    ingredients.forEach((elem, index) => {
        let ing_name = elem.name;
        let max_n_choices = elem.max_amount_to_choose[chCombo];
        let ing_options = [];
        let message = "";

        ing_options = Object.keys(elem.options);

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
        }

        all_options.push(ing_options);

    })

}

get_ingredients(ingredients, chCombo)
console.log(userSandwitch)