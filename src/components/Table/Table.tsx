import { useEffect, useState } from 'react';
import { getClientPlayerId } from 'redux/gameSlice';
import { getAllPlayers } from 'redux/playersSlice';
import { useAppSelector } from 'redux/store';
import PlayedCards from '../PlayedCards/PlayedCards';
import Player, { PlayerData } from '../Player/Player';
import Opponent from '../Opponent/Opponent';
import { dealCards, disconnectAll } from 'utils/socket-methods';
import * as S from './Table.styles';

/* Table */
export default function Table() {
  const allPlayers = useAppSelector(getAllPlayers);
  const clientPlayerId = useAppSelector(getClientPlayerId);
  const [orderedPlayers, setOrderedPlayers] = useState<PlayerData[]>([]);

  useEffect(() => {
    const startingIndex = allPlayers.findIndex(
      (player) => player.playerId === clientPlayerId
    );
    const reorderedPlayers = allPlayers.slice();
    reorderedPlayers.unshift(...reorderedPlayers.splice(startingIndex));
    setOrderedPlayers(reorderedPlayers);
  }, [allPlayers, clientPlayerId]);

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
      <Player
        booksBid={1}
        booksTaken={3}
        playerAvatar={orderedPlayers[0]?.playerAvatar}
        playerId="main-player"
        playerName={orderedPlayers[0]?.playerName}
        playerScore={87}
      />
      <PlayedCards />
      <button onClick={dealCards}>Deal</button>
      <button onClick={disconnectAll}>Disconnect All</button>
    </S.Table>
  );
}
/* */
