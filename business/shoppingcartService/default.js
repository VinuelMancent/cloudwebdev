const express = require("express")
const redis = require("redis")
const app = express()
app.use(express.static("public"))
app.use(express.json())
const cors = require('cors')

const PORT = 83

const redisClient = redis.createClient({
    socket: {
        port: 6379,
        host: "redis"
    }
})
redisClient.connect()

redisClient.on('ready', () => {
    console.log("Redis connected")
})

redisClient.on('error', (err) => {
    console.error("redis: " + err)
})

app.get("/getItems", async function (req,res){
    console.log("-GetItems-")
    allItems = []
    fullPrice = 0
    console.log("returning all shoppingcart items")
    try{
        await redisClient.get("shoppingcartItems").then(function(value){
            if (value != undefined) {
                console.log(`got items: ${value}`)
                allItems =JSON.parse(value)
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
    }catch(err){
        console.log(`err, returning empty array`)
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(JSON.stringify({allItems: allItems, price: fullPrice.toFixed(2)}))
    }
    
})

app.post("/pushItem", async function (req, res){
    console.log("+++pushItem+++")
    allItems = []
    console.log(req.body)
    const itemToPush = req.body
    console.log(`pushing item: ${JSON.stringify(itemToPush)}`)
    try{
        await redisClient.get("shoppingcartItems").then(async function(value){
            if (value != undefined) {
                allItems = JSON.parse(value)
                console.log(`retreived items: ${allItems}`)
            }
            allItems.push(itemToPush)
            console.log(`setting items: ${JSON.stringify(allItems)}`)
            await redisClient.set("shoppingcartItems", JSON.stringify(allItems))
            console.log(`full shoppingcart: ${JSON.stringify(allItems)}`)
        })
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.sendStatus(200)
    }catch(err){
        allItems.push(itemToPush)
        console.log(`error, trying to push ${JSON.stringify(allItems)}`)
        await redisClient.set("shoppingcartItems", JSON.stringify(allItems))
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.sendStatus(200)
    }
    
})

app.post("/clearItems", async function (req, res){
    await redisClient.set("shoppingcartItems", JSON.stringify([]))
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