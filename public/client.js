const sqlite3 = require('sqlite3').verbose();

var selected = [];
$(document).ready(function(){
  getIdeas();
});


function getIdeas(){
  $.get('/ideas', function(data){
    console.log(data);
    renderData(data);
  });
}

function renderData(data){
  for (var i = 0; i < data.length; i++) {
    $('ul').append('<p>' + data[i].content + '</p>');
  }
}

function highLight(data){
  data.style.backgroundColor = "orange";
  console.log(data.id);
  selected.push(data.id);
}

function postContent(){
  var writtenContent = document.getElementById("yourPost").value;
  var i;
  var ns = [writtenContent,0,0,0,0,0,0,0,0,0,0,0];
  var len = selected.length;
  for (i=0; i<len; i++){
    var poppe = selected.pop();
    var popped = JSON.stringify(poppe);
    console.log(popped);
    if (popped===JSON.stringify("Woman")){
      ns[2] = 1;
    }
    if (popped===JSON.stringify("Man")){
      ns[4] = 1;
    }
    if (popped===JSON.stringify("POC")){
      ns[8]= 1;
    }
    if (popped===JSON.stringify("LGBT")){
      ns[1]= 1;
    }
    if (popped===JSON.stringify("White")){
      ns[9]= 1;
    }
    if (popped===JSON.stringify("Black")){
      ns[6] = 1;
    }
    if (popped===JSON.stringify("Asian")){
      ns[5] = 1;
    }
    if (popped===JSON.stringify("LowIncome")){
      ns[10] = 1;
    }
    if (popped===JSON.stringify("MiddleIncome")){
      ns[11] = 1;
    }
    if (popped===JSON.stringify("NonBinary")){
      ns[3] = 1;
    }
    if (popped===JSON.stringify("Hispanic")){
      ns[7] = 1;
    }
  }
  var json = JSON.stringify(ns);
  console.log(json);
  // $.ajax({
  //   type:'post',
  //   url: '/ideas',
  //   data: json,
  //   contentType: "application/json; charset=utf-8",
  //   dataType: "json"
  // });
  //knex('posts').insert({content:writtenContent, LGBT:ns[0], Woman:ns[1], NonBinary:ns[2],
  //  Man:ns[3], Asian:ns[4], Black:ns[5], Hispanic:ns[6], POC:ns[7],
  //  White:ns[8], LowIncome:ns[9], MiddleIncome:ns[10]}).then(function(id){
  //    alert("DONE");
  //    alert("suggma");
  //  });


  let db = new sqlite3.Database('../db/posts.db');

  let sql = 'INSERT into posts (content, LGBT, Woman, NonBinary, Man, Asian, Black, Hispanic, POC, White, LowIncome, MiddleIncome) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
  db.run(sql, ns, function(err){
    if (err){
      alert("didnt work");
    }
    console.log("help");
  });
  db.close();
}
