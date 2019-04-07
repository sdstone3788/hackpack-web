  // Initialize Firebase
var config = {
    apiKey: "AIzaSyAp7bxz_AoWAhgqrFiGgrRertblicYlRzo",
    authDomain: "athenahacks2019-6a7e9.firebaseapp.com",
    databaseURL: "https://athenahacks2019-6a7e9.firebaseio.com",
    projectId: "athenahacks2019-6a7e9",
    storageBucket: "athenahacks2019-6a7e9.appspot.com",
    messagingSenderId: "411657738805"
  };
  firebase.initializeApp(config);
  var ref = firebase.database().ref();
  var selected = [];

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
    var newQuery = ref.child("posts")
    newQuery.push({
      "Content": ns[0],
      "LGBT": ns[1],
      "Woman": ns[2],
      "NonBinary": ns[3],
      "Man": ns[4],
      "Asian": ns[5],
      "Black": ns[6],
      "Hispanic": ns[7],
      "POC": ns[8],
      "White": ns[9],
      "LowIncome": ns[10],
      "MiddleIncome": ns[11]
    }).then(function () {
      window.location.href = "index.html";
    });


  }
