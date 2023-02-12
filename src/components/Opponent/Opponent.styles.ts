import styled from 'styled-components/macro';

export const Opponent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:nth-of-type(1) {
    bottom: 300px;
    left: 280px;
  }

  &:nth-of-type(2) {
    top: 150px;
    left: 350px;
  }

  &:nth-of-type(3) {
    top: 150px;
    right: 350px;
  }

  &:nth-of-type(4) {
    bottom: 300px;
    right: 280px;
  }
`;

export const PlayerName = styled.div``;

export const PlayerScore = styled.div``;
