import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CardData, CardSuit } from '../components/Card/Card';

export type HandState = {
  dealerId: string | null;
  totalBids: number;
  trumpSuit: string | null;
};

const initialHandState: HandState = {
  dealerId: null,
  totalBids: 0,
  trumpSuit: null,
};

const handSlice = createSlice({
  name: 'hand',
  initialState: initialHandState,
  reducers: {
    setDealerId(state, action) {
      state.dealerId = action.payload;
    },
    setTrumpSuit(state, action) {
      state.trumpSuit = action.payload;
    },
    updateTotalBids(state, action) {
      state.totalBids += action.payload;
    },
  },
});

export const { setDealerId, setTrumpSuit, updateTotalBids } = handSlice.actions;

export const getDealerId = (state: RootState) => state.hand.dealerId;
export const getTotalBids = (state: RootState) => state.hand.totalBids;
export const getTrumpSuit = (state: RootState) => state.hand.trumpSuit;

export default handSlice.reducer;
