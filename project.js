var output = document.getElementById('output')
function searchAnime(anime) {
    output.innerHTML=''
    let query = document.getElementById('searchInput').value
    fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`)
        .then((Response) => {
            return Response.json()
        }).then((data) => {
            data.results.map((element) => {
                // console.log(element)
                addAnimeToCard(element)
            })
        })
}
function addAnimeToData(anime) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(anime)
    }).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        console.log(data)
        output.innerHTML=''
        showMyList()
        
        
    })
}


function addAnimeToCard(anime) {
    
    let row = document.createElement('row')
    let card = document.createElement('div')
    let img = document.createElement('img')
    img.setAttribute('src', anime.image_url)
    
    card.appendChild(img)
    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`

    card.appendChild(titleAnime)
    card.addEventListener('dblclick', () => {
        // alert('โง่')
        var cat = confirm(`Add ${anime.title} On MyList`)
        if(cat == true){
             let movie = anime
             let id =632110349
             a ={id,movie}
             console.log(a)
             addAnimeToData(a)
            
        }
    })
    
    output.appendChild(card)
}
function addToFavAnime() { }
document.getElementById('searchButton').addEventListener('click', searchAnime)

// ----------------------------------------------------------------------------

// function onLoad() {


//     inputsearch.addEventListener('click', () => {
//         detailbox.style.display = 'none'
//         SearchBox.style.display = 'block'
//         sild.style.display = 'none'
//         Mylist.style.display = 'none'
//         let inputbarsearch = document.getElementById('barsearch').value
//         fetch(`https://api.jikan.moe/v3/search/anime?q=${inputbarsearch}`).then(response => {
//             return response.json()
//         }).then(newresponse => {
//             showanime(newresponse.results)
//         })
//     })
//     function showanime(getnewresponse) {
//         document.getElementById('output').innerHTML = ''
//         for (anime of getnewresponse) {
//             adddom(anime)
//         }
//     }
// }
document.getElementById('mylist').addEventListener('click',showMyList)
function showMyList(){
    output.innerHTML =''
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110349`)
        .then((response) => {
            return response.json()
        }).then(data => {
            MyList(data)
        })
}
function MyList(dataList) {

    for (data of dataList) {

        addcardOnMylist(data)
    }
}
function addcardOnMylist(anime){
    let row = document.createElement('row')
    let card = document.createElement('div')
    let img = document.createElement('img')
    img.setAttribute('src', anime.image_url)
    
    card.appendChild(img)
    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`
    let button = document.createElement('button')
    button.classList.add('btn')
    
        button.classList.add('btn-danger')
        button.setAttribute('type', 'button')
        button.innerText = 'DELETE'
        button.addEventListener('click', function() {
            let confirmMsg = confirm('Do you want to remove this anime?')
            if(confirmMsg){
                deleteData(anime)
            }
            
        })
        
    card.appendChild(titleAnime)
    card.appendChild(button)
    
    output.appendChild(card)
}
function deleteData(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110349&&movieId=${id.id}`,{
        method: 'DELETE'
    }).then(response => {
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)    
        }
     }).then(data => {
         alert(`This anime is delete now`)

     }).catch(error => {
         alert(`your input anime id is not in the database`)
     })}

