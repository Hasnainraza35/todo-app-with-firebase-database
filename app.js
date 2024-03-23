const firebaseConfig = {
    apiKey: "AIzaSyA3cgyhuiUhnKYJt9l6CLAPGykvzAJdViU",
    authDomain: "project-2-68b1e.firebaseapp.com",
    databaseURL: "https://project-2-68b1e-default-rtdb.firebaseio.com",
    projectId: "project-2-68b1e",
    storageBucket: "project-2-68b1e.appspot.com",
    messagingSenderId: "562303612916",
    appId: "1:562303612916:web:129abddff2efff5ed16ba1",
    measurementId: "G-CM8GQXH59W"
};

const frb = firebase.initializeApp(firebaseConfig);

console.log(frb.database);



firebase
    .database()
    .ref("todos")
    .on("child_added", (data) => {

        console.log(data.val());
        

        var liElement = document.createElement("li");

        var liText = document.createTextNode(data.val().value);

        liElement.appendChild(liText);

        console.log(liElement);

        //               delete button

        var delbtn = document.createElement("button");
        var delbtnText = document.createTextNode("Delete");

        delbtn.appendChild(delbtnText)

        delbtn.setAttribute("id", data.val().key);

        delbtn.setAttribute("onclick", "deleteitem(this)")
        delbtn.setAttribute("class", "deleteitem")


        var list = document.getElementById("list");

        liElement.appendChild(delbtn);

        list.appendChild(liElement);


        //           Edit Button

        var editbtn = document.createElement("button");
        var editbtnText = document.createTextNode("Edit");

        editbtn.appendChild(editbtnText);

        editbtn.setAttribute("onclick", "EditItem(this)")
        editbtn.setAttribute("class", "EditItem")


        editbtn.setAttribute("id", data.val().key)

        liElement.appendChild(editbtn);
    });


function addtodo() {
    var input = document.getElementById("inputfield");

    console.log(input.value);

    var key = firebase.database().ref("todos").push().key;

    let obj = {
        value: input.value,
        key: key
    }

    firebase.database().ref("todos").child(key).set(obj);

    input.value = "";
}

function deleteAll() {
    var list = document.getElementById("list");

    firebase.database().ref("todos").remove();

    list.innerHTML = "";
}

function deleteitem(a) {
    console.log(a.id)

    firebase.database().ref("todos").child(a.id).remove();

    a.parentNode.remove();
}


function EditItem(e) {
    var userInput = prompt("Enter New updated value");

    var editTodo = {
        value: userInput,
        key: e.id
    }

    firebase.database().ref("todos").child(e.id).set(editTodo);
    
    e.parentNode.firstChild.nodeValue = userInput;
}
