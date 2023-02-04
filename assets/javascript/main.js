const pokemonOl = document.getElementById("pokemonOl");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 10;
let offset = 0;
const maxRecord = 151;

function convertPokemonToLi(pokemon) {
  return `
  <li class="pokemon ${pokemon.type}">
  <span class="number">#${pokemon.number}</span>
  <span class="name">${pokemon.name}</span>

  <div class="detail">
    <ol class="types">
      ${pokemon.types
        .map((type) => `<li class="type ${type}">${type}</li>`)
        .join("")}
    </ol>

    <img
      src="${pokemon.photo}"
      alt="${pokemon.name}"
    />
  </div>`;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemon = []) => {
    const newHtml = pokemon
      .map(
        (pokemon) => `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
      
        <div class="detail">
          <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
          </ol>
      
          <img
            src="${pokemon.photo}"
            alt="${pokemon.name}"
          />
        </div>`
      )
      .join("");
    pokemonOl.innerHTML += newHtml;
  });
}
loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsNextPage = offset + limit;

  if (qtdRecordsNextPage >= maxRecord) {
    const newLimit = maxRecord - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
