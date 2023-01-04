/* eslint-env jest */
import { render } from '@testing-library/react';
import Players, {PlayersProps} from '../Players';

let props:PlayersProps;

beforeEach(() => {
  props = {};
});

describe('Players', () => {
  test('it renders as expected', () => {
    render(<Players {...props} />);
  });
});
