/* eslint-env jest */
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event/setup/index';
import Hand, { HandData } from '../Hand';

const DEFAULT_PROPS: HandData = { isPlayerTurn: true, playerId: 'player-id' };

const setup = (props?: Partial<HandData>) => {
  const currentProps: HandData = {
    ...DEFAULT_PROPS,
    ...props,
  };
  const user = userEvent.setup();
  const utils = render(<Hand {...currentProps} />);
  return {
    ...utils,
    user,
  };
};

describe('Hand', () => {
  it('renders as expected', () => {
    setup();
  });
});
