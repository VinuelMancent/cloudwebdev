const express = require("express")
const redis = require("redis")
const app = express()
app.use(express.static("public"))
app.use(express.json())

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
            res.send(JSON.stringify(allItems))
        }
    )
})

app.post("/pushItem", function (req, res){
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
    res.sendStatus(200)
})

app.post("clearItems", function (req, res){
    redisClient.set("shoppingcartItems", [])
    res.sendStatus(200)
})

app.listen(PORT, function (err) {
    if (err) console.log(err)
    console.log("Server listening on PORT", PORT)
})