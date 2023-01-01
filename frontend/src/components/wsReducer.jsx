
export function wsReducer(connectionStatus, action) {
  // return next state for React to set
  switch(action.type){
    case 'connection':{
      return {
        ...connectionStatus,
        connection: action.payload
      }
    }
    case 14: { // Invalid Room
      return {
        ...connectionStatus,
        isInvalidRoom: true
      }
    }
    case 10: { //Number of Players online
      return {
        ...connectionStatus,
        onlinePlayers: action.payload.num_clients
      }
    }
    case 4: { // start game
      return {
        ...connectionStatus,
        gameStatus: 'playing',
        currentPlayer: action.payload.player
      }
    }
    case 2: { //waiting for game to start
      return {
        ...connectionStatus,
        gameStatus: 'waiting',
        roomId: action.payload.room_id || null
      }
    }
    case 6: // Play move (handled in GameCell)
    case 16: // Enemy disconnected (handled in ResultsAnnouncement)
    case 8: { // Invalid move (do nothing)
      return connectionStatus
    }
    case 13: // Result: draw (handled in GameCell)
    case 9: {// Result: winner (handled in GameCell)
      return {
        ...connectionStatus,
        result: action.type,
        winner: action.payload.player || null
      }
    }
    case 'wait-cancelled':{
      return {
        ...connectionStatus,
        gameStatus: null,
        roomId: null
      }
    }
    default: {
      return {
        connection: null,
        gameStatus:null,
        onlinePlayers: 0,
        currentPlayer: null,
        roomId: null,
        isInvalidRoom:false,
        result: null,
        winner: null
    }
    }
  }
}
