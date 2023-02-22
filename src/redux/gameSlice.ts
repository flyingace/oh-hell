import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { GameState } from '../types';
import { getNextPlayerId, getRandomInteger } from '../utils/utils';

const initialGameState: GameState = {
  dealerId: null,
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
    updateBidder(state) {
      // first bidder is player after dealer
      // then next bidder
    },
    updateDealer(state) {
      let nextDealerId;
      if (state.dealerId) {
        nextDealerId = getNextPlayerId(state.dealerId, state.gamePlayers);
      } else {
        const firstDealerIndex = getRandomInteger(
          0,
          state.gamePlayers.length - 1
        );
        nextDealerId = state.gamePlayers[firstDealerIndex].playerId;
      }
      state.dealerId = nextDealerId;
    },
    setDealerId(state, action) {
      state.dealerId = action.payload;
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
  setDealerId,
  setGameId,
  updateGamePlayers,
  updateHandCount,
  updateDealer,
} = gameSlice.actions;

export const getDealerId = (state: RootState) => state.game.dealerId;
export const getGamePlayers = (state: RootState) => state.game.gamePlayers;
export const getGameId = (state: RootState) => state.game.gameId;
export const getHandCount = (state: RootState) => state.game.handCount;

export default gameSlice.reducer;
