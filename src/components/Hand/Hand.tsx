import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/store';
import { getPlayerHand, updatePlayerHand } from 'redux/playersSlice';
import Card, { CardData } from '../Card/Card';
import socket from 'utils/socket-methods';
import * as S from './Hand.styles';

export type HandData = {};

/* Hand */
export default function Hand() {
  const dispatch = useDispatch();
  const playerHand = useAppSelector(getPlayerHand);
  const [hand, setHand] = useState<JSX.Element[]>([]);

  useEffect(() => {
    socket.on('NEW_HAND', (newHand: CardData[]) => {
      dispatch(updatePlayerHand(newHand));
    });
  }, [dispatch]);

  useEffect(() => {
    const handOfCards = playerHand.map((card: CardData, idx: number) => (
      <Card {...card} draggable={true} key={`card${idx}`} />
    ));
    setHand(handOfCards);
  }, [playerHand]);

  return <S.Hand>{hand}</S.Hand>;
}
/* */
