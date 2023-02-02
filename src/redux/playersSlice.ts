import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { PlayerData } from '../components/Player/Player';
import { getClientPlayerId } from './gameSlice';
import { CardData } from '../components/Card/Card';

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
  initialState: playersAdapter.getInitialState({
    booksBid: undefined,
    booksTaken: undefined,
    playerAvatar: undefined,
    playerHand: [],
    playerId: '',
    playerName: '',
    playerOrder: undefined,
    playerScore: undefined,
  }),
  reducers: {
    addPlayer: playersAdapter.addOne,
    addPlayers: playersAdapter.addMany,
    updatePlayer: playersAdapter.updateOne,
    upsertPlayers: playersAdapter.upsertMany,

    updatePlayerHand(state, action) {
      state.playerHand = action.payload;
    },

    removeCardFromHand(state, action) {
      const cardIndex = state.playerHand.findIndex((card: CardData) => {
        return card.id === action.payload.id;
      });
      const newHand = [...state.playerHand];
      newHand.splice(cardIndex, 1);
      state.playerHand = newHand;
    },
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

export function getPlayerHand(state: RootState) {
  return state.players.playerHand;
}

export function getClientPlayer(state: RootState) {
  const clientPlayerId = getClientPlayerId(state);
  return function (state: RootState) {
    return clientPlayerId ? selectById(state, clientPlayerId) : null;
  };
}

export const {
  addPlayer,
  addPlayers,
  removeCardFromHand,
  updatePlayer,
  updatePlayerHand,
  upsertPlayers,
} = playersSlice.actions;

export default playersSlice.reducer;
