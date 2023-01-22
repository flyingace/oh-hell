import * as S from './BidModal.styles';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getHand, getTotalBids, updateTotalBids } from '../../redux/gameSlice';
import { ReactNode, useRef } from 'react';

/* BidModal */
export default function BidModal() {
  const dispatch = useAppDispatch();
  const totalBids = useAppSelector(getTotalBids);
  const currentHand = useAppSelector(getHand);
  const playerIsDealer = false;
  const bidOptions = useRef<HTMLSelectElement>(null);

  function generateSelectOptions():ReactNode {
    const bidOptions = [];
    const booksRemaining = currentHand - totalBids;

    for (let i = 0; i <= currentHand; i++) {
      bidOptions.push(
        <option value={i} key={`${i}bid`}>{i}</option>
      )
    }

    if (playerIsDealer && booksRemaining >= 0) {
      bidOptions.splice(booksRemaining, 1);
    }

    console.log('bidOptions: ', bidOptions)
    return bidOptions;
  }

  function submitBid() {
    const bid = bidOptions.current?.value || 0;
    dispatch(updateTotalBids(bid))
  }

  function clearBids() {
    dispatch(updateTotalBids('reset'))
  }




  return (
    <S.BidModal>
      <p>Total Bids: {totalBids}</p>
      <label>Your Bid:
      <select ref={bidOptions}>{generateSelectOptions()}</select></label>
      <button onClick={submitBid}>Submit</button><button onClick={clearBids}>Clear</button>
    </S.BidModal>
  );
};
/* */

