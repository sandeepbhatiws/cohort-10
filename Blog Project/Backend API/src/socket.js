const { Server } = require("socket.io");

let io;

const initSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: ['http://localhost:5173', 'http://localhost:3000'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        }
    });

    io.on("connection", (socket) => {

        console.log("User connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });

    });

    return io;
};

// Access initialized Socket.IO instance elsewhere
const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO is not initialized");
    }

    return io;
};

module.exports = {
    initSocket,
    getIO
};