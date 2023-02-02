import { useAppSelector } from '../../redux/store';
import {
  getBooksBid,
  getBooksTaken,
  getPlayerInfo,
  getPlayerScore,
} from '../../redux/playerSlice';
import Avatar from '../Avatar/Avatar';
import BookCounter from '../BookCounter/BookCounter';
import Hand from '../Hand/Hand';
import { PlayerName } from '../Opponent/Opponent.styles';
import * as S from './Player.styles';

/* Player */
export default function Player() {
  const { playerAvatar, playerId, playerName } = useAppSelector(getPlayerInfo);
  const booksBid = useAppSelector(getBooksBid);
  const booksTaken = useAppSelector(getBooksTaken);
  const playerScore = useAppSelector(getPlayerScore);

  return (
    <S.Player>
      <S.PlayerStack>
        <Avatar playerAvatar={playerAvatar} playerName={playerName} />
        <PlayerName>{playerName}</PlayerName>
        <BookCounter booksBid={booksBid} booksTaken={booksTaken} />
        <S.PlayerScore>{playerScore}</S.PlayerScore>
      </S.PlayerStack>
      <Hand />
    </S.Player>
  );
}
/* */
