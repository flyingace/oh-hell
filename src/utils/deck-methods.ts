import { CardData } from '../components/Card/Card';
import deck from '../deck.json';

/* Deck */
export default class Deck {
  shuffledDeck: CardData[] = deck.slice(0);

  shuffle() {
    let m = this.shuffledDeck.length,
      t,
      i;

    // While there remain elements to shuffleDeck…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = this.shuffledDeck[m];
      this.shuffledDeck[m] = this.shuffledDeck[i];
      this.shuffledDeck[i] = t;
    }

    return this.shuffledDeck;
  }

  revealTrump() {}
}
/* */

export const shuffle = (deck: CardData[]) => {
  let m = deck.length,
    t,
    i;

  // While there remain elements to shuffleDeck…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = deck[m];
    deck[m] = deck[i];
    deck[i] = t;
  }

  return deck;
};

export const deal = (
  deck: CardData[],
  noOfCards: number = 1,
  noOfPlayers: number = 5
) => {
  const hands: CardData[][] = [[], [], [], [], []];
  for (let i = 0; i < noOfPlayers; i++) {
    for (let j = 0; j < noOfCards; j++) {
      hands[i].push(deck[j * noOfPlayers + i]);
    }
  }
  return hands;
};

export const revealTrump = () => {};
