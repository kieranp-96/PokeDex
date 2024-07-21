async function fetchPokeList() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        return await response.json();
    } catch (error) {
        console.error("Error fetching PokeList:", error);
    }
}

async function fetchPokemon(pokeUrl) {
    try {
        const response = await fetch(pokeUrl);
        return await response.json();
    } catch (error) {
        console.error("Error fetching Pokemon:", error);
    }
}

async function displayPokemon() {
    const containerEle = document.getElementById('pokemon-container');
    const pokeListData = await fetchPokeList();

    if (!pokeListData['results']) return;

    for (const pokemon of pokeListData.results) {
        const details = await fetchPokemon(pokemon.url);

        const cardEle = document.createElement("div");

        cardEle.classList.add("pokemon");
        cardEle.innerHTML = `
               <h3>${details.name} </h3>
               <img src="${details.sprites.front_default}" alt="${details.name}">
               <p>Height: ${details.height} feet</p>
               <p>Weight: ${details.weight} lbs</p>
               <p>Types: ${details.types.map(type => type.type.name).join(', ')}</p>
           `;

        containerEle.appendChild(cardEle);
    }
}

displayPokemon();