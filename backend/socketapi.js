/**
 * File for handling socketapi 
 */

const io = require('socket.io')();
const socketapi = {
    io: io
};

//Socket logic here?
io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('disconnect', () =>{
        console.log('a user disconnected');
    });
});

module.exports = socketapi;