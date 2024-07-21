async function fetchAndDisplayPokemon() {
    try {
        const listResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const listData = await listResponse.json();

        const container = document.getElementById('pokemon-container');

        for (const pokemon of listData.results) {
            const detailResponse = await fetch(pokemon.url);
            const pokemonData = await detailResponse.json();
            console.log(pokemonData)
            const pokemonCard = document.createElement("div");
            pokemonCard.classList.add("pokemon")
            pokemonCard.innerHTML = `
                <h3>${pokemonData.name} </h3>
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <p>Height: ${pokemonData.height} feet</p>
                <p>Weight: ${pokemonData.weight} lbs</p>
                <p>Types: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
            `;
            container.appendChild(pokemonCard);
        }
    } catch (error) {
        console.error("Error fetching or displaying Pokemon:", error);
    }
}

fetchAndDisplayPokemon();