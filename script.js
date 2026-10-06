const resultado = document.getElementById('resultado')
const campoBusca = document.getElementById('campobusca')
const formBusca = document.getElementById('formBusca')
const btnProximo = document.getElementById('btnProximo')
const btnAnterior = document.getElementById('btnAnterior')
const btnAleatorio = document.getElementById('btnAleatorio')
const cachePokemon = new Map()
let pokemonAtual = 1
buscarPokemon(1)
//function buscarPokemon(termo) {
//  const url = "https://pokeapi.co/api/v2/pokemon/" + termo
//forma compacta,usando arrow function
//fetch(url)
//  .then(resposta => resposta.json())
//  .then(resposta => resultado.innerHTML = `
//               <img src="${resposta.sprites.front_default}"/> 
//                  <p>#${resposta.id}</p>
//               <h2>${resposta.name}</h2>
//           `)

//}
async function buscarPokemon(termo) {
    const busca = String(termo).trim().toLowerCase()
    const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(busca)}`
    resultado.innerHTML = '<p>Buscando...</p>'

    try {
        let pokemon = cachePokemon.get(busca)
        if (!pokemon) {
            const resposta = await fetch(url)
            if (!resposta.ok) {
                resultado.innerHTML = '<p>Pokémon não encontrado.</p>'
                return
            }

            pokemon = await resposta.json()
            cachePokemon.set(busca, pokemon)
        }

        pokemonAtual = pokemon.id

        resultado.innerHTML = `
        <img src="${pokemon.sprites.front_default ?? ''}" alt="${pokemon.name}"/>
        <p>#${pokemon.id}</p>
        <h2>${pokemon.name}</h2>
         `
    } catch (erro) {
        console.error('Não foi possível buscar o Pokémon:', erro)
        resultado.innerHTML = '<p>Não foi possível conectar à PokéAPI. Verifique sua conexão e tente novamente.</p>'
    }
}

formBusca.addEventListener('submit', evento => {
    evento.preventDefault()
    const termo = campoBusca.value.trim()
    if (termo) buscarPokemon(termo)
})

btnProximo.addEventListener('click', () => {
    if(pokemonAtual<1025)
    console.log('buscando pokemon')
    buscarPokemon(pokemonAtual + 1)
})
btnAnterior.addEventListener('click', () => {
     console.log('buscando pokemon')
    buscarPokemon(pokemonAtual - 1)
})
btnAleatorio.addEventListener('click', () => {
     console.log('pokemon aleatorio')
pokemonAtual=Math.floor(Math.random()*1025)+1;
buscarPokemon(pokemonAtual)
});
