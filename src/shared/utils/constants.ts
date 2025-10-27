export const GAME_CONSTANTS = {
  TURN_TIMER: 30, // seconds
  GAME_DURATION: 900, // 15 minutes
  MAX_PLAYERS: 4,
  MIN_PLAYERS: 2,
  STARTING_HAND_SIZE: 6,
  PICK_TWO_CARDS: 2,
  GENERAL_MARKET_CARDS: 4,
  DISCONNECT_GRACE_PERIOD: 60, // seconds
  RECONNECT_WINDOW: 120, // seconds
};

export const RANK_TIERS = {
  AMATEUR: { name: 'Amateur', entryFee: 50 },
  MASTER: { name: 'Whot Master', entryFee: 100 },
  LORD: { name: 'Whot Lord', entryFee: 200 },
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PLAY: '/play',
  OFFLINE: '/play/offline',
  FREE_ROOMS: '/play/free',
  RANK_ROOMS: '/play/rank',
  CELEBRITY_ROOMS: '/play/celebrity',
  LOBBY: '/lobby/:roomId',
  GAME: '/game/:roomId',
  WALLET: '/wallet',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  CELEBRITY_ONBOARD: '/celebrity-onboard',
};

export const SPECIAL_CARDS = {
  PICK_TWO: 2,
  HOLD_ON: 1,
  GENERAL_MARKET: 14,
  WHOT: 20,
};