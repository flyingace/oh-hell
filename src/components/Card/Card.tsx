import { DragEvent } from 'react';
import { CardData } from '../../types';
import * as S from './Card.styles';

/* Card */
export default function Card({
  draggable = false,
  metaData,
  name,
  suit,
  value,
}: CardData) {
  const src: string = `../../assets/deck/${name}${suit}.png`;

  function handleDragStart(evt: DragEvent) {
    if (draggable && metaData) {
      evt.dataTransfer.setData('text/plain', metaData);
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
