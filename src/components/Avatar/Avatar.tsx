import * as S from './Avatar.styles';

export type AvatarProps = {
  playerAvatar?: string;
  playerName: string;
};

/* Avatar */
export default function Avatar({
  playerAvatar,
  playerName = 'X',
}: AvatarProps) {
  const firstInitial = playerName.slice(0, 1);
  return (
    <S.Avatar>
      {playerAvatar ? (
        <img src={`/assets/avatars/${playerAvatar}.png`} alt="Player Avatar" />
      ) : (
        firstInitial
      )}
    </S.Avatar>
  );
}
/* */
