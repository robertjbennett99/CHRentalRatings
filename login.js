let loggedin = false; // TEMP
var username;

async function login() {
    username = document.getElementById("username_field").value;
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

async function logout(){
    loggedin = false;
    loginStateChange()

    // REPLACE FUNCTIONALITY 
    // ERASE INPUT
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

    getTickers();
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
        $('#tickers').append(`<p>${tickerArray[i]}</p>`);
        i++;
    }
}

let addTicker = async function() {
    let ticker = document.getElementById("searchbar").value
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
};

var tickerArray = [];
