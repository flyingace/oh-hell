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
    players.push(userData);
    console.log('userData: ', userData);
    io.emit('ADD_PLAYER', userData);
  });

  socket.on('DEAL_CARDS', () => {
    const hands = generateHands(5, 5);
    distributeHands(hands);
  });

  socket.on('DISCONNECT_ALL', () => {
    players.length = 0;
    io.disconnectSockets();
  });

  socket.on('CARD_PLAYED', (playedCard) => {
    io.emit('ADD_PLAYED_CARD', playedCard);
  });
});

function distributeHands(hands: CardData[][]) {
  io.fetchSockets().then((sockets) => {
    sockets.forEach((socket, idx) => {
      io.to(socket.id).emit('NEW_HAND', hands[idx]);
    });
  });
}

server.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});
