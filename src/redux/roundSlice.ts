import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CardData, CardSuit } from '../types';

export type RoundState = {
  activePlayerId: string | null;
  highCard: CardData | null;
  leaderId: string | null;
  ledSuit: CardSuit | null;
  playedCards: CardData[];
};

const initialRoundState: RoundState = {
  activePlayerId: null,
  highCard: null,
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
    setHighCard(state, action) {
      state.highCard = action.payload;
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

export const {
  resetPlayedCards,
  setHighCard,
  setLeaderId,
  setLedSuit,
  updatePlayedCards,
} = roundSlice.actions;

export const getHighCard = (state: RootState) => state.round.highCard;
export const getLeaderId = (state: RootState) => state.round.leaderId;
export const getLedSuit = (state: RootState) => state.round.ledSuit;
export const getPlayedCards = (state: RootState) => state.round.playedCards;

export default roundSlice.reducer;
