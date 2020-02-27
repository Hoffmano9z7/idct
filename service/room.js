const { RES_STATUS, MAX_ROOM_AMOUNT, EVENT } = require('../constant/generalConst');
const { signAuth, checkIsMoveWin } = require('../util/generalUtil');

let room = [];
const playerSchma = {
    id: '',
    isReady: false,
    isMovable: false,
    moves: [[0,0,0],[0,0,0],[0,0,0]],
}
const roomSchma = {
    a: { ...playerSchma },
    b: { ...playerSchma },
    s: [],
    isPlaying: false,
}

const createDefaultRoom = () => {
    for (let i=0; i<MAX_ROOM_AMOUNT; i++) {
        room.push({ ...roomSchma });
    }
};
createDefaultRoom();

//TODO: Hoffman - Place the msg to const files
const handleGetRoom = payload => {
    console.log('[handleGetRoom] - Start');
    const { id } = payload;
    const token = signAuth({id});
    const res = {
        status: RES_STATUS.S,
        action: EVENT.UPDATE_ROOM,
        room,
        token
    }
    console.log('[handleGetRoom] - End');
    return res;
}

const handleEnterRoom = (ws, payload) => {
    console.log('[handleEnterRoom] - Start');
    const { roomNum, id } = payload;
    let newRoomObj = room[roomNum];
    //TODO: Hoffman - Check if request valid, if invalid => throw
    ws.room = roomNum;
    if (newRoomObj.isPlaying) {
        newRoomObj.s.push(id);
    } else {
        let playerObj = { ...playerSchma };
        playerObj.id = id;
        if (!newRoomObj.a) {
            newRoomObj.a = playerObj
        } else if (!newRoomObj.b) {
            newRoomObj.b = playerObj;
        } else {
            newRoomObj.s.push(id);
        }
    }
    const token = signAuth({id});
    const res = {
        status: RES_STATUS.S,
        action: EVENT.UPDATE_ROOM,
        room,
        token
    }
    console.log('[handleEnterRoom] - End');
    return res;
}

const handleExitRoom = (ws, payload) => {
    console.log('[handleExitRoom] - Start');
    let isRequestValid = false;
    const { roomNum, id } = payload;
    let newRoomObj = room[roomNum];
    for (const key in newRoomObj) {
        if ('a' === key || 'b' === key) {
            if (id === newRoomObj[key].id) {
                if (!newRoomObj.isPlaying) {
                    let playerObj = { ...playerSchma };
                    playerObj.id = '';
                    newRoomObj[key] = playerObj;
                    ws.room = null;                 
                    break;
                } else {
                    throw 'You cannot exit during the game playing.'
                }
            }
        } else if ('s' === key) {
            const removeInx = newRoomObj[key].findIndex(s => s === id);
            if ( -1 === removeInx) {
                newRoomObj[key].slice(removeInx, removeInx + 1);
                isRequestValid = true;
                ws.room = null;
                break;
            }
        }
    }
    const token = signAuth({id});
    const res = {
        status: RES_STATUS.S,
        action: EVENT.UPDATE_ROOM,
        room,
        token
    }
    console.log('[handleExitRoom] - End');
    if (!isRequestValid)
        throw 'User is not in this room!';
    return res;
}

const handlePlayerReady = payload => {
    console.log('[handlePlayerReady] - Start');
    let isRequestValid = false;
    const { roomNum, id } = payload;
    let newRoomObj = room[roomNum];
    for (const key in newRoomObj) {
        if ('a' === key || 'b' === key) {
            if (id === newRoomObj[key].id) {
                if (!newRoomObj.isPlaying) {
                    newRoomObj[key].isReady = true;
                    isRequestValid = true;
                    break;
                } else {
                    break;
                }
            }
        }
    }
    const token = signAuth({id});
    const res = {
        status: RES_STATUS.S,
        action: EVENT.UPDATE_ROOM,
        room,
        token
    }
    console.log('[handlePlayerReady] - End');
    if (!isRequestValid)
        throw 'Invalid operation!';
    return res;
}

const handleStartGame = payload => {
    console.log('[handlePlayerReady] - Start');
    let isRequestValid = false;
    const { roomNum, id } = payload;
    let newRoomObj = room[roomNum];
    if (!newRoomObj.isPlaying && newRoomObj.a.id && newRoomObj.a.isReady && newRoomObj.b.id && newRoomObj.b.isReady) {
        newRoomObj.isPlaying = true;
        newRoomObj.a.isMovable = true;
        isRequestValid= true;
    }
    const token = signAuth({id});
    const res = {
        status: RES_STATUS.S,
        action: EVENT.START_GAME,
        room,
        token
    }
    console.log('[handlePlayerReady] - End');
    if (!isRequestValid)
        throw 'Invalid operation!';
    return res;
}

const handleMove = payload => {
    console.log('[handleMove] - Start');
    // let isRequestValid = false;
    const { roomNum, id, move } = payload;
    let newRoomObj = room[roomNum];
    newRoomObj.moves[move[0]][move[1]] = 1; //Client should pass the coordinate of the move
    if (id === newRoomObj.a.id) {
        newRoomObj.a.isMovable = false;
        newRoomObj.b.isMovable = true;
    } else if (id === newRoomObj.b.id) {
        newRoomObj.a.isMovable = true;
        newRoomObj.b.isMovable = false;
    } else {
        throw 'Invalid operation!';
    }
    const token = signAuth({id});
    const res = {
        status: RES_STATUS.S,
        action: EVENT.UPDATE_GAME,
        room,
        token
    }
    if (checkIsMoveWin) {
        res.winner = id;
        res.action= EVENT.END_GAME;
        res.room[roomNum] = { ...roomSchma }; //Enforce the user to the lobby
    }
    console.log('[handleMove] - End');
    // if (!isRequestValid)
    //     throw 'Invalid operation!';
    return res;
}

module.exports = {
    handleGetRoom, 
    handleEnterRoom,
    handleExitRoom,
    handlePlayerReady,
    handleStartGame,
    handleMove,
}