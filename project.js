function searchAnime(event){
    let query = document.getElementById('searchInput').nodeValue
    fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`)
    .then((Response)=>{
        return Response.json()
    }).then((data)=>{
        data.results.map((element)=>{
            console.log(element)
            addAnimeToCard(element)
        })
    })
}
function onLoad(){
    document.getElementById('searchButton').addEventListener('click',searchAnime)
}
function addAnimeToData(anime) {
    let imageElem = document.getElementById('image')
    imageElem.setAttribute('src',anime.image_url)
    let titleElem = document.getElementById('title')
    titleElem.innerHTML = anime.title
}
function addAnimeToCard(anime) {
    const searchList = document.getElementById('searchList')
    let row = document.createElement('row')
    let card = document.createElement('div')
    let img = document.createElement('img')
    img.setAttribute('src',anime.image_url)
    img.addEventListener('dblclick',addToFavAnime())
    card.appendChild(img)
    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`

    card.appendChild(titleAnime)
    searchList.appendChild(card)
}
function addToFavAnime(){}
function addMyListToTable(movie){
    const row2 = document.getElementById('myListTable')

    let cell = document.createElement('div')
    cell.classList.add("col-sm-3","mx-auto")
    cell.style.margin="12px"

        let cardint = document.createElement('div')
        cardint.classList.add("card","text-white","bg-dark")

            let cardbody = document.createElement('div')
            cardbody.classList.add("card-body")
                let image = document.createElement('img')
                image.src = movie.image_url
                image.classList.add("rounded","mx-auto","d-block")
                image.style.border="3px solid white"

                let brea = document.createElement('br')

                let title2 = document.createElement('div')
                title2.classList.add("d-flex","justify-content-center","mx-auto")

                let title = document.createElement('h5')
                title.classList.add("card-title")
                title.innerHTML = movie.title
                title2.appendChild(title)

                let buttons = document.createElement('div')
                buttons.classList.add("d-flex","justify-content-center","mx-auto")

                let detail = document.createElement('button')
                detail.classList.add("btn","btn-primary")
                detail.style.margin="10px";
                detail.innerHTML = "Details"
                detail.addEventListener('click',function(){
                    getdetail(movie.id)
                })
                buttons.appendChild(detail)


                let del = document.createElement('button')
                del.classList.add("btn","btn-danger")
                del.style.margin="10px";
                del.innerHTML = "Delete"
                del.addEventListener('click',function(){
                    let confirmDel = confirm(`Are you sure you want to delete ${movie.title}?`)
                    if(confirmDel){
                        delmovie(movie.id)
                    } 
                    
                })
                buttons.appendChild(del)
            cardbody.appendChild(image)
            cardbody.appendChild(brea)
            cardbody.appendChild(title2)
            cardbody.appendChild(buttons)

        cardint.appendChild(cardbody)

    cell.appendChild(cardint)

    row2.appendChild(cell)
}
function showDetail(movie){
    const row = document.getElementById('Detail')

    let button = document.createElement('button')
    button.classList.add("btn","btn-primary")
    button.style.margin="10px"
    button.innerHTML="Back"
    button.addEventListener('click',function(){
        showList()
    })

    let cell = document.createElement('div')
    cell.classList.add("col-sm-6","mx-auto")
    cell.style.margin="12px"

        let cardint = document.createElement('div')
        cardint.classList.add("card","text-white","bg-dark")

            let cardbody = document.createElement('div')
            cardbody.classList.add("card-body")
                let image = document.createElement('img')
                image.src = movie.image_url
                image.classList.add("rounded","mx-auto","d-block")
                image.style.border="3px solid white"

                let brea = document.createElement('br')

                let title = document.createElement('h5')
                title.classList.add("card-title")
                title.innerHTML = movie.title

                let synopsis = document.createElement('p')
                synopsis.classList.add("card-text")
                synopsis.innerHTML = "Synopsis : " + movie.synopsis

                let type = document.createElement('p')
                type.classList.add("card-text")
                type.innerHTML = "Type : " + movie.type

                let episode = document.createElement('p')
                episode.classList.add("card-text")
                episode.innerHTML = "Episodes : " + movie.episodes

                let rated = document.createElement('p')
                rated.classList.add("card-text")
                rated.innerHTML = "Rated : " + movie.rated
            cardbody.appendChild(image)
            cardbody.appendChild(brea)
            cardbody.appendChild(title)
            cardbody.appendChild(synopsis)
            cardbody.appendChild(type)
            cardbody.appendChild(episode)
            cardbody.appendChild(rated)
        cardint.appendChild(button)
        cardint.appendChild(cardbody)
    
    cell.appendChild(cardint)
    
    row.appendChild(cell)
}