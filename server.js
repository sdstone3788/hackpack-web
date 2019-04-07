var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var knex = require('./db/knex');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/ideas', function(req, res) {
  knex('posts').select()
  .then(function(data){
    res.send(data);
  });
});

app.post('/ideas', function(req, res) {
  //var passed = JSON.parse(req.body);
  console.log(passed);
  knex('posts').insert(req.body)
  .then(function(id){
    res.redirect('/');
  });
});

app.listen(3000, function(){
  console.log('Listening on Port 3000');
});
