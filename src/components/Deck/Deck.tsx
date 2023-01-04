import * as S from './Deck.styles';

export type DeckProps = {};

const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

/* Deck */
export default function Deck() {
  function generateDeck() {
    const deck = [];
    const allCards = suits.map((suit) => {});
  }

  function deal(noOfCards: number, noOfPlayers: number = 5) {}

  function revealTrump() {}

  return <S.Deck>This is the styled & stateless Deck component.</S.Deck>;
}
/* */
