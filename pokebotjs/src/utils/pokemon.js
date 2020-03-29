const fetch = require('node-fetch');
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

async function getPokemon(pokemon) {
    let response = await fetch(`${BASE_URL}/${pokemon}`);
    return await response.json();
}

module.exports = { getPokemon };