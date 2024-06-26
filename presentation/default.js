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
        showNavbar: true,
        location: jsonresponse
    });
});

app.get("/models", function (req, res){
    res.render("models.ejs", { showNavbar: true })
})

app.get("/configuratorHyperionHalo", async function (req, res){
    const response = await fetch("http://localhost:86/HyperionHalo")
    const jsonresponse = await response.json()
    res.render("configuratorHyperionHalo.ejs", { showNavbar: true, configuration: jsonresponse })
})

app.get("/configuratorTraverse", async function (req, res){
    const response = await fetch("http://localhost:86/Traverse")
    const jsonresponse = await response.json()
    res.render("configuratorTraverse.ejs", { showNavbar: true, configuration: jsonresponse })
})

app.get("/orderPopup", function (req, res){
    res.render("orderPopup.ejs", { showNavbar: false })
});

app.get("/configurator/:model", function (req, res){
    res.render("configurator.ejs", { 
        showNavbar: true ,
        model:  req.params.model, 
    })
})

app.get("/testdrive", async function (req, res){
    const response = await fetch("http://localhost:82")
    const jsonresponse = await response.json()
    res.render("testdrive.ejs", { showNavbar: true, carsAndTracks: jsonresponse })
})

app.get("/merch", async function (req, res){
    const response = await fetch("http://localhost:85")
    const jsonresponse = await response.json()
    res.render("merchshop.ejs", { showNavbar: true, merchItems: jsonresponse })
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT)
})