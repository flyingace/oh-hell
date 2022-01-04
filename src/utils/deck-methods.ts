import { CardProps } from '../components/Card/Card';
import deck from '../deck.json';

/* Deck */
export default class Deck {
  constructor() {}

  shuffledDeck: CardProps[] = deck.slice(0);

  shuffle() {
    let m = this.shuffledDeck.length,
      t,
      i;

    // While there remain elements to shuffle…
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

  deal(noOfCards: number, noOfPlayers: number = 5) {
    const hands = [];
    for (var i = 0; i < noOfPlayers; i++) {
      const hand = [];
      for (var j = 0; j < noOfCards; j++) {
        hand.push(this.shuffledDeck[j * noOfPlayers + i]);
      }
      hands.push(hand);
    }
    return hands;
  }

  revealTrump() {}
}
/* */
