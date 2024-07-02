const express = require("express")
const app = express();
app.use(express.static("public"))
app.use(express.json())
const cors = require('cors')
const mysql = require('mysql2/promise')

const PORT = 82



app.get("/", async function (req,res){
    const connection = await mysql.createConnection({
        host: 'car_db',
        user: 'hhz',
        password: 'car',
        database: 'merchandise_db'
    })
    try {
        // Daten aus der Tabelle "testdrive" abrufen
        const [cars] = await connection.query('SELECT * FROM testdrive_cars')
        const [tracks] = await connection.query('SELECT * FROM testdrive_tracks')
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.json({cars: cars, tracks: tracks})
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error)
    }
})

const corsOptions = {
    origin: '*',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
}
 
app.use(cors(corsOptions))

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
})