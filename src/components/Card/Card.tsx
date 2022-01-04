import * as S from './Card.styles';

export type CardProps = {
  name: string;
  suit: string;
  value: number;
};

/* Card */
export default function Card({ name, suit, value }: CardProps) {
  return <S.Card>This is the styled & stateless Card component.</S.Card>;
}
/* */
