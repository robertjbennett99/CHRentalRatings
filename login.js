let loggedin = false; // TEMP
var username;

let login = async function() {
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
        getTickerDatalist();

        document.getElementById("username_field").value = '';
        document.getElementById("password_field").value = '';
        document.getElementById("login_error").innerHTML = '';
    }
    else { document.getElementById("login_error").innerHTML = 'Incorrect Username or Password'; }
    return;
}

let logout = async function(){
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

let getTickerDatalist = function() {
    let symbols_1 = Object.keys(symbols);
    symbols_1.forEach(symbol => $('#alltickers').append(`<option value=${symbol}>`));
}

let loginStateChange = function() {
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
        $('#tickers').append(`<button id='${tickerArray[i]}' class='tick' onclick="getSentiment(this.id)">${tickerArray[i]}</button>`);
        i++;
    }
    tickerArray.forEach(ticker => $('#mytickers').append(`<option value=${ticker}>`));
}

let addTicker = async function() {
    let ticker = document.getElementById("searchbar").value.toUpperCase();

    if(ticker == "") {
        return;
    }

    if(!symbols.hasOwnProperty(ticker)) {
        $('#searchbar').val("");
        return;
    }

    if(tickerArray.includes(ticker)) {
        $('#searchbar').val("");
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

    $('#tickers').append(`<button id='${ticker}' class='tick' onclick="getSentiment(this.id)">${ticker}</button>`);
    $('#mytickers').append(`<option value=${ticker}>`);
    tickerArray.push(ticker);
};

let deleteTicker = async function() {
    let ticker = document.getElementById("deletebar").value.toUpperCase();

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
        $('button').filter(`:contains('${ticker}')`).remove();
        $(`option[value='${ticker}']`).remove();
        $('#alltickers').append(`<option value=${ticker}>`)
    } else {
        $('#deletebar').val("");
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
        document.getElementById("login_error").innerHTML = `User ${username} Successfully Created. Re-Enter Credentials to Login.`;
    }
    document.getElementById("username_field").value = '';
    document.getElementById("password_field").value = '';
}

let getSentiment = async function(ticker) {

    let company = symbols[ticker];

    $('.meter').remove();

    let social = await axios({
        method: 'get', 
        url: `https://zrdj-stocksentiments.herokuapp.com/twittersentiment/${ticker}`,
        withCredentials: false,
        headers: {"Access-Control-Allow-Origin": "*"},
    });

    let news = await axios({
        method: 'get',
        url: `https://zrdj-stocksentiments.herokuapp.com/newssentiment/${ticker}`,
        withCredentials: false,
        headers: {"Access-Control-Allow-Origin": "*"},
    });

    $('#sentiment').append(`<div class="meter">
    <meter max="3" min="-3" low="-0.5" high="0.5" optimum="0.5000001" value="${social.data}"></meter>
    <p>Social Sentiment Value of ${company}: ${social.data}</p>
    </div>`);

    $('#sentiment').append(`<div class="meter">
    <meter max="3" min="-3" low="-0.5" high="0.5" optimum="0.5000001" value="${news.data}"></meter>
    <p>News Sentiment Value of ${company}: ${news.data}</p>
    </div>`);
}