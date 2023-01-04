import Avatar from '../Avatar/Avatar';
import BookCounter from '../BookCounter/BookCounter';
import * as S from './Opponent.styles';

export type OpponentProps = {
  $positioning: string;
  booksBid: number;
  booksTaken: number;
  playerAvatar?: string;
  playerName: string;
  playerScore: number;
};

/* Opponent */
export default function Opponent({
  $positioning,
  booksBid,
  booksTaken,
  playerAvatar,
  playerName,
  playerScore,
}: OpponentProps) {
  return (
    <S.Opponent $positioning={$positioning}>
      <Avatar playerAvatar={playerAvatar} playerName={playerName} />
      <S.PlayerName>{playerName}</S.PlayerName>
      <BookCounter booksBid={booksBid} booksTaken={booksTaken} />
      <S.PlayerScore>{playerScore}</S.PlayerScore>
    </S.Opponent>
  );
}
/* */
