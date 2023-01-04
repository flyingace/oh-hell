/* eslint-env jest */
import { render } from '@testing-library/react';
import Opponent, { OpponentProps } from '../Opponent';

let props: OpponentProps;

describe('Opponent', () => {
  test('it renders as expected', () => {
    render(<Opponent {...props} />);
  });
});
