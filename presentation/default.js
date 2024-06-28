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
    //const response = await fetch("http://localhost:81")
    //const jsonresponse = await response.json()
    const jsonresponse = {"name":"Monaco","lat":43.733334,"long":7.416667,"latmin":43.728334,"latmax":43.738334,"longmin":7.401667000000001,"longmax":7.431667,"link":"https://www.openstreetmap.org/export/embed.html?bbox=7.401667000000001,43.728334,7.431667,43.738334&layer=mapnik"}
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
    //const response = await fetch("http://localhost:86/HyperionHalo")
    //const jsonresponse = await response.json()
    const jsonresponse = {
        "colors":[
            {"value":"Space Grey",
            "color": "linear-gradient(90deg, #9ca6af 19%, #515559 50%)",
            "image":"/Hyperion_Halo/space_grey.jpg"},
            {"value":"Cherry Red",
            "color": "linear-gradient(90deg, #e93f45 19%, #9c1518 50%)",
            "image":"/Hyperion_Halo/cherry_red.jpg"},
            {"value":"Emerald Green",
            "color": "linear-gradient(90deg, #00b46c 19%, #017a59 50%)",
            "image":"/Hyperion_Halo/emerald_green.jpg"},
            {"value":"Ice Blue",
            "color": "linear-gradient(90deg, #0084bf 19%, #bddbf5 50%)",
            "image":"/Hyperion_Halo/ice_blue.jpg"}],
        "tires":[
            {"value":"Sommerreifen","image":"standard_wheel.jpeg"},
            {"value":"Winterreifen","image":"standard_wheel.jpeg"},
            {"value":"Sportreifen","image":"sport_wheel.jpeg"}],
        "rims":[
            {"value":"Street Style",
            "image":"/street_style_rim.png"},
            {"value":"Urban Chic",
            "image":"/luxury-rim.png"},
            {"value":"Luxury Elite",
            "image":"/exclusive-rim.png"}]}
    res.render("configuratorHyperionHalo.ejs", { showNavbar: true, configuration: jsonresponse })
})

app.get("/configuratorTraverse", async function (req, res){
    //const response = await fetch("http://localhost:86/Traverse")
    //const jsonresponse = await response.json()
    const jsonresponse = 
    {"colors":[
        {"value":"Black Panther",
        "color": "linear-gradient(90deg, #4b4a4a 19%, #000000 50%)",
        "image":"/Traverse/black_panther.jpg"},
        {"value":"Cryistal White",
        "color": "linear-gradient(90deg, #e3f0ff 19%, #ffffff 50%)",
        "image":"/Traverse/crystal_white.jpg"},
        {"value":"Orange Juice",
        "color": "linear-gradient(90deg, #faa95e 19%, #ff7b00 50%)",
        "image":"/Traverse/orange_juice.jpg"}],
    "tires":[
        {"value":"Sommerreifen","image":"/standard_wheel.jpeg"},
        {"value":"Winterreifen","image":"/standard_wheel.jpeg"},
        {"value":"Sportreifen","image":"/sport_wheel.jpeg"}],
    "rims":[
        {"value":"Street Style",
        "image":"/street_style_rim.png"},
        {"value":"Urban Chic",
        "image":"/luxury-rim.png"},
        {"value":"Luxury Elite",
        "image":"/exclusive-rim.png"}]}
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
    //const response = await fetch("http://localhost:82")
    //const jsonresponse = await response.json()
    const jsonresponse = {"cars":[{"id":0,"car":"Hyperion Halo"},{"id":1,"car":"Traverse"}],"tracks":[{"id":0,"track":"Nürburgring"},{"id":1,"track":"Hockenheimring"},{"id":2,"track":"Lausitzring"},{"id":3,"track":"Sachsenring"}]}
    res.render("testdrive.ejs", { showNavbar: true, carsAndTracks: jsonresponse })
})

app.get("/merch", async function (req, res){
    //const response = await fetch("http://localhost:85")
    //const jsonresponse = await response.json()
    const jsonresponse = [
        {"name":"Merch Tasse","price":9.99,"image":"http://localhost/Merch_Tasse.png"},
        {"name":"Merch Cap","price":7.99,"image":"http://localhost/Merch_Cap.png"},
        {"name":"Merch Pullover","price":27.99,"image":"http://localhost/Merch_Pullover.png"},
        {"name":"Merch T-Shirt","price":12.99,"image":"http://localhost/Merch_TShirt_Weiss.png"}]
    res.render("merchshop.ejs", { showNavbar: true, merchItems: jsonresponse })
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT)
})