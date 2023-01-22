import Card, { CardData } from '../Card/Card';
import * as S from './PlayedCards.styles';

export type PlayedCardsProps = {
  playedCards: CardData[];
};

/* PlayedCards */
export default function PlayedCards({ playedCards }: PlayedCardsProps) {
  return (
    <S.PlayedCards>
      {playedCards.map(({ name, suit, value }, idx) => (
        <Card
          name={name}
          suit={suit}
          value={value}
          key={`${name}${suit}${value}${idx}`}
        />
      ))}
    </S.PlayedCards>
  );
}
/* */
