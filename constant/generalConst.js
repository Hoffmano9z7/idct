const RES_STATUS = {
    S: 'S',
    F: 'F', //Require re-auth
    E: 'E', //Exception
} // Status F & E will respond with msg

const JWT_TOKEN = 'idctHomeWork';

const MAX_ROOM_AMOUNT = 3;

const EVENT = {
    LOGIN: 'login',
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
}

module.exports = {
    MAX_ROOM_AMOUNT,
    RES_STATUS,
    JWT_TOKEN,
    EVENT,
    TARGET,
}