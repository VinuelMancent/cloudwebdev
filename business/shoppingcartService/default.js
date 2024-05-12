const express = require("express")
const redis = require("redis")
const app = express()
app.use(express.static("public"))
app.use(express.json())

const PORT = 83

const redisClient = redis.createClient()

(async () => {
    await redisClient.connect()
})()

redisClient.on('ready', () => {
    console.log("Redis connected")
})

redisClient.on('error', (err) => {
    console.error("redis: " + err)
})

app.get("/getItems", function (req,res){

});

app.post("pushItem/:item", function (req, res){

})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});