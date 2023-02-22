import { PlayerData } from './types';

export function getNextPlayerId(
  currentPlayerId: string,
  playerArray: PlayerData[]
): string {
  const currentPlayerIndex = playerArray.findIndex(
    (player) => player.playerId === currentPlayerId
  );
  const nextPlayerIndex =
    currentPlayerIndex + 1 < playerArray.length ? currentPlayerIndex + 1 : 0;
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
