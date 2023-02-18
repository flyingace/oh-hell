import styled from 'styled-components/macro';

export const Card = styled.img<{ $isDraggable: boolean }>`
  width: 132px;
  height: 180px;
  cursor: ${({ $isDraggable }) => ($isDraggable ? 'pointer' : 'not-allowed')};

  &:hover {
    ${({ $isDraggable }) =>
      $isDraggable ? 'border: 3px solid green' : 'border: 3px solid red'}
`;
