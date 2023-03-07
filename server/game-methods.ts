import { PlayerData } from './types';

export function getNextPlayerIndex(
  activePlayerId: string,
  playerArray: PlayerData[]
): number {
  const activePlayerIndex = playerArray.findIndex(
    (player) => player.playerId === activePlayerId
  );
  return activePlayerIndex < playerArray.length - 1 ? activePlayerIndex + 1 : 0;
}

export function getNextPlayerId(
  activePlayerId: string,
  playerArray: PlayerData[]
): string {
  const nextPlayerIndex = getNextPlayerIndex(activePlayerId, playerArray);
  return playerArray[nextPlayerIndex].playerId;
}

export function getRandomPlayerId(players: PlayerData[]): string {
  const playerIndex = getRandomInteger(0, players.length - 1);
  return players[playerIndex].playerId;
}

export function getRandomInteger(rangeStart: number, rangeEnd: number) {
  const difference = rangeEnd - rangeStart;
  return Math.floor(Math.random() * difference) + rangeStart;
}
