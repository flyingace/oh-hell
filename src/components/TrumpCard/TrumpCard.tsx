import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/store';
import { getTrumpCard } from 'redux/handSlice';
import Card from '../Card/Card';
import { CardData } from '../../types';
import * as S from './TrumpCard.styles';

export type TrumpCardProps = {};

/* TrumpCard */
export default function TrumpCard() {
  const trumpCard = useAppSelector(getTrumpCard);
  const [trumpCardData, setTrumpCardData] = useState<CardData | null>(null);

  useEffect(() => {
    if (trumpCard) {
      setTrumpCardData(trumpCard);
    }
  }, [trumpCard]);

  return trumpCardData ? (
    <S.TrumpCard>
      <Card
        draggable={false}
        id={trumpCardData.id}
        name={trumpCardData.name}
        suit={trumpCardData.suit}
        value={trumpCardData.value}
      />
    </S.TrumpCard>
  ) : (
    <S.TrumpCard>
      <img src="../../assets/deck/card_back.png" alt="Card Back" />
    </S.TrumpCard>
  );
}
/* */
