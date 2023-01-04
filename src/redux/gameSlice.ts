import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export type GameState = {
  clientPlayerId: string | null;
  gameId: string | null;
};

const initialState: GameState = {
  clientPlayerId: null,
  gameId: null,
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
  },
});

export const { setClientPlayerId, setGameId } = gameSlice.actions;

export const getClientPlayerId = (state: RootState) => {
  return state.game.clientPlayerId;
};

export const getGameId = (state: RootState) => state.game.gameId;

export default gameSlice.reducer;
