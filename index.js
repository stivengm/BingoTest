// SCREENSHOOTS 831x925/75%

var step = 2;
/*
    0 -> Pregunta si es Admin
    1 -> Pregunta qué tipo de tarjetón juega y cuántos participantes van a jugar
    2 ->
    3 -> Llenar tarjetón



    TODO: En las reglas de negocio debería tomar lo siguiente
        1. Si es un ADMIN
            2.1. Deberá preguntarle qué tarjetón juega (Tipo de Juego) y cuántos son los participantes que van a jugar, adicionalmente
                si desea a esas (X personas) se genere automáticamente el tarjetón para que pueda ingresar cada invitado manual
            
        2. Si es un INVITADO
            2.1. Deberá preguntarle qué tarjetón juega (Tipo de Juego)
            2.2. Deberá preguntarle si el tarjetón desea ingresarlo manual o al azar.
            2.3. En caso de que sea un tarjetón al azar deberá aparecer una opción arriba que diga nuevamente construir tarjetón al azar

*/

var userType = "";
var bingo = [
    'b',
    'i',
    'n',
    'g',
    'o',
];

var currentGameTypeId = 0;
var gamesTypes = [
    {
        id: 1,
        name: "Horizontal",
        idsItems: ["b-3", "i-3", "n-3", "g-3", "o-3"],
        image: ""
    },
    {
        id: 2,
        name: "Vertical",
        idsItems: ["n-1", "n-2", "n-3", "n-4", "n-5"],
        image: ""
    },
    {
        id: 3,
        name: "Invertido 1",
        idsItems: ["b-1", "i-2", "n-3", "g-4", "o-5"],
        image: ""
    },
    {
        id: 4,
        name: "Invertido 1",
        idsItems: ["o-1", "g-2", "n-3", "i-4", "b-5"],
        image: ""
    },
    {
        id: 5,
        name: "L 1",
        idsItems: ["b-1", "b-2", "b-3", "b-4", "b-5", "i-5", "n-5", "g-5", "o-5"],
        image: ""
    },
    {
        id: 6,
        name: "L 2",
        idsItems: ["o-1", "o-2", "o-3", "o-4", "o-5", "g-5", "n-5", "i-5", "b-5"],
        image: ""
    },
    {
        id: 6,
        name: "L 1",
        idsItems: ["b-1", "b-2", "b-3", "b-4", "b-5", "i-5", "n-5", "g-5", "o-5"],
        image: ""
    },
    {
        id: 7,
        name: "Bordes del Tarjetón",
        idsItems: ["b-1", "b-2", "b-3", "b-4", "b-5", "i-5", "n-5", "g-5", "o-5", "o-4", "o-3", "o-2", "o-1", "g-1", "n-1", "i-1"],
        image: ""
    },
    {
        id: 8,
        name: "Todo el Tarjetón",
        idsItems: ["b-1", "b-2", "b-3", "b-4", "b-5", "i-1", "i-2", "i-3", "i-4", "i-5", "n-1", "n-2", "n-3", "n-4", "n-5", "g-1", "g-2", "g-3", "g-4", "g-5", "o-1", "o-2", "o-3", "o-4", "o-5"],
        image: ""
    }
];

const rangos = {
    b: [1, 15],
    i: [16, 30],
    n: [31, 45],
    g: [46, 60],
    o: [61, 75]
};

var idsItems = [];

window.addEventListener('load', () => {
  playInitialMask();
});

document.addEventListener('DOMContentLoaded', () => {

    // document.getElementById('save-step0').addEventListener('click', () => {
    //     if (userType === "") return;

    //     playMaskTransition(() => {

    //         document.getElementById('step1').style.display = 'block';
    //         document.getElementById('step0').style.display = 'none';
    //         if (step === 0) {
    //             document.getElementById('step0').style.display = 'block';
    //             document.getElementById('step1').style.display = 'none';
    //         }

    //         if (step === 1) {
    //             // document.getElementById('step1').style.display = 'none';
    //             // document.getElementById('step2and3').style.display = 'block';

    //             document.getElementById('step2and3').style.display = 'none';
    //             document.getElementById('step1').style.display = 'block';
    //         }

    //         // if (step === 2 || step === 3) {
    //         //     document.getElementById('step0').style.display = 'none';
    //         //     document.getElementById('step1').style.display = 'block';
    //         // }
    //     });
    // });


    // TODO: Validar si está en el paso 1
    // if (step === 0) {
    //     document.getElementById('step0').style.display = 'block';
    //     document.getElementById('step1').style.display = 'none';
    //     document.getElementById('step2and3').style.display = 'none';
    // }
    
    // if (step === 1) {
    //     // document.getElementById('step1').style.display = 'none';
    //     // document.getElementById('step2and3').style.display = 'block';

    //     document.getElementById('step2and3').style.display = 'none';
    //     document.getElementById('step1').style.display = 'block';
    // }

    // if (step === 2 || step === 3) {
    //     document.getElementById('step0').style.display = 'none';
    //     document.getElementById('step1').style.display = 'block';
    // }



    // let sectionButtonSave = document.getElementById('section-button-save');
    // let idsItemsStorage = window.localStorage.getItem('idsItems');
    // let currentStep = window.localStorage.getItem('step');
    // let currentGameTypeIdStorage = window.localStorage.getItem('currentGameTypeId');

    // if (currentStep != null && currentStep != undefined && currentStep != "") {
    //     step = currentStep;
    //     sectionButtonSave.style.display = 'none';
    // }

    // if (idsItemsStorage != null && idsItemsStorage != undefined && idsItemsStorage != "") {
        
    //     idsItems = JSON.parse(idsItemsStorage);
    //     saveValuesFromItems();
    // }

    let buttonSave = document.getElementById('save');

    buttonSave.addEventListener('click', function () {
        step = 2;
        currentGameTypeId = document.getElementById('typeGameIdChange').value;
        saveConfiguration();
        if (step == 2) {
            sectionButtonSave.style.display = 'none';
        }
    });
});

function playInitialMask() {
  const overlay = document.createElement('div');
  overlay.id = 'mask-overlay';
  document.body.appendChild(overlay);

  overlay.style.animation = 'revealMask 1.4s ease-in-out forwards';

  overlay.addEventListener('animationend', () => {
    overlay.remove();
  });
}

function playMaskTransition(changeStepCallback) {
  const overlay = document.createElement('div');
  overlay.id = 'mask-overlay';
  document.body.appendChild(overlay);

  overlay.style.animation = 'hideMask 1.2s ease-in-out forwards';

  overlay.addEventListener('animationend', function onHide() {
    overlay.removeEventListener('animationend', onHide);

    step = 1;
    if (changeStepCallback) changeStepCallback();

    overlay.style.animation = 'none';
    overlay.offsetHeight;

    overlay.style.animation = 'revealMask 1.4s ease-in-out forwards';

    overlay.addEventListener('animationend', function onReveal() {
      overlay.removeEventListener('animationend', onReveal);
      overlay.remove();
    });
  });
}



function saveValuesFromItems() {
    for (let i = 0; i < idsItems.length; i++) {
        const element = idsItems[i];

        let item = document.getElementById(element.id);
        let gameType = gamesTypes.find((game) => game.id == currentGameTypeId);

        if (gameType.idsItems.includes(element.id)) {
            item.classList.add('in-playing');
        }

        item.innerText = element.value;
        let input = item.querySelector('input');

        if (input) {
            input.style.display = 'none';
        }
    }
}

function saveConfiguration() {
    let ids = [];

    for (let i = 0; i < bingo.length; i++) {
        const element = bingo[i];

        for (let j = 0; j < 5; j++) {

            let id = element + "-" + (j + 1);

            let idItem = document.getElementById(id);
            let input = idItem.querySelector('input');
            let valueInput = input.value;


            ids.push({ id, value: valueInput ?? "" });
        }
    }

    idsItems = ids;
    window.localStorage.setItem('idsItems', JSON.stringify(idsItems));
    window.localStorage.setItem('step', step);
    saveValuesFromItems();

    // TODO: Sacar este guardado para otro lado
    window.localStorage.setItem('currentGameTypeId', currentGameTypeId);
}

function clickItem(id) {
    if (step == 2) {
        let itemSelected = document.getElementById(id);

        if (itemSelected.classList.contains('incorrect')) {
            itemSelected.classList.remove('incorrect');
        } else if (itemSelected.classList.contains('correct')) {
            itemSelected.classList.add('in-playing');
            itemSelected.classList.remove('correct');
        } else {
            if (currentGameTypeId != 0) {
    
                let gameType = gamesTypes.find((game) => game.id == currentGameTypeId);
    
                if (gameType.idsItems.includes(id)) {
                    itemSelected.classList.add('correct');
                    itemSelected.classList.remove('in-playing');
                } else {
                    itemSelected.classList.add('incorrect');
                    itemSelected.classList.remove('in-playing');
                }
            }
        }
    }
}

function selectedUser(usType) {
    let adminBtn = document.getElementById('item-admin-btn');
    let invitadoBtn = document.getElementById('item-invitado-btn');
    userType = usType;

    if (usType === 'admin') {
        adminBtn.classList.add('correct');
        invitadoBtn.classList.remove('correct');
    } else if (usType === 'invitado') {
        invitadoBtn.classList.add('correct');
        adminBtn.classList.remove('correct');
    }
}
