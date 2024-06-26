const express = require("express")
const app = express();
app.use(express.static("public"))
app.use(express.json())
const mysql = require('mysql2/promise')

const PORT = 86



app.get("/:car", async function (req,res){
    const car = req.params.car
    const tires = [{value: "Sommerreifen", image: ""}, {value: "Winterreifen", image: ""}, {value: "Sportreifen", image: ""}]
    const rims = [{value: "Street Style", image: ""}, {value: "Urban Chic", image: ""}, {value: "Luxury Elite", image: ""}]

    const HyperionHalo = {
        colors: [
            {value: "Space Grey", image: "/Hyperion_Halo/space_grey.jpg"},
            {value: "Cherry Red", image: "/Hyperion_Halo/cherry_red.jpg"},
            {value: "Emerald Green", image: "/Hyperion_Halo/emerald_green.jpg"},
            {value: "Ice Blue", image: "/Hyperion_Halo/ice_blue.jpg"}
        ], tires, rims
    }
    const Traverse = {
        colors:[
            {value: "Space Grey", image: "/Hyperion_Halo/space_grey.jpg"},
            {value: "Cherry Red", image: "/Hyperion_Halo/cherry_red.jpg"},
            {value: "Emerald Green", image: "/Hyperion_Halo/emerald_green.jpg"},
            {value: "Ice Blue", image: "/Hyperion_Halo/ice_blue.jpg"}
        ], tires, rims       
    }
    if(car == "HyperionHalo"){
        res.json(HyperionHalo)
    } else if(car == "Traverse"){
        res.json(Traverse)
    } else {
        res.sendStatus(404)
    }
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
})