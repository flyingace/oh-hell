import { useEffect, useState } from 'react';
import Avatar from '../Avatar/Avatar';
import BookCounter from '../BookCounter/BookCounter';
import { CardData } from '../Card/Card';
import Hand from '../Hand/Hand';
import { PlayerName } from '../Opponent/Opponent.styles';
import socket from 'utils/socket-methods';
import * as S from './Player.styles';

export type PlayerData = {
  booksBid?: number;
  booksTaken?: number;
  playerAvatar: string;
  playerHand?: CardData[];
  playerId: string;
  playerName: string;
  playerOrder?: number;
  playerScore?: number;
};

/* Player */
export default function Player({
  playerAvatar,
  booksBid = 0,
  booksTaken = 0,
  playerName,
  playerScore,
}: PlayerData) {
  const [hand, updateHand] = useState<CardData[]>([]);

  useEffect(() => {
    socket.on('NEW_HAND', (newHand: CardData[]) => {
      updateHand(newHand);
    });
  }, []);

  return (
    <S.Player>
      <S.PlayerStack>
        <Avatar playerAvatar={playerAvatar} playerName={playerName} />
        <PlayerName>{playerName}</PlayerName>
        <BookCounter booksBid={booksBid} booksTaken={booksTaken} />
        <S.PlayerScore>{playerScore}</S.PlayerScore>
      </S.PlayerStack>
      <Hand hand={hand} />
    </S.Player>
  );
}
/* */
