/* eslint-env jest */
import { cleanup, render } from '@testing-library/react';
import Card, { CardData } from '../Card';

let props: CardData;

beforeEach(() => {
  props = { suit: 'Spades', value: 13, name: 'Ace' };
});

afterEach(cleanup);

describe('Card', () => {
  it('renders as expected', () => {
    render(<Card {...props} />);
  });
});
