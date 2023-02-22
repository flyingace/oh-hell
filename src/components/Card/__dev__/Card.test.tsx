/* eslint-env jest */
import { cleanup, render } from '@testing-library/react';
import Card from '../Card';
import { CardData } from '../../../types';

let props: CardData;

beforeEach(() => {
  props = { id: 51, suit: 'Spades', value: 13, name: 'Ace' };
});

afterEach(cleanup);

describe('Card', () => {
  it('renders as expected', () => {
    render(<Card {...props} />);
  });
});
