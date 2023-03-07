import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { GameState } from '../types';

const initialGameState: GameState = {
  activePlayerId: null,
  dealerId: null,
  gameId: null,
  gamePhase: 'bidding',
  gamePlayers: [],
  handCount: 10,
  handIndex: 0,
};

const fivePlayerHands = [
  10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    incrementHandIndex(state) {
      state.handIndex += 1;
      updateHandCount();
    },
    setActivePlayerId(state, action) {
      state.activePlayerId = action.payload;
    },
    setDealerId(state, action) {
      state.dealerId = action.payload;
    },
    setGameId(state, action) {
      state.gameId = action.payload;
    },
    setGamePhase(state, action) {
      state.gamePhase = action.payload;
    },
    updateGamePlayers(state, action) {
      state.gamePlayers = action.payload;
    },
    updateHandCount(state) {
      state.handCount = fivePlayerHands[state.handIndex];
    },
  },
});

export const {
  incrementHandIndex,
  setActivePlayerId,
  setDealerId,
  setGameId,
  setGamePhase,
  updateGamePlayers,
  updateHandCount,
} = gameSlice.actions;

export const getActivePlayerId = (state: RootState) =>
  state.game.activePlayerId;
export const getDealerId = (state: RootState) => state.game.dealerId;
export const getGameId = (state: RootState) => state.game.gameId;
export const getGamePhase = (state: RootState) => state.game.gamePhase;
export const getGamePlayers = (state: RootState) => state.game.gamePlayers;
export const getHandCount = (state: RootState) => state.game.handCount;

export default gameSlice.reducer;
