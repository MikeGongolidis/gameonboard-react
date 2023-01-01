// WRITE DEFAULT COMM MESSAGES
let inviteFriendEvent = {"mtype": 1, "game_type":0};
let findEnemyEvent = {"mtype":5,"game_type":0};
let joinRoomEvent = {"mtype":3,"room_id":'string'};
let playMoveEvent = {"mtype":6,"player":0, "column":"string","row":"string"};
let exitQueueEvent = {"mtype":12, "game_type":0};
let destoryRoomEvent = {"mtype":7, "game_type":0};
let exitGameEvent = {"mtype":15};

export {inviteFriendEvent, findEnemyEvent, joinRoomEvent, playMoveEvent, exitQueueEvent, destoryRoomEvent,exitGameEvent }