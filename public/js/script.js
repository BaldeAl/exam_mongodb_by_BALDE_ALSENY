// Les références du formulaire
const form = document.querySelector('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const genre = document.getElementById('genre');
const description = document.getElementById('description');
const image = document.getElementById('image');
const publishedDate = document.getElementById('publishedDate');

// evenemenent pour le bouton submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('author', author.value);
  formData.append('genre', genre.value);
  formData.append('description', description.value);
  formData.append('image', image.files[0]);
  formData.append('publishedDate', publishedDate.value);

  try {
    const res = await fetch('/books', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Echec d'enregistrement du livre");
    }
    window.location.href = '/books';
  } catch (err) {
    console.error(err);
  }
});

// evenement pour le boutton supprimer
const deleteBtns = document.querySelectorAll('.delete-btn');
deleteBtns.forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const bookId = btn.getAttribute('data-id');

    try {
      const res = await fetch(`/books/${bookId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Livre non suppprimé');
      }
      window.location.href = '/books';
    } catch (err) {
      console.error(err);
    }
  });
});

// Modifier un livre
const updateForm = document.getElementById('update-form');
updateForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const bookId = updateForm.getAttribute('data-id');

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('author', author.value);
  formData.append('genre', genre.value);
  formData.append('description', description.value);
  formData.append('image', image.files[0]);
  formData.append('publishedDate', publishedDate.value);


  try {
    const res = await fetch(`/books/${bookId}?_method=PUT`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      throw new Error('Echec de modification du livre');
    }
    window.location.href = `/books/${bookId}`;
  } catch (err) {
    console.error(err);
  }
});
