var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var knex = require('./db/knex');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/ideas', function(req, res) {
  knex('dumb').select()
  .then(function(data){
    res.send(data);
  });
});

app.post('/ideas', function(req, res) {
   var inserting = req.body.content;
   console.log(inserting);
  knex('dumb').insert({content:inserting, number:100})
  .then(function(id){
    res.redirect('/');
  });
});

app.listen(3000, function(){
  console.log('Listening on Port 3000');
});
