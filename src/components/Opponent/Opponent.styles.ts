import styled from 'styled-components/macro';

export const Opponent = styled.div<{ $positioning: string }>`
  position: absolute;
  ${({ $positioning }) => $positioning};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlayerName = styled.div``;

export const PlayerScore = styled.div``;
