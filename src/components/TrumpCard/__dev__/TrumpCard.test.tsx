/* eslint-env jest */
import { render } from '@testing-library/react';
import TrumpCard, {TrumpCardProps} from '../TrumpCard';

let props:TrumpCardProps;

beforeEach(() => {
  props = {};
});

describe('TrumpCard', () => {
  test('it renders as expected', () => {
    render(<TrumpCard {...props} />);
  });
});
