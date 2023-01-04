import React, { useEffect } from 'react';
import { upsertPlayers } from './redux/playersSlice';
import { useAppDispatch } from './redux/store';
import { PlayerData } from './components/Player/Player';
import SignIn from './components/SignIn/SignIn';
import Table from './components/Table/Table';
import socket from './utils/socket-methods';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('UPDATE_PLAYERS', (playersData: PlayerData[]) => {
      dispatch(upsertPlayers(playersData));
    });

    return () => {
      socket.off('UPDATE_PLAYERS');
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
