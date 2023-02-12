import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/store';
import { getGamePlayers, getHandCount } from 'redux/gameSlice';
import { resetPlayedCards } from 'redux/roundSlice';
import BidModal from '../BidModal/BidModal';
import Opponent, { OpponentProps } from '../Opponent/Opponent';
import PlayedCards from '../PlayedCards/PlayedCards';
import Player from '../Player/Player';
import { dealCards, disconnectAll } from 'utils/socket-methods';
import { getPlayerId, PlayerData } from '../../redux/playerSlice';
import * as S from './Table.styles';

/* Table */
export default function Table() {
  const dispatch = useDispatch();
  const gamePlayers = useAppSelector(getGamePlayers);
  const currentHand = useAppSelector(getHandCount);
  const playerId = useAppSelector(getPlayerId);
  const [orderedPlayers, setOrderedPlayers] = useState<PlayerData[]>([]);

  useEffect(() => {
    const startingIndex = gamePlayers.findIndex(
      (player) => player.playerId === playerId
    );
    const reorderedPlayers = gamePlayers.slice();
    reorderedPlayers.unshift(...reorderedPlayers.splice(startingIndex));
    setOrderedPlayers(reorderedPlayers);
  }, [gamePlayers, playerId]);

  function resetGame() {
    dispatch(resetPlayedCards());
    disconnectAll();
    sessionStorage.clear();
  }

  return (
    <S.Table>
      <Opponents opponents={orderedPlayers} />
      <Player />
      <S.HandCounter>{currentHand}</S.HandCounter>
      <BidModal />
      <PlayedCards />
      <button onClick={dealCards}>Deal</button>
      <button onClick={resetGame}>Reset Game</button>
    </S.Table>
  );
}
/* */

/* Opponents */
function Opponents({ opponents }: { opponents: OpponentProps[] }) {
  return (
    <>
      {opponents.map(
        (
          { booksBid, booksTaken, playerAvatar, playerName, playerScore },
          idx
        ) => {
          return idx !== 0 ? (
            <Opponent
              key={`${idx}-${playerName}`}
              booksBid={booksBid}
              booksTaken={booksTaken}
              playerAvatar={playerAvatar}
              playerName={playerName}
              playerScore={playerScore}
            />
          ) : null;
        }
      )}
    </>
  );
}
/* */
