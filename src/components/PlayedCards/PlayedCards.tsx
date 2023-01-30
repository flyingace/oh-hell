import { DragEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPlayedCards, updatePlayedCards } from 'redux/gameSlice';
import { removeCardFromHand } from 'redux/playersSlice';
import Card, { CardData } from '../Card/Card';
import * as S from './PlayedCards.styles';

/* PlayedCards */
export default function PlayedCards() {
  const dispatch = useAppDispatch();
  const playedCards = useAppSelector(getPlayedCards);

  function handleCardDrop(evt: DragEvent) {
    const cardData = JSON.parse(evt.dataTransfer.getData('text/plain'));
    addPlayedCardToPool(cardData);
    removeCardFromPlayersHand(cardData);
    return false;
  }

  function handleDragOver(evt: DragEvent) {
    evt.preventDefault();
  }

  function addPlayedCardToPool(cardData: CardData) {
    dispatch(updatePlayedCards(cardData));
  }

  function removeCardFromPlayersHand(cardData: CardData) {
    dispatch(removeCardFromHand(cardData));
  }

  function generatePlayedCards() {
    console.log('playedCards: ', playedCards);
    return playedCards.length > 0
      ? playedCards.map(({ id, name, suit, value }, idx) => {
          return name && suit && value ? (
            <Card
              draggable={false}
              id={id}
              name={name}
              suit={suit}
              value={value}
              key={`${name}${suit}${value}${idx}`}
            />
          ) : null;
        })
      : [];
  }

  return (
    <S.PlayedCards onDrop={handleCardDrop} onDragOver={handleDragOver}>
      {generatePlayedCards()}
    </S.PlayedCards>
  );
}
/* */
