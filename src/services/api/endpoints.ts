export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  REFRESH_TOKEN: '/auth/refresh',

  // Rooms
  ROOMS: '/rooms',
  ROOM: (id: string) => `/rooms/${id}`,
  CREATE_ROOM: '/rooms/create',
  JOIN_ROOM: (id: string) => `/rooms/${id}/join`,
  LEAVE_ROOM: (id: string) => `/rooms/${id}/leave`,
  
  // Game
  GAME_STATE: (id: string) => `/games/${id}`,
  PLAY_CARD: (id: string) => `/games/${id}/play-card`,
  DRAW_CARD: (id: string) => `/games/${id}/draw-card`,
  
  // Wallet
  WALLET: '/wallet',
  FUND_WALLET: '/wallet/fund',
  WITHDRAW: '/wallet/withdraw',
  TRANSACTIONS: '/wallet/transactions',
  
  // Profile
  PROFILE: '/profile',
  UPDATE_PROFILE: '/profile/update',
  STATS: '/profile/stats',
  FRIENDS: '/profile/friends',
  ADD_FRIEND: '/profile/friends/add',
  REMOVE_FRIEND: (id: string) => `/profile/friends/${id}`,
  
  // Celebrity
  CELEBRITY_APPLY: '/celebrity/apply',
  CELEBRITY_STATUS: '/celebrity/status',
  CELEBRITY_DASHBOARD: '/celebrity/dashboard',
  
  // Admin
  ADMIN_PENDING_CELEBRITIES: '/admin/celebrities/pending',
  ADMIN_APPROVE_CELEBRITY: (id: string) => `/admin/celebrities/${id}/approve`,
  ADMIN_REJECT_CELEBRITY: (id: string) => `/admin/celebrities/${id}/reject`,
};