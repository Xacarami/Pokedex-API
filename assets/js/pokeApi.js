const pokeApi = {};

function convertPokeApiDetail(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.id = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name)
    const [ type ] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetail)
};

pokeApi.getPokemons = async (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    //Vai retornar uma promise.
    //Para processar o resultado da promise, usa-se .then
    //Será muito parecido com o try...catch...finally
    //Pode usar mais que um .then, porém vai trabalhar com o retorno do .then anterior
    try {
        const response = await fetch(url);
        const responseBody = await response.json();
        const pokemons = responseBody.results;
        const detailRequests = pokemons.map(pokeApi.getPokemonDetail);
        const pokemonsDetails = await Promise.all(detailRequests);
        return pokemonsDetails;
    } catch (error) {
        return console.error(error);
    }
};

