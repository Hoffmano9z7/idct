const RES_STATUS = {
    S: 'success',
    F: 'warning', //Require re-auth
    E: 'error', //Exception
} // Status F & E will respond with msg

const JWT_TOKEN = 'idctHomeWork';

const MAX_ROOM_AMOUNT = 3;

const EVENT = {
    LOGIN: 'login',
    REGISTER: 'reg',
    LOBBY: 'lobby',
    GET_ROOM: 'getRoom',
    UPDATE_ROOM: 'updateRoom',
    ENTER_ROOM: 'enterRoom',
    EXIT_ROOM: 'exitRoom',
    READY: 'ready',
    START_GAME: 'startGame',
    MOVE: 'move',
    UPDATE_GAME: 'updateGame',
    END_GAME: 'endGame',
}

const TARGET = {
    SELF:'S',
    BROADCAST:'B',
    ROOM: 'R',
    BROADCAST_WITHOUT_SELF: 'W',
}

module.exports = {
    MAX_ROOM_AMOUNT,
    RES_STATUS,
    JWT_TOKEN,
    EVENT,
    TARGET,
}