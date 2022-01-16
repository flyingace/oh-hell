import * as S from './Card.styles';

export type CardData = {
  name: string;
  suit: string;
  value: number;
};

/* Card */
export default function Card({ name, suit, value }: CardData) {
  return <S.Card>This is the styled & stateless Card component.</S.Card>;
}
/* */
