const axios = require("axios");

const getAllPokemons = async () => {
  let next = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0.";
  const pokemons = [];
  const response = await axios.get(next);
  pokemons.push(...response.data.results);
  return await Promise.all(
    pokemons.map(async (pokemon) => {
      const extraData = await getPokemonData(pokemon.url);
      return {
        name: pokemon.name,
        ...extraData,
      };
    })
  );
};

const getPokemonData = async (url) => {
  const response = await axios.get(url);
  const abilities = response.data.abilities.map((ab) => ab.ability.name);
  const types = response.data.types.map((t) => t.type.name);
  const moves = response.data.moves.map((move) => move.move.name);
  const weight = response.data.weight;
  return {
    abilities,
    moves,
    types,
    weight,
  };
};

module.exports = {
  getAllPokemons,
};
