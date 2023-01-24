import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CardData } from '../components/Card/Card';

export type GameState = {
  clientPlayerId: string | null;
  gameId: string | null;
  handCount: number;
  handIndex: number;
  playedCards: CardData[];
  totalBids: number;
};

const initialState: GameState = {
  clientPlayerId: null,
  gameId: null,
  handCount: 10,
  handIndex: 0,
  playedCards: [],
  totalBids: 0,
};

const fivePlayerHands = [
  10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

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
    incrementHandIndex(state) {
      state.handIndex += 1;
      updateHandCount();
    },
    updateHandCount(state) {
      state.handCount = fivePlayerHands[state.handIndex];
    },
    updateTotalBids(state, action) {
      state.totalBids =
        action.payload === 'reset'
          ? 0
          : state.totalBids + parseInt(action.payload);
    },
    updatePlayedCards(state, action) {
      state.playedCards = [...state.playedCards, action.payload];
    },
    resetPlayedCards(state) {
      state.playedCards = [];
    },
  },
});

export const {
  incrementHandIndex,
  resetPlayedCards,
  setClientPlayerId,
  setGameId,
  updateHandCount,
  updatePlayedCards,
  updateTotalBids,
} = gameSlice.actions;

export const getClientPlayerId = (state: RootState) =>
  state.game.clientPlayerId;
export const getGameId = (state: RootState) => state.game.gameId;
export const getHand = (state: RootState) => state.game.handCount;
export const getPlayedCards = (state: RootState) => state.game.playedCards;
export const getTotalBids = (state: RootState) => state.game.totalBids;

export default gameSlice.reducer;
