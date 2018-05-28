var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

var port = 8080;

var con = 'mongodb://bookUser:password@ds237620.mlab.com:37620/sandboxprabhu';
mongoose.connect(con);
var db = mongoose.connection;


app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

db.on('open',(err,data)=> {
  console.log('Connected to the mongoDB');
});


app.get('/', (req,res) => {
  res.send('Happy to be here');
});

app.get('/books/:id', (req,res) =>{
  console.log("Getting all the books stored in the database");
  Book.findOne({_id: req.params.id}).exec((err, books) => {
    if (err) res.send('Error has occured');
    res.json(books);
  })
})

app.get('/books', (req,res) =>{
  console.log("Getting all the books stored in the database");
  Book.find({}).exec((err, books) => {
    if (err) res.send('Error has occured');
    res.json(books);
  })
});

app.post('/books', (req,res) =>{
  console.log("Posting books to the database");
  const newBook = new Book();
  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;

  newBook.save((err, books) => {
    if (err) res.send('Error has occured');
    res.json(books);
  })
});



app.put('/books/:id', (req,res) =>{
  console.log("Posting books to the database");
  // const newBook = new Book();
  // newBook.title = req.body.title;
  // newBook.author = req.body.author;
  // newBook.category = req.body.category;

Book.findByIdAndUpdate(
  {_id: req.params.id}
  ,{ $set: { title: req.body.title }}
  ,{upsert: true}
  , function(err,newBook) {
    if (err)  res.status(404);
    res.status(200).send('OK');

  }
)

  // newBook.save((err, books) => {
  //   if (err) res.send('Error has occured');
  //   res.json(books);
  // })
});



app.listen(port, function(){
  console.log('Application is listening on '+ port);
})