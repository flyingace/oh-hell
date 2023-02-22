import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/store';
import { getDealerId } from '../../redux/gameSlice';
import { getCurrentPlayerId } from '../../redux/roundSlice';
import Avatar from '../Avatar/Avatar';
import BookCounter from '../BookCounter/BookCounter';
import DealerButton from '../DealerButton/DealerButton';
import { PlayerData } from '../../types';
import * as S from './Opponent.styles';

export type OpponentData = Omit<PlayerData, 'playerHand'>;

/* Opponent */
export default function Opponent({
  booksBid,
  booksTaken,
  playerAvatar,
  playerId,
  playerName,
  playerScore,
}: OpponentData) {
  const currentPlayerId = useAppSelector(getCurrentPlayerId);
  const dealerId = useAppSelector(getDealerId);
  const [isCurrentPlayer, setIsCurrentPlayer] = useState<boolean>(false);
  const [isDealer, setIsDealer] = useState<boolean>(false);

  useEffect(() => {
    setIsDealer(dealerId === playerId);
  }, [dealerId, playerId]);

  useEffect(() => {
    setIsCurrentPlayer(currentPlayerId === playerId);
  }, [currentPlayerId, playerId]);

  return (
    <S.Opponent>
      {isCurrentPlayer ? <p>It is your turn</p> : null}
      {isDealer ? <DealerButton /> : null}
      <Avatar playerAvatar={playerAvatar} playerName={playerName} />
      <S.PlayerName>{playerName}</S.PlayerName>
      <BookCounter booksBid={booksBid} booksTaken={booksTaken} />
      <S.PlayerScore>{playerScore}</S.PlayerScore>
    </S.Opponent>
  );
}
/* */
