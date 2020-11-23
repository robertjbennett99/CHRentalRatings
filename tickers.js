const { default: Axios } = require("axios");

let getTickers = async function() {
    let result = await axios({
        method: 'get',
        url: `https://zrdj-stocksentiments.herokuapp.com/getkeywords/${username}`,
        withCredentials: false, 
        headers: {"Access-Control-Allow-Origin": "*"},
    });

    result.data.array.forEach(element => tickerArray.push(element));

    let i=0;
    while(i<tickerArray.length) {
        $('#tickers').append(`<p>${tickerArray[i]}</p>`);
        i++;
    }
}

var tickerArray = [];


