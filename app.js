const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors')
const socket = require("socket.io")

require('dotenv').config()


const io = socket(http,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    },
});

io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token === process.env.CLIENT_SECRET){
        console.log(process.env.CLIENT_SECRET)
        next()
    }else{
        next(new Error("Invalid token"))
    }
});
app.use(cors())
app.use(express.json())

app.post("/sock",(req, res) => {
    if(req.body.token !== process.env.CLIENT_SECRET){
        return  res.json({
            message:"Unauthorized"
        },401)
    }

    io.emit(req.body.channel,req.body.body)
    return res.json({
        message:"success"
    })
})


app.get("/", (req, res) => {

    // io.emit("chat","test")

    return res.json({
        message:"success"
    })
    // console.log(req.body.)
})


http.listen(4040, () => {
    console.log('listening on *:4040');
});