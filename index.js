let loggedin = false; // TEMP

function login() {
    let username = document.getElementById("username_field").value;
    let userPassword = document.getElementById("password_field").value;
    let success = checkCredentials(username, userPassword)


    if(success) {
        loggedin = true
        loginStateChange()
    }
    else { alert('Invalid Username or Password ')}
    return;
}

function logout(){
    loggedin = false;
    loginStateChange()

    // REPLACE FUNCTIONALITY

}

function loginStateChange() {
    if (checkLoginState()) {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
      } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
      }
};



function checkLoginState() {
    return loggedin
    // REPLACE FUNCTIONALITY
}

function checkCredentials(user, pass) {
    if(user == pass) {
        return true;
    }
    return false

    // REPLACE FUNCTIONALITY
}