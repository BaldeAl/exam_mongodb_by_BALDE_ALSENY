const express = require("express");
let app= express();

const mongoose = require("mongoose");

let promise = mongoose.connect("mongodb+srv://alseny:Azerty123@clusterbalde.ouik6bm.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology:true,

});

promise.then((db) => {
    console.log("DB connecté !");
    
    app.listen(3000, () => {
        console.log("Listening on port 3000 :|");
    });
});


app.use(express.json());
app.use('/pages', express.static("./book_store/pages"));
app.use('/assets', express.static("./book_store/assets"))
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/book_store/index.html");
  });
//Ajouter un nouveau livre dans la bibliothèque
const Book = require('./models/book')
app.post('/books', (req, res) => {
      let book = new Book(req.body);
       book.save((err,ob) => {
            if (err) {
                console.log(err)
                return res.send(500)
            }
            res.sendStatus(200);
       });
      
});

//obtenir la liste des livres
app.get('/books', (req, res) => {
    Book.find({}, (err, obj) => {
      if(err) {
        console.log(err);
        return res.send(500);
      }
      return res.send(obj);
    });
  });


//pour effectuer une recherche

app.get('/books/:id', (req, res) => {
    Book.findOne({_id: req.params.id}, (err, obj) => {
      if(err) {
        console.log(err);
        return res.send(500);
      }
  
      return res.send(obj);
    })
  });

//Pour effectuer une modification

app.put('/books/:id', (req, res) => {
    Book.findOneAndUpdate({_id: req.params.id},Book(req.body), {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) => {
      if(err) {
        console.log(err);
        return res.send(500);
      }
  
      return res.send(obj);
    });
  });

//pour supprimer un livre
  app.delete('/books/:id', (req, res) => {
    Book.deleteOne({_id: req.params.id}, (err, obj) => {
      if(err) {
        console.log(err);
        return res.send(500);
      }
      res.sendStatus(200);
    });
  });
