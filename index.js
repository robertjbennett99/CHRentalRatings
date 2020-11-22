// var port = process.env.PORT || 5000
// var express = require('express')
// var app = express();

// app.use(express.static(__dirname))

// app.listen(port, function()  {
//     console.log("frontend up and running")
// })




let loggedin = false; // TEMP

let login = async function() {
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
        alert('invalid username')
        return
    }

    if(success.data) {
        loggedin = true
        loginStateChange()
    }
    else { alert('Invalid Password ')}
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



