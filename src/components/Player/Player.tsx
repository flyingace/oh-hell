import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/store';
import { getDealerId } from 'redux/gameSlice';
import {
  getBooksBid,
  getBooksTaken,
  getPlayerInfo,
  getPlayerScore,
} from 'redux/playerSlice';
import { getCurrentPlayerId } from 'redux/roundSlice';
import Avatar from '../Avatar/Avatar';
import BookCounter from '../BookCounter/BookCounter';
import DealerButton from '../DealerButton/DealerButton';
import Hand from '../Hand/Hand';
import { PlayerName } from '../Opponent/Opponent.styles';
import * as S from './Player.styles';

/* Player */
export default function Player() {
  const { playerAvatar, playerId, playerName } = useAppSelector(getPlayerInfo);
  const booksBid = useAppSelector(getBooksBid);
  const booksTaken = useAppSelector(getBooksTaken);
  const currentPlayerId = useAppSelector(getCurrentPlayerId);
  const dealerId = useAppSelector(getDealerId);
  const playerScore = useAppSelector(getPlayerScore);
  const [isCurrentPlayer, setIsCurrentPlayer] = useState<boolean>(false);
  const [isDealer, setIsDealer] = useState<boolean>(false);

  useEffect(() => {
    setIsDealer(dealerId === playerId);
  }, [dealerId, playerId]);

  useEffect(() => {
    setIsCurrentPlayer(currentPlayerId === playerId);
  }, [currentPlayerId, playerId]);

  return (
    <S.Player>
      <S.PlayerStack>
        {isCurrentPlayer ? <p>It is your turn</p> : null}
        {isDealer ? <DealerButton /> : null}
        <Avatar playerAvatar={playerAvatar} playerName={playerName} />
        <PlayerName>{playerName}</PlayerName>
        <BookCounter booksBid={booksBid} booksTaken={booksTaken} />
        <S.PlayerScore>{playerScore}</S.PlayerScore>
      </S.PlayerStack>
      <Hand isPlayerTurn={isCurrentPlayer} />
    </S.Player>
  );
}
/* */
