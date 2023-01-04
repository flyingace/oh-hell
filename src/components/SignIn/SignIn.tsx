import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getClientPlayerId, setClientPlayerId } from 'redux/gameSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { signPlayerIn } from 'utils/socket-methods';
import * as S from './SignIn.styles';

/* SignIn */
export default function SignIn() {
  const dispatch = useAppDispatch();
  const clientPlayerId = useAppSelector(getClientPlayerId);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('animal01');
  const nameRef = useRef<HTMLInputElement>(null);

  function avatarSelectionChangeHandler(val: string) {
    setSelectedAvatar(val);
  }

  function formSubmissionHandler(evt: MouseEvent) {
    evt.preventDefault();
    if (nameRef.current?.value) {
      const playerId = uuidv4();
      dispatch(setClientPlayerId(playerId));
      signPlayerIn(selectedAvatar, playerId, nameRef.current.value);
    }
  }

  return !clientPlayerId ? (
    <S.SignIn>
      <h2>Sign In</h2>
      <label htmlFor="player-name">
        Player Name:{' '}
        <input
          id="player-name"
          name="player-name"
          type="text"
          required
          ref={nameRef}
        />
      </label>
      <S.AvatarFieldset>
        <legend>Choose an avatar</legend>
        <AnimalAvatar
          value="animal01"
          changeHandler={avatarSelectionChangeHandler}
          currentSelection={selectedAvatar}
        />
        <AnimalAvatar
          value="animal02"
          changeHandler={avatarSelectionChangeHandler}
          currentSelection={selectedAvatar}
        />
        <AnimalAvatar
          value="animal03"
          changeHandler={avatarSelectionChangeHandler}
          currentSelection={selectedAvatar}
        />
        <AnimalAvatar
          value="animal04"
          changeHandler={avatarSelectionChangeHandler}
          currentSelection={selectedAvatar}
        />
        <AnimalAvatar
          value="animal05"
          changeHandler={avatarSelectionChangeHandler}
          currentSelection={selectedAvatar}
        />
        <AnimalAvatar
          value="animal06"
          changeHandler={avatarSelectionChangeHandler}
          currentSelection={selectedAvatar}
        />
      </S.AvatarFieldset>

      <button onClick={formSubmissionHandler}>Submit</button>
    </S.SignIn>
  ) : null;
}
/* */

/* Animal Avatar */
function AnimalAvatar({
  changeHandler,
  currentSelection,
  value,
}: {
  changeHandler: (val: string) => void;
  currentSelection: string;
  value: string;
}) {
  function handleSelectionChange(evt: ChangeEvent<HTMLInputElement>) {
    changeHandler(evt.target.value);
  }

  return (
    <>
      <S.AvatarOption
        id={value}
        onChange={handleSelectionChange}
        name="avatar"
        checked={value === currentSelection}
        type="radio"
        value={value}
      />
      <S.AvatarLabel htmlFor={value}>
        <img
          src={`/assets/avatars/${value}.png`}
          alt={`Animal Avatar ${value}`}
        />
      </S.AvatarLabel>
    </>
  );
}
