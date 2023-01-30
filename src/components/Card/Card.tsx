import { DragEvent } from 'react';
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
  draggable?: boolean;
  id: number;
  name: CardName;
  suit: CardSuit;
  value: number;
};

/* Card */
export default function Card({
  draggable = false,
  id,
  name,
  suit,
  value,
}: CardData) {
  const src: string = `../../assets/deck/${name}${suit}.png`;

  function handleDragStart(evt: DragEvent) {
    if (draggable) {
      evt.dataTransfer.setData(
        'text/plain',
        JSON.stringify({ id: id, name: name, suit: suit, value: value })
      );
    }
  }

  function handleDragEnd() {
    // if (dragEndHandler) {
    //   dragEndHandler();
    // }
  }

  return (
    <S.Card
      draggable={draggable}
      src={src}
      alt={`${value} of ${suit}`}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    />
  );
}
/* */
