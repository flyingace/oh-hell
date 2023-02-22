import { DragEvent } from 'react';
import { CardData } from '../../types';
import * as S from './Card.styles';

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
      $isDraggable={draggable}
      draggable={draggable}
      src={src}
      alt={`${value} of ${suit}`}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    />
  );
}
/* */
