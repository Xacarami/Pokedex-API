const listaPokemonHTML = document.getElementById("pokemonsList");
const loadMoreButton = document.getElementById("loadMore");
const limit = 10
let offset = 0
const maxRecords = 151

function colocandoPokemons(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">${pokemon.id}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
                ${pokemon.types
                    .map((type) => `<li class="type ${type}">${type}</li>`)
                    .join("")}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li>
    `;
}

function loadPokemon(offset, limit) {
    pokeApi
        .getPokemons(offset, limit)
        .then((pokemonList = []) => {
            //se o f12 estiver aberto, fará debug aqui se tiver o debugger
            // debugger

            //O join() junta tudo com , e isso não é o ideal, por isso o ''
            const novoHtml = pokemonList.map(colocandoPokemons).join("");
            listaPokemonHTML.innerHTML += novoHtml
        })
        .finally(() => console.log("Requisição finalizada"));
}

loadPokemon(offset, limit)

loadMoreButton.addEventListener('click', ()=>{
    offset += limit

    const qtdProximaPagina = offset + limit

    if (qtdProximaPagina >= maxRecords){
        const novoLimite = maxRecords - offset
        loadPokemon(offset, novoLimite)

        //Aqui eu escalo para o pai dele, e depois eu removo ele.
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemon(offset, limit)
    }

})