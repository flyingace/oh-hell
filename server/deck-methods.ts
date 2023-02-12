import deck from './deck.json';

export type CardData = {
  id: number;
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

function generateHands(
  shuffledDeck: CardData[],
  noOfCards: number,
  noOfPlayers: number
) {
  const hands: CardData[][] = [[], [], [], [], []];
  for (let i = 0; i < noOfPlayers; i++) {
    for (let j = 0; j < noOfCards; j++) {
      hands[i].push(shuffledDeck[j * noOfPlayers + i]);
    }
  }
  return hands;
}

export function getHandsAndTrump(
  noOfCards: number = 1,
  noOfPlayers: number = 5
) {
  const deck = shuffleDeck();
  const hands = generateHands(deck, noOfCards, noOfPlayers);
  const trumpCard = deck[noOfCards * noOfPlayers];
  return { hands: hands, trumpCard: trumpCard };
}
