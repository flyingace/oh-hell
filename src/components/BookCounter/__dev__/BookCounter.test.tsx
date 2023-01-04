/* eslint-env jest */
import { render } from '@testing-library/react';
import BookCounter, { BookCounterProps } from '../BookCounter';

let props: BookCounterProps;

describe('BookCounter', () => {
  test('it renders as expected', () => {
    render(<BookCounter {...props} />);
  });
});
