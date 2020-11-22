let loggedin = false; // TEMP

let login = async function() {
    let username = document.getElementById("username_field").value;
    let userPassword = document.getElementById("password_field").value;
    let success = await axios({
        method: 'post',
        url: 'https://zrdj-stocksentiments.herokuapp.com/login',
        withCredentials: true,
        data: {
            "username": $(username),
            "password": $(userPassword)
        },
    })

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
    if (loggedin) {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
      } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
      }
};



