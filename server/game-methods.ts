import { PlayerData } from './types';

export function getNextPlayerId(
  activePlayerId: string,
  playerArray: PlayerData[]
): string {
  const activePlayerIndex = playerArray.findIndex(
    (player) => player.playerId === activePlayerId
  );
  const nextPlayerIndex =
    activePlayerIndex + 1 < playerArray.length ? activePlayerIndex + 1 : 0;
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
