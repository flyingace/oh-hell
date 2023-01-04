import styled from 'styled-components/macro';

export const Player = styled.div`
  position: absolute;
  left: 400px;
  bottom: 50px;
  display: flex;
  flex-direction: row;
`;

export const PlayerStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlayerScore = styled.span`
  border: 1px solid blue;
  padding: 3px;
`;
