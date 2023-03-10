import { io } from 'socket.io-client';
import { CardData } from '../types';

const socket = io('http://localhost:3001');

export function dealCards() {
  socket.emit('DEAL_CARDS');
}

export function disconnectAll() {
  sessionStorage.clear();
  socket.emit('DISCONNECT_ALL');
}

export function setDealer() {
  socket.emit('SET_DEALER');
}

export function setActivePlayer(activePlayerId: string) {
  socket.emit('SET_ACTIVE_PLAYER', activePlayerId);
}

export function signPlayerIn(
  playerAvatar: string,
  playerId: string,
  playerName: string
) {
  socket.emit('SIGN_IN', {
    booksBid: 0,
    booksTaken: 0,
    playerAvatar: playerAvatar,
    playerId: playerId,
    playerName: playerName,
    playerScore: 0,
  });
}

export function addCardToPool(card: CardData) {
  socket.emit('CARD_PLAYED', card);
}

export function submitBid(bid: string, playerId: string) {
  socket.emit('SUBMIT_BID', { bid: bid, playerId: playerId });
}

export default socket;
