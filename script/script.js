const search = document.querySelector("#search");
const number = document.querySelector("#number");
const pokemonImage = document.querySelector("#pokemon-image");
const type = document.querySelector(".type");
const types = document.querySelector("#types");
const statNumber = document.querySelectorAll(".stats-num");
const barInner = document.querySelectorAll(".bar-inner");
const barOuter = document.querySelectorAll(".bar-outer");
const statDesc = document.querySelectorAll(".stats-desc");
const baseStats = document.querySelector("#base-stats");
const pokedex = document.querySelector("#pokedex");

const typeColors = {
  rock: [182, 158, 49],
  ghost: [112, 85, 155],
  steel: [183, 185, 208],
  water: [100, 147, 235],
  grass: [116, 203, 72],
  psychic: [251, 85, 132],
  ice: [154, 214, 223],
  dark: [117, 87, 76],
  fairy: [230, 158, 172],
  normal: [170, 166, 127],
  fighting: [193, 34, 57],
  flying: [168, 145, 236],
  poison: [164, 62, 158],
  ground: [222, 193, 107],
  bug: [167, 183, 35],
  fire: [245, 125, 49],
  electric: [249, 207, 48],
  dragon: [112, 55, 255],
};

const fetchApi = async (pokemonName) => {
  // Joining names of pokemon that need a dash/multiple words

  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" +
      pokemonName.split(" ").join("-").toLowerCase()
  );

  if (response.status === 200) {
    const pokemonData = await response.json();
    return pokemonData;
  }
  return false;
};

search.addEventListener("change", async (event) => {
  const pokemonData = await fetchApi(event.target.value);

  // Validation when pokemon doesn't exist
  if (!pokemonData) alert("Pokemon does not exist.");

  // debugging
  //console.log(pokemonData);

  // Pokemon's main color for changing the UI theme
  const mainColor = typeColors[pokemonData.types[0].type.name];
  baseStats.style.color         = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
  pokedex.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;

  // Sets the pokemon's number at the top of the page
  number.innerHTML = "#" + pokemonData.id.toString().padStart(3, "0");

  // Sets pokemon's image
  pokemonImage.src = pokemonData.sprites.other.home.front_default;

  // Sets pokemon's types
  types.innerHTML = '';

  pokemonData.types.forEach((pokeType) => {
    let newType = document.createElement("span");
    newType.innerHTML = pokeType.type.name;
    newType.classList.add("type");
    newType.style.backgroundColor = `rgb(${
      typeColors[pokeType.type.name][0]
    }, ${typeColors[pokeType.type.name][1]}, ${
      typeColors[pokeType.type.name][2]
    })`;

    types.appendChild(newType);
  });

  // Updates pokemon's stats
  pokemonData.stats.forEach((stat, i) => {
    statNumber[i].innerHTML = stat.base_stat.toString().padStart(3, "0");
    // Update pokemon's stat bars

    barInner[i].style.width = `${stat.base_stat}%`;
    barInner[i].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    barOuter[i].style.backgroundColor = `rgba(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}, 0.3)`;
    statDesc[i].style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
  });
  });
