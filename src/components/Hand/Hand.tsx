import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/store';
import { getPlayerHand, updatePlayerHand } from 'redux/playerSlice';
import { getLedSuit } from 'redux/roundSlice';
import Card from '../Card/Card';
import socket from 'utils/socket-methods';
import { CardData, CardSuit } from '../../types';
import * as S from './Hand.styles';

export type HandData = {
  isPlayerTurn: boolean;
  playerId: string | null;
};

/* Hand */
export default function Hand({ isPlayerTurn, playerId }: HandData) {
  const dispatch = useDispatch();
  const playerHand = useAppSelector(getPlayerHand);
  const ledSuit = useAppSelector(getLedSuit);

  useEffect(() => {
    socket.on('NEW_HAND', (newHand: CardData[]) => {
      dispatch(updatePlayerHand(newHand));
    });
    return () => {
      socket.off('NEW_HAND', (newHand: CardData[]) => {
        dispatch(updatePlayerHand(newHand));
      });
    };
  }, [dispatch]);

  function isCardPlayable(suit: CardSuit): boolean {
    // if it's not the Player's turn, return false
    if (!isPlayerTurn) {
      return false;
    }
    // if it is the Player's turn
    // AND no suit has been led yet
    // OR if the card matches the suit that has been led, return true
    if (!ledSuit || ledSuit === suit) {
      return true;
    }
    // if it is the Player's turn
    // AND the card does not match the suit that has been led
    // if the player has other cards that match the led suit, return false
    // if they have no cards that match the led suit, return true
    return !playerHand.some((card) => card.suit === ledSuit);
  }

  function createCardMetaData(card: CardData, playerId: string | null): string {
    return JSON.stringify({
      id: card.id,
      name: card.name,
      playerId: playerId,
      suit: card.suit,
      value: card.value,
    });
  }

  function getUpdatedHand() {
    return playerHand.map((card: CardData, idx) => {
      const isPlayable = isCardPlayable(card.suit);
      const cardMetaData = createCardMetaData(card, playerId);
      return (
        <Card
          {...card}
          draggable={isPlayable}
          key={`card${idx}`}
          metaData={cardMetaData}
        />
      );
    });
  }

  return <S.Hand>{getUpdatedHand()}</S.Hand>;
}
/* */
