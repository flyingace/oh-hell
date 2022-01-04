/* eslint-env jest */
import { cleanup, render } from '@testing-library/react';
import Card, { CardProps } from '../Card';

let props: CardProps;

beforeEach(() => {
  props = { suit: 'spades', value: 13, name: 'Ace' };
});

afterEach(cleanup);

describe('Card', () => {
  it('renders as expected', () => {
    render(<Card {...props} />);
  });
});
