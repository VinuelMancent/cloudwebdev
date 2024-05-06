const express = require("express")
const app = express();
app.use(express.static("public"))
app.use(express.json())

const PORT = 82



app.get("/", function (req,res){

});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});