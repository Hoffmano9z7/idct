const { RES_STATUS, MAX_ROOM_AMOUNT } = require('../constant/generalConst');
const { signAuth } = require('../util/generalUtil');

let room = [];
const roomSchma = {
    a: '',
    b: '',
    s: [],
    isPlaying: false,
}

const createDefaultRoom = () => {
    for(let i=0; i<3; i++) {
        room.push({ ...roomSchma });
    }
};
createDefaultRoom();

const handleGetRoom = payload => {
    console.log('[handleGetRoom] - Start');
    const { id } = payload;
    const token = signAuth({id});
    const res = {
        status: RES_STATUS.S,
        room,
        token
    }
    console.log('[handleGetRoom] - End');
    return res;
}

const handleEnterRoom = payload => {
    console.log('[handleEnterRoom] - Start');
    const { roomNum, id } = payload;
    let newRoomObj = room[roomNum];
    if (newRoomObj.isPlaying) {
        newRoomObj.s.push(id);
    } else {
        if(!newRoomObj.a) {
            newRoomObj.a = id;
        } else if (!newRoomObj.b) {
            newRoomObj.b = id;
        } else {
            newRoomObj.s.push(id);
        }
    }
    const token = signAuth({id});
    const res = {
        status: RES_STATUS.S,
        room,
        token
    }
    console.log('[handleEnterRoom] - End');
    return res;
}

const handleExitRoom = payload => {
    console.log('[handleExitRoom] - Start');
    let isRequestValid = false;
    const { roomNum, id } = payload;
    let newRoomObj = room[roomNum];
    for (const key in newRoomObj) {
        if(id === newRoomObj[key]) {
            if ('a' === key || 'b' === key)
                newRoomObj.isPlaying = false;
            newRoomObj[key] = '';
            isRequestValid = true;
            break;
        }
    }
    const token = signAuth({id});
    const res = {
        status: RES_STATUS.S,
        room,
        token
    }
    console.log('[handleExitRoom] - End');
    if (!isRequestValid)
        throw 'User is not in this room!';
    return res;
}

module.exports = {
    handleGetRoom, 
    handleEnterRoom,
    handleExitRoom,
}