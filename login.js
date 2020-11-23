let loggedin = false; // TEMP

async function login() {
    let username = document.getElementById("username_field").value;
    let userPassword = document.getElementById("password_field").value;
    let success = false
    
    //try {
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


    if(success.data) {
        loggedin = true
        loginStateChange()
    }
    else { document.getElementById("login_error").innerHTML = 'Incorrect Username or Password'; }
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

async function createAccount() {

    let username = document.getElementById("username_field").value;
    let userPassword = document.getElementById("password_field").value;
    let existing = null;
    let newUser = null

    existing = await axios({
        method: 'get',
        url: `https://zrdj-stocksentiments.herokuapp.com/usernameexists/${username}`,
        //url: `http://localhost:3030/usernameexists/${username}`,
        withCredentials: false,
        headers: {"Access-Control-Allow-Origin": "*"},
    })

    if(existing.data==true) {
        document.getElementById("login_error").innerHTML = 'Username Taken';
    } else {
        newUser = await axios({
            method: 'post',
            url: 'https://zrdj-stocksentiments.herokuapp.com/user',
            //url: 'http://localhost:3030/user',
            withCredentials: false,
            headers: {"Access-Control-Allow-Origin": "*"},
            data: {
                "username": username,
                "password": userPassword,
                "keywords": []
            },
        })
        document.getElementById("login_error").innerHTML = `User ${username} Successfully Created`;
    }
    document.getElementById("username_field").value = '';
    document.getElementById("password_field").value = '';
}
