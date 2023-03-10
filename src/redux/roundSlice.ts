import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CardData, CardMetaData, CardSuit } from '../types';

export type RoundState = {
  activePlayerId: string | null;
  leaderId: string | null;
  ledSuit: CardSuit | null;
  playedCards: CardMetaData[];
};

const initialRoundState: RoundState = {
  activePlayerId: null,
  leaderId: null,
  ledSuit: null,
  playedCards: [],
};

const roundSlice = createSlice({
  name: 'round',
  initialState: initialRoundState,
  reducers: {
    resetPlayedCards(state) {
      state.playedCards = [];
    },
    setLeaderId(state, action) {
      state.leaderId = action.payload;
    },
    setLedSuit(state, action) {
      state.ledSuit = action.payload;
    },
    updatePlayedCards(state, action) {
      state.playedCards = [...state.playedCards, action.payload];
    },
  },
});

export const { resetPlayedCards, setLeaderId, setLedSuit, updatePlayedCards } =
  roundSlice.actions;

export const getLeaderId = (state: RootState) => state.round.leaderId;
export const getLedSuit = (state: RootState) => state.round.ledSuit;
export const getPlayedCards = (state: RootState) => state.round.playedCards;

export default roundSlice.reducer;
