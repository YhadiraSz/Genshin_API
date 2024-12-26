const listCharacter = document.querySelector("#listCharacter");
const URL = "https://gsi.fly.dev/characters/";
const characters = []; // Array para almacenar los personajes
const btnVision = document.getElementsByClassName("btn");

// Agrega event listeners a cada botón
for (let i = 0; i < btnVision.length; i++) {
    btnVision[i].addEventListener("click", showCharacterByElement);
}

// Recopilamos todos los personajes
for (let i = 1; i <= 51; i++) {
    fetch(URL + i)
        .then(response => response.json())
        .then(data => {
            characters.push(data.result); // Agregamos cada personaje al array
            if (characters.length === 51) { // Verificamos si ya tenemos todos los personajes
                characters.sort((a, b) => a.id - b.id); // Ordenamos los personajes por ID
                characters.forEach(character => showCharacter(character)); // Mostramos los personajes
            }
        })
        .catch(error => console.error('Error fetching character:', error));
}

// Función para mostrar todos los personajes
function showCharacter(character) {
    // Verificar que todas las propiedades necesarias estén presentes
    const { id, name, vision, weapon, rarity, wiki_url } = character;
    if (!id || !name || !vision || !weapon || !rarity || !wiki_url) {
        console.error('Missing character properties:', character);
        return;
    }

    const visionLowerCase = vision.toLowerCase();
    const characterImageSrc = `../Genshin_API/img/characters/${name.toLowerCase()}.webp`; // Usar name en minúsculas
    const elementImageSrc = `../Genshin_API/img/elements/${vision.toLowerCase()}.png`; // Usar vision en minúsculas

    const div = document.createElement("div");
    div.classList.add("character");
    div.dataset.vision = visionLowerCase; // Añadimos un data attribute para el filtro
    div.innerHTML = `
        <p class="character-id-back">#${id}</p>
        <div class="character-img">
            <img src="${characterImageSrc}" alt="${name}">
        </div>
        <div class="character-info">
            <div class="name-container">
                <p class="character-id">#${id}</p>
                <h2 class="character-name">${name}</h2>
            </div>
            <div class="element-info">
                <div class="info-btn ${visionLowerCase}">
                    <img class="element-img" src="${elementImageSrc}" alt="${vision}">
                    <p class="character-element">${vision}</p>
                </div>
                <p class="character-weapon info-btn">${weapon}</p>
                <p class="character-rarity info-btn">${rarity.replace('_', ' ')}</p>
            </div>
        </div>
    `;

    listCharacter.append(div);
}


// Función para mostrar personajes filtrados por visión
function showCharacterByElement(event) {
    const vision = event.currentTarget.id; // Obtiene el id del botón clickeado
    const charactersDivs = document.querySelectorAll(".character");

    charactersDivs.forEach(characterDiv => {
        if (vision === "all" || characterDiv.dataset.vision === vision) {
            characterDiv.style.display = "block"; // Muestra el personaje
        } else {
            characterDiv.style.display = "none"; // Oculta el personaje
        }
    });
}
