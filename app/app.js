// remove nodemon from "nodemon app.js" from json file and write "node app.js" before deployment on heroku.
const express = require("express");
const app = express();

const http = require("http").createServer(app);

const io = require("socket.io")(http , {cors: {
    origin: '*',
  }});

io.on("connection", function(socket){
    console.log( `${socket.id} user connected`);

    socket.on("mousedown", function(data){
        socket.broadcast.emit("md",data);
    })
    socket.on("mousemove", function(data){
        socket.broadcast.emit("mm",data);
    })
    socket.on("bgColor",function(data){
        socket.broadcast.emit("myBackgroundColor", data);
    })

}) 

app.get("/" , function(req, res){
    res.write("<h1> Welcome to home page !!! </h1>");
    res.send();
});
     
    // socket.on("testing", function(data){
    //     console.log(data);
    //     // socket.emit("testing-again",data);
    // });


//  app.get("/profile" ,function(req, res){
//     res.send("<h1> Welcome to profile page !!! </h1>");
//  })

let port = process.env.PORT || 3000;

http.listen(port , function(){
     console.log("App is listening to 3000 !!!");
 })

// app.listen(3000 , function(){
//     console.log("App is listening to 3000 !!!");
// })

