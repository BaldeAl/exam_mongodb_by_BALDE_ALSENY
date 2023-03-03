function addBook(){
var formulaire = document.querySelector('#form-ajout')
var title = document.querySelector('#title');
var author = document.querySelector('#author');
var genre = document.querySelector('#genre');
var description = document.querySelector('#description');
var publishedDate = document.querySelector('#publishedDate');

  var tmp = {
    title: title.value,
    author: author.value,
    genre: genre.value,
    description: description.value,
    publishedDate: publishedDate.value,

  };

  let url = '/books';

  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(tmp)
  };
  console.log("c'est bon")

fetch(url, options)
  .then((res) => {
    if(res.ok) {
      addOneLine(tmp);
    }
  });
}

function deleteBook(id) {
  let url = '/books/' + id;
  let options = {
    method: 'DELETE',
  }
  if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ? ')) {
  fetch(url, options)
    .then((res) => {
      if(res.ok) {
        window.location.reload();
      }
    })
  }
}

function addOneLine(data) {
  var tab = document.querySelector('#books');
  var newLine = document.createElement('tr');
  for (const prop in data) {
    if(prop != '_id' && prop != '__v') {
      var tmp = document.createElement('td');
      tmp.innerText = data[prop];
      newLine.appendChild(tmp);
    }
  }

  var tdLink = document.createElement('td');
  var link = document.createElement('a');
  link.href = '/pages/edit.html#' + data._id;
  link.innerText = 'Détails';
  tdLink.appendChild(link);
  newLine.appendChild(tdLink);



  var tdSuppr = document.createElement('td');
  var btnSuppr = document.createElement('button');
  btnSuppr.innerText = 'Suppression';
  btnSuppr.classList.add('btn', 'btn-outline-danger');
  tdSuppr.appendChild(btnSuppr);
  newLine.appendChild(tdSuppr);

//écouteur d'événement du bouton suppprimer
  btnSuppr.addEventListener('click', (e) => {
    deleteBook(data._id);
  });

  tab.appendChild(newLine);
}

//écouteur d'évenement du bouton valider
var btn = document.querySelector('#valid');
btn.addEventListener('click', (e) => {
  e.preventDefault();
  addBook();
  window.location.reload()
});

let myHeaders = new Headers();
let url = '/books';

let options = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

fetch(url, options)
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
  })
  .then((response) => {
    response.forEach(elt => {
      addOneLine(elt);
    });
  })






