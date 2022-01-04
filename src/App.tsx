import React from 'react';
import logo from './logo.svg';
import './App.css';
import Deck from './utils/deck-methods';

function App() {
  const deck = new Deck();
  deck.shuffle();
  console.log(deck.deal(4));
  console.log(deck);

  return <div className="App"></div>;
}

export default App;
