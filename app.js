import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup,FacebookAuthProvider   } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
auth.languageCode = 'en';
const db = getFirestore(app);
const fprovider = new FacebookAuthProvider();

let sbtn = document.querySelector('#sbtn')
if (sbtn) {
  sbtn.addEventListener('click', () => {

    let semail = document.querySelector('#semail')
    let spass = document.querySelector('#spass')

    createUserWithEmailAndPassword(auth, semail.value, spass.value)
      .then(async (userCredential) => {

        const user = userCredential.user;
        console.log(user.email)

        try {
          const docRef = await addDoc(collection(db, "users"), {
            first : semail.value,
            last : spass.value,

          });
          console.log("Document written with ID: ", docRef.id);
		  alert('SignUp Successful')

      window.location.reload()
      
        } catch (e) {
          console.error("Error adding document: ", e);
        }


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        if(errorCode === 'auth/email-already-in-use'){
          alert('Email already in use')
        }
        else{
        alert('Invalid Email and Password  ')}
      });
  })

}

let lbtn = document.querySelector("#lbtn")

if (lbtn) {
  lbtn.addEventListener('click', () => {

    let lemail = document.querySelector('#lemail')
    let lpass = document.querySelector('#lpass')


    signInWithEmailAndPassword(auth, lemail.value, lpass.value)
      .then((userCredential) => {

        const user = userCredential.user;

        console.log(user)
        alert('Login Succcessful!')
        window.location = 'welcome.html'

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
      });

  })
}


// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     const uid = user.uid;
//     console.log(uid)
//   } else {
//     window.location = 'index.html'
//   }
// });

// google Login

let login = document.querySelector('.loging')
if (login) {
  login.addEventListener('click', () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        window.location = "./welcome.html"

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)

      });

  });
}

// facebook login

let flogin = document.querySelector('#loginf')
if (flogin) {
  flogin.addEventListener('click', () => {


    signInWithPopup(auth, fprovider)
    .then((result) => {
      const user = result.user;
  
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      console.log(user)
      window.location = "./welcome.html"
  
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
  
    });
  


  })}