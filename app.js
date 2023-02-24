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

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/pages', express.static("./book_store/pages"));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/book_store/index.html');
  });

// Set up routes
app.use('/books', bookRoutes);
