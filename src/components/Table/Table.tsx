import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/store';
import { getAllPlayers, getHandCount } from 'redux/gameSlice';
import { resetPlayedCards } from 'redux/roundSlice';
import BidModal from '../BidModal/BidModal';
import Opponent from '../Opponent/Opponent';
import PlayedCards from '../PlayedCards/PlayedCards';
import Player from '../Player/Player';
import { dealCards, disconnectAll } from 'utils/socket-methods';
import { getPlayerId, PlayerData } from '../../redux/playerSlice';
import * as S from './Table.styles';

/* Table */
export default function Table() {
  const dispatch = useDispatch();
  const allPlayers = useAppSelector(getAllPlayers);
  const currentHand = useAppSelector(getHandCount);
  const playerId = useAppSelector(getPlayerId);
  const [orderedPlayers, setOrderedPlayers] = useState<PlayerData[]>([]);

  useEffect(() => {
    const startingIndex = allPlayers.findIndex(
      (player) => player.playerId === playerId
    );
    const reorderedPlayers = allPlayers.slice();
    reorderedPlayers.unshift(...reorderedPlayers.splice(startingIndex));
    setOrderedPlayers(reorderedPlayers);
  }, [allPlayers, playerId]);

  function resetGame() {
    dispatch(resetPlayedCards());
    disconnectAll();
    sessionStorage.clear();
  }

  return (
    <S.Table>
      <Opponent
        $positioning={'bottom: 300px; left: 280px;'}
        booksBid={3}
        booksTaken={4}
        playerAvatar={orderedPlayers[1]?.playerAvatar}
        playerName={orderedPlayers[1]?.playerName}
        playerScore={11}
      />
      <Opponent
        $positioning={'top: 150px; left: 350px;'}
        booksBid={0}
        booksTaken={1}
        playerAvatar={orderedPlayers[2]?.playerAvatar}
        playerName={orderedPlayers[2]?.playerName}
        playerScore={1}
      />
      <Opponent
        $positioning={'top: 150px; right: 350px;'}
        booksBid={2}
        booksTaken={3}
        playerAvatar={orderedPlayers[3]?.playerAvatar}
        playerName={orderedPlayers[3]?.playerName}
        playerScore={4}
      />
      <Opponent
        $positioning={'bottom: 300px; right: 280px;'}
        booksBid={10}
        booksTaken={6}
        playerAvatar={orderedPlayers[4]?.playerAvatar}
        playerName={orderedPlayers[4]?.playerName}
        playerScore={127}
      />
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
