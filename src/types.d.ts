export type PlayerData = {
  booksBid: number;
  booksTaken: number;
  playerAvatar: string;
  playerHand: CardData[];
  playerId: string | null;
  playerName: string;
  playerScore: number;
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
  metaData?: string;
  draggable?: boolean;
  id: number;
  name: CardName;
  suit: CardSuit;
  value: number;
};

export type CardMetaData = {
  id: number;
  name: CardName;
  playerId: string;
  suit: CardSuit;
  value: number;
};

export type GameState = {
  activePlayerId: string | null;
  dealerId: string | null;
  gamePhase: GamePhase;
  gamePlayers: PlayerData[];
  gameId: string | null;
  handCount: number;
  handIndex: number;
};

export type GamePhase = 'bidding' | 'dealing' | 'hand' | 'sitting';
