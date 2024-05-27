// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware to serve static files (if needed)
app.use(express.static('public'));

// Define a route for the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('A user connected');

    // Function to send notification
    const sendNotification = (message, userId) => {
        // Emitting to a specific channel
        socket.to('notify-channel').emit('notification', { message, userId });
    };

    // Example of receiving a message and userId to broadcast
    socket.on('sendNotification', (data) => {
        sendNotification(data.message, data.userId);
    });

    // Joining a specific channel
    socket.on('joinChannel', (channel) => {
        socket.join(channel);
        console.log(`User joined channel: ${channel}`);
    });

    // Disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
