const express = require("express")
const redis = require("redis")
const app = express()
app.use(express.static("public"))
app.use(express.json())
const cors = require('cors');

const PORT = 83

const redisClient = redis.createClient()
redisClient.connect()

redisClient.on('ready', () => {
    console.log("Redis connected")
})

redisClient.on('error', (err) => {
    console.error("redis: " + err)
})

app.get("/getItems", function (req,res){
    redisClient.get("shoppingcartItems").then(function(value){
        if (value != undefined) {
            allItems = JSON.parse(value)
        }else{
            allItems = []
        }
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.send(JSON.stringify(allItems))
        }
    )
})

app.post("/pushItem", function (req, res){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    allItems = []
    console.log(req.body)
    const itemToPush = req.body
    redisClient.get("shoppingcartItems").then(function(value){
        if (value != undefined) {
            allItems = JSON.parse(value)
        }
        allItems.push(itemToPush)
        redisClient.set("shoppingcartItems", JSON.stringify(allItems))
    })
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.sendStatus(200)
})

app.post("clearItems", function (req, res){
    redisClient.set("shoppingcartItems", [])
    res.sendStatus(200)
})

 const corsOptions = {
   origin: '*',//(https://your-client-app.com)
   optionsSuccessStatus: 200,
 };

app.use(cors(corsOptions))

app.listen(PORT, function (err) {
    if (err) console.log(err)
    console.log("Server listening on PORT", PORT)
})