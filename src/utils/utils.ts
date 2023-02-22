import { PlayerData } from '../types';

// get random integer
export function getRandomInteger(rangeStart: number, rangeEnd: number) {
  const difference = rangeEnd - rangeStart;
  return Math.floor(Math.random() * difference) + rangeStart;
}

// get next player in sequence
export function getNextPlayerId(
  currentPlayerId: string,
  playerArray: PlayerData[]
) {
  const currentPlayerIndex = playerArray.findIndex(
    (player) => player.playerId === currentPlayerId
  );
  const nextPlayerIndex =
    currentPlayerIndex + 1 < playerArray.length ? currentPlayerIndex + 1 : 0;
  return playerArray[nextPlayerIndex].playerId;
}
