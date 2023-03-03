function addBook(){
var formulaire = document.querySelector('#form-ajout')
var title = document.querySelector('#title');
var author = document.querySelector('#author');
var genre = document.querySelector('#genre');
var description = document.querySelector('#description');
var publishedDate = document.querySelector('#publishedDate');

  // Objet temporaire respectant la même structure que le schéma du model
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
      
       // je selectionne parmis tous les forms de la page celui d'identifiant formSpe 
      // .reset() permet de remettre à vide les champs du form
    }
  });
}

function deleteBook(id) {
  let url = '/books/' + id;
  let options = {
    method: 'DELETE',
  }

  fetch(url, options)
    .then((res) => {
      alert("Appuyer sur ok si vous voulez supprimer le livre")
      if(res.ok) {
        window.location.reload();
      }
    })
}

function addOneLine(data) {
  var tab = document.querySelector('#books');
  var newLine = document.createElement('tr');
  for (const prop in data) {
    if(prop != '_id' && prop != '__v') {
      var tmp = document.createElement('td');
      tmp.innerText = data[prop];  // data.prop
      newLine.appendChild(tmp);
    }
  }

  // Je créé un lien vers la page détail
  var tdLink = document.createElement('td');
  var link = document.createElement('a');
  link.href = '/pages/edit.html#' + data._id;
  link.innerText = 'Détails';
  tdLink.appendChild(link);
  newLine.appendChild(tdLink);



  // Je créé le bouton suppression
  var tdSuppr = document.createElement('td');
  var btnSuppr = document.createElement('button');
  btnSuppr.innerText = 'Suppression';
  btnSuppr.classList.add('btn', 'btn-outline-danger');
  tdSuppr.appendChild(btnSuppr);
  newLine.appendChild(tdSuppr);

  btnSuppr.addEventListener('click', (e) => {
    deleteBook(data._id);
  });

  tab.appendChild(newLine);
}

// Je créé l'écouteur d'evt associé au clic du bouton validaiton
var btn = document.querySelector('#valid');
btn.addEventListener('click', (e) => {
  // je stop l'action par défaut du bouton
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
      // on extraie le résultat en JSON
      return res.json();
    }
  })
  .then((response) => {
    response.forEach(elt => {
      addOneLine(elt);
    });
  })






