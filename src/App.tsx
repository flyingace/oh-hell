import React, { useEffect } from 'react';
import { useAppDispatch } from './redux/store';
import { addPlayerToGame, updateGamePlayers } from './redux/gameSlice';
import { PlayerData } from './redux/playerSlice';
import SignIn from './components/SignIn/SignIn';
import Table from './components/Table/Table';
import socket from './utils/socket-methods';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function addNewPlayer(playerData: PlayerData) {
      dispatch(addPlayerToGame(playerData));
    }
    socket.on('ADD_PLAYER', addNewPlayer);

    return () => {
      socket.off('ADD_PLAYER', addNewPlayer);
    };
  }, [dispatch]);

  useEffect(() => {
    function updatePlayers(playerData: PlayerData[]) {
      dispatch(updateGamePlayers(playerData));
    }
    socket.on('UPDATE_PLAYERS', updatePlayers);

    return () => {
      socket.off('UPDATE_PLAYERS', updatePlayers);
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
