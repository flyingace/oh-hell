import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CardData } from '../types';

export type HandState = {
  booksBid: PlayerBid[];
  totalBooksBid: number;
  trumpCard: CardData | null;
};

export type PlayerBid = { bid: string; playerId: string };

const initialHandState: HandState = {
  booksBid: [],
  totalBooksBid: 0,
  trumpCard: null,
};

const handSlice = createSlice({
  name: 'hand',
  initialState: initialHandState,
  reducers: {
    resetBooksBid(state) {
      state.booksBid = [];
    },
    resetTotalBooksBid(state) {
      state.totalBooksBid = 0;
    },
    setHandTrumpCard(state, action) {
      state.trumpCard = action.payload;
    },
    updateBooksBid(state, action) {
      state.booksBid.push(action.payload);
    },
    updateBidTotals(state) {
      state.totalBooksBid = [...state.booksBid].reduce(
        (summedBids, currentBid) => {
          return summedBids + parseInt(currentBid.bid, 10);
        },
        0
      );
    },
  },
});

export const {
  resetTotalBooksBid,
  setHandTrumpCard,
  updateBooksBid,
  updateBidTotals,
} = handSlice.actions;

export const getBooksBid = (state: RootState) => state.hand.booksBid;
export const getBooksBidByPlayerId = (bidderId: string | null) => {
  return function (state: RootState) {
    return bidderId
      ? state.hand.booksBid.find(({ playerId }: PlayerBid) => {
          return bidderId === playerId;
        })?.bid ?? 0
      : 0;
  };
};
export const getBidCount = (state: RootState) => state.hand.booksBid.length;
export const getBidTotals = (state: RootState) => state.hand.totalBooksBid;
export const getTrumpCard = (state: RootState) => state.hand.trumpCard;
export const getTrumpSuit = (state: RootState) => state.hand.trumpCard?.suit;

export default handSlice.reducer;
