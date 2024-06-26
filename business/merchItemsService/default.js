const express = require("express")
const app = express();
app.use(express.static("public"))
app.use(express.json())
const mysql = require('mysql2/promise')

const PORT = 85



app.get("/", async function (req,res){
    const connection = await mysql.createConnection({
        host: 'hhzcar',
        user: 'hhz',
        password: 'car',
        database: 'merchItems'
    })
    try {
        // Daten aus der Tabelle "testdrive" abrufen
        const [items] = await connection.query('SELECT * FROM merchItems')
         const merchItems = items.map(row => ({
            name: items.name,
            price: items.price,
            image: items.image
        }))
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.json(merchItems)
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error)
    }
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
})