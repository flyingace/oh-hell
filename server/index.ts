import express, { Express } from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { CardData, generateHands } from './deck-methods';

const app: Express = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

export type PlayerData = {
  playerAvatar: string;
  playerId: string;
  playerName: string;
};

const players: PlayerData[] = [];

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  if (io.engine.clientsCount > 5) {
    socket.emit('err', { message: 'reach the limit of connections' });
    socket.disconnect();
  }

  socket.on('SIGN_IN', (userData) => {
    userData.playerOrder = players.length;
    players.push(userData);
    console.log('players: ', players);
    console.log('connections: ', io.engine.clientsCount);

    io.emit('UPDATE_PLAYERS', players);
  });

  // socket.on("join_room", (data) => {
  //   socket.join(data);
  // });

  socket.on('DEAL_CARDS', () => {
    console.log('deal cards received');
    const hands = generateHands(5, 5);
    console.log('hands: ', hands);
    distributeHands(hands);
  });

  socket.on('DISCONNECT_ALL', () => {
    players.length = 0;
    io.disconnectSockets();
  });
});

function distributeHands(hands: CardData[][]) {
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
