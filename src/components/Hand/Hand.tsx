import * as S from './Hand.styles';
import Card, { CardData } from '../Card/Card';

export type HandData = {};

/* Hand */
export default function Hand({ hand }: { hand: CardData[] }) {
  const handOfCards = hand.map((card: CardData, idx: number) => (
    <Card {...card} key={`card${idx}`} />
  ));

  return <S.Hand>{handOfCards}</S.Hand>;
}
/* */
