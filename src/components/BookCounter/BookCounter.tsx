import * as S from './BookCounter.styles';

export type BookCounterProps = {
  booksBid: number;
  booksTaken: number;
};

/* BookCounter */
export default function BookCounter({
  booksBid = 0,
  booksTaken = 0,
}: BookCounterProps) {
  return (
    <S.BookCounter>
      <S.Bid>{booksBid}</S.Bid>
      {' / '}
      <S.Taken>{booksTaken}</S.Taken>
    </S.BookCounter>
  );
}
/* */
