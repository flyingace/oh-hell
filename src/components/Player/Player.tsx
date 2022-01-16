import Hand from '../Hand/Hand';
import { CardData } from '../Card/Card';
import * as S from './Player.styles';

export type PlayerData = {
  playerName: string;
  hand: CardData[];
};

/* Player */
export default function Player(props: PlayerData) {
  const {
    /* destructured props */
  } = props;

  return (
    <S.Player>
      <Hand />
    </S.Player>
  );
}
/* */
