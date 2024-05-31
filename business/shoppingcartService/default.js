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
        }
            res.send(allitems)
        }
    )
})

app.post("pushItem/:item", function (req, res){
    const itemToPush = req.params.item
    redisClient.get("shoppingcartItems").then(function(value){
        if (value != undefined) {
            allItems = JSON.parse(value)
        }
        allItems.push(itemToPush)
        redisClient.set("shoppingcartItems", allitems)
    })
    res.sendStatus(200)
})

app.listen(PORT, function (err) {
    if (err) console.log(err)
    console.log("Server listening on PORT", PORT)
})