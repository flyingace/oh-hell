import deck from './deck.json';

export type CardData = {
  name: string;
  suit: string;
  value: number;
};

const shuffleDeck = () => {
  const deckToShuffle = deck.slice(0);
  let m = deckToShuffle.length,
    t,
    i;

  // While there remain elements to shuffleDeck…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = deckToShuffle[m];
    deckToShuffle[m] = deckToShuffle[i];
    deckToShuffle[i] = t;
  }

  return deckToShuffle;
};

export function generateHands(noOfCards: number = 1, noOfPlayers: number = 5) {
  const shuffledDeck = shuffleDeck();
  const hands: CardData[][] = [[], [], [], [], []];
  for (let i = 0; i < noOfPlayers; i++) {
    for (let j = 0; j < noOfCards; j++) {
      hands[i].push(shuffledDeck[j * noOfPlayers + i]);
    }
  }
  return hands;
}

export const revealTrump = () => {};
