/* eslint-env jest */
import { cleanup, render } from '@testing-library/react';
import Deck from '../Deck';

beforeEach(() => {});

afterEach(cleanup);

describe('Deck', () => {
  it('renders as expected', () => {
    render(<Deck />);
  });
});
