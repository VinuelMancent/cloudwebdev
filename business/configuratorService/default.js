const express = require("express")
const app = express();
app.use(express.static("public"))
app.use(express.json())
const cors = require('cors')
const mysql = require('mysql2/promise')

const PORT = 86



app.get("/:car", async function (req,res){
    const car = req.params.car

    const connection = await mysql.createConnection({
        host: 'car_db',
        user: 'hhz',
        password: 'car',
        database: 'merchandise_db'
    })
    try {
        const table = car=="HyperionHalo" ? "hyperion":"traverse"
        const query = `SELECT * FROM configurator_${table}`
        const [items] = await connection.query(query)
        const result = items.map(row => ({
            config: row.config
        }))
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.json(result[0].config)
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