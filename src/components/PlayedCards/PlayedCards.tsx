import { DragEvent, ReactNode, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { removeCardFromHand } from 'redux/playerSlice';
import {
  getLedSuit,
  getPlayedCards,
  resetPlayedCards,
  setLedSuit,
  updatePlayedCards,
} from 'redux/roundSlice';
import Card from '../Card/Card';
import socket, {
  addCardToPool,
  advanceActivePlayer,
  setActivePlayer,
} from '../../utils/socket-methods';
import { CardData, CardMetaData } from '../../types';
import * as S from './PlayedCards.styles';
import { getTrumpSuit } from '../../redux/handSlice';
import { setActivePlayerId } from '../../redux/gameSlice';

/* PlayedCards */
export default function PlayedCards() {
  const [cardsInPool, updateCardsInPool] = useState<ReactNode[]>([]);
  const dispatch = useAppDispatch();
  const ledSuit = useAppSelector(getLedSuit);
  const trumpSuit = useAppSelector(getTrumpSuit);
  const playedCards = useAppSelector(getPlayedCards);

  useEffect(() => {
    function getRoundWinnerId() {
      const highCardValue = Math.max(
        ...playedCards.map((playedCard) => playedCard.value)
      );
      return playedCards.find((card) => card.value === highCardValue)?.playerId;
    }
    // look at all cards
    // find the card with the highest value
    // assign a value to cards
    // cards not matching led suit or trump are 0
    // a card

    if (playedCards.length === 1) {
      // set the value of the led suit
      dispatch(setLedSuit(playedCards[0].suit));
      advanceActivePlayer();
    } else if (playedCards.length === 5) {
      const winnerId = getRoundWinnerId(); // determine who won the book
      dispatch(resetPlayedCards());
      if (winnerId) {
        setActivePlayer(winnerId);
      }
      // update the number of books taken and by whom for the round
      // end the round
      // set the active player to the book taker
    } else {
      advanceActivePlayer();
    }
  }, [dispatch, ledSuit, playedCards, trumpSuit]);

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

  function updateCardValue(cardData: CardMetaData): CardMetaData {
    let cardValue = 0;
    if (cardData.suit === ledSuit) {
      cardValue = cardData.value;
    }
    if (cardData.suit === trumpSuit) {
      cardValue = cardData.value + 13;
    }
    return { ...cardData, value: cardValue };
  }

  function handleCardDrop(evt: DragEvent) {
    const cardData = JSON.parse(evt.dataTransfer.getData('text/plain'));
    const updatedCard = updateCardValue(cardData);
    addCardToPool(updatedCard);
    removeCardFromPlayersHand(updatedCard);
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
