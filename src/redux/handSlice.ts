import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CardData } from '../components/Card/Card';

export type HandState = {
  dealerId: string | null;
  totalBids: number;
  trumpCard: CardData | null;
};

const initialHandState: HandState = {
  dealerId: null,
  totalBids: 0,
  trumpCard: null,
};

const handSlice = createSlice({
  name: 'hand',
  initialState: initialHandState,
  reducers: {
    setDealerId(state, action) {
      state.dealerId = action.payload;
    },
    setHandTrumpCard(state, action) {
      state.trumpCard = action.payload;
    },
    updateTotalBids(state, action) {
      state.totalBids += action.payload;
    },
  },
});

export const { setDealerId, setHandTrumpCard, updateTotalBids } =
  handSlice.actions;

export const getDealerId = (state: RootState) => state.hand.dealerId;
export const getTotalBids = (state: RootState) => state.hand.totalBids;
export const getTrumpCard = (state: RootState) => state.hand.trumpCard;
export const getTrumpSuit = (state: RootState) => state.hand.trumpCard?.suit;

export default handSlice.reducer;
