import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { PlayerData } from './playerSlice';

export type GameState = {
  gamePlayers: PlayerData[];
  gameId: string | null;
  handCount: number;
  handIndex: number;
};

const initialGameState: GameState = {
  gameId: null,
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
    setGameId(state, action) {
      state.gameId = action.payload;
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
  setGameId,
  updateGamePlayers,
  updateHandCount,
} = gameSlice.actions;

export const getGamePlayers = (state: RootState) => state.game.gamePlayers;
export const getGameId = (state: RootState) => state.game.gameId;
export const getHandCount = (state: RootState) => state.game.handCount;

export default gameSlice.reducer;
