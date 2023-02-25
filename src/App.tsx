import React from 'react';
import { useAppDispatch } from './redux/store';
import {
  setActivePlayerId,
  setDealerId,
  updateGamePlayers,
} from './redux/gameSlice';
import { setHandTrumpCard } from './redux/handSlice';
import SignIn from './components/SignIn/SignIn';
import Table from './components/Table/Table';
import socket from './utils/socket-methods';
import { CardData, PlayerData } from './types';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  function handleSocketEvent(eventType: string, args: any): void {
    switch (eventType) {
      case 'UPDATE_ACTIVE_PLAYER':
        dispatch(setActivePlayerId(args as string));
        break;
      case 'UPDATE_PLAYERS':
        dispatch(updateGamePlayers(args as PlayerData[]));
        break;
      case 'SET_TRUMP_CARD':
        dispatch(setHandTrumpCard(args as CardData));
        break;
      case 'UPDATE_DEALER':
        dispatch(setDealerId(args as string));
    }
  }

  socket.onAny((evt, args) => {
    handleSocketEvent(evt, args);
  });

  return (
    <div className="App">
      <SignIn />
      <Table />
    </div>
  );
}

export default App;
