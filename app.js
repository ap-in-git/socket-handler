const express = require('express');
const app = express();
const http = require('http').createServer(app);

const cors = require('cors')

const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors())
app.use(express.json())

app.post("/sock",(req, res) => {
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