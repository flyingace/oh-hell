import * as S from './Card.styles';

export type CardName =
  | 'Ace'
  | 'Two'
  | 'Three'
  | 'Four'
  | 'Five'
  | 'Six'
  | 'Seven'
  | 'Eight'
  | 'Nine'
  | 'Ten'
  | 'Jack'
  | 'Queen'
  | 'King';

export type CardSuit = 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades';

export type CardData = {
  name: CardName;
  suit: CardSuit;
  value: number;
};

/* Card */
export default function Card({ name, suit, value }: CardData) {
  const src: string = `../../assets/deck/${name}${suit}.png`;
  return <S.Card src={src} alt={`${value} of ${suit}`} />;
}
/* */
