"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const deck_methods_1 = require("./deck-methods");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
const players = [];
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on('SIGN_IN', (userData) => {
        userData.playerOrder = players.length;
        players.push(userData);
        console.log('players: ', players);
        io.emit('UPDATE_PLAYERS', players);
    });
    // socket.on("join_room", (data) => {
    //   socket.join(data);
    // });
    socket.on('DEAL_CARDS', () => {
        console.log('deal cards received');
        const hands = (0, deck_methods_1.generateHands)(5, 5);
        console.log('hands: ', hands);
        distributeHands(hands);
    });
    socket.on('DISCONNECT_ALL', () => {
        players.length = 0;
        io.disconnectSockets();
    });
});
function distributeHands(hands) {
    // for each socket registered
    // emit the hand to that user matching by
    // index
    io.fetchSockets().then((sockets) => {
        sockets.forEach((socket, idx) => {
            io.to(socket.id).emit('NEW_HAND', hands[idx]);
        });
        console.log('length: ', sockets.length);
    });
}
server.listen(3001, () => {
    console.log('SERVER IS RUNNING');
});
