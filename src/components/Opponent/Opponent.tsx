import { useAppSelector } from 'redux/store';
import { getActivePlayerId, getDealerId } from 'redux/gameSlice';
import Avatar from '../Avatar/Avatar';
import BookCounter from '../BookCounter/BookCounter';
import DealerButton from '../DealerButton/DealerButton';
import { PlayerData } from 'types';
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
  console.log(playerName, playerId, activePlayerId);

  const isActivePlayer = playerId === activePlayerId;
  const isDealer = playerId === dealerId;

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
