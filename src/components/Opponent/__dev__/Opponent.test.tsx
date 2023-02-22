/* eslint-env jest */
import { render } from '@testing-library/react';
import Opponent, { OpponentData } from '../Opponent';

let props: OpponentData;

describe('Opponent', () => {
  test('it renders as expected', () => {
    render(<Opponent {...props} />);
  });
});
