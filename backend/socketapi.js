/**
 * File for handling socketapi 
 */

const io = require('socket.io')();
const socketapi = {
    io: io
};

//Socket logic here?
// io.on('connection', function(socket){
//     console.log('A user connected');
//     socket.on('disconnect', () =>{
//         console.log('a user disconnected');
//     });
// });

/* Send event to server 'chatter' Used in lobby */
io.on('connection', function(socket) {
    socket.on('chatter', function(message) {
        console.log('message : ' + message);
    });
});

/* Broadcasting  */
io.on('connection', (socket) => {
    socket.on('chatter', (message) => {
      console.log('message : ', message)
      io.emit('chatter', message) // broadcast
    });
});



module.exports = socketapi;