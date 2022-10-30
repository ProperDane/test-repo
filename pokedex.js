const pokemonCount = 151;
var pokedex = {}; // {1 : {"name" : "bulbasaur", "img" : url, "type" : ["grass", "poison"], "desc" : "...."} }

window.onload = async function() {
    //getPokemon(1);
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);

        let pokemon = document.createElement("div");
        let pokemonId = document.createElement("span");
        let pokemonName = document.createElement("p");
        let pokemonImg = document.createElement("img");

        switch (pokedex[i]["id"].toString().length) {
            case 1:
                pokemonId.innerText = "#00" + pokedex[i]["id"];
                break;
            case 2:
                pokemonId.innerText = "#0" + pokedex[i]["id"];
                break;
            default:
                pokemonId.innerText = "#" + pokedex[i]["id"];
        }
        pokemonName.innerText = pokedex[i]["name"].toUpperCase();
        pokemonImg.src = pokedex[i]["img"];
        pokemon.classList.add("col-sm-12", "col-md-4", "col-2", "card");
        
        pokemon.appendChild(pokemonId);
        pokemon.appendChild(pokemonName);
        pokemon.appendChild(pokemonImg);

        document.getElementById("pokemon-list").append(pokemon);
    }

    console.log(pokedex);
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    //console.log(pokemon);

    let pokemonId = pokemon["id"];
    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImage = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    //console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

    pokedex[num] = {"id" : pokemonId,"name" : pokemonName, "img" : pokemonImage, "types" : pokemonType, "desc" : pokemonDesc};

}

function updatePokemon() {
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];
}