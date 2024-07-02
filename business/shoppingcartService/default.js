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
    allItems = []
    console.log("returning all shoppingcart items")
    redisClient.get("shoppingcartItems").then(function(value){
        if (value != undefined) {
            allItems =JSON.parse(value)
            fullPrice = 0
            for(const item of allItems){
                fullPrice += Number.parseFloat(item.price)
            }
        }else{
            allItems = []
        }
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.send(JSON.stringify({allItems: allItems, price: fullPrice.toFixed(2)}))
        }
    )
})

app.post("/pushItem", function (req, res){
    allItems = []
    console.log(req.body)
    const itemToPush = req.body
    console.log(`pushing item: ${JSON.stringify(itemToPush)}`)
    redisClient.get("shoppingcartItems").then(function(value){
        if (value != undefined) {
            allItems = JSON.parse(value)
        }
        allItems.push(itemToPush)
        redisClient.set("shoppingcartItems", JSON.stringify(allItems))
        console.log(`full shoppingcart: ${JSON.stringify(allItems)}`)
    })
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.sendStatus(200)
})

app.post("/clearItems", function (req, res){
    redisClient.set("shoppingcartItems", JSON.stringify([]))
    res.setHeader("Access-Control-Allow-Origin", "*")
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