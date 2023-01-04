import * as S from './Card.styles';

export type CardData = {
  name: string;
  suit: string;
  value: number;
};

/* Card */
export default function Card({ name, suit, value }: CardData) {
  const src: string = `../../assets/deck/${name}${suit}.png`;
  return (
    <img src={src} alt={`${value} of ${suit}`} width="132px" height="180px" />
  );
}
/* */
