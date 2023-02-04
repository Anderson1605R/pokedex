const pokeApi = {};

function convertPokeApiDetail(pokeDetails) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetails.id;
  pokemon.name = pokeDetails.name;

  const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetails.sprites.other.dream_world.front_default;

  return pokemon;
}
pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url).then((response) =>
    response.json().then(convertPokeApiDetail)
  );
};
pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return (
    fetch(url)
      //  função assíncrona que pega a resposta transfirmada em json
      .then((response) => response.json())
      .then((responseBody) => responseBody.results)
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
      .then((detailRequest) => Promise.all(detailRequest))
      .then((pokemonsDetails) => pokemonsDetails)
  );
};
