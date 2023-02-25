import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/store';
import { getActivePlayerId, getDealerId } from '../../redux/gameSlice';
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
  const activePlayerId = useAppSelector(getActivePlayerId);
  const dealerId = useAppSelector(getDealerId);
  const [isActivePlayer, setIsActivePlayer] = useState<boolean>(false);
  const [isDealer, setIsDealer] = useState<boolean>(false);

  useEffect(() => {
    setIsDealer(dealerId === playerId);
  }, [dealerId, playerId]);

  useEffect(() => {
    setIsActivePlayer(activePlayerId === playerId);
  }, [activePlayerId, playerId]);

  return (
    <S.Opponent>
      {isActivePlayer ? <p>It is your turn</p> : null}
      {isDealer ? <DealerButton /> : null}
      <Avatar playerAvatar={playerAvatar} playerName={playerName} />
      <S.PlayerName>{playerName}</S.PlayerName>
      <BookCounter booksBid={booksBid} booksTaken={booksTaken} />
      <S.PlayerScore>{playerScore}</S.PlayerScore>
    </S.Opponent>
  );
}
/* */
