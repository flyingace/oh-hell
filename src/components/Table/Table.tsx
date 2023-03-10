import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/store';
import { getGamePhase, getGamePlayers, getHandCount } from 'redux/gameSlice';
import { resetBooksBid, resetTotalBooksBid } from 'redux/handSlice';
import { getPlayerId } from 'redux/playerSlice';
import { resetPlayedCards } from 'redux/roundSlice';
import BidModal from '../BidModal/BidModal';
import Opponent, { OpponentData } from '../Opponent/Opponent';
import PlayedCards from '../PlayedCards/PlayedCards';
import Player from '../Player/Player';
import TrumpCard from '../TrumpCard/TrumpCard';
import { dealCards, disconnectAll, setDealer } from 'utils/socket-methods';
import { PlayerData } from 'types';
import * as S from './Table.styles';

/* Table */
export default function Table() {
  const dispatch = useDispatch();
  const gamePhase = useAppSelector(getGamePhase);
  const gamePlayers = useAppSelector(getGamePlayers);
  const handCount = useAppSelector(getHandCount);
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
    dispatch(resetBooksBid());
    dispatch(resetTotalBooksBid());
    disconnectAll();
    sessionStorage.clear();
  }

  return (
    <S.Table>
      <Opponents opponents={orderedPlayers} />
      <Player />
      <S.HandCounter>{handCount}</S.HandCounter>
      <TrumpCard />
      {gamePhase === 'bidding' ? (
        <BidModal players={orderedPlayers} playerId={playerId} />
      ) : null}
      <PlayedCards />
      <button onClick={dealCards}>Deal</button>
      <button onClick={setDealer}>Set Dealer</button>
      <button onClick={resetGame}>Reset Game</button>
    </S.Table>
  );
}
/* */

/* Opponents */
function Opponents({ opponents }: { opponents: OpponentData[] }) {
  return (
    <>
      {opponents.map(
        (
          {
            booksBid,
            booksTaken,
            playerAvatar,
            playerId,
            playerName,
            playerScore,
          },
          idx
        ) => {
          return idx !== 0 ? (
            <Opponent
              key={`${idx}-${playerName}`}
              booksBid={booksBid}
              booksTaken={booksTaken}
              playerAvatar={playerAvatar}
              playerId={playerId}
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
