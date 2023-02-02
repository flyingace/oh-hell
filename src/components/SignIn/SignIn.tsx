import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addPlayer, getPlayerInfo } from 'redux/playerSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { signPlayerIn } from 'utils/socket-methods';
import * as S from './SignIn.styles';

const names = [
  'John Barnett',
  'John Bigboote',
  'John Camp',
  'John Careful Walker',
  'John Chief Crier',
  'John Cooper',
  'John Coyote',
  'John Edwards',
  'John Fat Eating',
  'John Fish',
  'John Fledgling',
  'John Gomez',
  'John Grim',
  'John Guardian',
  'John Icicle Boy',
  'John Jones',
  'John Joseph',
  'John Kim Chi',
  'John Lee',
  'John Littlejohn',
  'John Many Jars',
  'John Milton',
  'John Mud Head',
  'John Nephew',
  'John Nolan',
  "John O'Connor",
  'John Omar',
  'John Parrot',
  'John Rajeesh',
  'John Ready to Fly',
  'John Repeat Dance',
  'John Roberts',
  'John Scott',
  'John Shaw',
  'John Smallberries',
  'John Starbird',
  'John Take Cover',
  'John Thorny Stick',
  'John Turk',
  'John Two Horns',
  'John Web',
  'John Whorfin',
  'John Wood',
  'John Wright',
  'John Ya Ya',
  'John Valuk',
  'John Emdall',
  'John Gant',
  'John Parker',
];

function getFakeName() {
  const index = Math.floor(Math.random() * names.length);
  return names[index];
}

/* SignIn */
export default function SignIn() {
  const { playerId } = useAppSelector(getPlayerInfo);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('animal01');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('playerId: ', playerId);
  }, [playerId]);

  function avatarSelectionChangeHandler(val: string) {
    setSelectedAvatar(val);
  }

  function formSubmissionHandler(evt: MouseEvent) {
    evt.preventDefault();
    if (nameRef.current?.value) {
      const newPlayerId = uuidv4();
      signPlayerIn(selectedAvatar, newPlayerId, nameRef.current.value);
    }
  }

  return !playerId ? (
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
          defaultValue={getFakeName()}
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
