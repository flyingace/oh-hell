import Player from '../Player/Player';
import * as S from './Table.styles';

export type TableProps = {};

/* Table */
export default function Table(props: TableProps) {
  const {
    /* destructured props */
  } = props;

  function dealCards() {}

  return (
    <S.Table>
      <S.Opponents>
        <Player />
        <Player />
        <Player />
        <Player />
      </S.Opponents>
      <Player />
      <button onClick={dealCards}>Deal</button>
    </S.Table>
  );
}
/* */
/*
Player presses "Deal" button
Deck is shuffled
Each player is dealt hand of X cards where X is the current round
 */
