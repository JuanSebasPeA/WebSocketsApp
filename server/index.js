//Author: Juan Sebastian Peña A, Full stack developer
import express from "express";
import colors from "colors";
import {Server as SocketServer} from "socket.io";
import http from "http";

// creating the server
const app = express();
// creating the socket server using http module
const server = http.createServer(app);
// creating the socket server using socket.io
const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:5173" 
    }
})


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* Explanation of the line io.on: 
io.on is a method that is going to listen to the events that are going to happen in the server
the event that is going to listen is the connection event
the connection event is going to be triggered when a client connects to the server */
io.on('connection', socket => {
    console.log("Client connected".yellow.bold.bgGreen);
    console.log(socket.id.gray.bold);

    socket.on("chat", (data) => {
        console.log(data);
        socket.broadcast.emit("message", {
            body: data,
            from: socket.id
        })
    })

})


// listining to the port
server.listen(4000, () => {
    console.log("Server is running on port 4000".yellow.bold.bgBlue);
})

