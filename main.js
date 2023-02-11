window.onload = function() {
    fetch("https://www.omdbapi.com/?s=Batman&apikey=aee91626")
    .then(async(data)=>{
        const response = await data.json()
        console.log({response})

        const list = document.getElementById("films-list")

        response.Search.forEach((film) => {
            const filmCard = document.createElement('div')
            filmCard.style.background = `url(${film.Poster})`
            filmCard.className = "film-card"
            list.appendChild(filmCard)
          

            
        });
    })
    .catch((error)=>{
        console.log({error})
        alert("Erro ao carregar os filmes")
    })
}

const apiKey = 'aee91626'
const frmPesquisa = document.querySelector('form')
frmPesquisa.onsubmit = (ev)=>{

    ev.preventDefault()
    
    const pesquisa = ev.target.pesquisa.value;
    if(pesquisa == ""){
        alert('Preencha o campo!')
        return;
    }

    fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
    .then(result => result.json())
    .then(json =>  carregaLista(json))

}


const carregaLista = (json) =>{
    const lista = document.querySelector("#films-list")
    lista.innerHTML= ""
    
    
    if(json.Response == 'False'){
        alert('Nenhum filme encontrado')
        return
    }
    json.Search.forEach(element =>{
        console.log(element)
        
        let item = document.createElement('div')
        item.classList.add('film-card')
        
        item.innerHTML = `<img src="${element.Poster}"/>`
        
        lista.appendChild(item)
    })
}