import styled from 'styled-components/macro';

export const SignIn = styled.div`
  position: absolute;
  z-index: 50;
  top: 30%;
  left: calc(50% - 230px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 460px;
  padding: 12px 16px;
  background-color: white;
  border-radius: 5px;
  text-align: left;

  h2 {
    margin: 0 0 8px 0;
    padding-bottom: 6px;
    border-bottom: 1px solid black;
  }
`;

export const AvatarFieldset = styled.fieldset`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 0;
  padding: 8px 0;
`;

export const AvatarOption = styled.input`
  opacity: 0;
  position: fixed;
  width: 0;

  &:checked + label > img {
    border-color: blue;
  }
`;

export const AvatarLabel = styled.label`
  img {
    width: 129px;
    height: 129px;
    border: 3px solid transparent;
    border-radius: 25px;
  }
`;
