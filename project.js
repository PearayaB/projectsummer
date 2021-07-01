var output = document.getElementById("output");
function searchAnime(anime) {
  output.innerHTML = "";
  let query = document.getElementById("searchInput").value;
  fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`)
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      data.results.map((element) => {
        addAnimeToCard(element);
      });
    });
}
function addAnimeToData(anime) {
  fetch(`https://se104-project-backend.du.r.appspot.com/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(anime),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => {
      console.log(data);
      output.innerHTML = "";
      showMyList();
    });
}

function addAnimeToCard(anime) {
  let row = document.createElement("row");
  let card = document.createElement("div");
  let img = document.createElement("img");
  img.setAttribute("src", anime.image_url);

  card.appendChild(img);
  let titleAnime = document.createElement("h5");
  titleAnime.innerHTML = `${anime.title}`;

  card.appendChild(titleAnime);
  card.addEventListener("dblclick", () => {
    var cat = confirm(`Add ${anime.title} On MyList`);
    if (cat == true) {
      let movie = anime;
      let id = 632110349;
      a = { id, movie };
      console.log(a);
      addAnimeToData(a);
    }
  });

  output.appendChild(card);
}

document.getElementById("searchButton").addEventListener("click", function () {
  searchAnime();
});

document.getElementById("mylist").addEventListener("click", function () {
  showMyList();
});
function showMyList() {
  output.innerHTML = "";
  fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110349`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      MyList(data);
    });
}
function MyList(dataList) {
  for (data of dataList) {
    addcardOnMylist(data);
  }
}
function addcardOnMylist(anime) {
  let row = document.createElement("row");
  let card = document.createElement("div");
  let img = document.createElement("img");
  img.setAttribute("src", anime.image_url);

  card.appendChild(img);
  let titleAnime = document.createElement("h5");
  titleAnime.innerHTML = `${anime.title}`;
  let button = document.createElement("button");
  button.classList.add("btn");

  button.classList.add("btn-danger");
  button.setAttribute("type", "button");
  button.innerText = "DELETE";
  button.addEventListener("click", function () {
    let confirmMsg = confirm("Do you want to remove this anime?");
    if (confirmMsg) {
      deleteData(anime);
    }
  });

  let buttonDetail = document.createElement("button");
  buttonDetail.classList.add("btn");
  buttonDetail.classList.add("btn-success");
  buttonDetail.setAttribute("type", "button");
  buttonDetail.innerText = "detail";
  buttonDetail.addEventListener("click", function () {
    output.innerHTML = "";
    showcontent(anime);
  });
  card.appendChild(titleAnime);
  card.appendChild(button);
  card.appendChild(buttonDetail);
  output.appendChild(card);
}
function showcontent(anime) {
  let overAll = document.createElement("div");
  overAll.classList.add("row");
  overAll.classList.add("flex-container");
  let Allmight = document.createElement("div");
  Allmight.classList.add("col-3");

  let one = document.createElement("div");
  one.classList.add("card");

  let img = document.createElement("img");
  img.classList.add("card-img-top");
  let imgname = data.image_url;
  img.setAttribute("src", imgname);

  let inone = document.createElement("div");
  inone.classList.add("card-body");
  let H5 = document.createElement("h5");
  H5.classList.add("card-title");
  let name = data.title;
  H5.innerHTML = name;

  one.appendChild(img);
  Allmight.appendChild(one);
  let txtName = document.createElement("div");
  txtName.classList.add("col");
  txtName.classList.add("controlflex");
  let url = data.url;
  let title = data.title;
  let synopsis = data.synopsis;
  let type = data.type;
  let episodes = data.episodes;
  let score = data.score;
  let rated = data.rated;

  let row1 = document.createElement("div");
  row1.classList.add("row");
  row1.classList.add("flex-container");
  col_item = document.createElement("div");
  col_item.classList.add("col");
  col_item.innerHTML = ` Name : ${title} <br>
                              Type : ${type} <br>
                              Episodes : ${episodes} <br>
                              Rated : ${rated} <br>
                              Score : ${score} <br>
                              Url : ${url} <br>
                              ${synopsis}`;
  row1.appendChild(col_item);
  let row2 = document.createElement("div");
  row2.classList.add("row");
  let col10 = document.createElement("div");
  col10.classList.add("col-10");
  let col2 = document.createElement("div");
  col2.classList.add("col-2");
  let button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("btn-success");
  button.setAttribute("type", "button");
  button.innerText = "Back";
  button.addEventListener("click", function () {
    output.innerHTML = "";
    showMyList();
  });

  col2.appendChild(button);
  row2.appendChild(col10);
  row2.appendChild(col2);
  txtName.appendChild(row1);
  txtName.appendChild(row2);

  overAll.appendChild(Allmight);
  overAll.appendChild(txtName);
  output.appendChild(overAll);
}
function deleteData(id) {
  fetch(
    `https://se104-project-backend.du.r.appspot.com/movie?id=632110349&&movieId=${id.id}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => {
      alert(`This anime is delete now`);
    })
    .catch((error) => {
      alert(`your input anime id is not in the database`);
    });
}
