/* eslint-env jest */
import { render } from '@testing-library/react';
import BidModal from '../BidModal';

beforeEach(() => {});

describe('BidModal', () => {
  test('it renders as expected', () => {
    render(<BidModal playerId="playerId" players={[]} />);
  });
});
