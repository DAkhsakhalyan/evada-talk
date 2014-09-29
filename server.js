var appPort = process.env.PORT || 8080;

// Librairies

var express = require('express'),
    app = express(),
    _ = require("underscore"),
    server = require('http').createServer(app),
    io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
server.listen(appPort, function(){
    console.log("Listening on port " + appPort);
});
var onlineUsers = {};
io.on('connection', function(socket){
    var currentUser = "";
    socket.on("addUser", function(data){
        currentUser = data.email;
        onlineUsers[data.email] = {
            socketId: socket.id
        };
        console.log("added user >>");
        console.log(onlineUsers);
    });
    socket.on("disconnect",function() {
        delete onlineUsers[currentUser];
        console.log("disconnected");
    });
    socket.on("mes",function(data) {

        var to;
        if( !onlineUsers[data.contact.email] ) {
            return;
        }
        console.log(data);
        to = onlineUsers[data.contact.email].socketId;
        io.to(to).emit("mes", currentUser, data.mes);
        //io.sockets.socket(to).emit(data.mes);
    });

});

app.use(require('body-parser').json());
var users = [
    {
        email: "dakhsakhalyan@gmail.com",
        name : "David Akhsakhalyan",
        imgPath: "VCi2iKYNYG0.jpg",
        password: "123456"
    },
    {
        email: "bpitt@gmail.com",
        name : "Brad Pitt",
        imgPath: "Brad-Pitt.jpg",
        password: "123456"
    },
    {
        email: "abanderas@gmail.com",
        name : "Antonio Banderas",
        imgPath: "Antonio-Banderas.jpg",
        password: "123456"
    },
    {
        email: "jstatham@gmail.com",
        name : "Jason Statham",
        imgPath: "jason_statham.jpg",
        password: "123456"
    },
    {
        email: "mkunis@gmail.com",
        name : "Mila Kunis",
        imgPath: "mila-kunis.jpg",
        password: "123456"
    },
    {
        email: "vputin@gmail.com",
        name : "Vladimir Putin",
        imgPath: "Vladimir-Putin.jpg",
        password: "123456"
    },
    {
        email: "rdauni@gmail.com",
        name : "Robert Dauni",
        imgPath: "robert-dauni.jpg",
        password: "123456"
    }
];
app.post('/login', function(req, res){
    var username = req.body.username || '',
        password = req.body.password || '';
    if( !username || !password ) {
        res.send(401);
        return;
    }

    var user = {};
    for( var itm in users ) {
        if( users[itm].email === username && users[itm].password === password ) {
            user = users[itm];
            break;
        }
    }
    if(_.isEmpty(user)) {
        res.send(401);
        return;
    }
    res.send(user);
});

app.post('/profile', function(req, res){
    var username = req.body.username || '';
    if( !username ) {
        res.send(401);
        return;
    }
    var user = null;
    for( var itm in users ) {
        if( users[itm].email === username ){
            user = users[itm];
            break;
        }
    }
    if( user ){
        res.send(user);
        return;
    }
    res.send(401);


});
app.get('/contacts', function(req, res){
    res.send(users);
});

