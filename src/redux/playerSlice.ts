import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CardData } from '../components/Card/Card';

export type PlayerData = {
  booksBid: number;
  booksTaken: number;
  playerAvatar: string;
  playerHand: CardData[];
  playerId: string | null;
  playerName: string;
  playerScore: number;
};

const initialPlayerState: PlayerData = {
  booksBid: 0,
  booksTaken: 0,
  playerAvatar: '',
  playerHand: [],
  playerId: null,
  playerName: '',
  playerScore: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState: initialPlayerState,
  reducers: {
    addPlayer(state, action) {
      const { playerAvatar, playerId, playerName } = action.payload;
      state.playerAvatar = playerAvatar;
      state.playerId = playerId;
      state.playerName = playerName;
    },
    incrementBooksTaken(state) {
      state.booksTaken += 1;
    },
    removeCardFromHand(state, action) {
      const cardIndex = state.playerHand.findIndex((card: CardData) => {
        return card.id === action.payload.id;
      });
      const newHand = [...state.playerHand];
      newHand.splice(cardIndex, 1);
      state.playerHand = newHand;
    },
    resetBookData(state) {
      state.booksBid = 0;
      state.booksTaken = 0;
    },
    setBooksBid(state, action) {
      state.booksBid = action.payload;
    },
    updatePlayerHand(state, action) {
      state.playerHand = action.payload;
    },
  },
});

export const {
  addPlayer,
  incrementBooksTaken,
  removeCardFromHand,
  resetBookData,
  setBooksBid,
  updatePlayerHand,
} = playerSlice.actions;

export function getPlayerInfo(state: RootState) {
  return {
    playerAvatar: state.player.playerAvatar,
    playerId: state.player.playerId,
    playerName: state.player.playerName,
  };
}

export const getBooksBid = (state: RootState) => state.player.booksBid;
export const getBooksTaken = (state: RootState) => state.player.booksTaken;
export const getPlayerHand = (state: RootState) => state.player.playerHand;
export const getPlayerId = (state: RootState) => state.player.playerId;
export const getPlayerScore = (state: RootState) => state.player.playerScore;

export default playerSlice.reducer;
