let loggedin = false; // TEMP

async function login() {
    let username = document.getElementById("username_field").value;
    let userPassword = document.getElementById("password_field").value;
    let success = false
    
    try {
        success = await axios({
            method: 'post',
            url: 'https://zrdj-stocksentiments.herokuapp.com/login',
            //url: 'http://localhost:3030/login',
            withCredentials: false,
            headers: {"Access-Control-Allow-Origin": "*"},
            data: {
                "username": username,
                "password": userPassword
            },
        })
    } catch (error) {
        document.getElementById("login_error").innerHTML = 'User does not exist';
        return
    }

    if(success.data) {
        loggedin = true
        loginStateChange()
    }
    else { document.getElementById("login_error").innerHTML = 'Incorrect password'; }
    return;
}

async function logout(){
    loggedin = false;
    loginStateChange()

    // REPLACE FUNCTIONALITY 
    // ERASE INPUT
    document.getElementById("username_field").value = '';
    document.getElementById("password_field").value = '';
    document.getElementById("login_error").innerHTML = '';


    // SEND LOGOUT REQUEST TO GET RID OF KEYWORD STORE

}

function loginStateChange() {
    if (loggedin) {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
      } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
}
