export type PlayerData = {
  playerAvatar: string;
  playerId: string;
  playerName: string;
};

export type CardName =
  | 'Ace'
  | 'Two'
  | 'Three'
  | 'Four'
  | 'Five'
  | 'Six'
  | 'Seven'
  | 'Eight'
  | 'Nine'
  | 'Ten'
  | 'Jack'
  | 'Queen'
  | 'King';

export type CardSuit = 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades';

export type CardData = {
  id: number;
  name: CardName;
  suit: CardSuit;
  value: number;
};
