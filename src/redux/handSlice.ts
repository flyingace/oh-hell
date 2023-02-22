import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CardData } from '../types';

export type HandState = {
  totalBids: number;
  trumpCard: CardData | null;
};

const initialHandState: HandState = {
  totalBids: 0,
  trumpCard: null,
};

const handSlice = createSlice({
  name: 'hand',
  initialState: initialHandState,
  reducers: {
    setHandTrumpCard(state, action) {
      state.trumpCard = action.payload;
    },
    updateTotalBids(state, action) {
      state.totalBids += action.payload;
    },
  },
});

export const { setHandTrumpCard, updateTotalBids } = handSlice.actions;

export const getTotalBids = (state: RootState) => state.hand.totalBids;
export const getTrumpCard = (state: RootState) => state.hand.trumpCard;
export const getTrumpSuit = (state: RootState) => state.hand.trumpCard?.suit;

export default handSlice.reducer;
