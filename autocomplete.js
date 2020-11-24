let autofillSearch = async function() {
    let text = document.getElementById("searchbar").value.toUppercase();
    let keys = symbols.keys();
    let matches = keys.filter(x => x.includes(text));
    if (matches.length != 0) { alert("found some matches at least")}
    let target = document.getElementById("searchautofill");
    for (let i = 0; i < 5; i++) {
        target.appendChild(`<a href='${matches[i]}'>${matches[i]}</a>`)
    }
}