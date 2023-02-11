import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CardData, CardSuit } from '../components/Card/Card';

export type RoundState = {
  highCard: CardData | null;
  leaderId: string | null;
  ledSuit: CardSuit | null;
  playedCards: CardData[];
};

const initialRoundState: RoundState = {
  highCard: null,
  leaderId: null,
  ledSuit: null,
  playedCards: [],
};

const roundSlice = createSlice({
  name: 'round',
  initialState: initialRoundState,
  reducers: {
    setHighCard(state, action) {
      state.highCard = action.payload;
    },
    setLeaderId(state, action) {
      state.leaderId = action.payload;
    },
    setLedSuit(state, action) {
      state.ledSuit = action.payload;
    },
    resetPlayedCards(state) {
      state.playedCards = [];
    },
    updatePlayedCards(state, action) {
      state.playedCards = [...state.playedCards, action.payload];
    },
  },
});

export const {
  setHighCard,
  setLeaderId,
  setLedSuit,
  resetPlayedCards,
  updatePlayedCards,
} = roundSlice.actions;

export const getHighCard = (state: RootState) => state.round.highCard;
export const getLeaderId = (state: RootState) => state.round.leaderId;
export const getLedSuit = (state: RootState) => state.round.ledSuit;
export const getPlayedCards = (state: RootState) => state.round.playedCards;

export default roundSlice.reducer;
