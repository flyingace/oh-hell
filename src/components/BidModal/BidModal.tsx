import { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/store';
import {
  getActivePlayerId,
  getDealerId,
  getHandCount,
  setGamePhase,
} from 'redux/gameSlice';
import {
  getBooksBidByPlayerId,
  getBidTotals,
  getBooksBid,
} from 'redux/handSlice';
import { setActivePlayer, submitBid } from 'utils/socket-methods';
import { PlayerData } from 'types';
import * as S from './BidModal.styles';

/* BidModal */
export default function BidModal({
  playerId,
  players,
}: {
  playerId: string | null;
  players: PlayerData[];
}) {
  const dispatch = useDispatch();
  const activePlayerId = useAppSelector(getActivePlayerId);
  const bidTotals = useAppSelector(getBidTotals);
  const booksBid = useAppSelector(getBooksBid);
  const currentHand = useAppSelector(getHandCount);
  const dealerId = useAppSelector(getDealerId);
  const playerIsDealer = false;
  const [playersOrderedByBidder, setPlayersOrderedByBidder] = useState<
    PlayerData[]
  >([]);

  const isActivePlayer = playerId === activePlayerId;

  useEffect(() => {
    function getHighestBidderId() {
      const highBid =
        Math.max(...booksBid.map((bidInfo) => parseInt(bidInfo.bid, 10))) ?? 0;
      return booksBid.find((bidInfo) => parseInt(bidInfo.bid, 10) === highBid)
        ?.playerId;
    }

    if (booksBid.length === 5) {
      const highestBidderId = getHighestBidderId();
      if (highestBidderId) {
        setActivePlayer(highestBidderId);
      }
      dispatch(setGamePhase('hand'));
    }
  }, [booksBid, dispatch]);

  useEffect(() => {
    const playersCopy = [...players];
    if (dealerId) {
      const dealerIndex = playersCopy.findIndex(
        (player) => player.playerId === dealerId
      );
      const toTheBack = playersCopy.splice(0, dealerIndex + 1);
      setPlayersOrderedByBidder(playersCopy.concat(toTheBack));
    }
  }, [dealerId, players]);

  function generateSelectOptions(): ReactNode {
    const bidOptions = [];
    const booksRemaining = currentHand - bidTotals;

    for (let i = 0; i <= currentHand; i++) {
      bidOptions.push(
        <option value={i} key={`${i}bid`}>
          {i}
        </option>
      );
    }

    if (playerIsDealer && booksRemaining >= 0) {
      bidOptions.splice(booksRemaining, 1);
    }

    return bidOptions;
  }

  return (
    <S.BidModal>
      <p>Hand: {currentHand}</p>
      <p>Total Bids: {bidTotals}</p>
      <div>
        {playersOrderedByBidder.map((player, idx) => {
          return (
            <BidderRow
              activePlayerId={activePlayerId}
              bidOptions={generateSelectOptions()}
              isActivePlayer={isActivePlayer}
              player={player}
              key={`${player.playerName}${idx}`}
            />
          );
        })}
      </div>
    </S.BidModal>
  );
}
/* */

function BidderRow({
  activePlayerId,
  bidOptions,
  isActivePlayer,
  player,
}: {
  activePlayerId: string | null;
  bidOptions: ReactNode;
  isActivePlayer: boolean;
  player: PlayerData;
}) {
  const bidMenu = useRef<HTMLSelectElement>(null);
  const bid = useAppSelector(getBooksBidByPlayerId(player.playerId));

  function enterBid() {
    if (bidMenu.current && player.playerId) {
      submitBid(bidMenu.current.value, player.playerId);
    }
  }

  return isActivePlayer && activePlayerId === player.playerId ? (
    <div>
      <span>{player.playerName}: </span>
      <span>
        <select ref={bidMenu}>{bidOptions}</select>
        <button onClick={enterBid}>Y</button>
      </span>
    </div>
  ) : (
    <div>
      <span>{player.playerName}: </span>
      <span>{bid}</span>
    </div>
  );
}
