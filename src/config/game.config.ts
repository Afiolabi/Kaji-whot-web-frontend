export const gameConfig = {
  cardShapes: ['circle', 'triangle', 'cross', 'square', 'star'],
  
  specialCardRules: {
    2: { name: 'Pick Two', action: 'pickTwo' },
    1: { name: 'Hold On', action: 'holdOn' },
    14: { name: 'General Market', action: 'generalMarket' },
    20: { name: 'Whot', action: 'changeShape' },
  },
  
  revenue: {
    celebrityShare: 0.5,
    platformShare: 0.25,
    winnersShare: 0.05,
    observersShare: 0.2,
  },
  
  timers: {
    turnDuration: 30,
    gameDuration: 900,
    lobbyCountdown: 10,
    disconnectGrace: 60,
  },
};