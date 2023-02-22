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
};

/* Hand */
export default function Hand({ isPlayerTurn }: HandData) {
  const dispatch = useDispatch();
  const playerHand = useAppSelector(getPlayerHand);
  const ledSuit = useAppSelector(getLedSuit);
  const [cardsInHand, setCardsInHand] = useState<ReactNode[]>([]);

  useEffect(() => {
    socket.on('NEW_HAND', (newHand: CardData[]) => {
      dispatch(updatePlayerHand(newHand));
    });
  }, [dispatch]);

  useEffect(() => {
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

    const updatedHand = playerHand.map((card: CardData, idx) => {
      const isPlayable = isCardPlayable(card.suit);
      return <Card {...card} draggable={isPlayable} key={`card${idx}`} />;
    });

    setCardsInHand(updatedHand);
  }, [isPlayerTurn, ledSuit, playerHand]);

  return <S.Hand>{cardsInHand}</S.Hand>;
}
/* */
