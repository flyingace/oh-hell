/* eslint-env jest */
import { render } from '@testing-library/react';
import Avatar, { AvatarProps } from '../Avatar';

let props: AvatarProps;

describe('Avatar', () => {
  test('it renders as expected', () => {
    render(<Avatar {...props} />);
  });
});
