//! AL CLICK DI PLAY 

document.getElementById('start-play').addEventListener('click',play);

console.log(play);

function play(){
    console.log(play);

    const NUMERO_BOMBE = 16;


    //! GENERO LE CASELLE IN BASE ALLA DIFFICOLTA' SELEZIONATA


    const difficulty = document.getElementById('difficulty').value;

    let numeroCelle;
    let cellePerRiga;
    const tentativi = [];

    switch (difficulty) {
        case "easy":
            numeroCelle=100;
            cellePerRiga=Math.sqrt(numeroCelle);
            break;
        case "medium":
            numeroCelle=81;
            cellePerRiga=Math.sqrt(numeroCelle);
            break;
        case "hard":
            numeroCelle=49;
            cellePerRiga=Math.sqrt(numeroCelle);
            break;    
    }

    generaCampoGioco(numeroCelle);

    const bombe = generaBombe(NUMERO_BOMBE, numeroCelle);

    function generaCampoGioco(numeroCelle){

        cellePerRiga=Math.sqrt(numeroCelle);
    
        gioco.innerHTML = "";
    
        for (let i = 1; i <= numeroCelle; i++) {
    
            const nodo = document.createElement ('div');
            nodo.classList.add('square');
    
            const dimensione = `calc(100% / ${cellePerRiga})`;
            nodo.style.width = dimensione;
            nodo.style.height = dimensione;
    
            nodo.innerText = i;
        
            nodo.addEventListener('click', handleCellClick);
        
        
            gioco.appendChild(nodo);
            
        }
        return true;
    }

    //! IN CASO CLICCASSI UNA CASELLA CON UNA BOMBA, FINISCE IL GIOCO

    function handleCellClick () {

        this.classList.add('clicked');
        this.removeEventListner('click', handleCellClick );

        const cell = parseint(this.innerText);

        if (bombe.includes(cell)) {
            terminaGioco ();
        }else {
            tentativi.push(cell);
        }
    }


    function terminaGioco (arrayDiTentativi){

        const quadrati = document.getElementsByClassName('square');

        for (let i = 0; i <= quadrati.length ; i++) {
            
            if (bombe.includes(parseInt(quadrati[i].innerText))){
                quadrati[i].classList.add('bomb');
            }


            quadrati[i].removeEventListener('click', handleCellClick);
        }
    }

    alert("sei riuscito a sminare ", arrayDiTentativi.length ,"celle");

    //! GENERA LE BOMBE CASUALI NELLA GRIGLIA
    
    function generaBombe (numeroBombe) {

        const bombeGenerate = [];

        while (bombeGenerate.length < numeroBombe) {

            const bomba = getRandomNumber(1, numeroCelle);

            if (!bombeGenerate.includes(bomba)) {
                bombeGenerate.push(bomba);
            }
        }
        return generaBombe;
    }
}          


function getRandomNumber (min,max) {
    return Math.floor(Math.random()*(max - min +1) + min);
}