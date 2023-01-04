import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export function dealCards() {
  socket.emit('DEAL_CARDS');
}

export function disconnectAll() {
  sessionStorage.clear();
  socket.emit('DISCONNECT_ALL');
}

export function signPlayerIn(
  playerAvatar: string,
  playerId: string,
  playerName: string,
) {
  socket.emit('SIGN_IN', {
    playerAvatar: playerAvatar,
    playerId: playerId,
    playerName: playerName,
  });
}

export default socket;