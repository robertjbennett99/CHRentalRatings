const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname))

app.get("/", function(req, res) {
    res.render("index")
});

app.listen(port, function(){
    console.log('Frontend up and running on port ' + port)
})


