import { DragEvent, ReactNode, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPlayedCards, updatePlayedCards } from 'redux/gameSlice';
import { removeCardFromHand } from 'redux/playersSlice';
import Card, { CardData } from '../Card/Card';
import * as S from './PlayedCards.styles';
import socket, { addCardToPool } from '../../utils/socket-methods';

/* PlayedCards */
export default function PlayedCards() {
  const [cardsInPool, updateCardsInPool] = useState<ReactNode[]>([]);
  const dispatch = useAppDispatch();
  const playedCards = useAppSelector(getPlayedCards);

  useEffect(() => {
    function cardAddedHandler(playedCard: CardData) {
      dispatch(updatePlayedCards(playedCard));
    }
    socket.on('ADD_PLAYED_CARD', cardAddedHandler);
    return () => {
      socket.off('ADD_PLAYED_CARD', cardAddedHandler);
    };
  }, [dispatch]);

  useEffect(() => {
    const pool =
      playedCards.length > 0
        ? playedCards.map(({ id, name, suit, value }, idx) => {
            return (
              <Card
                draggable={false}
                id={id}
                name={name}
                suit={suit}
                value={value}
                key={`${name}${suit}${value}${idx}`}
              />
            );
          })
        : [];
    updateCardsInPool(pool);
  }, [playedCards]);

  function handleCardDrop(evt: DragEvent) {
    const cardData = JSON.parse(evt.dataTransfer.getData('text/plain'));
    addCardToPool(cardData);
    removeCardFromPlayersHand(cardData);
    return false;
  }

  function handleDragOver(evt: DragEvent) {
    evt.preventDefault();
  }

  function removeCardFromPlayersHand(cardData: CardData) {
    dispatch(removeCardFromHand(cardData));
  }

  return (
    <S.PlayedCards onDrop={handleCardDrop} onDragOver={handleDragOver}>
      {cardsInPool}
    </S.PlayedCards>
  );
}
/* */
