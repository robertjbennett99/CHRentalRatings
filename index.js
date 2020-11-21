// Executes when login state changes
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        // User is signed in.
    
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";

        var user = firebase.auth().currentUser;
    
      } else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
      }
  });

function login() {
    let userEmail = document.getElementById("email_field").value;
    let userPassword = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then((user) => {
        alert('Success!! You are signed in')
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        alert("Error : " + errorMessage )
    });
}

function logout(){
    firebase.auth().signOut();
}