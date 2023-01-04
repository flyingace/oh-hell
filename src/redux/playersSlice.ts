import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { PlayerData } from '../components/Player/Player';
import { getClientPlayerId } from './gameSlice';

const playersAdapter = createEntityAdapter<PlayerData>({
  selectId: (player) => player.playerId,
  sortComparer: (a, b) => {
    let returnValue = 0;
    if (a.playerOrder && b.playerOrder) {
      if (a.playerOrder > b.playerOrder) {
        returnValue = 1;
      } else if (a.playerOrder < b.playerOrder) {
        returnValue = -1;
      }
    }
    return returnValue;
  },
});

const playersSlice = createSlice({
  name: 'players',
  initialState: playersAdapter.getInitialState(),
  reducers: {
    addPlayer: playersAdapter.addOne,
    addPlayers: playersAdapter.addMany,
    updatePlayer: playersAdapter.updateOne,
    upsertPlayers: playersAdapter.upsertMany,
  },
});

const playersSelectors = playersAdapter.getSelectors(
  (state: RootState) => state.players
);

const { selectAll, selectById } = playersSelectors;

export function getAllPlayers(state: RootState) {
  return selectAll(state);
}

export function getPlayerById(playerId: string) {
  return function (state: RootState) {
    return selectById(state, playerId);
  };
}

export function getClientPlayer(state: RootState) {
  const clientPlayerId = getClientPlayerId(state);
  console.log(clientPlayerId);
  return function (state: RootState) {
    return clientPlayerId ? selectById(state, clientPlayerId) : null;
  };
}

export const { addPlayer, addPlayers, updatePlayer, upsertPlayers } =
  playersSlice.actions;

export default playersSlice.reducer;
