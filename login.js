let loggedin = false; // TEMP
var username;

async function login() {
    username = document.getElementById("username_field").value;
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
        loginStateChange();
        getTickers();
    }
    else { document.getElementById("login_error").innerHTML = 'Incorrect Username or Password'; }
    return;
}

async function logout(){
    loggedin = false;
    $('.tick').remove();
    tickerArray = [];
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

let getTickers = async function() {
    let result = await axios({
        method: 'get',
        url: `https://zrdj-stocksentiments.herokuapp.com/getkeywords/${username}`,
        withCredentials: false, 
        headers: {"Access-Control-Allow-Origin": "*"},
    });

    result.data.forEach(element => tickerArray.push(element));

    let i=0;
    while(i<tickerArray.length) {
        $('#tickers').append(`<p class='tick'>${tickerArray[i]}</p>`);
        i++;
    }
}

let addTicker = async function() {
    let ticker = document.getElementById("searchbar").value

    if(ticker == "") {
        return;
    }

    $('#searchbar').val("");

    const result = await axios({
        method: 'post',
        url: 'https://zrdj-stocksentiments.herokuapp.com/addkeyword',
        withCredentials: false,
        headers: {"Access-Control-Allow-Origin": "*"},
        data: {
            "username": `${username}`,
            "keyword": `${ticker}`
        }
    });

    $('#tickers').append(`<p class='tick'>${ticker}</p>`);
};

let deleteTicker = async function() {
    let ticker = document.getElementById("deletebar").value;

    let doesInclude = tickerArray.includes(ticker);

    if(doesInclude) {
        const result = await axios({
            method: 'post',
            url: 'https://zrdj-stocksentiments.herokuapp.com/deletekeyword',
            withCredentials: false,
            headers: {"Access-Control-Allow-Origin": "*"},
            data: {
                "username": `${username}`,
                "keyword": `${ticker}`
            }
        });
        $('#deletebar').val("");
        $('p').filter(`:contains('${ticker}')`).remove();
    } else {
        $('#delete').val("");
        return;
    }
}

var tickerArray = [];

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
