  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import {getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js"
  import {getFirestore , setDoc , doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js"
  
  

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const signUp = document.getElementById('submitSignUp');

  signUp.addEventListener('click',(event)=>{
    event.preventDefault();

    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('lName').value;
    const lastName = document.getElementById('fName').value;

    const auth  = getAuth();
    
    const db = getFirestore();

    function showMessage(message , divId){
       var messageDiv  = document.getElementById(divId);
       messageDiv.style.display = "block";
       messageDiv.innerHTML = message;
       messageDiv.style.opacity= 1 ;

       setTimeout(function(){
          messageDiv.style.opacity = 0 ;
       },5000)
    }

    createUserWithEmailAndPassword(auth , password, email  )
    .then((userCredential)=>{
          const user  = userCredential.user;

          const userData = {
                email: email, 
                firstName : firstName,
                lastName :lastName 
          };
          showMessage('Account Created success fully ', 'signUpMessage')
          const  docRef = doc(db , "users" , user.uid);
          setDoc(docRef,userData)
          .then(()=>{
              window.location.href='index.html';
          })
          .catch((error)=>{
             console.error("Error writeing document",error);
          })
    })
    .catch((error)=>{
     const errorCode  = error.code;
        if(errorCode == 'auth/email-already-in-use'){
              showMessage('Email Address Already Exists !!!','signUpMessage');
        }else{
              showMessage('Unable to createuser ','signUpMessage');
        }
    })
    


  });

//   sign in 

const signIn = document.getElementById('submitSignIn');

signIn.addEventListener('click',(event)=>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();

    // console.log(email+ ""+"" +password)

    signInWithEmailAndPassword(auth , password , email)
    .then((userCredential)=>{
         showMessage('Unable to createuser ','signInMessage');

         const user = userCredential.user;
        //  localStorages.setItem('loggedInUserId',user.uid);
        localStorage.setItem('loggedInUserId', user.uid); 
         window.location.href = 'homepage.html';
    })
    .catch((error)=>{
          const errorCode = error.code;
          if (errorCode ==='auth/invalid-credential') {
             showMessage('Incorrect email or password' ,'signInMessage')
          }
          else{
            // showMessage('Account doest note exist ' ,'signInMessage');
            // console.error("The error name ",error);
          }
    })


});



