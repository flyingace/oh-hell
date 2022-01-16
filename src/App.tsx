import React from 'react';
import Deck from './utils/deck-methods';
import Table from './components/Table/Table';
import './App.css';

function App() {
  const deck = new Deck();
  deck.shuffle();
  const hands = deck.deal(4);
  console.log(hands);

  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default App;
