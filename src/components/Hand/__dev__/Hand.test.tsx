/* eslint-env jest */
import { cleanup, render } from '@testing-library/react';
import { CardData } from 'components/Card/Card';
import Hand from '../Hand';

let props: { hand: CardData[] };

beforeEach(() => {
  props = { hand: [] };
});

afterEach(cleanup);

describe('Hand', () => {
  it('renders as expected', () => {
    render(<Hand {...props} />);
  });
});
