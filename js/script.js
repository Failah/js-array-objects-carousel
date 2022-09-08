console.log('JS OK!');


/*
creare un carousel di immagini
le immagini sono in un array (array di stringhe)
pulsanti avanti indietro
aggiungere le thumb (la thumb attiva sarà distinguibile dalle altre)
dopo 5 secondi la slide avanza automaticamente
*/

/*
Consegna:
Riprendiamo l'esercizio carosello e rifacciamolo, questa volta usando gli oggetti, 
prendendo come riferimento il codice scritto oggi insieme a lezione, che trovate in allegato

Modifichiamo il codice dell'esercizio per renderlo funzionante con un array di oggetti, 
con una sola regola: non è possibile modificare l'HTML ma solamente JS e CSS. 
Ricordiamo sempre l'importanza dell'integrità del dato.

Bonus:
E se volessi un bottone per invertire la "direzione" del carosello nell'avanzamento automatico?

Dati array:
const images = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
];
*/


const images = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
];

// settings
const CHANGE_IMAGE_DELAY = 1;

console.log(images);

let activeIndex = 0;
buildCarousel(images, activeIndex);

let idInterval = setInterval(moveCarouselForward, CHANGE_IMAGE_DELAY * 1000);

const leftArrowButton = document.getElementById('left-arrow');
const rightArrowButton = document.getElementById('right-arrow');

leftArrowButton.addEventListener('click', moveCarouselPrevious);

rightArrowButton.addEventListener('click', moveCarouselForward);


// bottone che switcha la direzione di scorrimento del carosello
const bodyHtml = document.querySelector('body');

let newButton = document.createElement('button');
newButton.append('Switch Caruosel Flow Direction');
newButton.classList.add('switch-button');

document.body.append(newButton);

const switchButton = document.querySelector('.switch-button');


// IL BOTTONE GENERATO COSI' PER QUALCHE MOTIVO ROMPE LE FRECCE DI SCORRIMENTO
/*
bodyHtml.innerHTML += `
                <div class="container-switch-button">
                    <button id="switch-button">
                        Switch Caruosel Flow Direction
                    </button>
                </div>
`;

const switchButton = document.getElementById('switch-button');
*/

let switchIndex = true;

let switchInterval;

switchButton.addEventListener('click',
    switchCarouselDirection
)


function switchCarouselDirection() {

    // METODO CON IF
    clearInterval(idInterval);


    if (switchIndex === true) {
        clearInterval(switchInterval);
        switchInterval = setInterval(moveCarouselPrevious, CHANGE_IMAGE_DELAY * 1000);
    } if (switchIndex === false) {
        clearInterval(switchInterval);
        switchInterval = setInterval(moveCarouselForward, CHANGE_IMAGE_DELAY * 1000);
    }

    clearInterval(idInterval);

    switchIndex = !switchIndex;
}


// FUNZIONI

function buildCarousel(places, activeIndex) {
    const carouselImages = document.querySelector('.carousel-images');
    const carouselThumbs = document.querySelector('.carousel-thumbs');
    let content = '';
    for (let i = 0; i < places.length; i++) {
        const place = places[i];
        const imageClass = i === activeIndex ? 'carousel-img active' : 'carousel-img'
        content += `<img class="${imageClass}" src="${place.url}" />`;
    }
    // console.log({content});
    carouselImages.innerHTML = content;
    carouselThumbs.innerHTML = content;
}


function moveCarouselForward() {
    console.log('Mi hai cliccato DX');
    clearInterval(idInterval)
    // se l'indice si trova in fondo allora lo riposizione all'inizio dell'array
    activeIndex = activeIndex < images.length - 1 ? activeIndex + 1 : 0;
    buildCarousel(images, activeIndex);
    idInterval = setInterval(moveCarouselForward, CHANGE_IMAGE_DELAY * 1000);
}

function moveCarouselPrevious() {
    console.log('Mi hai cliccato SX');
    clearInterval(idInterval)
    // se l'indice è in prima posizione si valorizza all'ultima posizione dell'array
    activeIndex = activeIndex > 0 ? activeIndex - 1 : images.length - 1;
    buildCarousel(images, activeIndex);
    idInterval = setInterval(moveCarouselForward, CHANGE_IMAGE_DELAY * 1000);
}


// METODO CON SWITCH (BOTTONE CHE CAMBIA DIREZIONE FLUSSO)
/*
switch (switchIndex) {
    case 0:
        clearInterval(idInterval);
        setInterval(moveCarouselPrevious, CHANGE_IMAGE_DELAY * 1000);
        switchIndex = 1;
        break;
    case 1:
        clearInterval(idInterval);
        setInterval(moveCarouselForward, CHANGE_IMAGE_DELAY * 1000);
        switchIndex = 0;
        break;
}
*/


/*
function createImageArray(numImages) {
    const images = [];
    for (let i = 1; i <= numImages; i++) {
        const fileName = i < 10 ? '0' + i : i;
        const url = 'img/' + fileName + '.jpg';
        images.push(url);
    }

    return images;
}
*/



/* // ESERCIZIO FUNZIONANTE SENZA ARRAY OBJECT
// settings
const NUM_IMAGES = 5;
const CHANGE_IMAGE_DELAY = 5;

const images = createImageArray(NUM_IMAGES);
console.log(images);



let activeIndex = 0;
buildCarousel(images, activeIndex);

let idInterval = setInterval(moveCarouselForward, CHANGE_IMAGE_DELAY * 1000);

const leftArrowButton = document.getElementById('left-arrow');
const rightArrowButton = document.getElementById('right-arrow');

leftArrowButton.addEventListener('click', moveCarouselPrevious);


rightArrowButton.addEventListener('click', moveCarouselForward);
*/