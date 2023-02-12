import React, { useEffect } from 'react';
import { useAppDispatch } from './redux/store';
import { updateGamePlayers } from './redux/gameSlice';
import { setHandTrumpCard } from './redux/handSlice';
import { PlayerData } from './redux/playerSlice';
import SignIn from './components/SignIn/SignIn';
import Table from './components/Table/Table';
import socket from './utils/socket-methods';
import { CardData } from './components/Card/Card';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function updatePlayers(playerData: PlayerData[]) {
      dispatch(updateGamePlayers(playerData));
    }
    socket.on('UPDATE_PLAYERS', updatePlayers);

    return () => {
      socket.off('UPDATE_PLAYERS', updatePlayers);
    };
  }, [dispatch]);

  useEffect(() => {
    function setTrumpCard(trumpCard: CardData) {
      dispatch(setHandTrumpCard(trumpCard));
    }
    socket.on('SET_TRUMP_CARD', setTrumpCard);

    return () => {
      socket.off('SET_TRUMP_CARD', setTrumpCard);
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
