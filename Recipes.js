//addrecipebt = document.getElementById("addButton");
//addrowbt = document.getElementById("bt")
// rName = document.getElementById("rName");
// ing = document.getElementById("ing");
// prep = document.getElementById("prep");
var jsonArr = []
var js = []

//caliing functions that reading json from firebase and adding this data to the table when page is reload:
window.onload = function() {
  const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));

  readingJsonFromFirebase();

  //wait for readingJsonFromFirebase function to finish:
  wait(4*1000).then(() => {
    addRowToTableFromFirebase();
  }).catch(() => {
    failureCallback();
  });
}

//creating connection to firebase recipes app:
var firebaseConfig = {
  apiKey: "AIzaSyDtMyMAK5NLxnOEzr8V39HKfv8tqQLponc",
  authDomain: "recipes-d1e17.firebaseapp.com",
  databaseURL: "https://recipes-d1e17.firebaseio.com",
  projectId: "recipes-d1e17",
  storageBucket: "recipes-d1e17.appspot.com",
  messagingSenderId: "1079984729239",
  appId: "1:1079984729239:web:c08fcc12e426d12adb8dd2",
  measurementId: "G-V2MB4M52FH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//holding firebase app data path:
var firebaseData = firebase.database().ref("/");


// form will show only when "Add Product" clicked, and hide when clicked again:
function showHideDiv(ele) {
    let srcElement = document.getElementById(ele);
    if (srcElement != null) {
        if (srcElement.style.display == "block") {
            srcElement.style.display = 'none';
        }
        else {
            srcElement.style.display = 'block';
        }
        return false;
    }
}

//adding new row to table and to firebase - from user form fields:
function addRowToTableFromUser() {

  if(document.getElementById("rName").value == "" || document.getElementById("ing").value == "" || document.getElementById("prep").value == "") {
    window.alert("All fields must be filled")
  }
  else {
    //creating row an adding it to the table:
    creatingAndAddingRowToTable(document.getElementById("rName").value, document.getElementById("ing").value, document.getElementById("prep").value);

    //adding row to json data:
    var jsonObj = {
      recipe_name : document.getElementById("rName").value,
      ingredients : document.getElementById("ing").value,
      preparation : document.getElementById("prep").value
    }

    //saving json data to firebase server:
    jsonArr.push(jsonObj);
    console.log(jsonArr);
    firebaseData.set(jsonArr);

  }
}

//clears textarea after pressing the add button in form box:
function clearTextAreas() {

  document.getElementById("rName").value = "";
  document.getElementById("ing").value = "";
  document.getElementById("prep").value = "";

}

//reads Json data from firebase app:
function readingJsonFromFirebase() {
  firebaseData.once("value", function(data) {
      data.forEach((item, i) => {
      js.push(item.toJSON());
    });
});
}

//adding json data as row to the table:
function addRowToTableFromFirebase() {
  for(var i = 0; i < js.length; i++) {
    var obj = js[i];

    //pushing current json objet to the json array that hold all json recipes:
    jsonArr.push(obj);

    //adding current json object to table
    creatingAndAddingRowToTable(obj.recipe_name, obj.ingredients, obj.preparation);
  }
}

function creatingAndAddingRowToTable(recipeName, ingredients, preparation) {
  let new_row = '';
  new_row += '<tr>';
  new_row += '<td>' + recipeName + '</td>>';
  new_row += '<td>' + ingredients + '</td>>';
  new_row += '<td>' + preparation + '</td>>';
  new_row += '</tr>';

  $('#recipes_table tr:last').after(new_row)
}
