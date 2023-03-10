var title = document.querySelector('#title');
var author = document.querySelector('#author');
var genre = document.querySelector('#genre');
var description = document.querySelector('#description');
var publishedDate = document.querySelector('#publishedDate');


var url= window.location;
console.log(url);
var bookId = url.hash;

bookId = bookId.substring(1);
console.log(bookId);


let myHeaders = new Headers();
let urlFinal = '/books/'+bookId;

let options = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};
fetch('/books/'+bookId, options)
.then((res) => {
  if(res.ok) {
    return res.json();
  }
})
.then((response) => {
  console.log(response)
  author.value = response.author;
  genre.value = response.genre;
  description.value = response.description;
  title.value = response.title;
  publishedDate.value = response.publishedDate;
});

//la fonction pour modifier un livre
function modify(){
    var tmp = {
      _id: bookId,
        author: author.value,
        genre: genre.value,
        description: description.value,
        title: title.value,
        publishedDate: publishedDate.value,  
      };
    
      let options = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(tmp)
      }
      
      fetch(urlFinal, options)
      .then((res) => {
        if(res.ok) {
          window.location.reload();
        }
      });
    }
  
    var btn = document.querySelector('#modif');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modify();
    });

