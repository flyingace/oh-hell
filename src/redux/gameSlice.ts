import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export type GameState = {
  clientPlayerId: string | null;
  gameId: string | null;
  hand: number;
  totalBids: number;
};

const initialState: GameState = {
  clientPlayerId: null,
  gameId: null,
  hand: 10,
  totalBids: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setClientPlayerId(state, action) {
      state.clientPlayerId = action.payload;
    },
    setGameId(state, action) {
      state.gameId = action.payload;
    },
    incrementHand(state) {
      state.hand = (state.hand > 1) ? state.hand - 1 : state.hand + 1;
    },
    updateTotalBids(state, action) {
      state.totalBids = (action.payload === 'reset') ? 0 : (state.totalBids + parseInt(action.payload));
    },
  },
});

export const {
  incrementHand,
  setClientPlayerId,
  setGameId,
  updateTotalBids,
} = gameSlice.actions;

export const getClientPlayerId = (state: RootState) => state.game.clientPlayerId;
export const getGameId = (state: RootState) => state.game.gameId;
export const getHand = (state: RootState) => state.game.hand;
export const getTotalBids = (state: RootState) => state.game.totalBids;


export default gameSlice.reducer;
