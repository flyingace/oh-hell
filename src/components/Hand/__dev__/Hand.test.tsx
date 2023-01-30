/* eslint-env jest */
import { cleanup, render } from '@testing-library/react';
import Hand from '../Hand';

afterEach(cleanup);

describe('Hand', () => {
  it('renders as expected', () => {
    render(<Hand />);
  });
});
