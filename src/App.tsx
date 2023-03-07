import React, { useEffect } from 'react';
import { useAppDispatch } from './redux/store';
import {
  setActivePlayerId,
  setDealerId,
  setGamePhase,
  updateGamePlayers,
} from './redux/gameSlice';
import {
  PlayerBid,
  setHandTrumpCard,
  updateBooksBid,
  updateBidTotals,
} from './redux/handSlice';
import SignIn from './components/SignIn/SignIn';
import Table from './components/Table/Table';
import socket from './utils/socket-methods';
import { CardData, GamePhase, PlayerData } from './types';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function handleSocketEvent(eventType: string, args: any): void {
      switch (eventType) {
        case 'BID_SUBMITTED':
          dispatch(updateBooksBid(args as PlayerBid));
          dispatch(updateBidTotals());
          break;
        case 'UPDATE_ACTIVE_PLAYER':
          dispatch(setActivePlayerId(args as string));
          break;
        case 'UPDATE_GAME_PHASE':
          dispatch(setGamePhase(args as GamePhase));
          break;
        case 'UPDATE_PLAYERS':
          dispatch(updateGamePlayers(args as PlayerData[]));
          break;
        case 'SET_TRUMP_CARD':
          dispatch(setHandTrumpCard(args as CardData));
          break;
        case 'UPDATE_DEALER':
          dispatch(setDealerId(args as string));
          break;
      }
    }

    socket.onAny(handleSocketEvent);
    return () => {
      socket.offAny(handleSocketEvent);
    };
  }, [dispatch]);

  return (
    <div className="App">
      <SignIn />
      <Table />
    </div>
  );
}

export default App;
