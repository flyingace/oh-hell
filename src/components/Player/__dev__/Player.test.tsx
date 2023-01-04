/* eslint-env jest */
import { render } from '@testing-library/react';
import Player, { PlayerData } from '../Player';

let props: PlayerData;

describe('Player', () => {
  it('renders as expected', () => {
    render(<Player {...props} />);
  });
});
