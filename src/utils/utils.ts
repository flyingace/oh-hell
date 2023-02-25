import { PlayerData } from '../types';

// get random integer
export function getRandomInteger(rangeStart: number, rangeEnd: number) {
  const difference = rangeEnd - rangeStart;
  return Math.floor(Math.random() * difference) + rangeStart;
}

// get next player in sequence
export function getNextPlayerId(
  activePlayerId: string,
  playerArray: PlayerData[]
) {
  const activePlayerIndex = playerArray.findIndex(
    (player) => player.playerId === activePlayerId
  );
  const nextPlayerIndex =
    activePlayerIndex + 1 < playerArray.length ? activePlayerIndex + 1 : 0;
  return playerArray[nextPlayerIndex].playerId;
}
