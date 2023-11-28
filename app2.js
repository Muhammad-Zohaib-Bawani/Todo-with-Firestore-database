import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyAnSn-JGRtnO5BN-J83lDMI7QIvISktvUE",
    authDomain: "todolist-613c3.firebaseapp.com",
    projectId: "todolist-613c3",
    storageBucket: "todolist-613c3.appspot.com",
    messagingSenderId: "175147100000",
    appId: "1:175147100000:web:8c7f49d1a9a63c8180a005",
    measurementId: "G-ENHJ2Q5E5B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


let ul = document.querySelector('#ul')
let inp = document.getElementById('inp')
let addTodo = document.querySelector('#addTodo')
let ids = []

if (addTodo) {
    addTodo.addEventListener('click', async () => {

        if (inp.value === "") {
            alert("You must write something!")
        }
        else {

            const docRef = await addDoc(collection(db, "todos"), {
                todo: inp.value,
                time: new Date().toLocaleString()
            });
            inp.value = ""
              console.log("Document written with ID: ", docRef.id);
        }
    })
}

// Read data and write in document

function getData() {

    onSnapshot(collection(db, "todos"), (data) => {
        data.docChanges().forEach((newData) => {



            if (newData.type == 'removed') {
                let del = document.getElementById(newData.doc.id)
                del.remove()
            }
            else if (newData.type == 'added') {

                ids.push(newData.doc.id)

                ul.innerHTML += `<li id=${newData.doc.id} > ${newData.doc.data().todo}  ${newData.doc.data().time} 
                 <i class="bx bxs-edit edit" onclick="edit(this,'${newData.doc.id}')" ></i>
            <i class="fa-sharp fa-solid fa-trash del" onclick="delTodo('${newData.doc.id}')"  ></i></li>`

            }
        })
    })
};

getData();

// delete todo 

async function delTodo(id) {
    await deleteDoc(doc(db, "todos", id));
}

// Edit todo

async function edit(e,id){

    let newValue = prompt('Edit your todo')
    let date = new Date().toLocaleString()

    e.parentNode.firstChild.nodeValue = `${newValue}  ${date}   ` 

await updateDoc(doc(db, "todos", id), {
    todo: newValue,
    time: new Date().toLocaleString()
});
}

// Delete all

async function deleteAll(){

    ul.innerHTML = ""

    for(var i=0 ; i < ids.length ; i++){
        await deleteDoc(doc(db, "todos", ids[i]));

    }
}




window.getData = getData
window.delTodo = delTodo
window.edit = edit
window.deleteAll = deleteAll