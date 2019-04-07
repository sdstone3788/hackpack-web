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
  var searchTags = [];
  var isSearch = false;

  function highLight(data){
    data.style.backgroundColor = "#EC868B";
    console.log(data.id);
    selected.push(data.id);
  }

  function highLightSearch(data){
    data.style.backgroundColor = "#EC868B";
    console.log(data.id);
    searchTags.push(data.id);
  }

  function filterForTags(tags){
    isSearch = true;
    //window.location.href = "index.html";
      if(tags.length == 0){
        tags = searchTags;
      }
      console.log("tags: " + tags);
      console.log("search tags: " + searchTags);
      var bodyDiv = document.getElementById('bodyDiv');
      bodyDiv.innerHTML = "";
      var results = document.createTextNode("Search Results");
      bodyDiv.appendChild(results);

        //var posts = ref.child("posts").orderByKey();
      var query = ref.child("posts").orderByKey();
      query.once("value").then(function(snapshot){
        //for every post
        snapshot.forEach(function(childSnapshot){
          var inFilter = true;
          var allPosts = [];
          for(var i = 0; i < tags.length; i++){
            if(!childSnapshot.child(tags[i]).val()){
              inFilter = false;
              break;
            }
          }
          if(inFilter){
            // add the post to the div
            var mainDiv = document.createElement("div");
            mainDiv.className = "weirdDiv";
            var contentDiv = document.createElement("div");
            var addDiv = document.createElement("div");
            var content = childSnapshot.child("Content").val();
            var contentP = document.createTextNode(content);
            contentDiv.appendChild(contentP);
            var breakLine = document.createElement("br");
            mainDiv.appendChild(contentDiv);
              // add the tags for this post
              if(childSnapshot.child("LGBT").val()){
                var button = document.createElement('button');
                button.innerText = 'LGBT';
                button.onclick = function() {
                  filterForTags(['LGBT']);
                };
                addDiv.appendChild(button);
              }

              if(childSnapshot.child("Woman").val()){
                var button = document.createElement('button');
                button.innerText = 'Woman';
                button.onclick = function() {
                  filterForTags(['Woman']);
                };
                addDiv.appendChild(button);
              }

              if(childSnapshot.child("NonBinary").val()){
                var button = document.createElement('button');
                button.innerText = 'NonBinary';
                button.onclick = function() {
                  filterForTags(['NonBinary']);
                };
                addDiv.appendChild(button);
              }

              if(childSnapshot.child("Man").val()){
                var button = document.createElement('button');
                button.innerText = 'Man';
                button.onclick = function() {
                  filterForTags(['Man']);
                };
                addDiv.appendChild(button);
              }

              if(childSnapshot.child("Asian").val()){
                var button = document.createElement('button');
                button.innerText = 'Asian';
                button.onclick = function() {
                  filterForTags(['Asian']);
                };
                addDiv.appendChild(button);
              }

              if(childSnapshot.child("Black").val()){
                var button = document.createElement('button');
                button.innerText = 'Black';
                button.onclick = function() {
                  filterForTags(['Black']);
                };
                addDiv.appendChild(button);
              }

              if(childSnapshot.child("Hispanic").val()){
                var button = document.createElement('button');
                button.innerText = 'Hispanic';
                button.onclick = function() {
                  filterForTags(['Hispanic']);
                };
                addDiv.appendChild(button);
              }

              if(childSnapshot.child("POC").val()){
                var button = document.createElement('button');
                button.innerText = 'POC';
                button.onclick = function() {
                  filterForTags(['POC']);
                };
                addDiv.appendChild(button);
              }

              if(childSnapshot.child("White").val()){
                var button = document.createElement('button');
                button.innerText = 'White';
                button.onclick = function() {
                  filterForTags(['White']);
                };
                addDiv.appendChild(button);
              }

                if(childSnapshot.child("LowIncome").val()){
                  var button = document.createElement('button');
                  button.innerText = 'LowIncome';
                  button.onclick = function() {
                    filterForTags(['LowIncome']);
                  };
                  addDiv.appendChild(button);
                }

               if(childSnapshot.child("MiddleIncome").val()){
                 var button = document.createElement('button');
                 button.innerText = 'MiddleIncome';
                 button.onclick = function() {
                   filterForTags(['MiddleIncome']);
                 };
                 addDiv.appendChild(button);
               }
               mainDiv.appendChild(addDiv);
               bodyDiv.appendChild(mainDiv);
          }
          });
        }).then(function(){
          document.getElementById("searchDialog").close();
          document.getElementById("LGBT").style.backgroundColor = "#0f5f74";
        });
  }


  function backToFeed(){
    window.location.href="index.html";
  }

  function newAccount(){
    document.getElementById("newAccDialog").showModal();
  }

  function cancelCreateAcc(){
    document.getElementById("newAccDialog").close();
  }

  function newCreateAcc(){
    var email = document.getElementById("createUserName").value;
    var password = document.getElementById("createPassword").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      document.getElementById("createUserName").value = "";
      document.getElementById("createPassword").value = "";
      document.getElementById("createName").value = "";
      newAccount();
    }).then(function(){
      document.getElementById("newAccDialog").close();
      window.location.href="index.html";
    });
  }

  function signIn(){
    document.getElementById("signInNow").showModal();
  }


  function cancelSignAcc(){
    document.getElementById("signInNow").close();
  }

  function signAcc(){
    var email = document.getElementById("signUserName").value;
    var password = document.getElementById("signPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  // ...
    alert(errorMessage);
    document.getElementById("signUserName").value = "";
    document.getElementById("signPassword").value = "";
    signIn();
  }).then(function(){
    document.getElementById("signInNow").close();
    window.location.href="index.html";
  });
  }

  function logout(){
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
        window.location.href="homepage.html";
    }).catch(function(error) {
  // An error happened.
      alert("an error occurred signing you out! :(");
    });
  }
    function displayPosts(){
      if(isSearch){
        console.log("isSearch is true");
        isSearch = !isSearch;
        console.log("now issearch is: " + isSearch);
        return;
      }
      console.log("just ran displayposts");
      var bodyDiv = document.getElementById('bodyDiv');

      //var posts = ref.child("posts").orderByKey();
      var query = ref.child("posts").orderByKey();
      query.once("value").then(function(snapshot){
        //for every post
           snapshot.forEach(function(childSnapshot){
                var mainDiv = document.createElement("div");
                mainDiv.className = "weirdDiv";
                var contentDiv = document.createElement("div");
                var addDiv = document.createElement("div");
                var content = childSnapshot.child("Content").val();
                var contentP = document.createTextNode(content);
                contentDiv.appendChild(contentP);
                var breakLine = document.createElement("br");
                mainDiv.appendChild(contentDiv);
                  // add the tags for this post
                  if(childSnapshot.child("LGBT").val()){
                    var button = document.createElement('button');
                    button.innerText = 'LGBT';
                    button.onclick = function() {
                      filterForTags(['LGBT']);
                    };
                    addDiv.appendChild(button);
                  }

                  if(childSnapshot.child("Woman").val()){
                    var button = document.createElement('button');
                    button.innerText = 'Woman';
                    button.onclick = function() {
                      filterForTags(['Woman']);
                    };
                    addDiv.appendChild(button);
                  }

                  if(childSnapshot.child("NonBinary").val()){
                    var button = document.createElement('button');
                    button.innerText = 'NonBinary';
                    button.onclick = function() {
                      filterForTags(['NonBinary']);
                    };
                    addDiv.appendChild(button);
                  }

                  if(childSnapshot.child("Man").val()){
                    var button = document.createElement('button');
                    button.innerText = 'Man';
                    button.onclick = function() {
                      filterForTags(['Man']);
                    };
                    addDiv.appendChild(button);
                  }

                  if(childSnapshot.child("Asian").val()){
                    var button = document.createElement('button');
                    button.innerText = 'Asian';
                    button.onclick = function() {
                      filterForTags(['Asian']);
                    };
                    addDiv.appendChild(button);
                  }

                  if(childSnapshot.child("Black").val()){
                    var button = document.createElement('button');
                    button.innerText = 'Black';
                    button.onclick = function() {
                      filterForTags(['Black']);
                    };
                    addDiv.appendChild(button);
                  }

                  if(childSnapshot.child("Hispanic").val()){
                    var button = document.createElement('button');
                    button.innerText = 'Hispanic';
                    button.onclick = function() {
                      filterForTags(['Hispanic']);
                    };
                    addDiv.appendChild(button);
                  }

                  if(childSnapshot.child("POC").val()){
                    var button = document.createElement('button');
                    button.innerText = 'POC';
                    button.onclick = function() {
                      filterForTags(['POC']);
                    };
                    addDiv.appendChild(button);
                  }

                  if(childSnapshot.child("White").val()){
                    var button = document.createElement('button');
                    button.innerText = 'White';
                    button.onclick = function() {
                      filterForTags(['White']);
                    };
                    addDiv.appendChild(button);
                  }

                    if(childSnapshot.child("LowIncome").val()){
                      var button = document.createElement('button');
                      button.innerText = 'LowIncome';
                      button.onclick = function() {
                        filterForTags(['LowIncome']);
                      };
                      addDiv.appendChild(button);
                    }

                   if(childSnapshot.child("MiddleIncome").val()){
                     var button = document.createElement('button');
                     button.innerText = 'MiddleIncome';
                     button.onclick = function() {
                       filterForTags(['MiddleIncome']);
                     };
                     addDiv.appendChild(button);
                   }
                   mainDiv.appendChild(addDiv);
                  bodyDiv.appendChild(mainDiv);
                });
              });
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

function searchBar(){
  document.getElementById("searchDialog").showModal();
}

function cancelSearch(){
  document.getElementById("searchDialog").close();
}
