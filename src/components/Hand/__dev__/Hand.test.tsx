/* eslint-env jest */
import { cleanup, render } from '@testing-library/react';
import Hand, { HandProps } from '../Hand';

let props: HandProps;

beforeEach(() => {
  props = {};
});

afterEach(cleanup);

describe('Hand', () => {
  it('renders as expected', () => {
    render(<Hand {...props} />);
  });
});
