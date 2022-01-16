/* eslint-env jest */
import { cleanup, render } from '@testing-library/react';
import Table, { TableProps } from '../Table';

let props: TableProps;

beforeEach(() => {
  props = {};
});

describe('Table', () => {
  it('renders as expected', () => {
    render(<Table {...props} />);
  });
});
