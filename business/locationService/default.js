const express = require("express")
const app = express();
app.use(express.static("public"))
app.use(express.json())

const PORT = 81
const mexiko = {"name": "Mexiko Cancun", "lat": 21.17429, "long": -86.84656}
const lissabon = {"name": "Lissabon", "lat": 38.736946, "long": -9.142685}
const monaco = {"name": "Monaco", "lat": 43.733334, "long": 7.416667}
const mailand = {"name": "Mailand", "lat": 45.464664, "long": 9.188540}
const zürich = {"name": "Zürich", "lat": 47.36667, "long": 8.55}
const hhz = {"name": "HHZ Böblingen", "lat": 48.68212, "long": 9.01171}
const allLocations = [mexiko, lissabon, monaco, mailand, zürich, hhz]

const latrange = 0.005
const longrange = 0.015

app.get("/", function (req,res){
    const item = allLocations[Math.floor(Math.random()*allLocations.length)];
    item.latmin = item.lat - latrange
    item.latmax = item.lat + latrange
    item.longmin = item.long - longrange
    item.longmax = item.long + longrange
    item.link = `https://www.openstreetmap.org/export/embed.html?bbox=${item.longmin},${item.latmin},${item.longmax},${item.latmax}&amp;layer=mapnik`
    console.log(JSON.stringify(item))
    res.send(JSON.stringify(item))
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});