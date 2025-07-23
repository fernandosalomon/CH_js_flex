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
}

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
        ]
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
        ]
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
]



// FUNCTIONS

function choose_combo(){
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
            return -1;
            break;
        default:
            alert('La opción elejida no es válida. Pruebe de vuelta');
            chCombo = set_combo();
    }
    
    return chCombo;
}

function build_sandwitch(chCombo){

    const userSandwitch = {
        'Pan': [],
        'Proteina': [],
        'Quesos': [],
        'Agregados': [],
        'Aderezos': [],
    }
    
    ingredients.forEach(e => {

        let message = "";
        let max_ch = e.max_amount_to_choose[chCombo];
        let ing_name = e.name;

        for(let i = 0; i < max_ch; i++){
            message = `Elegí tu/s opcion/es de ${ing_name} (Te quedan ${max_ch - i}):\n`
            
            e.options.forEach((ing, idx) => {
                message += `${idx+1}. ${ing}\n`;
            })
            
            let isInputOk = false;
            let chOption = "";

            do{
                chOption = prompt(message);
                
                if(!isNaN(chOption) && chOption > 0 && chOption <= e.options.length){
                    isInputOk = true;
                }else{
                    alert('La opción elejida no es válida. Pruebe de vuelta');
                }

            }while(!isInputOk);
            
            userSandwitch[ing_name].push(e.options[chOption-1]);
        }
    })

    return userSandwitch;
}

function calculate_price(userSandwitch){
    let price = 0
   
    for(const [key,value] of Object.entries(userSandwitch)){

        price += value.reduce((acc, val) => acc += parseFloat(prices[val]),0);
    }
    
    return price;
}

function show_final(chCombo, userSandwitch){
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

    let price = calculate_price(userSandwitch);

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
            show_final(userSandwitch);

    }
}



function main_menu(){

    alert('Bienvenido a SandwitchMania\nDonde puedes armar tu sandwitch como tu quieras')
    alert('A continuación te daremos las opciones para que armes tu sandwitch y al final veras el precio a pagar en caja.\nCOMIENZA A ARMAR TU SANDWITCH AHORA')

    let chCombo = choose_combo();

    if(chCombo === -1){
        return 0;
    }

    let userSandwitch = build_sandwitch(chCombo);

    show_final(chCombo, userSandwitch);

}

main_menu();