const express = require("express")
const app = express()
app.use(express.static("public"))
app.use(express.json())
const layouts = require("express-ejs-layouts")
app.use(layouts)
app.set("layout", "mainLayout.ejs");
app.use(express.static("./static/images"))
app.use(express.json())



const PORT = 80

app.get("/", async function (req,res){
    //get location from microservice
    const response = await fetch("http://localhost:81")
    const jsonresponse = await response.json()
    console.log(jsonresponse)
    res.render("home.ejs", {
        location: jsonresponse
    });
});

app.get("/models", function (req, res){
    res.render("models.ejs")
})

app.get("/configuratorHyperionHalo", function (req, res){
    res.render("configuratorHyperionHalo.ejs")
})

app.get("/configurator/:model", function (req, res){
    res.render("configurator.ejs", {
        model:  req.params.model
    })
})

app.get("/testdrive", function (req, res){
    res.render("testdrive.ejs")
})

app.get("/merch", function (req, res){
    res.render("merchshop.ejs")
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});