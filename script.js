const url = "https://pokeapi.co/api/v2/pokemon/25"

const resultado = document.getElementById('resultado')

const resposta = fetch(url)
                    .then (resposta => resposta.json())
                    .then (resposta => resultado.innerHTML =`
                        <img src="${resposta.sprites.front_default}"/> 
                        <p>#${resposta.id}</p>
                        <h2>${resposta.name}</h2>
                    `)
                    