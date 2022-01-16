/* eslint-env jest */
import { cleanup, render } from '@testing-library/react';
import Player, { PlayerData } from '../Player';

let props: PlayerData;

beforeEach(() => {
  props = {};
});

describe('Player', () => {
  it('renders as expected', () => {
    render(<Player {...props} />);
  });
});
