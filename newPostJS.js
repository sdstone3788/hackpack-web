var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var knex = require('./db/knex');


var selected = [];

function highLight(data){
  data.style.backgroundColor = "orange";
  console.log(data.id);
  selected.push(data.id);
}

function postContent(){
  var writtenContent = document.getElementById("yourPost").value;
  var i;
  var ns = [0,0,0,0,0,0,0,0,0,0,0];
  for (i=0; i<selected.length; i++){
    var popped = selected.pop();
    if (popped.equals("Woman")){
      ns[1].value = 1;
    }
    if (popped.equals("Man")){
      ns[3].value = 1;
    }
    if (popped.equals("POC")){
      ns[7].value = 1;
    }
    if (popped.equals("LGBT")){
      ns[0].value = 1;
    }
    if (popped.equals("White")){
      ns[8].value = 1;
    }
    if (popped.equals("Black")){
      ns[5].value = 1;
    }
    if (popped.equals("Asian")){
      ns[4].value = 1;
    }
    if (popped.equals("LowIncome")){
      ns[9].value = 1;
    }
    if (popped.equals("MiddleIncome")){
      ns[10].value = 1;
    }
    if (popped.equals("NonBinary")){
      ns[2].value = 1;
    }
    if (popped.equals("Hispanic")){
      ns[6].value = 1;
    }
  }
  knex('posts').insert({content:writtenContent, LGBT:ns[0], Woman:ns[1], NonBinary:ns[2],
                        Man:ns[3], Asian:ns[4], Black:ns[5], Hispanic:ns[6], POC:ns[7],
                        White:ns[8], LowIncome:ns[9], MiddleIncome:ns[10]}).then(function(id){
                          alert("DONE");
                          alert("suggma");
                        });
  alert("END OF FUNC????");
}
