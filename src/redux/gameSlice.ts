import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { PlayerData } from './playerSlice';

export type GameState = {
  allPlayers: PlayerData[];
  gameId: string | null;
  handCount: number;
  handIndex: number;
};

const initialGameState: GameState = {
  allPlayers: [],
  gameId: null,
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
    addPlayerToGame(state, action) {
      state.allPlayers.push(action.payload);
    },
    incrementHandIndex(state) {
      state.handIndex += 1;
      updateHandCount();
    },
    setGameId(state, action) {
      state.gameId = action.payload;
    },
    updateHandCount(state) {
      state.handCount = fivePlayerHands[state.handIndex];
    },
  },
});

export const {
  addPlayerToGame,
  incrementHandIndex,
  setGameId,
  updateHandCount,
} = gameSlice.actions;

export const getAllPlayers = (state: RootState) => state.game.allPlayers;
export const getGameId = (state: RootState) => state.game.gameId;
export const getHandCount = (state: RootState) => state.game.handCount;

export default gameSlice.reducer;
