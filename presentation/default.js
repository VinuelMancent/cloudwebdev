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
    const jsonresponse = {"colors":[{"value":"Space Grey","image":"/Hyperion_Halo/space_grey.jpg"},{"value":"Cherry Red","image":"/Hyperion_Halo/cherry_red.jpg"},{"value":"Emerald Green","image":"/Hyperion_Halo/emerald_green.jpg"},{"value":"Ice Blue","image":"/Hyperion_Halo/ice_blue.jpg"}],"tires":[{"value":"Sommerreifen","image":""},{"value":"Winterreifen","image":""},{"value":"Sportreifen","image":""}],"rims":[{"value":"Street Style","image":""},{"value":"Urban Chic","image":""},{"value":"Luxury Elite","image":""}]}
    res.render("configuratorHyperionHalo.ejs", { showNavbar: true, configuration: jsonresponse })
})

app.get("/configuratorTraverse", async function (req, res){
    //const response = await fetch("http://localhost:86/Traverse")
    //const jsonresponse = await response.json()
    const jsonresponse = {"colors":[{"value":"Space Grey","image":"/Hyperion_Halo/space_grey.jpg"},{"value":"Cherry Red","image":"/Hyperion_Halo/cherry_red.jpg"},{"value":"Emerald Green","image":"/Hyperion_Halo/emerald_green.jpg"},{"value":"Ice Blue","image":"/Hyperion_Halo/ice_blue.jpg"}],"tires":[{"value":"Sommerreifen","image":""},{"value":"Winterreifen","image":""},{"value":"Sportreifen","image":""}],"rims":[{"value":"Street Style","image":""},{"value":"Urban Chic","image":""},{"value":"Luxury Elite","image":""}]}
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
    const jsonresponse = {"cars":[{"id":0,"car":""},{"id":1,"car":""},{"id":2,"car":""}],"tracks":[{"id":0,"track":""},{"id":1,"track":""},{"id":2,"track":""}]}
    res.render("testdrive.ejs", { showNavbar: true, carsAndTracks: jsonresponse })
})

app.get("/merch", async function (req, res){
    //const response = await fetch("http://localhost:85")
    //const jsonresponse = await response.json()
    const jsonresponse = [{"name":"Merch Tasse","price":9.99,"image":"http://localhost/Merch_Tasse.png"},{"name":"Merch Cap","price":7.99,"image":"http://localhost/Merch_Cap.png"},{"name":"Merch Pullover","price":27.99,"image":"http://localhost/Merch_Pullover.png"},{"name":"Merch TShirt Weiss","price":12.99,"image":"http://localhost/Merch_TShirt_Weiss.png"}]
    res.render("merchshop.ejs", { showNavbar: true, merchItems: jsonresponse })
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT)
})