const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


//registering events for socket connections.
io.on('connection', (socket) => {
    socket.on('chatMessage', (data) => {
        socket.broadcast.emit('chatMessage', data);
    })

    socket.on('disconnect', (data) => {
        socket.broadcast.emit('userLeave', data);
    })
})


app.use(express.urlencoded({
    extended: true
}))

//routing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/users', (req, res) => {
    res.sendFile(__dirname + '/users.html')
})

app.post('/create-user', (req, res) => {
    app.set('username', req.body.Username);
    console.log(app.get('username'));
    res.redirect('/chat');
})

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html')
})

//listening on port 3000
http.listen(3000, () => {
    console.log('listening on port 3000.');
})