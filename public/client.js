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
    // display the post nicely in a text box
    // display the tags that were tagged in this post (by checking columns for
    // true values) 
    $('ul').append('<p>' + data[i].content + '</p>');
  }
}  
