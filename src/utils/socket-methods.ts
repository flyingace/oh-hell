import { io } from 'socket.io-client';
import { CardData } from '../components/Card/Card';

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
  playerName: string
) {
  socket.emit('SIGN_IN', {
    playerAvatar: playerAvatar,
    playerId: playerId,
    playerName: playerName,
  });
}

export function addCardToPool(card: CardData) {
  socket.emit('CARD_PLAYED', card);
}

export default socket;
