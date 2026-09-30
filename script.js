

const resultado = document.getElementById('resultado')
const campoBusca = document.getElementById('campobusca')
const btnBuscar = document.getElementById('btnBuscar')
const btnProximo = document.getElementById('btnProximo')
const btnAnterior = document.getElementById('btnAnterior')
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
    const url = "https://pokeapi.co/api/v2/pokemon/" + termo
    const resposta = await fetch(url)
    if (!resposta.ok) {
        resultado.innerHTML = '<p>Pokémon não encontrado.</p>'
        return
    }
    const pokemon =  await resposta.json()
    pokemonAtual = pokemon.id

    resultado.innerHTML = `
    <img src="${pokemon.sprites.front_default}"/> 
    <p>#${pokemon.id}</p>
    <h2>${pokemon.name}</h2>
     `

}

btnBuscar.addEventListener('click', () => {
    console.log("fui clicado buscando pokemon" + campoBusca.value)
    const termo = campoBusca.value.trim()
    if (termo) buscarPokemon(termo)
});
campoBusca.addEventListener("keyup", evento => {
    if (evento.key === "Enter") {
        btnBuscar.click()
    }
})

btnProximo.addEventListener('click', () => {
    buscarPokemon(pokemonAtual + 1)
})
btnAnterior.addEventListener('click', () => {
    buscarPokemon(pokemonAtual - 1)
})
