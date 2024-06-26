const express = require("express")
const app = express();
app.use(express.static("public"))
app.use(express.json())
const mysql = require('mysql2/promise')

const PORT = 82



app.get("/", async function (req,res){
    const connection_cars = await mysql.createConnection({
        host: 'hhzcar',
        user: 'hhz',
        password: 'car',
        database: 'testdrive_cars'
    })
    const connection_tracks = await mysql.createConnection({
        host: 'hhzcar',
        user: 'hhz',
        password: 'car',
        database: 'testdrive_tracks'
    })
    try {
        // Daten aus der Tabelle "testdrive" abrufen
        const [cars] = await connection_cars.query('SELECT * FROM testdrive_cars')
        const [tracks] = await connection_tracks.query('SELECT * FROM testdrive_tracks')
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.json({cars: cars, tracks: tracks})
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error)
    }
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
})