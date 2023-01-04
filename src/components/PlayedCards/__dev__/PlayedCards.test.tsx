/* eslint-env jest */
import { render } from '@testing-library/react';
import PlayedCards, {PlayedCardsProps} from '../PlayedCards';

let props:PlayedCardsProps;

beforeEach(() => {
  props = {};
});

describe('PlayedCards', () => {
  test('it renders as expected', () => {
    render(<PlayedCards {...props} />);
  });
});
